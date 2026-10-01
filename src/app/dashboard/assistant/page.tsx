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
  Package,
  Cpu,
  Activity,
  Layers,
  Search,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Key,
} from "lucide-react";

export default function AssistantDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClassCode, setSelectedClassCode] = useState<string>("SI5001");
  const [currentRole, setCurrentRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN">("ASPRAK");
  const [sessionUser, setSessionUser] = useState<string>("GWAN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [perizinanApproved, setPerizinanApproved] = useState(false);
  const [activeAsprakTask, setActiveAsprakTask] = useState(false);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const rawCookies = document.cookie ? document.cookie.split("; ") : [];
      const parsed: Record<string, string> = {};
      for (const c of rawCookies) {
        const [k, v] = c.split("=");
        if (k && v) parsed[k] = decodeURIComponent(v);
      }
      const user = parsed.mock_session || "GWAN";
      setSessionUser(user);
      if (parsed.mock_role && (parsed.mock_role === "ASPRAK" || parsed.mock_role === "KOMDIS" || parsed.mock_role === "SEKBEN")) {
        setCurrentRole(parsed.mock_role as "ASPRAK" | "KOMDIS" | "SEKBEN");
      } else {
        if (user === "GWAN") setCurrentRole("KOMDIS");
        else if (user === "KEYS" || user === "LEVI") setCurrentRole("SEKBEN");
        else setCurrentRole("ASPRAK");
      }
    }
  }, []);

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
        <div className="lg:hidden bg-white dark:bg-[#0e071a] rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-neutral-400 uppercase shrink-0">Menu:</span>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 border border-purple-200/60 dark:border-purple-800/60 px-2.5 py-1 rounded-lg truncate">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-neutral-800 text-white text-xs font-bold font-mono shadow-xs hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
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
                      ? "bg-[#7C3AED] text-white shadow-xs"
                      : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* 1. DASHBOARD TAB: HIGH-CRAFT OBSERVABILITY & MISSION CONTROL */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            {/* TOP COMMAND BAR: COHORT IDENTITY & UNIFIED CLASS SELECTOR */}
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-4 sm:p-5 border border-purple-100/80 dark:border-purple-950/60 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      S1 Sistem Informasi 2026 (SI&apos;50)
                    </h1>
                    <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/50">
                      15 Kelas Terdaftar
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                    EDM Laboratory • Praktikum Algoritma & Pemrograman
                  </p>
                </div>
              </div>

              {/* Single, Unified Class Selector Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-400 font-semibold shrink-0 mr-1 hidden sm:inline-block">
                  Pilih Kelas:
                </span>
                <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-neutral-900/90 rounded-xl border border-slate-200/70 dark:border-neutral-800">
                  {SI50_CLASSES.map((cls) => {
                    const isSelected = selectedClassCode === cls.code;
                    return (
                      <button
                        key={cls.code}
                        type="button"
                        onClick={() => setSelectedClassCode(cls.code)}
                        className={`shrink-0 text-xs font-mono font-semibold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#7C3AED] text-white shadow-xs"
                            : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-neutral-800/70"
                        }`}
                      >
                        {cls.code}
                        {cls.type === "Internasional" && <span className="text-purple-200 ml-0.5">★</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* LIVE SHIFT COMMAND STRIP */}
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-5 sm:p-6 border border-purple-200/80 dark:border-purple-900/40 shadow-xs relative overflow-hidden transition-colors">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-3">
                  {/* Status Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 px-3 py-1 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
                      </span>
                      SHIFT AKTIF SEKARANG
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/70 dark:border-neutral-700/60 px-2.5 py-1 rounded-full">
                      Modul 4: Sorting & Binary Search Tree
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                      Ruang Lab EDM Lt. 3
                    </span>
                  </div>

                  {/* Heading & Details */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Shift Aktif: Kelas {selectedClass.code} ({selectedClass.name})
                    </h2>
                    <p className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-1">
                      Jadwal: <strong className="text-slate-800 dark:text-neutral-200">{selectedClass.defaultShift} WIB</strong> • Terdaftar: <strong className="text-slate-800 dark:text-neutral-200">{selectedClass.totalStudents} Mahasiswa SI&apos;50</strong>
                    </p>
                  </div>

                  {/* Squad on Duty */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                    <span className="text-slate-400 dark:text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
                      Tim Asisten Jaga:
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-900/40 text-purple-900 dark:text-purple-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                      <span className="text-[9px] font-bold uppercase text-purple-600 dark:text-purple-400">Lead PIC</span>
                      <strong>IZIN (Korprak)</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/60 dark:border-neutral-700/60 text-slate-800 dark:text-neutral-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                      <span className="text-[9px] font-bold uppercase text-purple-600 dark:text-purple-400">Koor Komdis</span>
                      <strong>GWAN</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/60 dark:border-neutral-700/60 text-slate-800 dark:text-neutral-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                      <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-neutral-400">Sekre</span>
                      <strong>KEYS</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/60 dark:border-neutral-700/60 text-slate-800 dark:text-neutral-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                      <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-neutral-400">Validator</span>
                      <strong>LEVI</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/60 dark:border-neutral-700/60 text-slate-800 dark:text-neutral-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                      <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-neutral-400">Logistik</span>
                      <strong>AL-04</strong>
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-2 lg:pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab("absensi")}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider shadow-sm hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckSquare size={15} />
                    <span>Presensi Shift Ini</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("penilaian")}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 rounded-xl text-xs font-bold font-mono uppercase tracking-wider border border-slate-200 dark:border-neutral-700/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BarChart3 size={15} />
                    <span>Input Nilai Praktikan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 TELEMETRY OBSERVABILITY METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1 */}
              <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-5 border border-slate-200/80 dark:border-purple-950/60 shadow-xs flex flex-col justify-between transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-400 dark:text-neutral-400">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      Total Praktikan
                    </span>
                    <Users size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white pt-1">
                    615 <span className="text-xs font-normal text-slate-400">Mhs</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80 mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-purple-700 dark:text-purple-300 font-semibold">15 Kelas Aktif</span>
                    <span className="text-slate-400">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7C3AED] rounded-full w-full" />
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-5 border border-slate-200/80 dark:border-purple-950/60 shadow-xs flex flex-col justify-between transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-400 dark:text-neutral-400">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      Tingkat Kehadiran
                    </span>
                    <CheckCircle2 size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-700 dark:text-purple-400 pt-1">
                    97.2%
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80 mt-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-700 dark:text-neutral-300 font-medium">598 Tepat Waktu</span>
                  <span className="text-slate-400 dark:text-neutral-400">17 Dispensasi</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-5 border border-slate-200/80 dark:border-purple-950/60 shadow-xs flex flex-col justify-between transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-400 dark:text-neutral-400">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      Antrean Validasi
                    </span>
                    <BarChart3 size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white pt-1">
                    42 <span className="text-xs font-normal text-slate-400">Pending</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80 mt-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-purple-700 dark:text-purple-300 font-medium">Modul 4</span>
                  <span className="text-slate-400 dark:text-neutral-400">Batas Sinkron H+2</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-5 border border-slate-200/80 dark:border-purple-950/60 shadow-xs flex flex-col justify-between transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-400 dark:text-neutral-400">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      Workstation Lab EDM
                    </span>
                    <Cpu size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white pt-1">
                    43 <span className="text-base font-normal text-slate-400">/ 45 PC</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80 mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-700 dark:text-neutral-300 font-semibold">95.5% Siap</span>
                    <span className="text-slate-400">2 Maintenance</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7C3AED] rounded-full w-[95.5%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* DIRECTIVES & WEEKLY SCHEDULE MATRIX SPLIT */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              {/* LEFT (xl:col-span-5): OPERATIONAL DIRECTIVES */}
              <div className="xl:col-span-5 bg-white dark:bg-[#0e071a] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                      <Info size={15} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm tracking-wide uppercase">
                      Instruksi & Pengumuman Lab
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full font-semibold border border-purple-200/60 dark:border-purple-800/60">
                    Live Feed
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Directive 1 */}
                  <div className="p-3.5 rounded-xl border border-purple-200/60 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-950/20 space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 rounded uppercase">
                        Komdis Lab • Disiplin
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Hari ini</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      Tata Tertib Pakaian & Toleransi Keterlambatan
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed">
                      Praktikan wajib mengenakan kemeja berkerah rapi dan sepatu tertutup. Toleransi terlambat maksimal 10 menit, setelahnya wajib melapor ke meja Komdis.
                    </p>
                  </div>

                  {/* Directive 2 */}
                  <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/40 space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-slate-700 dark:text-neutral-300 bg-slate-200 dark:bg-neutral-800 px-2 py-0.5 rounded uppercase">
                        Akademik • Nilai
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Kemarin</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      Deadline Entri Nilai Modul 4 (Sorting & BST)
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed">
                      Asisten validator wajib menyelesaikan penilaian TP, Jurnal Guided, dan Mandiri maksimal H+2 setelah shift berakhir untuk sinkronisasi nilai ke sistem.
                    </p>
                  </div>

                  {/* Directive 3 */}
                  <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/40 space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded uppercase">
                        Infrastruktur • GCC-01
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">3 hari lalu</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      Server Autocheck GCC 14.2 Online
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed">
                      Server compiler lokal beroperasi stabil dengan latensi 4ms. Mendukung eksekusi recursive sorting hingga 100.000 stack frame.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT (xl:col-span-7): JADWAL SHIFT PRAKTIKUM */}
              <div className="xl:col-span-7 bg-white dark:bg-[#0e071a] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm tracking-wide uppercase">
                      Jadwal Shift Praktikum Mingguan
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
                      15 Kelas S1 Sistem Informasi • Modul 4
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-400">
                    Telkom University
                  </span>
                </div>

                <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[580px]">
                    <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Kelas</th>
                        <th className="px-4 py-3">Tipe</th>
                        <th className="px-4 py-3">Jadwal Shift</th>
                        <th className="px-4 py-3">Praktikan</th>
                        <th className="px-4 py-3">Asisten (PIC)</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                      {SI50_CLASSES.slice(0, 7).map((cls, idx) => (
                        <tr
                          key={cls.code}
                          onClick={() => setSelectedClassCode(cls.code)}
                          className={`transition-colors cursor-pointer ${
                            selectedClassCode === cls.code
                              ? "bg-purple-50/70 dark:bg-purple-950/30"
                              : "hover:bg-slate-50 dark:hover:bg-neutral-900/60"
                          }`}
                        >
                          <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                            {cls.code}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              cls.type === 'Internasional'
                                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-300'
                                : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                            }`}>
                              {cls.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600 dark:text-neutral-400">
                            {cls.defaultShift}
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600 dark:text-neutral-400">
                            {cls.totalStudents} Mhs
                          </td>
                          <td className="px-4 py-3 font-mono font-semibold text-slate-800 dark:text-neutral-200">
                            {idx === 0 ? "IZIN & GWAN" : idx === 1 ? "GWAN & LEVI" : "LEVI & AL-04"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                              idx === 0
                                ? "bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700"
                                : idx === 1
                                ? "bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200"
                                : "bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-neutral-400"
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
          </div>
        )}

        {/* 2. ABSENSI TAB (DUAL: ABSENSI PRAKTIKAN & ABSENSI ASPRAK) */}
        {activeTab === "absensi" && (
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Presensi & Absensi</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    SI&apos;50
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Pencatatan kehadiran mahasiswa dan presensi asisten yang bertugas pada shift.
                </p>
              </div>

              {/* Sub-tab switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200/60 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setAbsensiSubTab("praktikan")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    absensiSubTab === "praktikan" ? "bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  Absensi Praktikan
                </button>
                <button
                  type="button"
                  onClick={() => setAbsensiSubTab("asprak")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    absensiSubTab === "asprak" ? "bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300">Pilih Kelas:</span>
                    <select
                      value={selectedClassCode}
                      onChange={(e) => setSelectedClassCode(e.target.value)}
                      className="bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 cursor-pointer"
                    >
                      {SI50_CLASSES.map((cls) => (
                        <option key={cls.code} value={cls.code}>
                          {cls.code} ({cls.defaultShift})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Hadir: 38</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">● Terlambat (Komdis): 2</span>
                    <span className="text-rose-600 dark:text-rose-400 font-semibold">● Alpa: 0</span>
                  </div>
                </div>

                {/* Table Presensi Praktikan */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                    <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5">NIM</th>
                        <th className="px-5 py-3.5">Nama Mahasiswa</th>
                        <th className="px-5 py-3.5">Kelas</th>
                        <th className="px-5 py-3.5">Status Kehadiran</th>
                        <th className="px-5 py-3.5 text-center">Catatan Komdis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                      {[
                        { nim: "1202260001", name: "Ahmad Faisal Pratama" },
                        { nim: "1202260002", name: "Budi Santoso Wibowo" },
                        { nim: "1202260003", name: "Citra Kirana Dewi" },
                        { nim: "1202260004", name: "Dina Amelia Zahra" },
                        { nim: "1202260005", name: "Eko Prasetyo Ramadhan" },
                      ].map((std) => {
                        const status = attendance[std.nim] || "Hadir";
                        return (
                          <tr key={std.nim} className="hover:bg-slate-50 dark:hover:bg-neutral-900/60">
                            <td className="px-5 py-3 font-mono font-semibold text-slate-700 dark:text-neutral-300">{std.nim}</td>
                            <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{std.name}</td>
                            <td className="px-5 py-3 font-mono text-purple-700 dark:text-purple-400 font-bold">{selectedClass.code}</td>
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
                                          ? "bg-purple-600 text-white"
                                          : "bg-rose-600 text-white"
                                        : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700"
                                    }`}
                                  >
                                    {st}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-center">
                              {status === "Terlambat" ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
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
                <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-purple-600 dark:text-purple-400" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Shift Asisten: {selectedClass.code} ({selectedClass.defaultShift})</h4>
                      <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">Diverifikasi oleh Komisi Disiplin (Komdis) & Koordinator Lab</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
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
                    <div key={asp.code} className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0e071a] shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-700 dark:bg-purple-900 text-white flex items-center justify-center font-mono font-bold text-sm">
                          {asp.code}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{asp.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 font-bold">
                              {asp.roleType}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">{asp.role} • Masuk: {asp.time}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md font-bold border border-emerald-200 dark:border-emerald-800">
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
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Penilaian Praktikan</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    Modul 4: Sorting O(n log n)
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Komponen Nilai: Tugas Pendahuluan (15%), Jurnal Guided (35%), Mandiri (35%), Kuis (15%).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGradeLocked(!gradeLocked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase transition-colors cursor-pointer ${
                    gradeLocked ? "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200" : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <Lock size={14} />
                  {gradeLocked ? "Nilai Terkunci" : "Kunci Nilai"}
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold font-mono uppercase shadow-sm cursor-pointer transition-all"
                >
                  <Download size={14} />
                  Export .xlsx
                </button>
              </div>
            </div>

            {/* Class switcher */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300">Filter Kelas SI&apos;50:</span>
              <select
                value={selectedClassCode}
                onChange={(e) => setSelectedClassCode(e.target.value)}
                className="bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-1 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 cursor-pointer"
              >
                {SI50_CLASSES.map((cls) => (
                  <option key={cls.code} value={cls.code}>{cls.code} ({cls.name})</option>
                ))}
              </select>
            </div>

            {/* Spreadsheet Table */}
            <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs whitespace-nowrap min-w-[700px]">
                <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">NIM</th>
                    <th className="px-5 py-3.5">Nama Mahasiswa</th>
                    <th className="px-3 py-3.5 text-right w-24">TP (15%)</th>
                    <th className="px-3 py-3.5 text-right w-24">Guided (35%)</th>
                    <th className="px-3 py-3.5 text-right w-24">Mandiri (35%)</th>
                    <th className="px-3 py-3.5 text-right w-24">Kuis (15%)</th>
                    <th className="px-5 py-3.5 text-right text-purple-300">Nilai Akhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                  {grades.map((row, idx) => (
                    <tr key={row.nim} className="hover:bg-slate-50 dark:hover:bg-neutral-900/60">
                      <td className="px-5 py-3 font-mono font-semibold text-slate-700 dark:text-neutral-300">{row.nim}</td>
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.tp}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "tp", e.target.value)}
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.guided}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "guided", e.target.value)}
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.mandiri}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "mandiri", e.target.value)}
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.kuis}
                          disabled={gradeLocked}
                          onChange={(e) => handleGradeChange(idx, "kuis", e.target.value)}
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="px-5 py-3 text-right font-mono font-bold text-sm text-purple-700 dark:text-purple-400">
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
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dokumentasi & Kondisi Ruangan Lab</h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Upload bukti kebersihan, checklist PC, dan kepatuhan fasilitas ruang lab sesudah praktikum.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300">Lab Ready: 45 Workstations</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checklist Fisik Ruangan */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
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
                          isChecked ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white" : "bg-slate-50 dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400"
                        }`}
                      >
                        <span className="text-xs font-medium">{item.label}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isChecked ? "bg-emerald-600 text-white" : "border border-slate-300 dark:border-neutral-700"}`}>
                          {isChecked && <Check size={14} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Catatan Logistik */}
                <div className="pt-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold block mb-1.5">
                    Catatan Asisten / Logistik Sekben:
                  </label>
                  <textarea
                    rows={3}
                    value={roomNote}
                    onChange={(e) => setRoomNote(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>
              </div>

              {/* Upload & Bukti Foto Ruangan */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-neutral-800 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      Foto Bukti Kondisi Ruangan:
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                      Format: JPG, PNG, WebP • Maks. ukuran: <span className="font-bold text-purple-700 dark:text-purple-300">5 MB per foto</span> (Disarankan rasio 16:9)
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold transition-all cursor-pointer shrink-0">
                    <Camera size={14} />
                    <span>Unggah Foto</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert("Ukuran foto melebihi batas maksimal 5 MB. Harap unggah foto dengan ukuran lebih kecil.");
                            return;
                          }
                          const url = URL.createObjectURL(file);
                          setUploadedPhotos((prev) => [url, ...prev]);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {uploadedPhotos.map((url, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 aspect-video shadow-xs">
                      <img src={url} alt={`Dokumentasi ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[10px] font-mono">
                        Shift {selectedClass.code} • Foto {i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-xs text-slate-600 dark:text-neutral-400 space-y-1">
                  <div className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                    <Info size={14} /> Wajib untuk Lead PIC & Sekben:
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Setiap akhir sesi shift praktikum, asisten wajib mengunggah minimal 1 foto sudut pandang penuh ruang laboratorium untuk keperluan audit inventaris. Format yang diterima JPG, PNG, atau WebP dengan batas maksimal 5 MB per foto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PERTUKARAN JADWAL TAB (SHIFT SWAP) */}
        {activeTab === "jadwal" && (
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pertukaran Jadwal (Shift Swap Engine)</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    SI&apos;50
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Pengajuan pertukaran jadwal jaga antar-asisten untuk 15 kelas S1 Sistem Informasi.
                </p>
              </div>
            </div>

            {/* Swap Form */}
            <form onSubmit={handleAddSwap} className="p-5 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                  Kode Asisten Target (Swap With)
                </label>
                <input
                  type="text"
                  value={targetAsisten}
                  onChange={(e) => setTargetAsisten(e.target.value)}
                  placeholder="Contoh: LEVI / IZIN"
                  className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                  Shift Asal
                </label>
                <select
                  value={shiftSource}
                  onChange={(e) => setShiftSource(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 cursor-pointer"
                >
                  {SI50_CLASSES.map((cls) => (
                    <option key={`src-${cls.code}`} value={`Modul 4 / ${cls.code}`}>
                      Modul 4 / {cls.code} ({cls.defaultShift})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                  Shift Tujuan
                </label>
                <select
                  value={shiftTarget}
                  onChange={(e) => setShiftTarget(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 cursor-pointer"
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
                className="w-full md:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
              >
                <ArrowLeftRight size={16} />
                Ajukan Swap
              </button>
            </form>

            {/* List Permohonan */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold border-b border-slate-100 dark:border-neutral-800 pb-2">
                Permohonan Pertukaran Aktif
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                {swaps.map((s) => (
                  <div key={s.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="font-mono text-base font-bold text-slate-900 dark:text-white">{s.req}</span>
                        <span className="text-[9px] font-mono bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-bold">
                          {s.reqRole}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <span className="text-slate-800 dark:text-neutral-200 font-medium">{s.shiftOut}</span>
                        <ArrowLeftRight size={14} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-slate-800 dark:text-neutral-200 font-medium">{s.shiftIn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold ${
                        s.status === "APPROVED" ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                      }`}>
                        {s.status}
                      </span>
                      <span className="text-xs font-mono text-slate-600 dark:text-neutral-400">Target: {s.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODUL & SILABUS TAB */}
        {activeTab === "modul" && (
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Katalog Modul & Silabus Praktikum</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    Alpro 2026
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Materi praktikum, slide instruktur, dan bank soal untuk 15 kelas S1 Sistem Informasi (SI&apos;50).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
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
                <div key={m.no} className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-xs transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200/60 dark:border-purple-800">
                        Modul {m.no}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        m.status === 'Aktif (Minggu Ini)' ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-200' : m.status === 'Selesai' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">Tingkat:</span>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        m.diff === 'Dasar'
                          ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : m.diff === 'Menengah'
                          ? 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : m.diff === 'Lanjutan'
                          ? 'bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                          : 'bg-rose-100/80 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      }`}>
                        {m.diff}
                      </span>
                    </div>
                    <button type="button" className="text-purple-700 dark:text-purple-400 hover:underline font-bold text-[11px] cursor-pointer">
                      Unduh Slide & Bank Soal →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PELANGGARAN & SANKSI KOMDIS TAB */}
        {activeTab === "komdis" && (
          currentRole !== "KOMDIS" ? (
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-8 border border-slate-200/80 dark:border-purple-950/60 shadow-xs text-center max-w-lg mx-auto space-y-4 my-12 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto">
                <Shield size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Akses Dibatasi — Khusus Komisi Disiplin (Komdis)</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                Fitur pencatatan pelanggaran, tata tertib, dan sanksi praktikan hanya dapat diakses oleh asisten berwenang Komdis. Anda saat ini aktif sebagai <strong>{currentRole}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setCurrentRole("KOMDIS")}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-mono font-bold rounded-xl shadow-xs cursor-pointer transition-all"
              >
                Simulasi Beralih ke Role Komdis
              </button>
            </div>
          ) : (
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pelanggaran & Pengawasan Komdis</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    Komisi Disiplin Lab
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Pencatatan sanksi keterlambatan, ketidakhadiran, pelanggaran pakaian lab, dan kecurangan kode praktikan.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold font-mono shadow-xs cursor-pointer transition-all">
                  + Catat Pelanggaran
                </button>
              </div>
            </div>

            {/* Stat Cards Komdis */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Keterlambatan</span>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono mt-1">5 Kasus</div>
                <span className="text-[10px] text-slate-400">Toleransi maks 10 menit</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Pelanggaran Atribut</span>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400 font-mono mt-1">2 Kasus</div>
                <span className="text-[10px] text-slate-400">Sepatu & kartu praktikan</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Plagiarisme Kode</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-1">0 Kasus</div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">● Bersih (Similarity &lt; 20%)</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Surat Peringatan (SP)</span>
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono mt-1">1 Diterbitkan</div>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">Tindak Lanjut Komdis</span>
              </div>
            </div>

            {/* Tabel Pelanggaran */}
            <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">NIM</th>
                    <th className="px-5 py-3.5">Nama Praktikan</th>
                    <th className="px-5 py-3.5">Kelas</th>
                    <th className="px-5 py-3.5">Jenis Pelanggaran</th>
                    <th className="px-5 py-3.5">Sanksi Dikenakan</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                  {[
                    { nim: "1202260018", name: "Rian Hidayat", cls: "SI5002", type: "Terlambat 18 menit", sanksi: "Pengurangan Nilai Kuis (-10 poin)", status: "Aktif" },
                    { nim: "1202260409", name: "Siti Rahmawati", cls: "SI5004", type: "Tidak Membawa Kartu Praktikan", sanksi: "Teguran Lisan Komdis", status: "Selesai" },
                    { nim: "1202260822", name: "Dimas Aditya", cls: "SI5008", type: "Membawa Minuman ke Meja PC", sanksi: "SP-1 & Piket Lab", status: "Aktif" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-neutral-900/60">
                      <td className="px-5 py-3 font-mono font-semibold text-slate-700 dark:text-neutral-300">{row.nim}</td>
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                      <td className="px-5 py-3 font-mono text-purple-700 dark:text-purple-400 font-bold">{row.cls}</td>
                      <td className="px-5 py-3 text-rose-600 dark:text-rose-400 font-medium">{row.type}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-neutral-300">{row.sanksi}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                          row.status === 'Aktif' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
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
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-8 border border-slate-200/80 dark:border-purple-950/60 shadow-xs text-center max-w-lg mx-auto space-y-4 my-12 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto">
                <Package size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Akses Dibatasi — Khusus Sekben (Role Inti)</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                Fitur inventaris alat dan pembukuan kas laboratorium EDM hanya dapat diakses oleh Sekretaris & Bendahara (Sekben). Anda saat ini aktif sebagai <strong>{currentRole}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setCurrentRole("SEKBEN")}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-mono font-bold rounded-xl shadow-xs cursor-pointer transition-all"
              >
                Simulasi Beralih ke Role Sekben
              </button>
            </div>
          ) : (
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inventaris Ruangan & Kas Laboratorium</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    Sekretaris & Bendahara (Sekben)
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Pencatatan kas operasional, logistik inventaris PC 1-45, spidol, dan alat penunjang praktikum EDM.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-700">
                  Saldo Kas Lab: <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">Rp 3.450.000</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inventaris Alat */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
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
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{inv.item}</div>
                        <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">{inv.condition}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-200/60 dark:border-purple-800/60">
                        {inv.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buku Kas Operasional */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  Mutasi Kas Operasional Terakhir (Sekben):
                </h3>
                <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[480px]">
                    <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Tanggal</th>
                        <th className="px-4 py-3">Keterangan</th>
                        <th className="px-4 py-3 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                      {[
                        { date: "26 Sep 2026", desc: "Iuran Modul & Kas Praktikan SI'50", amount: "+ Rp 2.500.000", type: "in" },
                        { date: "24 Sep 2026", desc: "Beli Baterai Mouse & Spidol Whiteboard", amount: "- Rp 150.000", type: "out" },
                        { date: "20 Sep 2026", desc: "Pembersih Monitor & Thermal Paste", amount: "- Rp 200.000", type: "out" },
                        { date: "15 Sep 2026", desc: "Saldo Awal Kas EDM Laboratory 2026", amount: "+ Rp 1.300.000", type: "in" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-neutral-900/60">
                          <td className="px-4 py-2.5 font-mono text-slate-500 dark:text-neutral-400 text-[11px]">{row.date}</td>
                          <td className="px-4 py-2.5 text-slate-800 dark:text-neutral-200 font-medium">{row.desc}</td>
                          <td className={`px-4 py-2.5 text-right font-mono font-bold text-xs ${
                            row.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
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

        {/* 6. AKUN ASISTEN TAB - Full Modern Profile Page */}
        {activeTab === "akun" && (
          <div className="space-y-6">
            {/* Profile Header Card with Cover Banner & Avatar */}
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl border border-slate-200/80 dark:border-purple-950/60 shadow-xs overflow-hidden transition-colors">
              {/* Cover Gradient Banner */}
              <div className="relative h-28 sm:h-36 bg-gradient-to-r from-[#1E0836] via-[#2E1065] to-[#0F0728] overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C084FC_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-purple-600/20 blur-2xl" />
                <div className="absolute top-3 right-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-purple-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                    Lab Terpadu Lt. 3 • EDM Lab
                  </span>
                </div>
              </div>

              {/* Profile Details & Avatar Bar */}
              <div className="px-5 sm:px-8 pb-6 pt-0">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
                  {/* Large Avatar */}
                  <div className="flex items-end gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 p-1 shadow-xl ring-4 ring-white dark:ring-[#0e071a]">
                        <div className="w-full h-full rounded-xl bg-purple-900/90 flex items-center justify-center text-white text-2xl sm:text-3xl font-black font-mono">
                          {sessionUser.slice(0, 2)}
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0e071a] animate-pulse" title="Sesi Aktif Online" />
                    </div>

                    <div className="space-y-0.5 pb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                          {sessionUser === "GWAN"
                            ? "Andi Pratama"
                            : sessionUser === "IZIN"
                            ? "M. Izin Alamsyah"
                            : sessionUser === "KEYS"
                            ? "Keysha Aurelia"
                            : sessionUser === "LEVI"
                            ? "Levina Sekar"
                            : `Asisten ${sessionUser}`}
                        </h2>
                        <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                          {sessionUser}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                        NIM: {sessionUser === "GWAN" ? "1202230001" : sessionUser === "IZIN" ? "1202230002" : sessionUser === "KEYS" ? "1202230003" : "1202230045"} • S1 Sistem Informasi (SI&apos;50)
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200/80 dark:border-purple-800/80">
                          {sessionUser === "GWAN"
                            ? "Koordinator Komisi Disiplin (Koor Komdis)"
                            : sessionUser === "IZIN"
                            ? "Koordinator Praktikum (Korprak)"
                            : sessionUser === "KEYS"
                            ? "Sekretaris Laboratorium (Sekre)"
                            : sessionUser === "LEVI"
                            ? "Bendahara Laboratorium (Sekben)"
                            : "Asisten Praktikum (Asprak)"}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Aktif Mengajar 2026
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => alert("Fitur edit profil tersinkronisasi otomatis dengan Database SSO Telkom University.")}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Edit3 size={14} />
                      <span>Edit Profil</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Permohonan ganti password telah diteruskan ke administrator Lab EDM.")}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Key size={14} />
                      <span>Ganti Password</span>
                    </button>
                  </div>
                </div>

                {/* Quick Performance & Assignment Stats Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-neutral-800 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Kelas Dibina</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">15 Kelas</div>
                    <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">SI5001 - SI50INT</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Jam Praktikum</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">32 Jam</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Tuntas Semester Ini</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Presensi Asprak</div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">100%</div>
                    <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono">14/14 Shift Hadir</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Rating Asisten</div>
                    <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-0.5">4.92 / 5.0</div>
                    <div className="text-[10px] text-amber-500 font-mono">★★★★★ (45 Review)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Data Diri & Akademik */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-5 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-purple-600 dark:text-purple-400" />
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider">
                      Informasi Personal & Akademik
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Terverifikasi Telkom SSO</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Nama Lengkap</div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {sessionUser === "GWAN"
                        ? "Andi Pratama, S.Kom"
                        : sessionUser === "IZIN"
                        ? "M. Izin Alamsyah, S.Kom"
                        : sessionUser === "KEYS"
                        ? "Keysha Aurelia"
                        : sessionUser === "LEVI"
                        ? "Levina Sekar"
                        : `Asisten ${sessionUser}`}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Kode Lab / ID Asisten</div>
                    <div className="font-mono font-bold text-purple-700 dark:text-purple-300">{sessionUser}</div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Nomor Induk Mahasiswa (NIM)</div>
                    <div className="font-mono font-semibold text-slate-900 dark:text-white">
                      {sessionUser === "GWAN" ? "1202230001" : sessionUser === "IZIN" ? "1202230002" : sessionUser === "KEYS" ? "1202230003" : "1202230045"}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Program Studi / Fakultas</div>
                    <div className="font-semibold text-slate-900 dark:text-white">S1 Sistem Informasi • FRI</div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <Mail size={12} />
                      <span>Email SSO Institusi</span>
                    </div>
                    <div className="font-mono text-slate-800 dark:text-slate-200 truncate">
                      {sessionUser.toLowerCase()}@student.telkomuniversity.ac.id
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <Phone size={12} />
                      <span>WhatsApp / Telepon</span>
                    </div>
                    <div className="font-mono text-slate-800 dark:text-slate-200">
                      +62 812-9876-5432
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <MapPin size={12} />
                      <span>Penugasan Laboratorium</span>
                    </div>
                    <div className="text-slate-800 dark:text-slate-200">
                      Enterprise Data Management (EDM) Laboratory, Gedung Laboratorium Terpadu Lt. 3, Telkom University
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Role & Wewenang + Simulasi Role Switcher + Keamanan */}
              <div className="lg:col-span-5 space-y-6">
                {/* Role & Wewenang Card */}
                <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-purple-600 dark:text-purple-400" />
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider">
                        Role & Wewenang
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                      {currentRole}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {currentRole === "KOMDIS"
                      ? "Komisi Disiplin: Berwenang memberi flag sanksi keterlambatan praktikan, verifikasi surat izin, dan validasi kepatuhan shift asprak."
                      : currentRole === "SEKBEN"
                      ? "Sekretaris/Bendahara (Inti): Pengelolaan administrasi perizinan, surat izin, dan logistik kas ruangan praktikum."
                      : "Asisten Praktikum (Asprak): Pengampu materi shift, bimbingan modul, live rating, dan input nilai praktikan."}
                  </p>

                  {/* Simulasi Role Switcher with Clean Pills */}
                  <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 space-y-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Simulasi Ganti Role (Testing Hak Akses):
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setCurrentRole(r)}
                          className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            currentRole === r
                              ? "bg-purple-700 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Keamanan & Sesi Card */}
                <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-3 transition-colors">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <Lock size={18} className="text-purple-600 dark:text-purple-400" />
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider">
                      Keamanan & Sesi
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-neutral-800/60">
                      <span className="text-slate-500 dark:text-neutral-400 font-mono">Format Password Sesi</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        {sessionUser === "GWAN" ? "GWANkomdis123" : `${sessionUser}123`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-neutral-800/60">
                      <span className="text-slate-500 dark:text-neutral-400 font-mono">Status Sesi Jaringan</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Terenkripsi Internal Lab
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 dark:text-neutral-400 font-mono">Terakhir Login</span>
                      <span className="font-mono text-slate-700 dark:text-neutral-300">Hari ini (Aktif)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Phones: sm:hidden) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0e071a]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-purple-950/60 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "dashboard" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("absensi")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "absensi" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <CheckSquare size={18} />
          <span>Presensi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("penilaian")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "penilaian" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <BarChart3 size={18} />
          <span>Nilai</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("jadwal")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "jadwal" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <ArrowLeftRight size={18} />
          <span>Swap</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
      </nav>
    </div>
  );
}
