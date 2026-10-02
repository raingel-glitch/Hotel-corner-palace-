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
  X,
  AlertTriangle,
  RefreshCw,
  CheckSquare,
  Square,
  ShieldAlert,
  Clock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('roomRack'); // roomRack, dashboard, newBooking
  const [subTab, setSubTab] = useState('Room View'); // Room View, Reservation View, HK Room Status, HK Report, Dirty to Clean, Reminder
  
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  // Filter Checkbox HK
  const [hkFilter, setHkFilter] = useState({
    dirty: true,
    ready: true,
    notReady: true
  });

  // Checkbox seleksi kamar masal untuk Dirty to Clean
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Data Kamar Lengkap
  const [rooms, setRooms] = useState([
    // LANTAI 1
    { id: '102', floor: 1, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '103', floor: 1, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '104', floor: 1, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000, pricePackage: 400000 },

    // LANTAI 2
    { id: '207', floor: 2, type: 'DRIVER', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 175000, pricePackage: 175000 },
    { id: '209', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '210', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '214', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '218', floor: 2, type: 'EKONOMIS ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 225000, pricePackage: 225000 },
    { id: '221', floor: 2, type: 'BUSSINES ROOM', status: 'OC', hkStatus: 'Not Ready', guest: 'FAUJI', priceOnly: 425000, pricePackage: 500000 },
    { id: '225', floor: 2, type: 'EKONOMIS ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 225000, pricePackage: 225000 },
    { id: '226', floor: 2, type: 'SUPERRIOR ROOM', status: 'OC', hkStatus: 'Ready', guest: 'IYAH', priceOnly: 325000, pricePackage: 400000 },
    { id: '227', floor: 2, type: 'SUPERRIOR ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 325000, pricePackage: 400000 },
    { id: '228', floor: 2, type: 'SUPERRIOR ROOM', status: 'OC', hkStatus: 'Ready', guest: 'MILAN', priceOnly: 325000, pricePackage: 400000 },
    { id: '229', floor: 2, type: 'BUSSINES ROOM', status: 'OC', hkStatus: 'Not Ready', guest: 'Rian', priceOnly: 425000, pricePackage: 500000 },
    { id: '230', floor: 2, type: 'BUSSINES ROOM', status: 'OC', hkStatus: 'Not Ready', guest: 'Andi', priceOnly: 425000, pricePackage: 500000 },
    { id: '231', floor: 2, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '232', floor: 2, type: 'BUSSINES ROOM', status: 'OC', hkStatus: 'Not Ready', guest: 'Budi', priceOnly: 425000, pricePackage: 500000 },

    // LANTAI 3
    { id: '311', floor: 3, type: 'KING MARVELS', status: 'OC', hkStatus: 'Not Ready', guest: 'Siska', priceOnly: 625000, pricePackage: 700000 },
    { id: '316', floor: 3, type: 'GRAND DELUXE', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '317', floor: 3, type: 'GRAND DELUXE', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '319', floor: 3, type: 'GRAND DELUXE', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '320', floor: 3, type: 'GRAND DELUXE', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '321', floor: 3, type: 'GRAND DELUXE', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 525000, pricePackage: 600000 },
    { id: '322', floor: 3, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Dirty', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '323', floor: 3, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Dirty', guest: '-', priceOnly: 425000, pricePackage: 500000 },
    { id: '325', floor: 3, type: 'BUSSINES ROOM', status: 'VC', hkStatus: 'Ready', guest: '-', priceOnly: 425000, pricePackage: 500000 },
  ]);

  // Data Reservasi
  const [reservations, setReservations] = useState([
    {
      id: 1,
      folioNumber: 'FN-1026-00753',
      guestName: 'FAUJI',
      idType: 'KTP',
      idNumber: '9201012610050003',
      source: 'WALK IN',
      roomNumber: '325',
      roomType: 'BUSSINES ROOM',
      rateType: 'Room Only',
      price: 425000,
      paid: 325000,
      balance: -100000,
      checkInTime: '2026-10-01 23:50',
      checkOut: '2026-10-02 12:00',
      status: 'Occupied'
    },
    {
      id: 2,
      folioNumber: 'FN-1026-00749',
      guestName: 'IYAH',
      idType: 'KTP',
      idNumber: '3201012345670001',
      source: 'TIKET.COM',
      roomNumber: '228',
      roomType: 'SUPERRIOR ROOM',
      rateType: 'Room Package',
      price: 400000,
      paid: 400000,
      balance: 0,
      checkInTime: '2026-10-01 14:00',
      checkOut: '2026-10-02 12:00',
      status: 'Occupied'
    },
    {
      id: 3,
      folioNumber: 'FN-1026-00747',
      guestName: 'MILAN',
      idType: 'SIM',
      idNumber: '9876543210001',
      source: 'WALK IN',
      roomNumber: '228',
      roomType: 'SUPERRIOR ROOM',
      rateType: 'Room Only',
      price: 325000,
      paid: 325000,
      balance: 0,
      checkInTime: '2026-09-30 15:00',
      checkOut: '2026-10-02 12:00',
      status: 'Occupied'
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    guestName: '',
    idType: 'KTP',
    idNumber: '',
    source: 'WALK IN',
    roomNumber: '102',
    rateType: 'Room Only',
    price: 425000,
    checkInTime: '2026-10-02 14:00',
    checkOut: '2026-10-03 12:00'
  });

  // Ubah status kamar HK secara manual
  const handleHkStatusChange = (roomId, newHkStatus) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          hkStatus: newHkStatus
        };
      }
      return room;
    }));
  };

  // Toggle Pilihan Kamar Masal
  const toggleSelectRoom = (roomId) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  // Check All / Uncheck All
  const handleCheckAll = () => {
    if (selectedRooms.length === rooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(rooms.map(r => r.id));
    }
  };

  // Set All Selected to Clean (Ready)
  const handleSetToClean = () => {
    setRooms(rooms.map(r => {
      if (selectedRooms.includes(r.id)) {
        return { ...r, hkStatus: 'Ready', status: r.status === 'OO' ? 'VC' : r.status };
      }
      return r;
    }));
    setSelectedRooms([]);
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const selectedRoom = rooms.find(r => r.id === formData.roomNumber);

    const newRes = {
      id: Date.now(),
      folioNumber: `FN-1026-00${Math.floor(700 + Math.random() * 90)}`,
      ...formData,
      roomType: selectedRoom ? selectedRoom.type : 'STANDARD',
      paid: formData.price,
      balance: 0,
      status: 'Occupied'
    };

    setReservations([newRes, ...reservations]);
    setRooms(rooms.map(r => r.id === formData.roomNumber ? { ...r, status: 'OC', guest: formData.guestName, hkStatus: 'Ready' } : r));
    setActiveTab('roomRack');
  };

  const getStatusColor = (status, hkStatus) => {
    if (status === 'OC') return 'bg-purple-600 text-white'; // Occupied Purple/Red
    if (status === 'OO') return 'bg-slate-700 text-white'; // Out of Order
    if (hkStatus === 'Dirty') return 'bg-amber-100 border-amber-400 text-amber-900';
    if (hkStatus === 'Ready' || status === 'VC') return 'bg-emerald-500 text-white'; // Vacant Clean
    return 'bg-sky-500 text-white';
  };

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-800 text-xs pb-12">
      {/* TOP HEADER */}
      <header className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-slate-900 font-extrabold px-2 py-0.5 rounded text-[11px] uppercase">Front Office</span>
          <h1 className="font-bold text-sm tracking-wide text-slate-100">HOTEL CORNER PALACE</h1>
        </div>

        {/* TOP NAV MENU */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
          <button onClick={() => setActiveTab('newBooking')} className="hover:text-amber-400 transition flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Registrasi
          </button>
          <button onClick={() => setActiveTab('roomRack')} className="hover:text-amber-400 transition">Reservation System</button>
          <button onClick={() => setActiveTab('dashboard')} className="hover:text-amber-400 transition">Tamu / Kasir</button>
          <span className="hover:text-amber-400 cursor-pointer">Outlet Posting</span>
          <span className="hover:text-amber-400 cursor-pointer">Log Book</span>
          <span className="hover:text-amber-400 cursor-pointer">Info</span>
          <span className="hover:text-amber-400 cursor-pointer">Store Room</span>
          <span className="hover:text-amber-400 cursor-pointer">Laporan</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Hello, <strong className="text-white">Farhan</strong></span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 space-y-4">

        {/* SUB TABS BAR (FO & HK) */}
        <div className="bg-slate-800 text-white rounded-t-lg p-1 flex items-center gap-1 overflow-x-auto shadow-sm">
          {['Room View', 'Reservation View', 'HK Room Status', 'HK Report', 'Dirty to Clean', 'Reminder'].map((tab) => (
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
            Pembayaran Tamu (Kasir)
          </button>
        </div>

        {/* LEGEND & FILTERS BAR */}
        {activeTab === 'roomRack' && (
          <div className="bg-white p-3 rounded-b-lg shadow-sm border border-slate-300 space-y-3">
            {/* ROOM STATUS LEGEND */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] border-b pb-2 border-slate-200">
              <span className="font-bold text-slate-700">Room Status:</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-600 inline-block rounded-sm"></span> OC (Occupied)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 inline-block rounded-sm"></span> VC (Vacant Clean)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-300 inline-block rounded-sm border"></span> EAG (Expected Arrival)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-600 inline-block rounded-sm"></span> ED (Expected Departure)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-600 inline-block rounded-sm"></span> OO (Out of Order)</span>
            </div>

            {/* HK FILTER CHECKBOXES */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-[11px]">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-700">HK Room Status:</span>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input 
                    type="checkbox" 
                    checked={hkFilter.dirty} 
                    onChange={(e) => setHkFilter({...hkFilter, dirty: e.target.checked})}
                    className="rounded text-sky-600" 
                  /> 🧹 Dirty
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input 
                    type="checkbox" 
                    checked={hkFilter.ready} 
                    onChange={(e) => setHkFilter({...hkFilter, ready: e.target.checked})}
                    className="rounded text-sky-600" 
                  /> ✅ Ready
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input 
                    type="checkbox" 
                    checked={hkFilter.notReady} 
                    onChange={(e) => setHkFilter({...hkFilter, notReady: e.target.checked})}
                    className="rounded text-sky-600" 
                  /> ❌ Not Ready
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCheckAll}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded font-bold transition flex items-center gap-1"
                >
                  <CheckSquare className="w-3.5 h-3.5" /> Check All
                </button>
                <button 
                  onClick={handleSetToClean}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded font-bold transition flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Set to Clean
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODUL 1: ROOM VIEW & HOUSEKEEPING RACK */}
        {activeTab === 'roomRack' && (
          <div className="space-y-4">
            {['KING MARVELS', 'GRAND DELUXE', 'BUSSINES ROOM', 'SUPERRIOR ROOM', 'EKONOMIS ROOM', 'DRIVER'].map((roomCategory) => {
              const categoryRooms = rooms.filter(r => r.type === roomCategory);
              if (categoryRooms.length === 0) return null;

              const vacantCount = categoryRooms.filter(r => r.status === 'VC').length;
              const occupiedCount = categoryRooms.filter(r => r.status === 'OC').length;

              return (
                <div key={roomCategory} className="bg-white rounded-lg shadow-sm border border-slate-300 p-4 space-y-3">
                  <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="font-extrabold text-slate-800 text-xs tracking-wider">{roomCategory}</h3>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      Vacant ({vacantCount}) | Occupied ({occupiedCount}) | Booked (0)
                    </span>
                  </div>

                  {/* ROOM CARDS GRID */}
                  <div className="flex flex-wrap gap-3">
                    {categoryRooms.map((room) => {
                      const isSelected = selectedRooms.includes(room.id);

                      return (
                        <div 
                          key={room.id}
                          className={`relative rounded-lg p-2.5 w-28 border-2 shadow-sm transition flex flex-col justify-between ${getStatusColor(room.status, room.hkStatus)}`}
                        >
                          {/* CHECKBOX MASAL SELEKSI */}
                          <button 
                            onClick={() => toggleSelectRoom(room.id)}
                            className="absolute top-1 left-1 text-white opacity-80 hover:opacity-100"
                          >
                            {isSelected ? <CheckSquare className="w-4 h-4 text-amber-300" /> : <Square className="w-4 h-4" />}
                          </button>

                          <div className="text-right">
                            <h4 className="text-lg font-black">{room.id}</h4>
                          </div>

                          {/* HK STATUS SELECTOR */}
                          <div className="mt-2 pt-1 border-t border-white/30 flex justify-between items-center">
                            <span className="text-[9px] font-bold uppercase truncate max-w-[50px]">{room.guest}</span>
                            
                            <select
                              value={room.hkStatus}
                              onChange={(e) => handleHkStatusChange(room.id, e.target.value)}
                              className="text-[9px] font-bold rounded px-1 py-0.5 border outline-none bg-white text-slate-900 cursor-pointer"
                            >
                              <option value="Ready">Ready</option>
                              <option value="Dirty">Dirty</option>
                              <option value="Not Ready">Not Ready</option>
                            </select>
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

        {/* MODUL 2: KASIR & PEMBAYARAN TAMU */}
        {activeTab === 'dashboard' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-4 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-extrabold text-slate-800 text-sm">Pembayaran Tamu (Guest Billing)</h2>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Cari Folio / Nama Tamu..." 
                  className="p-1.5 border rounded text-xs border-slate-300 outline-none w-56"
                />
                <button className="bg-sky-600 text-white font-bold px-3 py-1.5 rounded text-xs">Search Data</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-2 border">NO</th>
                    <th className="p-2 border">FOLIO NUMBER</th>
                    <th className="p-2 border">GUEST NAME</th>
                    <th className="p-2 border">ROOM NUMBER</th>
                    <th className="p-2 border">ROOM PLAN</th>
                    <th className="p-2 border">ARRIVAL DATE</th>
                    <th className="p-2 border">DEPARTURE DATE</th>
                    <th className="p-2 border">BILL INFO</th>
                    <th className="p-2 border">MARKET SEGMENT</th>
                    <th className="p-2 border">STATUS</th>
                    <th className="p-2 border">BALANCE</th>
                    <th className="p-2 border text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {reservations.map((res, index) => (
                    <tr key={res.id} className="hover:bg-slate-50 font-medium">
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border font-mono font-bold text-sky-700">{res.folioNumber}</td>
                      <td className="p-2 border font-bold">{res.guestName}</td>
                      <td className="p-2 border">{res.roomNumber} ({res.roomType})</td>
                      <td className="p-2 border">{res.rateType}</td>
                      <td className="p-2 border">{res.checkInTime.split(' ')[0]}</td>
                      <td className="p-2 border">{res.checkOut.split(' ')[0]}</td>
                      <td className="p-2 border"><span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Paid</span></td>
                      <td className="p-2 border"><span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-bold">{res.source}</span></td>
                      <td className="p-2 border"><span className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">{res.status}</span></td>
                      <td className={`p-2 border font-bold ${res.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        Rp {res.balance.toLocaleString('id-ID')}
                      </td>
                      <td className="p-2 border text-center">
                        <button
                          onClick={() => {
                            setCurrentReservation(res);
                            setShowInvoiceModal(true);
                          }}
                          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-2 py-1 rounded text-[10px] shadow"
                        >
                          Action ▾
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODUL 3: REGISTRASI TAMU BARU */}
        {activeTab === 'newBooking' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-300 p-5 max-w-2xl mx-auto space-y-4">
            <h2 className="font-extrabold text-slate-800 text-sm border-b pb-2">Form Registrasi Check-In Tamu</h2>

            <form onSubmit={handleCreateBooking} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap Tamu</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masukkan nama tamu"
                  className="w-full p-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-sky-500"
                  value={formData.guestName}
                  onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Jenis Identitas</label>
                  <select 
                    className="w-full p-2 border rounded border-slate-300 bg-white"
                    value={formData.idType}
                    onChange={(e) => setFormData({...formData, idType: e.target.value})}
                  >
                    <option value="KTP">KTP</option>
                    <option value="SIM">SIM</option>
                    <option value="Paspor">Paspor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">No. Identitas</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nomor KTP/SIM"
                    className="w-full p-2 border rounded border-slate-300 outline-none"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Pilih Kamar (VC)</label>
                  <select 
                    className="w-full p-2 border rounded border-slate-300 bg-white"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                  >
                    {rooms.filter(r => r.status === 'VC').map(r => (
                      <option key={r.id} value={r.id}>
                        {r.id} - {r.type} (Lt. {r.floor})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Market Segment</label>
                  <select 
                    className="w-full p-2 border rounded border-slate-300 bg-white"
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                  >
                    <option value="WALK IN">WALK IN</option>
                    <option value="TIKET.COM">TIKET.COM</option>
                    <option value="TRAVELOKA">TRAVELOKA</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t flex gap-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 rounded transition"
                >
                  Proses Check-In
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('roomRack')}
                  className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* MODAL GUEST BILL INVOICE (PERSIS SEPERTI GAMBAR CONTOH HASIL CETAK) */}
      {showInvoiceModal && currentReservation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-slate-800 text-sm">GUEST BILL INFORMATION</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STRUK BUKTI PEMBAYARAN */}
            <div className="border border-slate-300 p-6 bg-white space-y-4 text-[11px] font-sans">
              <div className="text-center border-b pb-3 space-y-1">
                <h2 className="font-black text-lg text-slate-900">Hotel Corner Palace</h2>
                <p className="text-slate-600">Jl. Stadion, Kp. Pisang, Kec. Ternate Tengah, Kota Ternate, Maluku Utara 97712</p>
                <p className="text-slate-600">Telp: 081345626100 | Email: hotelcornerpalace@gmail.com</p>
              </div>

              <h3 className="font-extrabold text-center text-xs tracking-wider border-b pb-1">GUEST BILL INFORMATION</h3>

              {/* METADATA BILL */}
              <div className="grid grid-cols-2 gap-4 border p-3 rounded bg-slate-50">
                <div className="space-y-1">
                  <p><strong>Billed To:</strong> {currentReservation.guestName}</p>
                  <p><strong>Arrival Date:</strong> {currentReservation.checkInTime.split(' ')[0]}</p>
                </div>
                <div className="space-y-1">
                  <p><strong>Folio Number:</strong> {currentReservation.folioNumber}</p>
                  <p><strong>Departure Date:</strong> {currentReservation.checkOut.split(' ')[0]}</p>
                  <p><strong>Checkin By:</strong> Farhan</p>
                </div>
              </div>

              {/* RINCIAN TABEL TRANSAKSI */}
              <table className="w-full text-left border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-200 text-slate-800">
                    <th className="p-2 border">DATE</th>
                    <th className="p-2 border">INFORMATION</th>
                    <th className="p-2 border text-right">DEBIT</th>
                    <th className="p-2 border text-right">CREDIT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">{currentReservation.checkInTime.split(' ')[0]}</td>
                    <td className="p-2 border">
                      Room: {currentReservation.roomNumber} ({currentReservation.roomType}) Rate Rp. {currentReservation.price?.toLocaleString('id-ID')}
                    </td>
                    <td className="p-2 border text-right font-bold">Rp {currentReservation.price?.toLocaleString('id-ID')}</td>
                    <td className="p-2 border text-right">Rp 0</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">{currentReservation.checkInTime.split(' ')[0]}</td>
                    <td className="p-2 border">Cash Payment</td>
                    <td className="p-2 border text-right">Rp 0</td>
                    <td className="p-2 border text-right font-bold text-emerald-700">Rp {currentReservation.paid?.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-slate-100 font-extrabold">
                    <td colSpan="2" className="p-2 border text-right">Total:</td>
                    <td className="p-2 border text-right">Rp {currentReservation.price?.toLocaleString('id-ID')}</td>
                    <td className="p-2 border text-right">Rp {currentReservation.paid?.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-slate-200 font-black">
                    <td colSpan="2" className="p-2 border text-right">Balance:</td>
                    <td colSpan="2" className="p-2 border text-right text-rose-600">
                      (Rp {Math.abs(currentReservation.balance)?.toLocaleString('id-ID')})
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* TANDA TANGAN */}
              <div className="flex justify-between items-end pt-8">
                <div className="text-center w-36">
                  <p className="font-bold border-b pb-8">Guest Name</p>
                  <p className="mt-1 font-bold">{currentReservation.guestName}</p>
                </div>
                <div className="text-center w-36">
                  <p className="font-bold border-b pb-8">Front Office</p>
                  <p className="mt-1 font-bold">Farhan</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> Print Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
