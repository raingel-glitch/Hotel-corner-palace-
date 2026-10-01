import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Building2, 
  UserCheck, 
  Users, 
  Calendar, 
  LogOut, 
  Search, 
  Plus, 
  Printer, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  CreditCard,
  BedDouble,
  Receipt
} from 'lucide-react';

// Inisialisasi Supabase (Ganti URL dan ANON_KEY sesuai dengan project Supabase milikmu jika ada)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  // Sample data awal untuk tampilan
  const [reservations, setReservations] = useState([
    {
      id: 1,
      folioNumber: 'INV-2026001',
      guestName: 'Budi Santoso',
      idType: 'KTP',
      idNumber: '3171012345670001',
      source: 'Agoda',
      roomNumber: '101',
      roomType: 'Deluxe Room',
      checkInTime: '2026-10-02 14:00',
      checkOut: '2026-10-03 12:00',
      status: 'Checked-In'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* HEADER / NAVBAR */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-sky-400" />
          <h1 className="font-bold text-lg tracking-wide">HOTEL CORNER PALACE</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-slate-300">
            Resepsionis Admin
          </span>
        </div>
      </header>

      {/* CONTAINER UTAMA */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* DASHBOARD STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Kamar Terisi</p>
              <h3 className="text-2xl font-bold text-slate-800">12 / 20</h3>
            </div>
            <BedDouble className="w-8 h-8 text-sky-500" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Check-In Hari Ini</p>
              <h3 className="text-2xl font-bold text-slate-800">5</h3>
            </div>
            <UserCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Check-Out Hari Ini</p>
              <h3 className="text-2xl font-bold text-slate-800">3</h3>
            </div>
            <LogOut className="w-8 h-8 text-rose-500" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Pendapatan Hari Ini</p>
              <h3 className="text-2xl font-bold text-slate-800">Rp 2.400.000</h3>
            </div>
            <CreditCard className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        {/* TABEL RESERVASI */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-800 text-lg">Daftar Reservasi & Tamu</h2>
            <button className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
              <Plus className="w-4 h-4" /> Tambah Reservasi
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="p-3">No. Folio</th>
                  <th className="p-3">Nama Tamu</th>
                  <th className="p-3">Kamar</th>
                  <th className="p-3">Check-In</th>
                  <th className="p-3">Check-Out</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-medium text-slate-700">{res.folioNumber}</td>
                    <td className="p-3 font-medium">{res.guestName}</td>
                    <td className="p-3">{res.roomNumber} ({res.roomType})</td>
                    <td className="p-3 text-emerald-700 font-medium">{res.checkInTime}</td>
                    <td className="p-3 text-rose-700 font-medium">{res.checkOut}</td>
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
                        <Receipt className="w-3.5 h-3.5" /> Cetak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL PRINT INVOICE */}
      {showInvoiceModal && currentReservation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-end gap-2 border-b pb-3">
              <button
                onClick={() => window.print()}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                <Printer className="w-4 h-4" /> Cetak Invoice
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="bg-slate-300 hover:bg-slate-400 font-bold px-3 py-1 rounded text-sm text-slate-700"
              >
                Tutup
              </button>
            </div>

            <div className="border p-4 rounded bg-slate-50 space-y-3 font-sans">
              <div className="border-b-2 border-slate-800 pb-2 flex justify-between items-start">
                <div>
                  <h2 className="font-black text-sm text-slate-900">HOTEL CORNER PALACE</h2>
                  <p className="text-[10px] text-slate-500">Guest Invoice / Bukti Pembayaran</p>
                </div>
                <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                  #{currentReservation.folioNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <p><strong>Tamu:</strong> {currentReservation.guestName}</p>
                  <p><strong>ID ({currentReservation.idType}):</strong> {currentReservation.idNumber}</p>
                  <p><strong>Sumber:</strong> {currentReservation.source}</p>
                </div>
                <div>
                  <p><strong>Kamar:</strong> {currentReservation.roomNumber} ({currentReservation.roomType})</p>
                  <p className="text-emerald-700 font-bold">In: {currentReservation.checkInTime}</p>
                  <p className="text-rose-700 font-bold">Out: {currentReservation.checkOut}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
