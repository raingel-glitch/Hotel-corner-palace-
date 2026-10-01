import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  // Form State Check-In
  const [guestName, setGuestName] = useState('');
  const [idType, setIdType] = useState('KTP');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [rateType, setRateType] = useState('ROOM_ONLY');
  const [source, setSource] = useState('WALK_IN');
  const [paymentMethod, setPaymentMethod] = useState('CASH');

  // Waktu
  const now = new Date();
  const formatDateTimeLocal = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(12, 0, 0, 0);

  const [checkInTime, setCheckInTime] = useState(formatDateTimeLocal(now));
  const [checkOutTime, setCheckOutTime] = useState(formatDateTimeLocal(tomorrow));

  // Ambil Data Kamar dari Supabase
  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    setLoading(true);
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_types(*)');

    if (error) console.error('Error fetching rooms:', error);
    else setRooms(data || []);
    setLoading(false);
  }

  // Hitung Tarif
  const getCalculatedPrice = (room) => {
    if (!room || !room.room_types) return 0;
    if (rateType === 'SHORT_TIME') return 250000;
    if (rateType === 'PACKAGE') return room.room_types.rate_package;
    return room.room_types.rate_room_only;
  };

  // Proses Check-In
  async function handleCheckinSubmit(e) {
    e.preventDefault();
    if (!guestName || !idNumber) {
      alert('Nama Tamu dan Nomor ID Wajib Diisi!');
      return;
    }

    try {
      // 1. Simpan/Cari Tamu
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .insert([
          {
            full_name: guestName,
            id_type: idType,
            id_number: idNumber,
            phone: phone,
          },
        ])
        .select()
        .single();

      if (guestError) throw guestError;

      const totalPrice = getCalculatedPrice(selectedRoom);
      const folioNo = `FN-${Date.now().toString().slice(-6)}`;

      // 2. Simpan Reservasi
      const { error: resError } = await supabase
        .from('reservations')
        .insert([
          {
            folio_number: folioNo,
            guest_id: guestData.id,
            room_id: selectedRoom.id,
            rate_type: rateType,
            source: source,
            check_in: checkInTime,
            check_out: checkOutTime,
            total_price: totalPrice,
            payment_status: 'PAID',
            payment_method: paymentMethod,
            status: 'CHECKED_IN',
          },
        ]);

      if (resError) throw resError;

      // 3. Update Status Kamar ke Occupied (OC)
      await supabase
        .from('rooms')
        .update({ occupancy_status: 'OC' })
        .eq('id', selectedRoom.id);

      // Siapkan data invoice
      setCurrentReservation({
        folioNumber: folioNo,
        guestName,
        idType,
        idNumber,
        phone,
        roomNumber: selectedRoom.room_number,
        roomType: selectedRoom.room_types.name,
        rateType,
        source,
        checkInTime: checkInTime.replace('T', ' '),
        checkOutTime: checkOutTime.replace('T', ' '),
        totalPrice,
        paymentMethod,
        paymentStatus: 'PAID',
      });

      setShowCheckinModal(false);
      setShowInvoiceModal(true);
      fetchRooms(); // Refresh data kamar
    } catch (err) {
      alert('Gagal Check-in: ' + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-xs p-3">
      {/* HEADER HOTEL */}
      <header className="bg-slate-900 text-white p-4 rounded shadow-md mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-base font-black tracking-wider text-amber-400">
            HOTEL CORNER PALACE
          </h1>
          <p className="text-[10px] text-slate-300">
            Property Management System (PMS)
          </p>
        </div>
        <button
          onClick={fetchRooms}
          className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded font-bold border border-slate-600 text-[11px]"
        >
          🔄 Refresh
        </button>
      </header>

      {/* DENAH KAMAR PER LANTAI */}
      {loading ? (
        <div className="text-center py-10 font-bold text-slate-500">
          Memuat Data Kamar...
        </div>
      ) : (
        <div className="space-y-6">
          {[1, 2, 3].map((floorNum) => {
            const floorRooms = rooms.filter((r) => r.floor === floorNum);
            return (
              <div key={floorNum} className="bg-white p-3 rounded shadow-sm border">
                <h2 className="font-bold text-slate-800 text-xs border-b pb-2 mb-3 flex items-center gap-2">
                  <span>🏢 LANTAI {floorNum}</span>
                  <span className="text-[10px] font-normal text-slate-500">
                    ({floorRooms.length} Kamar)
                  </span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {floorRooms.map((room) => {
                    const isOccupied = room.occupancy_status === 'OC';
                    return (
                      <div
                        key={room.id}
                        onClick={() => {
                          if (!isOccupied) {
                            setSelectedRoom(room);
                            setShowCheckinModal(true);
                          } else {
                            alert(`Kamar ${room.room_number} sedang terisi (Occupied).`);
                          }
                        }}
                        className={`p-2.5 rounded border text-left cursor-pointer transition shadow-sm ${
                          isOccupied
                            ? 'bg-rose-50 border-rose-300 hover:bg-rose-100'
                            : 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-black text-slate-800">
                            {room.room_number}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              isOccupied
                                ? 'bg-rose-200 text-rose-800'
                                : 'bg-emerald-200 text-emerald-800'
                            }`}
                          >
                            {isOccupied ? 'OCCUPIED' : 'VACANT'}
                          </span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-600 mt-1 truncate">
                          {room.room_types?.name}
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                          Rp {room.room_types?.rate_room_only?.toLocaleString('id-ID')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL CHECK-IN WIZARD */}
      {showCheckinModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-4 space-y-3 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">
                Check-In Kamar {selectedRoom.room_number} (
                {selectedRoom.room_types?.name})
              </h3>
              <button
                onClick={() => setShowCheckinModal(false)}
                className="text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCheckinSubmit} className="space-y-3">
              {/* Sumber Tamu */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kanal / Sumber Tamu
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['WALK_IN', 'TIKET_COM', 'TRAVELOKA'].map((ch) => (
                    <button
                      type="button"
                      key={ch}
                      onClick={() => setSource(ch)}
                      className={`p-1.5 rounded font-bold border text-center text-[10px] ${
                        source === ch
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      {ch === 'WALK_IN'
                        ? 'Walk-In'
                        : ch === 'TIKET_COM'
                        ? 'Tiket.com'
                        : 'Traveloka'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Tamu */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Tamu *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Nama Sesuai KTP"
                    className="w-full border rounded p-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    No. HP / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812345678"
                    className="w-full border rounded p-1.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jenis ID
                  </label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="w-full border rounded p-1.5 text-xs"
                  >
                    <option value="KTP">KTP</option>
                    <option value="Passport">Passport</option>
                    <option value="SIM">SIM</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Nomor ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="NIK KTP / Passport"
                    className="w-full border rounded p-1.5 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Jam Check-In & Check-Out */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded border">
                <div>
                  <label className="block font-bold text-emerald-800 mb-1">
                    Jam Check-In
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full border rounded p-1 font-mono text-[10px]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-rose-800 mb-1">
                    Jam Check-Out
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="w-full border rounded p-1 font-mono text-[10px]"
                  />
                </div>
              </div>

              {/* Tipe Tarif */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pilihan Tarif
                </label>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setRateType('ROOM_ONLY')}
                    className={`p-1.5 rounded border text-left ${
                      rateType === 'ROOM_ONLY'
                        ? 'bg-indigo-50 border-indigo-600 font-bold text-indigo-900'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>Room Only</div>
                    <div className="font-mono text-slate-500">
                      Rp{' '}
                      {selectedRoom.room_types?.rate_room_only?.toLocaleString(
                        'id-ID'
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRateType('PACKAGE')}
                    className={`p-1.5 rounded border text-left ${
                      rateType === 'PACKAGE'
                        ? 'bg-indigo-50 border-indigo-600 font-bold text-indigo-900'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>Package</div>
                    <div className="font-mono text-slate-500">
                      Rp{' '}
                      {selectedRoom.room_types?.rate_package?.toLocaleString(
                        'id-ID'
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRateType('SHORT_TIME')}
                    className={`p-1.5 rounded border text-left ${
                      rateType === 'SHORT_TIME'
                        ? 'bg-amber-50 border-amber-600 font-bold text-amber-900'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>Short Time</div>
                    <div className="font-mono text-slate-500">Rp 250.000</div>
                  </button>
                </div>
              </div>

              {/* Pembayaran */}
              <div className="flex justify-between items-center bg-sky-50 p-2.5 rounded border border-sky-200">
                <div>
                  <label className="block font-bold text-sky-900">Metode Bayar</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="border rounded p-1 text-xs mt-1"
                  >
                    <option value="CASH">Cash / Tunai</option>
                    <option value="QRIS">QRIS</option>
                    <option value="TRANSFER">Transfer Bank</option>
                    <option value="OTA_PREPAID">OTA Prepaid</option>
                  </select>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Total:</span>
                  <span className="text-sm font-black font-mono text-sky-800">
                    Rp {getCalculatedPrice(selectedRoom).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(false)}
                  className="bg-slate-300 hover:bg-slate-400 font-bold px-3 py-1.5 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded"
                >
                  Proses Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PRINT INVOICE */}
      {showInvoiceModal && currentReservation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-4 space-y-3 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-end gap-2 border-b pb-2">
              <button
                onClick={() => window.print()}
                className="bg-sky-600 text-white font-bold px-3 py-1 rounded text-xs"
              >
                🖨️ Cetak Invoice
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="bg-slate-300 font-bold px-3 py-1 rounded text-xs"
              >
                Tutup
              </button>
            </div>

            <div className="border p-4 rounded bg-slate-50 space-y-3 font-sans">
              <div className="border-b-2 border-slate-800 pb-2 flex justify-between items-start">
                <div>
                  <h2 className="font-black text-sm text-slate-900">
                    HOTEL CORNER PALACE
                  </h2>
                  <p className="text-[10px] text-slate-500">
                    Guest Invoice / Bukti Pembayaran
                  </p>
                </div>
                <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                  #{currentReservation.folioNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <p>
                    <strong>Tamu:</strong> {currentReservation.guestName}
                  </p>
                  <p>
                    <strong>ID ({currentReservation.idType}):</strong>{' '}
                    {currentReservation.idNumber}
                  </p>
                  <p>
                    <strong>Sumber:</strong> {currentReservation.source}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Kamar:</strong> {currentReservation.roomNumber} (
                    {currentReservation.roomType})
                  </p>
                  <p className="text-emerald-700 font-bold">
                    In: {currentReservation.checkInTime}
                  </p>
                  <p className="text-rose-700 font-bold">
                    Out: {currentReservation.checkOut}
                  </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

