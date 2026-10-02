import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UserCheck, 
  Plus, 
  Printer, 
  Receipt,
  BedDouble,
  LayoutGrid,
  ClipboardList,
  CheckCircle2,
  Sparkles,
  X,
  AlertTriangle,
  RefreshCw,
  CheckSquare,
  Square,
  Clock,
  CreditCard,
  LogOut,
  MousePointerClick,
  User,
  Phone,
  FileText,
  Globe
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('roomRack'); // roomRack, dashboard, newBooking
  const [subTab, setSubTab] = useState('Room View'); // Room View, HK Room Status, dll
  
  const [showBillingModal, setShowBillingModal] = useState(false);
  currentReservation, setCurrentReservation] = useState(null);
  
  // Real-time Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  // Input Pembayaran Baru
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Update Jam Real Time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Data Seluruh Kamar (Semua Diset VACANT & READY)
  const [rooms, setRooms] = useState([
    // LANTAI 1
    { id: '101', floor: 1, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '102', floor: 1, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000 },
    { id: '103', floor: 1, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '104', floor: 1, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },

    // LANTAI 2
    { id: '201', floor: 2, type: 'EKONOMIS ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 225000 },
    { id: '202', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '203', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '204', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '205', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '206', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '207', floor: 2, type: 'DRIVER', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 175000 },
    { id: '208', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '209', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '210', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '218', floor: 2, type: 'EKONOMIS ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 225000 },
    { id: '228', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000 },
    { id: '229', floor: 2, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000 },

    // LANTAI 3
    { id: '311', floor: 3, type: 'KING MARVELS', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 625000 },
    { id: '316', floor: 3, type: 'GRAND DELUXE', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 525000 },
    { id: '322', floor: 3, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000 },
    { id: '325', floor: 3, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000 },
  ]);

  // Data Reservasi (KOSONG DULU)
  const [reservations, setReservations] = useState([]);

  // Form Registration State
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    idCard: '',
    gender: 'Laki-laki',
    roomNumber: '101',
    roomType: 'SUPERRIOR ROOM',
    source: 'Walk-In',
    price: 325000
  });

  // Update Tipe Kamar & Harga ketika Nomor Kamar dipilih
  const handleRoomSelectChange = (roomId) => {
    const selected = rooms.find(r => r.id === roomId);
    if (selected) {
      setFormData({
        ...formData,
        roomNumber: selected.id,
        roomType: selected.type,
        price: selected.priceOnly
      });
    }
  };

  // Fungsi saat Kamar di Room Rack diklik
  const handleRoomClick = (room) => {
    if (room.status === 'OC') {
      const res = reservations.find(r => r.roomNumber === room.id && r.status === 'Occupied');
      if (res) {
        setCurrentReservation(res);
        setShowBillingModal(true);
      } else {
        alert(`Kamar ${room.id} terisi oleh ${room.guest}`);
      }
    } else if (room.status === 'OO' || room.hkStatus === 'OO') {
      alert(`Kamar ${room.id} sedang Out of Order (OO) / Rusak.`);
    } else {
      setFormData({
        guestName: '',
        phone: '',
        idCard: '',
        gender: 'Laki-laki',
        roomNumber: room.id,
        roomType: room.type,
        source: 'Walk-In',
        price: room.priceOnly
      });
      setActiveTab('newBooking');
    }
  };

  // Mengubah HK Status Kamar
  const handleHkStatusChange = (roomId, newHkStatus) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        let newRoomStatus = room.status;
        if (newHkStatus === 'OO') {
          newRoomStatus = 'OO';
        } else if (room.status === 'OO') {
          newRoomStatus = 'VC';
        }

        return {
          ...room,
          hkStatus: newHkStatus,
          status: newRoomStatus
        };
      }
      return room;
    }));
  };

  // Handle Pembayaran
  const handleMakePayment = () => {
    if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      alert('Masukkan jumlah pembayaran yang valid!');
      return;
    }

    const payVal = Number(paymentAmount);
    const nowStr = currentTime.toLocaleDateString('id-ID') + ' ' + currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const updatedRes = {
      ...currentReservation,
      credit: currentReservation.credit + payVal,
      balance: (currentReservation.credit + payVal) - currentReservation.debit,
      transactions: [
        ...currentReservation.transactions,
        { date: nowStr, desc: `Payment (${paymentMethod})`, debit: 0, credit: payVal }
      ]
    };

    setCurrentReservation(updatedRes);
    setReservations(reservations.map(r => r.id === updatedRes.id ? updatedRes : r));
    setPaymentAmount('');
    alert('Pembayaran berhasil ditambahkan!');
  };

  // Handle Checkout
  const handleCheckout = () => {
    if (currentReservation.balance < 0) {
      alert('Gagal Checkout! Masih ada sisa tagihan (Balance minus) yang belum dilunasi.');
      return;
    }

    const timeOutStr = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const dateOutStr = currentTime.toLocaleDateString('id-ID');

    const updatedRes = {
      ...currentReservation,
      status: 'Checked Out',
      checkOutTime: timeOutStr,
      checkOutDate: dateOutStr,
      checkOutBy: 'Farhan'
    };

    setCurrentReservation(updatedRes);
    setReservations(reservations.map(r => r.id === updatedRes.id ? updatedRes : r));

    // Update status kamar di Room Rack menjadi Dirty
    setRooms(rooms.map(r => r.id === currentReservation.roomNumber ? { ...r, status: 'VC', hkStatus: 'Dirty', guest: '-' } : r));

    alert(`Tamu ${currentReservation.guestName} Kamar ${currentReservation.roomNumber} Berhasil Check-Out! Status kamar diset ke DIRTY.`);
    setShowBillingModal(false);
  };

  // Handle Check-In Baru
  const handleCreateBooking = (e) => {
    e.preventDefault();
    const timeInStr = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const dateInStr = currentTime.toISOString().split('T')[0];

    const newRes = {
      id: Date.now(),
      regNumber: `RN${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      folioNumber: `FN-1026-00${Math.floor(700 + Math.random() * 90)}`,
      guestName: formData.guestName,
      phone: formData.phone || '-',
      idCard: formData.idCard || '-',
      source: formData.source,
      gender: formData.gender,
      roomNumber: formData.roomNumber,
      roomType: formData.roomType,
      roomRates: Number(formData.price),
      extraCharges: 0,
      laundry: 0,
      fnb: 0,
      debit: Number(formData.price),
      credit: Number(formData.price),
      balance: 0,
      checkInDate: dateInStr,
      checkInTime: timeInStr,
      checkInBy: 'Farhan',
      checkOutDate: '2026-10-03',
      checkOutTime: '-',
      checkOutBy: '-',
      status: 'Occupied',
      transactions: [
        { date: `${dateInStr} ${timeInStr}`, desc: `Room Rates (${formData.source})`, debit: Number(formData.price), credit: 0 },
        { date: `${dateInStr} ${timeInStr}`, desc: 'Cash Payment', debit: 0, credit: Number(formData.price) }
      ]
    };

    setReservations([newRes, ...reservations]);
    setRooms(rooms.map(r => r.id === formData.roomNumber ? { ...r, status: 'OC', guest: formData.guestName, hkStatus: 'Ready' } : r));
    setActiveTab('roomRack');
    setSubTab('Room View');
  };

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-800 text-xs pb-12">
      {/* HEADER BAR & REAL-TIME CLOCK */}
      <header className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-slate-900 font-extrabold px-2 py-0.5 rounded text-[11px] uppercase">Front Office</span>
          <h1 className="font-bold text-sm tracking-wide text-slate-100">HOTEL CORNER PALACE</h1>
        </div>

        {/* TOP NAV MENU */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
          <button onClick={() => setActiveTab('newBooking')} className="hover:text-amber-400 transition flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Registrasi Check-In
          </button>
          <button onClick={() => { setActiveTab('roomRack'); setSubTab('Room View'); }} className="hover:text-amber-400 transition">Reservation System</button>
          <button onClick={() => setActiveTab('dashboard')} className="hover:text-amber-400 transition">Kasir & Checkout</button>
        </div>

        {/* REAL TIME CLOCK */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded flex items-center gap-1.5 text-amber-400 font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentTime.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span>{currentTime.toLocaleTimeString('id-ID')}</span>
          </div>
          <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">User: <strong className="text-white">Farhan</strong></span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 space-y-4">

        {/* SUB TABS BAR */}
        <div className="bg-slate-800 text-white rounded-t-lg p-1 flex items-center gap-1 overflow-x-auto shadow-sm">
          {['Room View', 'HK Room Status', 'Reservation View', 'HK Report', 'Dirty to Clean', 'Reminder'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSubTab(tab);
                setActiveTab('roomRack');
              }}
              className={`px-4 py-1.5 rounded font-bold text-[11px] transition whitespace-nowrap ${
                subTab === tab && activeTab === 'roomRack'
                  ? 'bg-sky-500 text-white shadow'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded font-bold text-[11px] transition whitespace-nowrap ml-auto ${
              activeTab === 'dashboard' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-200'
            }`}
          >
            Kasir & Checkout Tamu
          </button>
        </div>

        {/* SUB TAB 1: ROOM VIEW / ROOM RACK */}
        {activeTab === 'roomRack' && subTab === 'Room View' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-300 text-amber-900 p-2.5 rounded text-[11px] font-semibold flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-amber-700" />
              <span><strong>Petunjuk:</strong> Klik pada kamar kosong (VC) untuk <strong>Registrasi Check-In</strong>, atau klik kamar terisi (OC) untuk membuka <strong>Kasir / Checkout</strong>.</span>
            </div>

            {['KING MARVELS', 'GRAND DELUXE', 'BUSSINES ROOM', 'SUPERRIOR ROOM', 'EKONOMIS ROOM', 'DRIVER'].map((roomCategory) => {
              const categoryRooms = rooms.filter(r => r.type === roomCategory);
              if (categoryRooms.length === 0) return null;

              return (
                <div key={roomCategory} className="bg-white rounded-lg shadow-sm border border-slate-300 p-4 space-y-3">
                  <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="font-extrabold text-slate-800 text-xs tracking-wider">{roomCategory}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {categoryRooms.map((room) => (
                      <div 
                        key={room.id}
                        onClick={() => handleRoomClick(room)}
                        className={`cursor-pointer transform hover:-translate-y-1 transition duration-150 rounded-lg p-2.5 w-28 border-2 shadow-sm flex flex-col justify-between ${
                          room.status === 'OC' 
                            ? 'bg-purple-600 text-white border-purple-700' 
                            : room.hkStatus === 'OO' || room.status === 'OO'
                            ? 'bg-slate-700 text-white border-slate-900'
                            : room.hkStatus === 'Dirty' 
                            ? 'bg-amber-100 text-amber-900 border-amber-400' 
                            : 'bg-emerald-500 text-white border-emerald-600'
                        }`}
                      >
                        <div className="text-right">
                          <h4 className="text-lg font-black">{room.id}</h4>
                        </div>
                        <div className="mt-2 pt-1 border-t border-white/30 flex justify-between items-center">
                          <span className="text-[9px] font-bold uppercase truncate max-w-[50px]">{room.guest}</span>
                          <span className="text-[9px] bg-white text-slate-900 px-1 py-0.5 rounded font-bold">{room.hkStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SUB TAB 2: HK ROOM STATUS */}
        {activeTab === 'roomRack' && subTab === 'HK Room Status' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-4 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-extrabold text-slate-800 text-sm">Housekeeping (HK) Room Status Management</h2>
                <p className="text-slate-500 text-[10px]">Ubah status kebersihan dan kelayakan kamar (Dirty, Ready, Out of Order).</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-2 border">NO</th>
                    <th className="p-2 border">ROOM NO</th>
                    <th className="p-2 border">FLOOR</th>
                    <th className="p-2 border">ROOM TYPE</th>
                    <th className="p-2 border">FO STATUS</th>
                    <th className="p-2 border">GUEST</th>
                    <th className="p-2 border">CURRENT HK STATUS</th>
                    <th className="p-2 border text-center">CHANGE HK STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rooms.map((room, index) => (
                    <tr key={room.id} className="hover:bg-slate-50 font-medium">
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border font-extrabold text-slate-800">{room.id}</td>
                      <td className="p-2 border">Lantai {room.floor}</td>
                      <td className="p-2 border font-semibold">{room.type}</td>
                      <td className="p-2 border">
                        <span className={`px-2 py-0.5 rounded font-bold ${room.status === 'OC' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {room.status === 'OC' ? 'Occupied' : 'Vacant'}
                        </span>
                      </td>
                      <td className="p-2 border font-bold">{room.guest}</td>
                      <td className="p-2 border">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          room.hkStatus === 'Ready' ? 'bg-emerald-500 text-white' :
                          room.hkStatus === 'Dirty' ? 'bg-amber-500 text-white' :
                          'bg-slate-700 text-white'
                        }`}>
                          {room.hkStatus}
                        </span>
                      </td>
                      <td className="p-2 border text-center">
                        <select
                          value={room.hkStatus}
                          onChange={(e) => handleHkStatusChange(room.id, e.target.value)}
                          className="p-1 border rounded bg-white text-slate-900 font-bold border-slate-300 outline-none cursor-pointer"
                        >
                          <option value="Ready">✅ Ready (Clean)</option>
                          <option value="Dirty">🧹 Dirty (Kotor)</option>
                          <option value="OO">🛠️ OO (Out of Order)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB KASIR & CHECKOUT TABLE */}
        {activeTab === 'dashboard' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-4 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-extrabold text-slate-800 text-sm">Kasir, Folio & Process Checkout</h2>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-8 text-slate-500 font-medium">
                Belum ada transaksi atau tamu yang sedang check-in. Silakan lakukan Check-In terlebih dahulu.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="p-2 border">NO</th>
                      <th className="p-2 border">REG. NUMBER</th>
                      <th className="p-2 border">GUEST NAME</th>
                      <th className="p-2 border">PHONE</th>
                      <th className="p-2 border">SOURCE</th>
                      <th className="p-2 border">ROOM</th>
                      <th className="p-2 border">CHECKIN TIME</th>
                      <th className="p-2 border text-right">TOTAL BILL</th>
                      <th className="p-2 border text-right">BALANCE</th>
                      <th className="p-2 border">STATUS</th>
                      <th className="p-2 border text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {reservations.map((res, index) => (
                      <tr key={res.id} className="hover:bg-slate-50 font-medium">
                        <td className="p-2 border text-center">{index + 1}</td>
                        <td className="p-2 border font-mono font-bold text-slate-700">{res.regNumber}</td>
                        <td className="p-2 border font-bold">{res.guestName}</td>
                        <td className="p-2 border">{res.phone}</td>
                        <td className="p-2 border">
                          <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">{res.source}</span>
                        </td>
                        <td className="p-2 border">{res.roomNumber} ({res.roomType})</td>
                        <td className="p-2 border">{res.checkInDate} {res.checkInTime}</td>
                        <td className="p-2 border text-right font-bold">Rp {res.debit.toLocaleString('id-ID')}</td>
                        <td className={`p-2 border text-right font-bold ${res.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          Rp {res.balance.toLocaleString('id-ID')}
                        </td>
                        <td className="p-2 border">
                          <span className={`px-2 py-0.5 rounded font-bold ${res.status === 'Occupied' ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-700'}`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => {
                              setCurrentReservation(res);
                              setShowBillingModal(true);
                            }}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3 py-1 rounded text-[10px] shadow flex items-center gap-1 mx-auto"
                          >
                            <Receipt className="w-3 h-3" /> Transaksi & Checkout
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB REGISTRASI CHECK-IN LENGKAP */}
        {activeTab === 'newBooking' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-6 max-w-2xl mx-auto space-y-4">
            <div className="border-b pb-2 flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-sky-600" /> Formulir Registrasi Check-In
                </h2>
                <p className="text-slate-500 text-[11px]">Lengkapi data identitas dan informasi pemesanan kamar tamu.</p>
              </div>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              
              {/* NAMA TAMU */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Nama Lengkap Tamu <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Masukkan nama tamu"
                  className="w-full p-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                  value={formData.guestName}
                  onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                />
              </div>

              {/* NO HP & KTP/PASSPORT/SIM */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" /> Nomor HP / WA <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="081234567890"
                    className="w-full p-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-sky-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-500" /> No. KTP / Passport / SIM <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="3201020304050001"
                    className="w-full p-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-sky-500"
                    value={formData.idCard}
                    onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  />
                </div>
              </div>

              {/* SUMBER PEMESANAN */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-500" /> Sumber Pemesanan / Channel <span className="text-rose-500">*</span>
                </label>
                <select 
                  className="w-full p-2 border rounded border-slate-300 bg-white font-bold"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                >
                  <option value="Walk-In">🚶 Walk-In (Langsung)</option>
                  <option value="Traveloka">✈️ Traveloka</option>
                  <option value="Tiket.com">🎟️ Tiket.com</option>
                  <option value="Agoda">🏨 Agoda</option>
                  <option value="Booking.com">🌐 Booking.com</option>
                  <option value="Pegipegi">🚗 Pegipegi</option>
                </select>
              </div>

              {/* PILIH KAMAR, TIPE KAMAR & HARGA */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Pilih Kamar Kosong</label>
                  <select 
                    className="w-full p-2 border rounded border-slate-300 bg-white font-bold"
                    value={formData.roomNumber}
                    onChange={(e) => handleRoomSelectChange(e.target.value)}
                  >
                    {rooms.filter(r => r.status === 'VC').map(r => (
                      <option key={r.id} value={r.id}>{r.id} - Lt. {r.floor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Tipe Kamar</label>
                  <input 
                    type="text" 
                    disabled 
                    className="w-full p-2 border rounded bg-slate-200 font-bold text-slate-700"
                    value={formData.roomType}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Tarif / Harga (Rp)</label>
                  <input 
                    type="number" 
                    required 
                    className="w-full p-2 border rounded border-slate-300 font-bold text-emerald-700"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded transition shadow text-xs">
                Proses Check-In Tamu
              </button>
            </form>
          </div>
        )}

      </main>

      {/* MODAL BILLING, PAYMENT & CHECKOUT */}
      {showBillingModal && currentReservation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-5 space-y-4 shadow-2xl overflow-y-auto max-h-[95vh] text-[11px]">
            
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-sky-600" /> Transaksi Kasir & Checkout Tamu
              </h3>
              <button onClick={() => setShowBillingModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* RINGKASAN BILL */}
            <div className="bg-slate-100 p-3 rounded border border-slate-300 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p><strong>Reg. Number:</strong> <span className="font-mono font-bold text-sky-800">{currentReservation.regNumber}</span></p>
                <p><strong>Nama Tamu:</strong> <span className="font-bold">{currentReservation.guestName}</span></p>
                <p><strong>No. HP / WA:</strong> {currentReservation.phone || '-'}</p>
                <p><strong>No. KTP/Passport:</strong> {currentReservation.idCard || '-'}</p>
                <p><strong>Channel:</strong> <span className="bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded font-bold">{currentReservation.source || 'Walk-In'}</span></p>
                <p><strong>Room Number:</strong> <span className="font-bold">{currentReservation.roomNumber} ({currentReservation.roomType})</span></p>
              </div>

              <div className="space-y-1">
                <p><strong>Room Rates:</strong> Rp {currentReservation.roomRates.toLocaleString('id-ID')}</p>
                <p className="font-black text-slate-900 border-t pt-1">
                  TOTAL BILL : Rp {currentReservation.debit.toLocaleString('id-ID')}
                </p>
              </div>

              <div className="space-y-1 bg-white p-2 rounded border border-slate-200">
                <div className="flex justify-between"><span>Debit</span> <span>: Rp {currentReservation.debit.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between font-bold text-emerald-700"><span>Credit</span> <span>: Rp {currentReservation.credit.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between font-black text-slate-900 border-t pt-1">
                  <span>Balance</span> 
                  <span className={currentReservation.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}>
                    : Rp {currentReservation.balance.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* FORM PAYMENT & CHECKOUT */}
            <div className="p-3 bg-slate-50 border rounded border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-700">Make Payment:</span>
                <input 
                  type="number" 
                  placeholder="Jumlah Bayar (Rp)" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="p-1.5 border rounded border-slate-300 w-48 text-xs font-bold outline-none"
                />
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="p-1.5 border rounded border-slate-300 bg-white text-xs font-bold"
                >
                  <option value="Cash">Cash / Tunai</option>
                  <option value="Debit Card">Debit / EDC Card</option>
                  <option value="Transfer">Transfer Bank</option>
                  <option value="QRIS">QRIS</option>
                </select>

                <button 
                  onClick={handleMakePayment}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded shadow text-xs flex items-center gap-1"
                >
                  <CreditCard className="w-3.5 h-3.5" /> Make Payment
                </button>

                {currentReservation.status === 'Occupied' && (
                  <button 
                    onClick={handleCheckout}
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-5 py-1.5 rounded shadow text-xs flex items-center gap-1 ml-auto"
                  >
                    <LogOut className="w-3.5 h-3.5" /> CHECKOUT
                  </button>
                )}
              </div>
            </div>

            {/* AUDIT TRAIL */}
            <div className="grid grid-cols-2 gap-4 border p-3 rounded bg-slate-100 font-semibold">
              <div className="space-y-1">
                <p><strong>Checkin Time:</strong> {currentReservation.checkInTime}</p>
                <p><strong>Checkin By:</strong> {currentReservation.checkInBy}</p>
              </div>
              <div className="space-y-1 border-l pl-4">
                <p><strong>Checkout Time:</strong> {currentReservation.checkOutTime}</p>
                <p><strong>Checkout By:</strong> {currentReservation.checkOutBy}</p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
