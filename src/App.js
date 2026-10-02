import React, { useState } from 'react';
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
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('roomRack'); // 'dashboard', 'roomRack', 'newBooking'
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  // Data Kamar (Lantai 1, 2, & 3 sesuai data)
  const [rooms, setRooms] = useState([
    // LANTAI 1
    { id: '102', floor: 1, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '103', floor: 1, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '104', floor: 1, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },

    // LANTAI 2
    { id: '207', floor: 2, type: 'Driver Room', status: 'Available', guest: '-', priceOnly: 175000, pricePackage: 175000 },
    { id: '209', floor: 2, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '210', floor: 2, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '214', floor: 2, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '218', floor: 2, type: 'Ekonomis Room', status: 'Available', guest: '-', priceOnly: 225000, pricePackage: 225000 },
    { id: '221', floor: 2, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '225', floor: 2, type: 'Ekonomis Room', status: 'Available', guest: '-', priceOnly: 225000, pricePackage: 225000 },
    { id: '226', floor: 2, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '227', floor: 2, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '228', floor: 2, type: 'Superior Room', status: 'Available', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '229', floor: 2, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '230', floor: 2, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '231', floor: 2, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '232', floor: 2, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },

    // LANTAI 3
    { id: '311', floor: 3, type: 'King Marvelous Room', status: 'Available', guest: '-', priceOnly: 625000, pricePackage: 700000 },
    { id: '316', floor: 3, type: 'Grand Deluxe Room', status: 'Available', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '317', floor: 3, type: 'Grand Deluxe Room', status: 'Available', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '319', floor: 3, type: 'Grand Deluxe Room', status: 'Available', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '320', floor: 3, type: 'Grand Deluxe Room', status: 'Available', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '321', floor: 3, type: 'Grand Deluxe Room', status: 'Available', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '322', floor: 3, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '323', floor: 3, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '325', floor: 3, type: 'Business Room', status: 'Available', guest: '-', priceOnly: 425000, pricePackage: 500000 },
  ]);

  // Data Reservasi Contoh
  const [reservations, setReservations] = useState([
    {
      id: 1,
      folioNumber: 'INV-2026001',
      guestName: 'Budi Santoso',
      idType: 'KTP',
      idNumber: '3171012345670001',
      source: 'Tiket.com',
      roomNumber: '103',
      roomType: 'Superior Room',
      rateType: 'Package',
      price: 400000,
      checkInTime: '2026-10-02 14:00',
      checkOut: '2026-10-03 12:00',
      status: 'Checked-In'
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    guestName: '',
    idType: 'KTP',
    idNumber: '',
    source: 'Walk-In',
    roomNumber: '102',
    rateType: 'Room Only',
    price: 425000,
    checkInTime: '2026-10-02 14:00',
    checkOut: '2026-10-03 12:00'
  });

  const handleRoomChange = (roomNum) => {
    const selectedRoom = rooms.find(r => r.id === roomNum);
    if (!selectedRoom) return;

    let calculatedPrice = selectedRoom.priceOnly;
    if (formData.rateType === 'Package') calculatedPrice = selectedRoom.pricePackage;
    else if (formData.rateType === 'Short Time') calculatedPrice = 250000;

    setFormData({
      ...formData,
      roomNumber: roomNum,
      price: calculatedPrice
    });
  };

  const handleRateTypeChange = (rateType) => {
    const selectedRoom = rooms.find(r => r.id === formData.roomNumber);
    let calculatedPrice = 0;

    if (rateType === 'Short Time') {
      calculatedPrice = 250000;
    } else if (selectedRoom) {
      calculatedPrice = rateType === 'Package' ? selectedRoom.pricePackage : selectedRoom.priceOnly;
    }

    setFormData({
      ...formData,
      rateType,
      price: calculatedPrice
    });
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const selectedRoom = rooms.find(r => r.id === formData.roomNumber);

    const newRes = {
      id: Date.now(),
      folioNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      ...formData,
      roomType: selectedRoom ? selectedRoom.type : 'Standard',
      status: 'Checked-In'
    };

    setReservations([newRes, ...reservations]);
    setRooms(rooms.map(r => r.id === formData.roomNumber ? { ...r, status: 'Occupied', guest: formData.guestName } : r));
    setActiveTab('roomRack');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-emerald-50 border-emerald-300 text-emerald-900';
      case 'Occupied': return 'bg-sky-50 border-sky-300 text-sky-900';
      case 'Dirty': return 'bg-amber-50 border-amber-300 text-amber-900';
      case 'Maintenance': return 'bg-rose-50 border-rose-300 text-rose-900';
      default: return 'bg-slate-50 border-slate-300 text-slate-800';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">Tersedia</span>;
      case 'Occupied': return <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-xs font-bold">Terisi</span>;
      case 'Dirty': return <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">Kotor</span>;
      case 'Maintenance': return <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs font-bold">Perbaikan</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 pb-12">
      {/* NAVBAR */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-sky-400" />
          <h1 className="font-bold text-lg tracking-wide">HOTEL CORNER PALACE</h1>
        </div>
        
        {/* NAV TABS */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button 
            onClick={() => setActiveTab('roomRack')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${activeTab === 'roomRack' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Room Rack
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${activeTab === 'dashboard' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <ClipboardList className="w-3.5 h-3.5" /> Data Reservasi
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('newBooking')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" /> Check-In Baru
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">

        {/* STATISTIK RINGKAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Kamar</p>
              <h3 className="text-2xl font-bold text-slate-800">{rooms.length}</h3>
            </div>
            <BedDouble className="w-7 h-7 text-sky-500" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Terisi (Occupied)</p>
              <h3 className="text-2xl font-bold text-sky-600">{rooms.filter(r => r.status === 'Occupied').length}</h3>
            </div>
            <UserCheck className="w-7 h-7 text-sky-500" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Kamar Kosong</p>
              <h3 className="text-2xl font-bold text-emerald-600">{rooms.filter(r => r.status === 'Available').length}</h3>
            </div>
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Perlu Dibersihkan</p>
              <h3 className="text-2xl font-bold text-amber-600">{rooms.filter(r => r.status === 'Dirty').length}</h3>
            </div>
            <Sparkles className="w-7 h-7 text-amber-500" />
          </div>
        </div>

        {/* MODUL 1: ROOM RACK DENGAN PENGELOMPOKAN LANTAI */}
        {activeTab === 'roomRack' && (
          <div className="space-y-6">
            {[1, 2, 3].map((floorNum) => (
              <div key={floorNum} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <h3 className="font-bold text-slate-800 text-md border-b pb-2 flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md">Lantai {floorNum}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {rooms.filter(r => r.floor === floorNum).map((room) => (
                    <div 
                      key={room.id} 
                      className={`p-4 rounded-xl border-2 transition shadow-sm hover:shadow-md flex flex-col justify-between h-36 ${getStatusColor(room.status)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block truncate max-w-[90px]">{room.type}</span>
                          <h4 className="text-2xl font-black">{room.id}</h4>
                        </div>
                        {getStatusBadge(room.status)}
                      </div>

                      <div className="text-xs font-semibold">
                        {room.status === 'Occupied' ? (
                          <span className="truncate block">👤 {room.guest}</span>
                        ) : (
                          <div className="text-[11px] space-y-0.5">
                            <p>Only: Rp {room.priceOnly.toLocaleString('id-ID')}</p>
                            <p className="text-slate-500">Pkt: Rp {room.pricePackage.toLocaleString('id-ID')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODUL 2: DATA RESERVASI */}
        {activeTab === 'dashboard' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 text-lg mb-4">Daftar Reservasi & Tamu</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="p-3">No. Folio</th>
                    <th className="p-3">Nama Tamu</th>
                    <th className="p-3">Sumber</th>
                    <th className="p-3">Kamar</th>
                    <th className="p-3">Tipe Harga</th>
                    <th className="p-3">Total Tariff</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-medium text-slate-700">{res.folioNumber}</td>
                      <td className="p-3 font-medium">{res.guestName}</td>
                      <td className="p-3"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{res.source}</span></td>
                      <td className="p-3">{res.roomNumber} ({res.roomType})</td>
                      <td className="p-3 font-medium">{res.rateType}</td>
                      <td className="p-3 font-bold text-sky-700">Rp {res.price?.toLocaleString('id-ID')}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md text-xs font-semibold">
                          {res.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            setCurrentReservation(res);
                            setShowInvoiceModal(true);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto"
                        >
                          <Receipt className="w-3.5 h-3.5" /> Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODUL 3: FORM CHECK-IN */}
        {activeTab === 'newBooking' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl mx-auto">
            <h2 className="font-bold text-slate-800 text-lg mb-4 border-b pb-2">Form Check-In Tamu Baru</h2>
            
            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap Tamu</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masukkan nama tamu"
                  className="w-full p-2.5 border rounded-lg text-sm border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                  value={formData.guestName}
                  onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Jenis Identitas</label>
                  <select 
                    className="w-full p-2.5 border rounded-lg text-sm border-slate-300 bg-white"
                    value={formData.idType}
                    onChange={(e) => setFormData({...formData, idType: e.target.value})}
                  >
                    <option value="KTP">KTP</option>
                    <option value="SIM">SIM</option>
                    <option value="Paspor">Paspor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">No. Identitas</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nomor KTP/SIM"
                    className="w-full p-2.5 border rounded-lg text-sm border-slate-300 outline-none"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Pilih Kamar</label>
                  <select 
                    className="w-full p-2.5 border rounded-lg text-sm border-slate-300 bg-white"
                    value={formData.roomNumber}
                    onChange={(e) => handleRoomChange(e.target.value)}
                  >
                    {rooms.filter(r => r.status === 'Available').map(r => (
                      <option key={r.id} value={r.id}>
                        {r.id} - {r.type} (Lt. {r.floor})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Sumber Pesanan</label>
                  <select 
                    className="w-full p-2.5 border rounded-lg text-sm border-slate-300 bg-white"
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                  >
                    <option value="Walk-In">Walk-In</option>
                    <option value="Tiket.com">Tiket.com</option>
                    <option value="Traveloka">Traveloka</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tipe Harga</label>
                  <select 
                    className="w-full p-2.5 border rounded-lg text-sm border-slate-300 bg-white"
                    value={formData.rateType}
                    onChange={(e) => handleRateTypeChange(e.target.value)}
                  >
                    <option value="Room Only">Room Only</option>
                    <option value="Package">Package</option>
                    <option value="Short Time">Short Time (Rp 250.000)</option>
                  </select>
                </div>
                <div>
    
