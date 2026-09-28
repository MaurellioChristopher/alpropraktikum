"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { SI50_CLASSES, SIClass } from "@/lib/si-classes";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Edit3,
  Play,
  Clock,
  Users,
  Check,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Info,
  CheckCircle2,
  GraduationCap,
  ChevronDown,
  Camera,
  Upload,
  CheckSquare,
  BarChart3,
  ArrowLeftRight,
  UserCheck,
  AlertTriangle,
  Download,
  Shield,
  FileSpreadsheet,
  AlertCircle,
  Plus,
  Menu,
  Home,
  BookOpen,
} from "lucide-react";

export default function AssistantDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClassCode, setSelectedClassCode] = useState<string>("SI5001");
  const [currentRole, setCurrentRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN">("ASPRAK");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [perizinanApproved, setPerizinanApproved] = useState(false);
  const [activeAsprakTask, setActiveAsprakTask] = useState(false);

  // Absensi sub-tab: 'praktikan' | 'asprak'
  const [absensiSubTab, setAbsensiSubTab] = useState<"praktikan" | "asprak">("praktikan");

  // State Absensi Praktikan per class
  const [attendance, setAttendance] = useState<Record<string, "Hadir" | "Terlambat" | "Izin" | "Sakit" | "Alpa">>({
    "1202260001": "Hadir",
    "1202260002": "Hadir",
    "1202260003": "Terlambat",
    "1202260004": "Hadir",
    "1202260005": "Izin",
  });

  // State Penilaian Praktikan
  const [grades, setGrades] = useState([
    { nim: "1202260001", name: "Ahmad Faisal", tp: "85", guided: "90", mandiri: "88", kuis: "80" },
    { nim: "1202260002", name: "Budi Santoso", tp: "90", guided: "85", mandiri: "92", kuis: "75" },
    { nim: "1202260003", name: "Citra Kirana", tp: "78", guided: "82", mandiri: "79", kuis: "85" },
    { nim: "1202260004", name: "Dina Amelia", tp: "95", guided: "95", mandiri: "90", kuis: "92" },
    { nim: "1202260005", name: "Eko Pratama", tp: "82", guided: "88", mandiri: "85", kuis: "88" },
  ]);
  const [gradeLocked, setGradeLocked] = useState(false);

  // State Dokumentasi Ruangan
  const [roomChecklist, setRoomChecklist] = useState({
    cleanliness: true,
    pc_shutdown: true,
    ac_off: false,
    projector_off: true,
    mouse_keyboard_tidy: true,
  });
  const [roomNote, setRoomNote] = useState("PC 14 mouse wireless baterai lemah, sudah diganti cadangan.");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
  ]);

  // State Pertukaran Jadwal
  const [swaps, setSwaps] = useState([
    { id: 1, req: "GWAN", reqRole: "TUTOR", target: "LEVI", targetRole: "VALIDATOR", shiftOut: "Modul 4 / SI5001", shiftIn: "Modul 4 / SI5004", status: "PENDING" },
    { id: 2, req: "IZIN", reqRole: "KOMDIS", target: "AL-05", targetRole: "KOMDIS", shiftOut: "Modul 4 / SI5007", shiftIn: "Modul 4 / SI50INT", status: "APPROVED" },
  ]);
  const [targetAsisten, setTargetAsisten] = useState("");
  const [shiftSource, setShiftSource] = useState("Modul 4 / SI5001");
  const [shiftTarget, setShiftTarget] = useState("Modul 4 / SI5002");

  const selectedClass = SI50_CLASSES.find((c) => c.code === selectedClassCode) || SI50_CLASSES[0];

  const handleAttendanceChange = (nim: string, status: "Hadir" | "Terlambat" | "Izin" | "Sakit" | "Alpa") => {
    setAttendance((prev) => ({ ...prev, [nim]: status }));
  };

  const handleGradeChange = (idx: number, field: "tp" | "guided" | "mandiri" | "kuis", val: string) => {
    if (gradeLocked) return;
    const num = Number(val);
    if (val !== "" && (isNaN(num) || num > 100)) return;
    setGrades((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const calcFinalScore = (row: typeof grades[0]) => {
    const tp = parseFloat(row.tp) || 0;
    const g = parseFloat(row.guided) || 0;
    const m = parseFloat(row.mandiri) || 0;
    const k = parseFloat(row.kuis) || 0;
    return ((tp * 0.15) + (g * 0.35) + (m * 0.35) + (k * 0.15)).toFixed(2);
  };

  const handleAddSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAsisten) return;
    setSwaps([
      {
        id: Date.now(),
        req: "GWAN",
        reqRole: "TUTOR",
        target: targetAsisten.toUpperCase(),
        targetRole: "VALIDATOR",
        shiftOut: shiftSource,
        shiftIn: shiftTarget,
        status: "PENDING",
      },
      ...swaps,
    ]);
    setTargetAsisten("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-20 sm:pb-8">
      {/* LEFT SIDEBAR with role-based feature gating & responsive drawer */}
      <DashboardSidebar
        role={currentRole}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 w-full min-w-0 space-y-5">
        
        {/* MOBILE & TABLET TOP ACTION BAR (< lg) */}
        <div className="lg:hidden bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase shrink-0">Menu:</span>
              <span className="text-xs font-bold text-[#250B47] bg-[#EDE7F6] px-2.5 py-1 rounded-lg truncate">
                {activeTab === "dashboard" ? "🏠 Dashboard Operasional" :
                 activeTab === "modul" ? "📖 Modul & Silabus" :
                 activeTab === "absensi" ? "📋 Presensi & Kehadiran" :
                 activeTab === "penilaian" ? "📊 Penilaian Praktikan" :
                 activeTab === "jadwal" ? "🔄 Pertukaran Jadwal" :
                 activeTab === "dokumentasi" ? "📷 Dokumentasi Ruangan" :
                 activeTab === "komdis" ? "🛡️ Wewenang Komdis" :
                 activeTab === "inventaris" ? "📦 Inventaris Sekben" : "👤 Profil Akun"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-mono shadow-xs hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            >
              <Menu size={15} />
              <span>Semua Menu</span>
            </button>
          </div>

          {/* Quick horizontal tap switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {[
              { id: "dashboard", label: "Dashboard", icon: Home },
              { id: "absensi", label: "Presensi", icon: CheckSquare },
              { id: "penilaian", label: "Nilai", icon: BarChart3 },
              { id: "jadwal", label: "Swap Jadwal", icon: ArrowLeftRight },
              { id: "modul", label: "Silabus", icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#250B47] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* 1. DASHBOARD TAB (6-CARD BENTO GRID MATCHING REFERENCE + SI'50 SELECTOR) */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            {/* TOP CLASS SELECTION BAR */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#250B47] flex items-center justify-center font-bold">
                  <GraduationCap size={22} className="text-[#9E1B32]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-bold text-slate-900 leading-tight">
                      S1 Sistem Informasi — Angkatan 2026 (SI&apos;50)
                    </h1>
                    <span className="text-[10px] font-mono bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200/60">
                      15 Kelas
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    EDM Laboratory • Telkom University • Praktikum Algoritma & Pemrograman
                  </p>
                </div>
              </div>

              {/* Class Dropdown */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Jadwal Shift:</span>
                  <div className="text-xs font-mono font-semibold text-slate-800">
                    {selectedClass.defaultShift}
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={selectedClassCode}
                    onChange={(e) => setSelectedClassCode(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-3.5 pr-8 py-2 text-xs font-mono font-bold text-[#250B47] focus:outline-none focus:ring-2 focus:ring-rose-500/30 cursor-pointer appearance-none shadow-xs"
                  >
                    {SI50_CLASSES.map((cls) => (
                      <option key={cls.code} value={cls.code}>
                        {cls.code} ({cls.name}) {cls.type === "Internasional" ? "★ INT" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quick 15 Class Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase shrink-0 mr-1">
                Pilih Kelas:
              </span>
              {SI50_CLASSES.map((cls) => (
                <button
                  key={cls.code}
                  type="button"
                  onClick={() => setSelectedClassCode(cls.code)}
                  className={`shrink-0 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedClassCode === cls.code
                      ? "bg-[#250B47] text-white shadow-xs"
                      : cls.type === "Internasional"
                      ? "bg-purple-100 text-purple-900 border border-purple-300/80 hover:bg-purple-200"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {cls.code}
                  {cls.type === "Internasional" && <span className="text-amber-500 ml-1">★</span>}
                </button>
              ))}
            </div>

            {/* OPERATIONAL INFORMATION CENTER */}
            
            {/* 1. LIVE SHIFT STATUS HERO CARD */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                    SHIFT SEDANG BERJALAN
                  </span>
                  <span className="text-xs font-mono text-purple-900 bg-purple-50 px-2.5 py-1 rounded-full font-bold border border-purple-200/80">
                    Modul 4: Sorting & Binary Search Tree
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Ruang Lab EDM Lt. 3
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    Shift Aktif: Kelas {selectedClass.code} ({selectedClass.name})
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Jadwal: {selectedClass.defaultShift} WIB • Total Terdaftar: {selectedClass.totalStudents} Mahasiswa SI&apos;50
                  </p>
                </div>

                {/* Team on duty */}
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                  <span className="text-slate-400">Tim Asisten Jaga:</span>
                  <span className="text-slate-700 font-semibold">Lead PIC: <strong className="text-slate-900">IZIN</strong></span>
                  <span className="text-slate-700 font-semibold">Tutor: <strong className="text-slate-900">GWAN</strong></span>
                  <span className="text-slate-700 font-semibold">Validator: <strong className="text-slate-900">LEVI</strong></span>
                  <span className="text-slate-700 font-semibold">Logistik: <strong className="text-slate-900">AL-04</strong></span>
                </div>
              </div>

              {/* Quick Action Buttons for active shift */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("absensi")}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#9E1B32] to-[#250B47] text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckSquare size={15} />
                  <span>Presensi Kelas Ini</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("penilaian")}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BarChart3 size={15} />
                  <span>Input Nilai Praktikan</span>
                </button>
              </div>
            </div>

            {/* 2. 4 OPERATIONAL KPI SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Total Praktikan SI&apos;50
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900">615 Mahasiswa</div>
                <div className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                  <span>● 15 Kelas Terdaftar (100%)</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Presensi Rata-Rata
                </span>
                <div className="text-2xl font-bold font-mono text-purple-900">97.2% Hadir</div>
                <div className="text-[11px] font-mono text-slate-500">
                  598 Tepat Waktu • 17 Terlambat
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Antrean Penilaian
                </span>
                <div className="text-2xl font-bold font-mono text-[#9E1B32]">42 Pending</div>
                <div className="text-[11px] font-mono text-slate-500">
                  Modul 4 • Auto-Save Aktif
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Kesiapan Hardware Lab
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900">43 / 45 PC</div>
                <div className="text-[11px] font-mono text-emerald-600 font-semibold">
                  ● 2 Unit PC Maintenance
                </div>
              </div>
            </div>

            {/* 3. PAPAN PENGUMUMAN & INSTRUKSI OPERASIONAL LAB */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-[#9E1B32]" />
                  <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">
                    Papan Informasi & Pengumuman Operasional Lab EDM
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full font-semibold">
                  Update Harian
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-rose-200/80 bg-rose-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded uppercase">
                      Komdis Lab • Penting
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Hari ini</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Penegakan Tata Tertib Pakaian & Toleransi Keterlambatan
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Praktikan wajib mengenakan kemeja berkerah rapi dan bersepatu tertutup. Keterlambatan maksimal 10 menit, lewat dari batas wajib melapor ke meja Komdis.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-purple-200/80 bg-purple-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase">
                      Akademik • Pengumpulan Nilai
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Kemarin</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Deadline Input Nilai Modul 4 (Sorting & BST)
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Seluruh asisten validator diwajibkan menyelesaikan entri nilai TP, Jurnal Guided, dan Jurnal Mandiri maksimal H+2 setelah shift berakhir untuk sinkronisasi ke iGracias.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-indigo-200/80 bg-indigo-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded uppercase">
                      Sekben • Logistik Ruangan
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">2 hari lalu</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Checklist Kebersihan Meja & Penataan Mouse/Keyboard
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Asisten shift penutup wajib mengunggah foto dokumentasi ruangan dan memastikan seluruh stopkontak PC telah dimatikan sebelum mengunci lab.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                      Infrastruktur • Server GCC
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">3 hari lalu</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Server Compiler Lokal EDM-GCC-01 Online
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Server autocheck kode praktikan telah dioptimasi dengan latensi 4ms. Compiler GCC 14.2 mendukung eksekusi algoritma rekursif hingga kedalaman 100.000 stack frame.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. JADWAL SHIFT PRAKTIKUM 15 KELAS SI'50 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">
                    Jadwal Shift Praktikum Mingguan (15 Kelas SI&apos;50)
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Modul 4: Sorting & Binary Search Tree • Semester Ganjil 2026
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Telkom University • Fakultas Rekayasa Industri
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto scrollbar-thin">
                <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                  <thead className="bg-[#140827] text-white text-[10px] font-mono uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Kelas</th>
                      <th className="px-5 py-3">Tipe</th>
                      <th className="px-5 py-3">Jadwal Shift</th>
                      <th className="px-5 py-3">Praktikan</th>
                      <th className="px-5 py-3">Asisten Jaga (PIC)</th>
                      <th className="px-5 py-3 text-center">Status Sesi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SI50_CLASSES.slice(0, 7).map((cls, idx) => (
                      <tr key={cls.code} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-mono font-bold text-slate-900">{cls.code}</td>
                        <td className="px-5 py-3">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            cls.type === 'Internasional' ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {cls.type}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-mono text-slate-600">{cls.defaultShift}</td>
                        <td className="px-5 py-3 font-mono text-slate-600">{cls.totalStudents} Mhs</td>
                        <td className="px-5 py-3 font-mono font-semibold text-slate-800">
                          {idx === 0 ? "IZIN (Lead) & GWAN" : idx === 1 ? "GWAN & LEVI" : "LEVI & AL-04"}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                            idx === 0 
                              ? "bg-rose-100 text-rose-800 border border-rose-200 animate-pulse" 
                              : idx === 1 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {idx === 0 ? "● Sedang Berjalan" : idx === 1 ? "Siap Berikutnya" : "Terjadwal"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. ABSENSI TAB (DUAL: ABSENSI PRAKTIKAN & ABSENSI ASPRAK) */}
        {activeTab === "absensi" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Manajemen Presensi & Absensi</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                    SI&apos;50
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Pencatatan kehadiran mahasiswa dan presensi asisten yang bertugas pada shift.
                </p>
              </div>

              {/* Sub-tab switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setAbsensiSubTab("praktikan")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    absensiSubTab === "praktikan" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Absensi Praktikan
                </button>
                <button
                  type="button"
                  onClick={() => setAbsensiSubTab("asprak")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    absensiSubTab === "asprak" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Absensi Asprak & Komdis
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: ABSENSI PRAKTIKAN */}
            {absensiSubTab === "praktikan" && (
              <div className="space-y-5">
                {/* Class selector bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-700">Pilih Kelas:</span>
                    <select
                      value={selectedClassCode}
                      onChange={(e) => setSelectedClassCode(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-[#250B47]"
                    >
                      {SI50_CLASSES.map((cls) => (
                        <option key={cls.code} value={cls.code}>
                          {cls.code} ({cls.defaultShift})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-emerald-700 font-semibold">● Hadir: 38</span>
                    <span className="text-amber-700 font-semibold">● Terlambat (Komdis): 2</span>
                    <span className="text-rose-700 font-semibold">● Alpa: 0</span>
                  </div>
                </div>

                {/* Table Presensi Praktikan */}
                <div className="border border-slate-200 rounded-xl overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                    <thead className="bg-[#140827] text-white text-[10px] font-mono uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5">NIM</th>
                        <th className="px-5 py-3.5">Nama Mahasiswa</th>
                        <th className="px-5 py-3.5">Kelas</th>
                        <th className="px-5 py-3.5">Status Kehadiran</th>
                        <th className="px-5 py-3.5 text-center">Catatan Komdis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { nim: "1202260001", name: "Ahmad Faisal Pratama" },
                        { nim: "1202260002", name: "Budi Santoso Wibowo" },
                        { nim: "1202260003", name: "Citra Kirana Dewi" },
                        { nim: "1202260004", name: "Dina Amelia Zahra" },
                        { nim: "1202260005", name: "Eko Prasetyo Ramadhan" },
                      ].map((std) => {
                        const status = attendance[std.nim] || "Hadir";
                        return (
                          <tr key={std.nim} className="hover:bg-slate-50">
                            <td className="px-5 py-3 font-mono font-semibold text-slate-700">{std.nim}</td>
                            <td className="px-5 py-3 font-medium text-slate-900">{std.name}</td>
                            <td className="px-5 py-3 font-mono text-purple-800 font-bold">{selectedClass.code}</td>
                            <td className="px-5 py-3">
                              <div className="flex gap-1.5">
                                {(["Hadir", "Terlambat", "Izin", "Sakit", "Alpa"] as const).map((st) => (
                                  <button
                                    key={st}
                                    type="button"
                                    onClick={() => handleAttendanceChange(std.nim, st)}
                                    className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                      status === st
                                        ? st === "Hadir"
                                          ? "bg-emerald-600 text-white"
                                          : st === "Terlambat"
                                          ? "bg-amber-600 text-white"
                                          : st === "Izin" || st === "Sakit"
                                          ? "bg-blue-600 text-white"
                                          : "bg-rose-600 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  >
                                    {st}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-center">
                              {status === "Terlambat" ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  <AlertTriangle size={11} /> Flag Komdis (+10m)
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-mono">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: ABSENSI ASPRAK */}
            {absensiSubTab === "asprak" && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-[#9E1B32]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Shift Asisten: {selectedClass.code} ({selectedClass.defaultShift})</h4>
                      <p className="text-[11px] text-slate-500 font-mono">Diverifikasi oleh Komisi Disiplin (Komdis) & Koordinator Lab</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Sesi Berjalan
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { role: "LEAD PIC", code: "IZIN", name: "Muhammad Izin", time: "07:15 WIB", status: "Tepat Waktu", roleType: "KOMDIS" },
                    { role: "TUTOR (PENGANJAR)", code: "GWAN", name: "Andi Prasetyo", time: "07:20 WIB", status: "Tepat Waktu", roleType: "ASPRAK" },
                    { role: "VALIDATOR NILAI", code: "LEVI", name: "Levina Sekar", time: "07:24 WIB", status: "Tepat Waktu", roleType: "SEKBEN" },
                    { role: "LOGISTIK & LAB PC", code: "AL-04", name: "Alif Pratama", time: "07:28 WIB", status: "Tepat Waktu", roleType: "ASPRAK" },
                  ].map((asp) => (
                    <div key={asp.code} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm">
                          {asp.code}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{asp.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                              {asp.roleType}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">{asp.role} • Masuk: {asp.time}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-bold border border-emerald-200">
                        ✓ {asp.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. PENILAIAN PRAKTIKAN TAB */}
        {activeTab === "penilaian" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Penilaian Praktikan</h2>
                  <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                    Modul 4: Sorting O(n log n)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Komponen Nilai: Tugas Pendahuluan (15%), Jurnal Guided (35%), Mandiri (35%), Kuis (15%).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGradeLocked(!gradeLocked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase transition-colors cursor-pointer ${
                    gradeLocked ? "bg-rose-100 text-rose-800 border border-rose-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Lock size={14} />
                  {gradeLocked ? "Nilai Terkunci" : "Kunci Nilai"}
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9E1B32] to-[#250B47] text-white rounded-xl text-xs font-bold font-mono uppercase shadow-sm hover:opacity-95 cursor-pointer"
                >
                  <Download size={14} />
                  Export .xlsx
                </button>
              </div>
            </div>

            {/* Class switcher */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-700">Filter Kelas SI&apos;50:</span>
              <select
                value={selectedClassCode}
                onChange={(e) => setSelectedClassCode(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-xs font-mono font-bold text-[#250B47]"
              >
                {SI50_CLASSES.map((cls) => (
                  <option key={cls.code} value={cls.code}>{cls.code} ({cls.name})</option>
                ))}
              </select>
            </div>

            {/* Spreadsheet Table */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs whitespace-nowrap min-w-[700px]">
                <thead className="bg-[#140827] text-white text-[10px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">NIM</th>
                    <th className="px-5 py-3.5">Nama Mahasiswa</th>
                    <th className="px-3 py-3.5 text-right w-24">TP (15%)</th>
                    <th className="px-3 py-3.5 text-right w-24">Guided (35%)</th>
                    <th className="px-3 py-3.5 text-right w-24">Mandiri (35%)</th>
                    <th className="px-3 py-3.5 text-right w-24">Kuis (15%)</th>
                    <th className="px-5 py-3.5 text-right text-rose-300">Nilai Akhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((row, idx) => (
                    <tr key={row.nim} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-mono font-semibold text-slate-700">{row.nim}</td>
                      <td className="px-5 py-3 font-medium text-slate-900">{row.name}</td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.tp}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "tp", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-right font-mono text-xs text-slate-900"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.guided}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "guided", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-right font-mono text-xs text-slate-900"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.mandiri}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "mandiri", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-right font-mono text-xs text-slate-900"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.kuis}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "kuis", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-right font-mono text-xs text-slate-900"
                        />
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-sm font-bold text-[#9E1B32]">
                        {calcFinalScore(row)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. DOKUMENTASI RUANGAN TAB */}
        {activeTab === "dokumentasi" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Dokumentasi Ruangan Lab</h2>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Ruang EDM Lt. 3
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Pencatatan kondisi fisik workstation PC, peripheral, kebersihan, dan inventaris sebelum/sesudah shift.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-slate-700">Lab Ready: 45 Workstations</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checklist Fisik Ruangan */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Checklist Kebersihan & Peralatan Shift:
                </h3>

                <div className="space-y-2.5">
                  {[
                    { key: "cleanliness", label: "Kebersihan meja & lantai laboratorium bebas sampah" },
                    { key: "pc_shutdown", label: "Seluruh PC praktikan (1 s.d. 45) mati setelah praktikum" },
                    { key: "mouse_keyboard_tidy", label: "Keyboard, mouse & headset tertata rapi di tiap meja" },
                    { key: "projector_off", label: "Proyektor utama & papan tulis telah dibersihkan" },
                    { key: "ac_off", label: "AC dan lampu ruangan dimatikan (jika shift terakhir)" },
                  ].map((item) => {
                    const isChecked = roomChecklist[item.key as keyof typeof roomChecklist];
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setRoomChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof roomChecklist] }))
                        }
                        className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isChecked ? "bg-emerald-50/60 border-emerald-300 text-slate-900" : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        <span className="text-xs font-medium">{item.label}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isChecked ? "bg-emerald-600 text-white" : "border border-slate-300"}`}>
                          {isChecked && <Check size={14} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Catatan Logistik */}
                <div className="pt-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                    Catatan Asisten / Logistik Sekben:
                  </label>
                  <textarea
                    rows={3}
                    value={roomNote}
                    onChange={(e) => setRoomNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>

              {/* Upload & Bukti Foto Ruangan */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Foto Bukti Kondisi Ruangan:
                  </h3>
                  <label className="text-xs font-bold text-[#9E1B32] hover:underline flex items-center gap-1 cursor-pointer">
                    <Camera size={14} />
                    <span>Unggah Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setUploadedPhotos((prev) => [url, ...prev]);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {uploadedPhotos.map((url, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video shadow-xs">
                      <img src={url} alt={`Dokumentasi ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[10px] font-mono">
                        Shift {selectedClass.code} • Foto {i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-[#250B47] flex items-center gap-1.5">
                    <Info size={14} /> Wajib untuk Lead PIC & Sekben:
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Setiap akhir sesi shift praktikum, asisten wajib mengunggah minimal 1 foto sudut pandang penuh ruang laboratorium untuk keperluan audit inventaris.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PERTUKARAN JADWAL TAB (SHIFT SWAP) */}
        {activeTab === "jadwal" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Pertukaran Jadwal (Shift Swap Engine)</h2>
                  <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                    SI&apos;50
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Pengajuan pertukaran jadwal jaga antar-asisten untuk 15 kelas S1 Sistem Informasi.
                </p>
              </div>
            </div>

            {/* Swap Form */}
            <form onSubmit={handleAddSwap} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Kode Asisten Target (Swap With)
                </label>
                <input
                  type="text"
                  value={targetAsisten}
                  onChange={(e) => setTargetAsisten(e.target.value)}
                  placeholder="Contoh: LEVI / IZIN"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Shift Asal
                </label>
                <select
                  value={shiftSource}
                  onChange={(e) => setShiftSource(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                >
                  {SI50_CLASSES.map((cls) => (
                    <option key={`src-${cls.code}`} value={`Modul 4 / ${cls.code}`}>
                      Modul 4 / {cls.code} ({cls.defaultShift})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Shift Tujuan
                </label>
                <select
                  value={shiftTarget}
                  onChange={(e) => setShiftTarget(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                >
                  {SI50_CLASSES.map((cls) => (
                    <option key={`tgt-${cls.code}`} value={`Modul 4 / ${cls.code}`}>
                      Modul 4 / {cls.code} {cls.type === "Internasional" ? "★ INT" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-[#9E1B32] to-[#250B47] text-white font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-xl font-bold transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0 hover:opacity-95"
              >
                <ArrowLeftRight size={16} />
                Ajukan Swap
              </button>
            </form>

            {/* List Permohonan */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest font-bold border-b border-slate-100 pb-2">
                Permohonan Pertukaran Aktif
              </h3>

              <div className="divide-y divide-slate-100">
                {swaps.map((s) => (
                  <div key={s.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="font-mono text-base font-bold text-slate-900">{s.req}</span>
                        <span className="text-[9px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">
                          {s.reqRole}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <span className="text-slate-800 font-medium">{s.shiftOut}</span>
                        <ArrowLeftRight size={14} className="text-[#9E1B32]" />
                        <span className="text-slate-800 font-medium">{s.shiftIn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold ${
                        s.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {s.status}
                      </span>
                      <span className="text-xs font-mono text-slate-600">Target: {s.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODUL & SILABUS TAB */}
        {activeTab === "modul" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Katalog Modul & Silabus Praktikum</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                    Alpro 2026
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Materi praktikum, slide instruktur, dan bank soal untuk 15 kelas S1 Sistem Informasi (SI&apos;50).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Total: 8 Modul Lengkap
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { no: "01", title: "Pointer & Memory Layout", diff: "Dasar", desc: "Alokasi memori dinamis, malloc/free, dan dereferencing.", status: "Selesai" },
                { no: "02", title: "Singly & Doubly Linked List", diff: "Menengah", desc: "Operasi traversal, insert first/last, dan delete node.", status: "Selesai" },
                { no: "03", title: "Stack & Queue: Buffer Simulation", diff: "Menengah", desc: "Konsep LIFO dan FIFO pada buffer print dan antrean pesan.", status: "Selesai" },
                { no: "04", title: "Binary Search Tree (BST) & AVL", diff: "Lanjutan", desc: "Pohon biner terurut dan self-balancing tree rotasi AVL.", status: "Aktif (Minggu Ini)" },
                { no: "05", title: "Graph: Adjacency Matrix & BFS/DFS", diff: "Lanjutan", desc: "Representasi graf berarah, algoritma pencarian jalur.", status: "Akan Datang" },
                { no: "06", title: "Divide & Conquer: QuickSort & MergeSort", diff: "Lanjutan", desc: "Sorting rekursif efisiensi tinggi O(n log n).", status: "Akan Datang" },
                { no: "07", title: "Hash Table & Collision Resolution", diff: "Lanjutan", desc: "Fungsi hash, chaining, dan open addressing probing.", status: "Akan Datang" },
                { no: "08", title: "Final Project: Big Data Analytics Engine", diff: "Mastery", desc: "Proyek akhir terintegrasi manajemen basis data laboratorium.", status: "Akan Datang" },
              ].map((m) => (
                <div key={m.no} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        Modul {m.no}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        m.status === 'Aktif (Minggu Ini)' ? 'bg-purple-100 text-purple-900 border border-purple-200' : m.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Tingkat: <strong className="text-slate-700">{m.diff}</strong></span>
                    <button type="button" className="text-[#9E1B32] hover:underline font-bold text-[11px] cursor-pointer">
                      Unduh Slide & Bank Soal →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMULASI ALGORITMA TAB */}
        {activeTab === "simulasi" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Simulasi & Benchmark Algoritma</h2>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Alat visualisasi komparatif waktu eksekusi dan efisiensi algoritma untuk praktikan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">QuickSort</span>
                <div className="text-2xl font-extrabold text-[#9E1B32] font-mono mt-1">O(n log n)</div>
                <p className="text-xs text-slate-500 mt-2">Divide & conquer dengan in-place partitioning, rata-rata tercepat.</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">MergeSort</span>
                <div className="text-2xl font-extrabold text-[#250B47] font-mono mt-1">O(n log n)</div>
                <p className="text-xs text-slate-500 mt-2">Algoritma stabil dengan jaminan performa kasus terburuk O(n log n).</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">AVL Tree Balance</span>
                <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">O(log n)</div>
                <p className="text-xs text-slate-500 mt-2">Pohon biner dengan auto-rotation untuk mencegah kemunduran linked-list.</p>
              </div>
            </div>
          </div>
        )}

        {/* PELANGGARAN & SANKSI KOMDIS TAB */}
        {activeTab === "komdis" && (
          currentRole !== "KOMDIS" ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm text-center max-w-lg mx-auto space-y-4 my-12">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#9E1B32] flex items-center justify-center mx-auto">
                <Shield size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Akses Dibatasi — Khusus Komisi Disiplin (Komdis)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fitur pencatatan pelanggaran, tata tertib, dan sanksi praktikan hanya dapat diakses oleh asisten berwenang Komdis. Anda saat ini aktif sebagai <strong>{currentRole}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setCurrentRole("KOMDIS")}
                className="px-4 py-2 bg-[#9E1B32] text-white text-xs font-mono font-bold rounded-xl shadow-xs hover:bg-[#85162a] cursor-pointer"
              >
                Simulasi Beralih ke Role Komdis
              </button>
            </div>
          ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Pelanggaran & Pengawasan Komdis</h2>
                  <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                    Komisi Disiplin Lab
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Pencatatan sanksi keterlambatan, ketidakhadiran, pelanggaran pakaian lab, dan kecurangan kode praktikan.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" className="px-4 py-2 bg-[#9E1B32] text-white rounded-xl text-xs font-bold font-mono shadow-xs hover:bg-[#85162a]">
                  + Catat Pelanggaran
                </button>
              </div>
            </div>

            {/* Stat Cards Komdis */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Keterlambatan</span>
                <div className="text-2xl font-bold text-amber-700 font-mono mt-1">5 Kasus</div>
                <span className="text-[10px] text-slate-400">Toleransi maks 10 menit</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Pelanggaran Atribut</span>
                <div className="text-2xl font-bold text-purple-900 font-mono mt-1">2 Kasus</div>
                <span className="text-[10px] text-slate-400">Sepatu & kartu praktikan</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Plagiarisme Kode</span>
                <div className="text-2xl font-bold text-rose-700 font-mono mt-1">0 Kasus</div>
                <span className="text-[10px] text-emerald-600 font-semibold">● Bersih (Similarity &lt; 20%)</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Surat Peringatan (SP)</span>
                <div className="text-2xl font-bold text-slate-900 font-mono mt-1">1 Diterbitkan</div>
                <span className="text-[10px] text-rose-600 font-semibold">Tindak Lanjut Komdis</span>
              </div>
            </div>

            {/* Tabel Pelanggaran */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                <thead className="bg-[#140827] text-white text-[10px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">NIM</th>
                    <th className="px-5 py-3.5">Nama Praktikan</th>
                    <th className="px-5 py-3.5">Kelas</th>
                    <th className="px-5 py-3.5">Jenis Pelanggaran</th>
                    <th className="px-5 py-3.5">Sanksi Dikenakan</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { nim: "1202260018", name: "Rian Hidayat", cls: "SI5002", type: "Terlambat 18 menit", sanksi: "Pengurangan Nilai Kuis (-10 poin)", status: "Aktif" },
                    { nim: "1202260409", name: "Siti Rahmawati", cls: "SI5004", type: "Tidak Membawa Kartu Praktikan", sanksi: "Teguran Lisan Komdis", status: "Selesai" },
                    { nim: "1202260822", name: "Dimas Aditya", cls: "SI5008", type: "Membawa Minuman ke Meja PC", sanksi: "SP-1 & Piket Lab", status: "Aktif" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-mono font-semibold text-slate-700">{row.nim}</td>
                      <td className="px-5 py-3 font-medium text-slate-900">{row.name}</td>
                      <td className="px-5 py-3 font-mono text-purple-700 font-bold">{row.cls}</td>
                      <td className="px-5 py-3 text-rose-700 font-medium">{row.type}</td>
                      <td className="px-5 py-3 text-slate-600">{row.sanksi}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                          row.status === 'Aktif' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )
        )}

        {/* INVENTARIS & KAS LAB TAB (SEKBEN) */}
        {activeTab === "inventaris" && (
          currentRole !== "SEKBEN" ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm text-center max-w-lg mx-auto space-y-4 my-12">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                <Package size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Akses Dibatasi — Khusus Sekben (Role Inti)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fitur inventaris alat dan pembukuan kas laboratorium EDM hanya dapat diakses oleh Sekretaris & Bendahara (Sekben). Anda saat ini aktif sebagai <strong>{currentRole}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setCurrentRole("SEKBEN")}
                className="px-4 py-2 bg-indigo-700 text-white text-xs font-mono font-bold rounded-xl shadow-xs hover:bg-indigo-800 cursor-pointer"
              >
                Simulasi Beralih ke Role Sekben
              </button>
            </div>
          ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Inventaris Ruangan & Kas Laboratorium</h2>
                  <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                    Sekretaris & Bendahara (Sekben)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Pencatatan kas operasional, logistik inventaris PC 1-45, spidol, dan alat penunjang praktikum EDM.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  Saldo Kas Lab: <strong className="text-emerald-700 font-extrabold">Rp 3.450.000</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inventaris Alat */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Status Logistik Workstations & Peripheral:
                </h3>
                <div className="space-y-2">
                  {[
                    { item: "PC Desktop Intel i7 / 16GB", qty: "45 Unit", condition: "43 Normal / 2 Perbaikan", status: "ok" },
                    { item: "Monitor LED 24 inch 75Hz", qty: "45 Unit", condition: "Semua Normal", status: "ok" },
                    { item: "Keyboard Mechanical & Mouse", qty: "45 Pasang", condition: "1 Mouse Ganti Baterai", status: "warn" },
                    { item: "Kabel LAN Gigabit & Switch", qty: "48 Port", condition: "Koneksi Normal (1 Gbps)", status: "ok" },
                    { item: "Spidol & Whiteboard Eraser", qty: "6 Set", condition: "Siap Pakai", status: "ok" },
                  ].map((inv, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{inv.item}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{inv.condition}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                        {inv.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buku Kas Operasional */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Mutasi Kas Operasional Terakhir (Sekben):
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[480px]">
                    <thead className="bg-[#140827] text-white text-[10px] font-mono uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Tanggal</th>
                        <th className="px-4 py-3">Keterangan</th>
                        <th className="px-4 py-3 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { date: "26 Sep 2026", desc: "Iuran Modul & Kas Praktikan SI'50", amount: "+ Rp 2.500.000", type: "in" },
                        { date: "24 Sep 2026", desc: "Beli Baterai Mouse & Spidol Whiteboard", amount: "- Rp 150.000", type: "out" },
                        { date: "20 Sep 2026", desc: "Pembersih Monitor & Thermal Paste", amount: "- Rp 200.000", type: "out" },
                        { date: "15 Sep 2026", desc: "Saldo Awal Kas EDM Laboratory 2026", amount: "+ Rp 1.300.000", type: "in" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-mono text-slate-500 text-[11px]">{row.date}</td>
                          <td className="px-4 py-2.5 text-slate-800 font-medium">{row.desc}</td>
                          <td className={`px-4 py-2.5 text-right font-mono font-bold text-xs ${
                            row.type === 'in' ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {row.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          )
        )}

        {/* 6. AKUN ASISTEN TAB */}
        {activeTab === "akun" && (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Profil & Manajemen Akun</h2>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Informasi kredensial, role wewenang, dan riwayat tugas laboratorium.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#9E1B32] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Role: {currentRole}
                </span>
              </div>
            </div>

            {/* Profile Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Identitas Asisten</div>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-slate-900">Andi Prasetyo (GWAN)</div>
                  <div className="text-xs font-mono text-slate-500">NIM: 1202230045</div>
                  <div className="text-xs font-mono text-purple-800 font-semibold">S1 Sistem Informasi • SI&apos;50</div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Role & Wewenang</div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#250B47]">{currentRole}</div>
                  <div className="text-xs text-slate-600">
                    {currentRole === "KOMDIS"
                      ? "Komisi Disiplin: Berwenang memberi flag sanksi keterlambatan praktikan & validasi shift asprak."
                      : currentRole === "SEKBEN"
                      ? "Sekretaris/Bendahara (Inti): Pengelolaan administrasi perizinan, surat izin, dan logistik kas ruangan."
                      : "Asisten Praktikum (Asprak): Pengampu materi shift, bimbingan modul, dan input nilai praktikan."}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Simulasi Role Akun</div>
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-500 leading-tight">Ganti role aktif untuk simulasi fitur:</p>
                  <div className="flex gap-1.5">
                    {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setCurrentRole(r)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          currentRole === r
                            ? "bg-[#250B47] text-white shadow-xs"
                            : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Phones: sm:hidden) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "dashboard" ? "text-[#9E1B32] font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("absensi")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "absensi" ? "text-[#9E1B32] font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <CheckSquare size={18} />
          <span>Presensi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("penilaian")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "penilaian" ? "text-[#9E1B32] font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <BarChart3 size={18} />
          <span>Nilai</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("jadwal")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "jadwal" ? "text-[#9E1B32] font-bold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeftRight size={18} />
          <span>Swap</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
      </nav>
    </div>
  );
}
