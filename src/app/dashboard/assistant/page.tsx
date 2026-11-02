"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { DashboardHeader } from "@/components/aureo/dashboard-header";
import { SI50_CLASSES, SIClass } from "@/lib/si-classes";
import { MOODLE_STUDENTS_BY_CLASS, LMS_ALPRO_METADATA } from "@/data/moodle-alpro-students";
import {
  ALPRO_ASSISTANTS,
  ALPRO_DIVISIONS,
  getAssistantByCode,
  getAssistantAccessLevel,
  getExpectedPassword,
  AssistantProfile,
} from "@/data/assistants-roster";
import {
  ALPRO_15_SHIFTS,
  ShiftSchedule,
  getCurrentOngoingShift,
  getAssistantDutyStatus,
  getAssistantShifts,
  ALL_SHIFT_PLOTTINGS,
} from "@/data/alpro-schedule-plotting";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  FileText,
  Edit3,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Clock,
  Users,
  Check,
  X,
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
  KeyRound,
  Filter,
  Flag,
  RotateCw,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import {
  PraktikanCardIllustration,
  DokumentasiCardIllustration,
  JadwalCardIllustration,
  SlideModulCardIllustration,
} from "@/components/aureo/akses-cepat-illustrations";

interface StudentGradeRow {
  nim: string;
  name: string;
  warmingUp: string;
  preTest: string;
  practice: string;
  jurnal: string;
  postTest: string;
}

const getStudentsByClass = (classCode: string): StudentGradeRow[] => {
  const list = MOODLE_STUDENTS_BY_CLASS[classCode] || [];
  return list.map((s) => ({
    nim: s.nim,
    name: s.name,
    warmingUp: s.warmingUp !== null && s.warmingUp !== undefined ? s.warmingUp.toString() : "",
    preTest: s.preTest !== null && s.preTest !== undefined ? s.preTest.toString() : "",
    practice: s.practice !== null && s.practice !== undefined ? s.practice.toString() : "",
    jurnal: s.jurnal !== null && s.jurnal !== undefined ? s.jurnal.toString() : "",
    postTest: s.postTest !== null && s.postTest !== undefined ? s.postTest.toString() : "",
  }));
};


export interface OfficialSwapItem {
  id: string | number;
  requesterName: string;
  requesterCode: string;
  shiftSource: number;
  shiftTarget: number;
  replacementName: string;
  replacementCode: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  note?: string;
  date?: string;
}

export const INITIAL_OFFICIAL_SWAPS: OfficialSwapItem[] = [
  {
    id: 1,
    requesterName: "Mochammad Jafar Arrazi",
    requesterCode: "MJFA",
    shiftSource: 6,
    shiftTarget: 15,
    replacementName: "Mayhesa Rachmadiharja",
    replacementCode: "MAYR",
    status: "APPROVED",
    note: "Pertukaran resmi jadwal praktikum",
    date: "31 Okt 2026",
  },
  {
    id: 2,
    requesterName: "Laula Fatimatusshifa",
    requesterCode: "LAUF",
    shiftSource: 11,
    shiftTarget: 13,
    replacementName: "Dinar Fadlilatunnisa",
    replacementCode: "DINF",
    status: "APPROVED",
    note: "Pertukaran resmi jadwal praktikum",
    date: "31 Okt 2026",
  },
  {
    id: 3,
    requesterName: "I Putu Gede Aris Pramana Nugraha",
    requesterCode: "IPGA",
    shiftSource: 6,
    shiftTarget: 4,
    replacementName: "Arneta Alifiana",
    replacementCode: "ARNA",
    status: "APPROVED",
    note: "Pertukaran resmi jadwal praktikum",
    date: "31 Okt 2026",
  },
  {
    id: 4,
    requesterName: "Syalfa Oktaviana Wijaya",
    requesterCode: "SYOW",
    shiftSource: 5,
    shiftTarget: 12,
    replacementName: "Azrian Muhammadin Hanif",
    replacementCode: "AZMH",
    status: "APPROVED",
    note: "Pertukaran resmi jadwal praktikum",
    date: "31 Okt 2026",
  },
];

export default function AssistantDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tabHistory, setTabHistory] = useState<string[]>(["dashboard"]);
  const [selectedClassCode, setSelectedClassCode] = useState<string>("SI5001");
  const [currentRole, setCurrentRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN" | "ADMIN" | "SUPER_ADMIN">("SUPER_ADMIN");
  const [sessionUser, setSessionUser] = useState<string>("MACY");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [perizinanApproved, setPerizinanApproved] = useState(false);
  const [activeAsprakTask, setActiveAsprakTask] = useState(false);
  const [rosterSearch, setRosterSearch] = useState("");
  const [rosterDivisionFilter, setRosterDivisionFilter] = useState("ALL");

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const rawCookies = document.cookie ? document.cookie.split("; ") : [];
      const parsed: Record<string, string> = {};
      for (const c of rawCookies) {
        const [k, v] = c.split("=");
        if (k && v) parsed[k] = decodeURIComponent(v);
      }
      const user = parsed.mock_session || "MACY";
      setSessionUser(user);
      const asst = getAssistantByCode(user);
      if (
        parsed.mock_role &&
        (parsed.mock_role === "ASPRAK" ||
          parsed.mock_role === "KOMDIS" ||
          parsed.mock_role === "SEKBEN" ||
          parsed.mock_role === "ADMIN" ||
          parsed.mock_role === "SUPER_ADMIN")
      ) {
        setCurrentRole(parsed.mock_role as any);
      } else if (asst) {
        setCurrentRole(asst.role);
      } else {
        setCurrentRole("SUPER_ADMIN");
      }
    }

    if (typeof window !== "undefined") {
      const handlePop = () => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get("tab") || "dashboard";
        setActiveTab(t);
      };
      window.addEventListener("popstate", handlePop);
      const params = new URLSearchParams(window.location.search);
      const initialTab = params.get("tab");
      if (initialTab) {
        setActiveTab(initialTab);
        setTabHistory(["dashboard", initialTab]);
      }
      return () => window.removeEventListener("popstate", handlePop);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [activeTab]);

  const switchTab = (tab: string, skipHistoryPush = false) => {
    if (tab === activeTab) return;
    if (!skipHistoryPush) {
      setTabHistory((prev) => [...prev, activeTab]);
    }
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "dashboard" || tab === "beranda") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.pushState({ tab }, "", url.toString());
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleBackNavigation = () => {
    if (tabHistory.length > 1) {
      const prev = tabHistory[tabHistory.length - 1];
      setTabHistory((history) => history.slice(0, -1));
      setActiveTab(prev || "dashboard");
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (!prev || prev === "dashboard" || prev === "beranda") {
          url.searchParams.delete("tab");
        } else {
          url.searchParams.set("tab", prev);
        }
        window.history.pushState({ tab: prev || "dashboard" }, "", url.toString());
      }
    } else {
      switchTab("dashboard");
    }
  };

  const currentAssistantProfile = getAssistantByCode(sessionUser) || ALPRO_ASSISTANTS[4];
  const duty = getAssistantDutyStatus(sessionUser);
  const ongoingShift = getCurrentOngoingShift();

  // Dynamic Jadwal Saya per Asisten
  const myAssistantShifts = getAssistantShifts(sessionUser).map((item) => {
    const shift = item.shift;
    const dayAbbrMap: Record<string, string> = {
      Senin: "SEN",
      Selasa: "SEL",
      Rabu: "RAB",
      Kamis: "KAM",
      Jumat: "JUM",
      Sabtu: "SAB",
      Minggu: "MIN",
    };
    const dayAbbr = dayAbbrMap[shift.day] || shift.day.slice(0, 3).toUpperCase();
    const startTime = shift.startTime.replace(":", ".");
    let pillColor = "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800";
    if (shift.day === "Rabu" || shift.day === "Kamis") {
      pillColor = "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
    } else if (shift.day === "Jumat" || shift.day === "Sabtu") {
      pillColor = "bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
    }

    return {
      shiftNum: shift.shiftNumber,
      classCode: shift.className,
      rawClassCode: shift.classCode,
      day: shift.day,
      dayAbbr,
      startTime,
      timeDisplay: shift.timeDisplay,
      room: shift.room.startsWith("Ruang") ? shift.room : `Ruang ${shift.room}`,
      group: item.group,
      studentCount: item.studentCount,
      status: "Terjadwal",
      isPindahan: false,
      pillColor,
    };
  });

  // Informasi Praktikan & Laporan Kecurangan States (Clean & Real, No Fake Demo)
  const [studentInfoRecords, setStudentInfoRecords] = useState<any[]>([]);
  const [studentInfoSearch, setStudentInfoSearch] = useState("");
  const [cheatingReports, setCheatingReports] = useState<any[]>([]);
  const [cheatingSearchQuery, setCheatingSearchQuery] = useState("");

  const [selectedShiftForModal, setSelectedShiftForModal] = useState<number | null>(null);
  const [selectedModalGroup, setSelectedModalGroup] = useState<string | null>(null);

  // Absensi sub-tab: 'praktikan' | 'asprak'
  const [absensiSubTab, setAbsensiSubTab] = useState<"praktikan" | "asprak">("praktikan");
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState("");
  const [gradeSearchQuery, setGradeSearchQuery] = useState("");

  // State Absensi Praktikan per class (key: NIM)
  const [attendance, setAttendance] = useState<Record<string, "Hadir" | "Terlambat" | "Izin" | "Sakit" | "Alpa">>({});

  // State Penilaian Praktikan per class
  const [gradesByClass, setGradesByClass] = useState<Record<string, StudentGradeRow[]>>(() => {
    const initial: Record<string, StudentGradeRow[]> = {};
    for (const cls of SI50_CLASSES) {
      initial[cls.code] = getStudentsByClass(cls.code);
    }
    return initial;
  });
  const [gradeLocked, setGradeLocked] = useState(false);

  // Live LMS Sync & Token Management
  const [lmsToken, setLmsToken] = useState<string>("fc6d5658f31cb68d90907134703b5694");
  const [isLmsSyncing, setIsLmsSyncing] = useState<boolean>(false);
  const [lmsLastSyncTime, setLmsLastSyncTime] = useState<string>("Tersinkronisasi");
  const [lmsSyncMessage, setLmsSyncMessage] = useState<string | null>(null);
  const [isLmsTokenModalOpen, setIsLmsTokenModalOpen] = useState<boolean>(false);
  const [inputToken, setInputToken] = useState<string>("fc6d5658f31cb68d90907134703b5694");

  // State Dokumentasi 3 Section: Sebelum, Sedang, Sesudah
  const [docPhase, setDocPhase] = useState<"sebelum" | "sedang" | "sesudah">("sebelum");
  const [docShiftNumber, setDocShiftNumber] = useState<number>(4);
  const [docRoomNumber, setDocRoomNumber] = useState<string>("Ruang R1 Lantai 8 TULT");
  const [docZoomPhoto, setDocZoomPhoto] = useState<string | null>(null);

  const [docChecklists, setDocChecklists] = useState({
    sebelum: {
      pc_ready: true,
      lab_clean_start: true,
      projector_screen_on: true,
      air_conditioner_on: true,
      whiteboard_ready: true,
    },
    sedang: {
      student_attendance_verified: true,
      active_group_mentoring: true,
      lab_code_of_conduct: true,
      lms_network_stable: true,
      health_safety_clean: true,
    },
    sesudah: {
      pc_shutdown_all: true,
      peripherals_tidy: true,
      trash_cleared: true,
      projector_off: true,
      ac_lights_off: false,
    },
  });

  const [docNotes, setDocNotes] = useState({
    sebelum: "Laboratorium R1 telah siap, 45 unit workstation menyala normal.",
    sedang: "Praktikum Modul 1 berjalan kondusif, praktikan aktif mengerjakan modul.",
    sesudah: "Seluruh PC praktikan dimatikan, meja bersih rapi, mouse cadangan diganti di PC 14.",
  });

  const [docPhotos, setDocPhotos] = useState<{
    sebelum: { id: string; url: string; time: string; note: string }[];
    sedang: { id: string; url: string; time: string; note: string }[];
    sesudah: { id: string; url: string; time: string; note: string }[];
  }>({
    sebelum: [
      {
        id: "seb-1",
        url: "/images/asprak-draft-1.jpg",
        time: "07.15 WIB",
        note: "Kesiapan PC & Lab R1 sebelum praktikum",
      },
    ],
    sedang: [
      {
        id: "sed-1",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
        time: "08.45 WIB",
        note: "Asistensi modul pengerjaan praktikan",
      },
    ],
    sesudah: [
      {
        id: "ses-1",
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        time: "09.35 WIB",
        note: "Lab rapi dan PC mati setelah praktikum",
      },
    ],
  });

  // Helper untuk menambah foto dokumentasi
  const handleAddDocPhoto = (file: File, phase: "sebelum" | "sedang" | "sesudah") => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran foto maksimal 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")} WIB`;
        const newPhoto = {
          id: `photo-${Date.now()}`,
          url: result,
          time: timeStr,
          note: `Dokumentasi ${phase} praktikum Shift ${docShiftNumber}`,
        };
        setDocPhotos((prev) => ({
          ...prev,
          [phase]: [newPhoto, ...prev[phase]],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteDocPhoto = (phase: "sebelum" | "sedang" | "sesudah", photoId: string) => {
    setDocPhotos((prev) => ({
      ...prev,
      [phase]: prev[phase].filter((p) => p.id !== photoId),
    }));
  };

  // Fungsi Sinkronisasi Nilai LMS
  const syncLiveGrades = async (targetClass?: string) => {
    setIsLmsSyncing(true);
    setLmsSyncMessage("Menghubungkan ke LMS Telkom University...");
    try {
      const cls = targetClass || selectedClassCode;
      const res = await fetch("/api/lms/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: lmsToken, classCode: cls }),
      });
      const data = await res.json();
      if (data.success && data.updatedGrades) {
        setGradesByClass((prev) => {
          const next = { ...prev, ...data.updatedGrades };
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("EDM_LIVE_GRADES_CACHE", JSON.stringify(next));
            } catch (e) {}
          }
          return next;
        });
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")} WIB`;
        setLmsLastSyncTime(timeStr);
        setLmsSyncMessage(`✓ Berhasil diperbarui (${timeStr})`);
        setTimeout(() => setLmsSyncMessage(null), 4000);
      } else {
        setLmsSyncMessage(data.error || "Gagal memperbarui nilai dari LMS.");
      }
    } catch (err: any) {
      setLmsSyncMessage("Koneksi ke API LMS terputus.");
    } finally {
      setIsLmsSyncing(false);
    }
  };

  // State Pertukaran Jadwal (Official EDM Shift Swap Engine)
  const [swaps, setSwaps] = useState<OfficialSwapItem[]>(INITIAL_OFFICIAL_SWAPS);
  const [requesterCode, setRequesterCode] = useState("MJFA");
  const [shiftSourceNum, setShiftSourceNum] = useState<number>(6);
  const [shiftTargetNum, setShiftTargetNum] = useState<number>(15);
  const [replacementCode, setReplacementCode] = useState("MAYR");
  const [swapNote, setSwapNote] = useState("");
  const [expandedShiftId, setExpandedShiftId] = useState<number | null>(null);

  const getShiftDetails = (shiftNum: number) => {
    const s = ALPRO_15_SHIFTS.find((shift) => shift.shiftNumber === shiftNum);
    if (!s) return { classCode: `Shift ${shiftNum}`, day: "Senin", time: "07.30 - 09.30" };
    return { classCode: s.classCode, day: s.day, time: s.timeDisplay };
  };


  const selectedClass = SI50_CLASSES.find((c) => c.code === selectedClassCode) || SI50_CLASSES[0];

  const handleAttendanceChange = (nim: string, status: "Hadir" | "Terlambat" | "Izin" | "Sakit" | "Alpa") => {
    setAttendance((prev) => ({ ...prev, [nim]: status }));
  };

  const handleGradeChange = (
    idx: number,
    field: "warmingUp" | "preTest" | "practice" | "jurnal" | "postTest",
    val: string
  ) => {
    if (gradeLocked) return;
    if (val !== "" && isNaN(Number(val))) return;
    const num = Number(val);
    if (num > 100) return;

    setGradesByClass((prev) => {
      const copy = [...(prev[selectedClassCode] || getStudentsByClass(selectedClassCode))];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, [selectedClassCode]: copy };
    });
  };

  const calcFinalScore = (row: StudentGradeRow) => {
    const wu = parseFloat(row.warmingUp) || 0;
    const pre = parseFloat(row.preTest) || 0;
    const prac = parseFloat(row.practice) || 0;
    const jur = parseFloat(row.jurnal) || 0;
    const post = parseFloat(row.postTest) || 0;
    // Warming Up (10%), Pre Test (15%), Practice (30%), Jurnal (30%), Post Test (15%)
    return ((wu * 0.10) + (pre * 0.15) + (prac * 0.30) + (jur * 0.30) + (post * 0.15)).toFixed(2);
  };

  const handleExportCSV = () => {
    const list = gradesByClass[selectedClassCode] || getStudentsByClass(selectedClassCode);
    const headers = [
      "NIM",
      "Nama Mahasiswa",
      "Kelas",
      "Warming Up (10%)",
      "Pre Test (15%)",
      "Practice (30%)",
      "Jurnal (30%)",
      "Post Test (15%)",
      "Nilai Akhir",
    ];
    const rows = list.map((r) => [
      `"${r.nim}"`,
      `"${r.name}"`,
      `"${selectedClassCode}"`,
      r.warmingUp || "0",
      r.preTest || "0",
      r.practice || "0",
      r.jurnal || "0",
      r.postTest || "0",
      calcFinalScore(r),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nilai_Alpro_${selectedClassCode}_LMS_Telkom.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacementCode || !shiftSourceNum || !shiftTargetNum) return;
    const reqObj = getAssistantByCode(requesterCode) || currentAssistantProfile;
    const repObj = getAssistantByCode(replacementCode);

    const newRecord: OfficialSwapItem = {
      id: Date.now(),
      requesterName: reqObj.name,
      requesterCode: reqObj.code,
      shiftSource: Number(shiftSourceNum),
      shiftTarget: Number(shiftTargetNum),
      replacementName: repObj ? repObj.name : replacementCode,
      replacementCode: repObj ? repObj.code : replacementCode,
      status: "APPROVED",
      note: swapNote.trim() || "Pertukaran resmi jadwal praktikum",
      date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setSwaps((prev) => [newRecord, ...prev]);
    setSwapNote("");
  };

  const handleToggleSwapStatus = (id: string | number) => {
    setSwaps((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "APPROVED" ? "PENDING" : "APPROVED";
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const handleDeleteSwap = (id: string | number) => {
    setSwaps((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* LEFT SIDEBAR — sticky, never scrolls with content */}
      <DashboardSidebar
        role={currentRole}
        activeTab={activeTab}
        onTabChange={(tab) => switchTab(tab)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* RIGHT MAIN CONTENT AREA — only this column scrolls */}
      <div className="flex-1 w-full min-w-0 space-y-5 pb-28 sm:pb-8">
        
        {/* TOP SUB-HEADER (Matching Image 1) */}
        <DashboardHeader
          assistantCode={sessionUser}
          currentRole={currentRole}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onRoleChange={(r) => setCurrentRole(r)}
        />

        {/* GLOBAL BACK NAVIGATION & BREADCRUMB (When inside any feature tab) */}
        {activeTab !== "dashboard" && activeTab !== "beranda" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0e071a] p-3.5 sm:px-5 rounded-2xl border border-slate-200/80 dark:border-purple-950/60 shadow-xs transition-colors">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleBackNavigation}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/70 dark:hover:bg-purple-900 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 transition-all cursor-pointer group shadow-2xs"
                title="Kembali ke layar sebelumnya"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Kembali ke Beranda</span>
              </button>
              <span className="text-slate-300 dark:text-neutral-700 font-mono text-xs">/</span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-neutral-200">
                {activeTab === "absensi" || activeTab === "praktikan" ? "Presensi & Nilai Praktikan" :
                 activeTab === "dokumentasi" ? "Dokumentasi Praktikum Lab EDM" :
                 activeTab === "jadwal_saya" ? "Jadwal Saya" :
                 activeTab === "pertukaran_shift" || activeTab === "swap" ? "Pertukaran Shift" :
                 activeTab === "jadwal_praktikum" ? "Jadwal Praktikum ALPRO 26/27" :
                 activeTab === "penilaian" ? "Penilaian Praktikan" :
                 activeTab === "modul" || activeTab === "informasi" ? "Modul & Silabus" :
                 activeTab === "komdis" ? "Laporan Pelanggaran Komdis" :
                 activeTab === "inventaris" ? "Inventaris & Hardware Lab" : "Profil Akun"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
              <span className="hidden sm:inline">Shift Saat Ini:</span>
              <span className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-200/60 dark:border-purple-900/40">
                Shift {ongoingShift.activeShift?.shiftNumber || 4} • {ongoingShift.activeShift?.className || "SI-50-04"}
              </span>
            </div>
          </div>
        )}

        {/* MOBILE & TABLET SLEEK TAB BAR (< lg) - Clean single-row, no duplicate clutter */}
        <div className="lg:hidden bg-white/95 dark:bg-[#0e071a]/95 backdrop-blur-md rounded-2xl p-2 border border-slate-200/80 dark:border-purple-950/60 shadow-xs transition-colors">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none touch-pan-x px-1">
            {[
              { id: "dashboard", label: "Beranda", icon: Home },
              { id: "absensi", label: "Praktikan", icon: CheckSquare },
              { id: "penilaian", label: "Penilaian", icon: Award },
              { id: "dokumentasi", label: "Dokumentasi", icon: Camera },
              { id: "jadwal_saya", label: "Jadwal Saya", icon: Calendar },
              { id: "modul", label: "Informasi", icon: Users },
              { id: "komdis", label: "Laporan", icon: Flag },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || (tab.id === "dashboard" && activeTab === "beranda");
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-700 text-white shadow-xs font-bold"
                      : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* 1. BERANDA / DASHBOARD TAB */}
        {(activeTab === "dashboard" || activeTab === "beranda") && (
          <div className="space-y-6">

            {/* HERO GREETING BANNER WITH OFFICIAL EDM 3 MASCOTS */}
            <div className="relative rounded-[2.5rem] border border-purple-200/80 dark:border-purple-900/40 p-5 sm:p-7 lg:p-8 shadow-sm overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-5 min-h-[240px] transition-all">
              
              {/* FULL PANORAMIC BACKGROUND — Hero_Background_EDM_3Maskot.png */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <Image
                  src="/images/hero-bg-edm-3maskot.png"
                  alt="EDM Hero Background"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-white/10 dark:bg-[#0e071a]/55" />
              </div>

              {/* Left Column: Greeting, Real SI'50 Class Chips & Action Button */}
              <div className="space-y-3.5 max-w-md relative z-10">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  ALPRO • Peringatan • Modul 1
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                    Semangat, {currentAssistantProfile.name.split(" ")[0]}!<br />
                    <span className="font-extrabold text-slate-800 dark:text-neutral-100 text-lg sm:text-2xl lg:text-[1.8rem]">
                      {duty.allMyShifts.reduce((acc, s) => acc + s.studentCount, 0) || 24} praktikan di kelas binaanmu.
                    </span>
                  </h1>
                </div>

                {/* Real Class Chips for current assistant */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(duty.allMyShifts.length > 0
                    ? duty.allMyShifts.map((s) => ({ code: s.shift.classCode, name: s.shift.className }))
                    : [
                        { code: "SI5004", name: "SI-50-04" },
                        { code: "SI5005", name: "SI-50-05" },
                        { code: "SI5014", name: "SI-50-14" },
                      ]
                  ).map((cls) => (
                    <button
                      key={cls.code}
                      type="button"
                      onClick={() => {
                        setSelectedClassCode(cls.code);
                        switchTab("absensi");
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 hover:bg-purple-50 dark:hover:bg-white/20 text-slate-700 dark:text-neutral-200 text-xs font-mono font-bold border border-purple-200/80 dark:border-purple-800/60 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {cls.name}
                    </button>
                  ))}
                </div>

                {/* Primary Action Button + Carousel Dots Indicator */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => switchTab("absensi")}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Isi penilaian</span>
                    <span className="text-base leading-none">→</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-2">
                    <span className="w-2.5 h-1.5 rounded-full bg-purple-700 dark:bg-purple-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-neutral-600" />
                  </div>
                </div>
              </div>

              {/* Spacer — mascots visible through panoramic background image */}
              <div className="hidden lg:block flex-1 min-h-[160px] pointer-events-none select-none" />

              {/* Right: Floating Status Card with Real Duty Telemetry */}
              <div className="relative z-10 w-full lg:w-72 rounded-3xl bg-white/95 dark:bg-[#120824]/90 backdrop-blur-md p-4 sm:p-5 border border-white/80 dark:border-purple-900/50 shadow-[0_10px_30px_rgba(109,40,217,0.06)] space-y-3 lg:self-center shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300 font-bold">
                    MINGGU INI • MODUL 1
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {duty.isCurrentlyOnDuty ? "Sedang Shift" : "Aktif"}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 dark:text-neutral-400 font-medium">
                    Praktikum berikutnya:
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {duty.isCurrentlyOnDuty
                      ? `Shift ${duty.activeShiftDetails?.shift.shiftNumber} (${duty.activeShiftDetails?.shift.className})`
                      : duty.nextUpcomingShift
                      ? `Shift ${duty.nextUpcomingShift.shift.shiftNumber} (${duty.nextUpcomingShift.shift.className})`
                      : "Jadwal modul selesai"}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                    {duty.nextUpcomingShift
                      ? `${duty.nextUpcomingShift.shift.day}, ${duty.nextUpcomingShift.shift.timeDisplay} WIB • ${duty.nextUpcomingShift.studentCount} praktikan`
                      : "Semua shift modul terlaksana"}
                  </div>
                </div>

                {/* Progress 1: Kelas terlaksana */}
                <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-neutral-400">Kelas terjadwal</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      <strong className="text-emerald-600 dark:text-emerald-400">{duty.allMyShifts.length || 3}</strong> / 15 shift SI&apos;50
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
                  </div>
                </div>

                {/* Progress 2: Praktikan dinilai */}
                <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-neutral-400">Praktikan terdaftar</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      <strong className="text-purple-600 dark:text-purple-400">{duty.allMyShifts.reduce((acc, s) => acc + s.studentCount, 0) || 24}</strong> praktikan
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full w-[25%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* AKSES CEPAT (4 Illustrated Bento Cards with Real Metrics) */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Akses cepat
                </h3>
                <span className="text-xs font-mono text-slate-400 dark:text-neutral-500">
                  Quick Access • Modul 1
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                {/* Card 1: Praktikan */}
                <div
                  onClick={() => switchTab("absensi")}
                  className="rounded-[1.85rem] p-3 sm:p-3.5 bg-gradient-to-b from-[#EFF5FF] via-[#E8F1FE] to-[#DFECFE] dark:from-[#0F1836] dark:via-[#0B122B] dark:to-[#070C1E] border border-blue-200/80 dark:border-blue-900/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[280px] sm:min-h-[300px] relative overflow-hidden"
                >
                  <div className="relative flex-1 min-h-[185px] sm:min-h-[205px] w-full flex items-center justify-center -mb-8 sm:-mb-10 pt-2 z-0 group-hover:scale-105 transition-transform duration-300">
                    <PraktikanCardIllustration />
                  </div>

                  <div className="bg-white dark:bg-[#121B38] rounded-2xl p-3.5 shadow-[0_4px_18px_rgba(37,99,235,0.08)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.4)] border border-blue-100/70 dark:border-blue-900/40 relative z-10 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <CheckSquare size={13} strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                          Praktikan
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                          {duty.allMyShifts.reduce((acc, s) => acc + s.studentCount, 0) || 24} praktikan · {duty.allMyShifts.length || 3} shift
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Dokumentasi */}
                <div
                  onClick={() => switchTab("dokumentasi")}
                  className="rounded-[1.85rem] p-3 sm:p-3.5 bg-gradient-to-b from-[#EEFAF3] via-[#E5F7EC] to-[#DCF3E5] dark:from-[#082216] dark:via-[#051A10] dark:to-[#03120B] border border-emerald-200/80 dark:border-emerald-900/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[280px] sm:min-h-[300px] relative overflow-hidden"
                >
                  <div className="relative flex-1 min-h-[185px] sm:min-h-[205px] w-full flex items-center justify-center -mb-8 sm:-mb-10 pt-2 z-0 group-hover:scale-105 transition-transform duration-300">
                    <DokumentasiCardIllustration />
                  </div>

                  <div className="bg-white dark:bg-[#0E261B] rounded-2xl p-3.5 shadow-[0_4px_18px_rgba(16,185,129,0.08)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.4)] border border-emerald-100/70 dark:border-emerald-900/40 relative z-10 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <Camera size={13} strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                          Dokumentasi
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                          Foto & video praktikum
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Jadwal Saya */}
                <div
                  onClick={() => switchTab("jadwal_saya")}
                  className="rounded-[1.85rem] p-3 sm:p-3.5 bg-gradient-to-b from-[#FFF3E8] via-[#FFEBD7] to-[#FFE2C5] dark:from-[#291708] dark:via-[#1F1105] dark:to-[#140A02] border border-amber-200/80 dark:border-amber-900/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[280px] sm:min-h-[300px] relative overflow-hidden"
                >
                  <div className="relative flex-1 min-h-[185px] sm:min-h-[205px] w-full flex items-center justify-center -mb-8 sm:-mb-10 pt-2 z-0 group-hover:scale-105 transition-transform duration-300">
                    <JadwalCardIllustration />
                  </div>

                  <div className="bg-white dark:bg-[#2C190D] rounded-2xl p-3.5 shadow-[0_4px_18px_rgba(249,115,22,0.08)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.4)] border border-amber-100/70 dark:border-amber-900/40 relative z-10 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <Calendar size={13} strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                          Jadwal Saya
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                          {duty.allMyShifts.length || 3} shift jaga ALPRO
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: PPT Modul 1 */}
                <div className="rounded-[1.85rem] p-3 sm:p-3.5 bg-gradient-to-b from-[#F3EEFF] via-[#EAE2FD] to-[#DFD4FC] dark:from-[#1D1036] dark:via-[#150A29] dark:to-[#0D051C] border border-purple-200/80 dark:border-purple-900/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px] sm:min-h-[300px] relative overflow-hidden group">
                  <div className="relative flex-1 min-h-[185px] sm:min-h-[205px] w-full flex items-center justify-center -mb-8 sm:-mb-10 pt-2 z-0 group-hover:scale-105 transition-transform duration-300">
                    <SlideModulCardIllustration />
                  </div>

                  <div className="bg-white dark:bg-[#1A0E33] rounded-2xl p-3 shadow-[0_4px_18px_rgba(147,51,234,0.08)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.4)] border border-purple-100/70 dark:border-purple-900/40 relative z-10 space-y-2 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <BookOpen size={11} strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                          PPT Modul 1
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 truncate">
                          Slide praktikum minggu ini
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <a
                        href="https://drive.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-2.5 bg-[#1B64F2] hover:bg-blue-700 text-white rounded-full text-[11px] font-mono font-bold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                        title="Unduh slide modul reguler"
                      >
                        <span>Reguler</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                      <a
                        href="https://drive.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-2.5 bg-[#1B64F2] hover:bg-blue-700 text-white rounded-full text-[11px] font-mono font-bold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                        title="Unduh slide modul kelas internasional"
                      >
                        <span>Inter</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2-COLUMN LOWER SECTION: PLOTTINGAN SAYA & KONTAK DOSEN (REAL DATA) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Plottingan saya with Real Assistant Duty Data */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Plottingan saya
                  </h3>
                  <button
                    type="button"
                    onClick={() => switchTab("jadwal_praktikum")}
                    className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat semua</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(duty.allMyShifts.length > 0
                    ? duty.allMyShifts
                    : ALPRO_15_SHIFTS.slice(0, 4).map((s) => ({
                        shift: s,
                        group: "A",
                        studentCount: 24,
                      }))
                  ).map((item) => (
                    <div
                      key={`my-shift-card-${item.shift.shiftNumber}`}
                      className="p-4 rounded-2xl bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Green chalkboard/chart icon container matching Image 2 */}
                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                          <TrendingUp size={16} strokeWidth={2.5} />
                          <div className="flex items-center gap-0.5 text-[8px] font-mono font-bold mt-0.5">
                            <Users size={9} />
                            <span>{item.group}</span>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                            {item.shift.className}
                          </div>
                          <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1.5">
                            <Users size={11} className="text-slate-400" />
                            <span>Grup {item.group} • {item.studentCount} praktikan • {item.shift.day}, {item.shift.timeDisplay} WIB</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedClassCode(item.shift.classCode);
                          switchTab("absensi");
                        }}
                        className="px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full text-xs font-bold font-mono shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                      >
                        Buka
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Kontak dosen ALPRO Telkom University */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Kontak dosen
                  </h3>
                  <button
                    type="button"
                    onClick={() => alert("Daftar Kontak Dosen Pengampu Algoritma & Pemrograman S1 Sistem Informasi Telkom University")}
                    className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat semua</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      initial: "SFC",
                      name: "Safara Cathasa Riverinda Rijadi, S.T., M.T.",
                      classRange: "Koordinator Dosen ALPRO • SI-50-01 s.d. SI-50-INT",
                      phone: "6281234567801",
                    },
                    {
                      initial: "VRT",
                      name: "Elvira Lailatuth Thohiroh, S.Kom., M.Kom.",
                      classRange: "Dosen Pengampu • SI-50-02, SI-50-03, SI-50-04",
                      phone: "6281234567802",
                    },
                    {
                      initial: "IFI",
                      name: "Mifta Ardianti, S.T., M.Kom.",
                      classRange: "Dosen Pengampu • SI-50-05, SI-50-06",
                      phone: "6281234567803",
                    },
                    {
                      initial: "NAS",
                      name: "Nia Ambarsari, S.Si., M.T.",
                      classRange: "Dosen Pengampu • SI-50-07, SI-50-08",
                      phone: "6281234567804",
                    },
                    {
                      initial: "EDM",
                      name: "Dr. Ir. Husni Thamrin, S.T., M.T.",
                      classRange: "Pembina Lab EDM • Ruang Riset Lt. 3",
                      phone: "6281234567805",
                    },
                  ].map((d, idx) => (
                    <div
                      key={`dosen-${idx}-${d.initial}`}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs flex items-center justify-between gap-3 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Cyan/Blue Initial Bubble matching Image 2 */}
                        <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/60 text-sky-700 dark:text-sky-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {d.initial}
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {d.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                            {d.classRange}
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Circular Green Button matching Image 2 */}
                      <a
                        href={`https://wa.me/${d.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#22C55E] hover:bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                        title={`Hubungi WhatsApp ${d.name}`}
                      >
                        <Phone size={14} className="fill-white" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. ABSENSI TAB (DUAL: ABSENSI PRAKTIKAN & ABSENSI ASPRAK) */}
        {(activeTab === "absensi" || activeTab === "praktikan") && (
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
              <div className="flex flex-wrap items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200/60 dark:border-neutral-800 gap-1">
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
                <button
                  type="button"
                  onClick={() => switchTab("penilaian")}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold font-mono text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-all cursor-pointer"
                >
                  Penilaian LMS →
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: ABSENSI PRAKTIKAN */}
            {absensiSubTab === "praktikan" && (() => {
              const classStudents = MOODLE_STUDENTS_BY_CLASS[selectedClassCode] || [];
              const filteredStudents = classStudents.filter(
                (std) =>
                  std.name.toLowerCase().includes(attendanceSearchQuery.toLowerCase()) ||
                  std.nim.includes(attendanceSearchQuery)
              );
              const hadirCount = classStudents.filter((s) => (attendance[s.nim] || "Hadir") === "Hadir").length;
              const terlambatCount = classStudents.filter((s) => attendance[s.nim] === "Terlambat").length;
              const izinCount = classStudents.filter((s) => attendance[s.nim] === "Izin" || attendance[s.nim] === "Sakit").length;
              const alpaCount = classStudents.filter((s) => attendance[s.nim] === "Alpa").length;

              return (
                <div className="space-y-5">
                  {/* Class selector & telemetry bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-neutral-800">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300">Pilih Kelas:</span>
                      <select
                        value={selectedClassCode}
                        onChange={(e) => setSelectedClassCode(e.target.value)}
                        className="bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 cursor-pointer"
                      >
                        {SI50_CLASSES.map((cls) => (
                          <option key={cls.code} value={cls.code}>
                            {cls.code} ({cls.defaultShift}) • {cls.totalStudents} Mhs
                          </option>
                        ))}
                      </select>

                      {/* Search in class */}
                      <div className="relative min-w-[200px]">
                        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Cari NIM / Nama..."
                          value={attendanceSearchQuery}
                          onChange={(e) => setAttendanceSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-lg text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Hadir: {hadirCount}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">● Terlambat: {terlambatCount}</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">● Izin/Sakit: {izinCount}</span>
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">● Alpa: {alpaCount}</span>
                    </div>
                  </div>

                  {/* Table Presensi Praktikan */}
                  <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin max-h-[500px]">
                    <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                      <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider sticky top-0 z-10">
                        <tr>
                          <th className="px-5 py-3.5">NIM</th>
                          <th className="px-5 py-3.5">Nama Mahasiswa</th>
                          <th className="px-5 py-3.5">Kelas</th>
                          <th className="px-5 py-3.5">Status Kehadiran</th>
                          <th className="px-5 py-3.5 text-center">Catatan Komdis</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-8 text-slate-400 font-mono">
                              Tidak ada mahasiswa yang cocok dengan pencarian &quot;{attendanceSearchQuery}&quot;
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map((std) => {
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
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}

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
                    { role: "LEAD PIC (KORPRAK)", code: "DEVO", name: "Devin Octavian", time: "07:15 WIB", status: "Tepat Waktu", roleType: "ASPRAK", division: "Koordinator" },
                    { role: "KOOR CNI (KOMDIS)", code: "MACY", name: "Maurellio Christopher Yonathan", time: "07:18 WIB", status: "Tepat Waktu", roleType: "KOMDIS", division: "Compliance & Integrity" },
                    { role: "SEKRETARIS 1 (BPH)", code: "GRGS", name: "Gracia Gebriella Sianturi", time: "07:22 WIB", status: "Tepat Waktu", roleType: "SEKBEN", division: "Sekretaris & Bendahara" },
                    { role: "BENDAHARA (BPH)", code: "SYOW", name: "Syalfa Oktaviana Wijaya", time: "07:24 WIB", status: "Tepat Waktu", roleType: "SEKBEN", division: "Sekretaris & Bendahara" },
                    { role: "KOOR MD (MODUL)", code: "MUDI", name: "Muhammad Daffa Izzati", time: "07:25 WIB", status: "Tepat Waktu", roleType: "ASPRAK", division: "Module Development" },
                    { role: "KOOR TNC (SYSTEM)", code: "FIAG", name: "Figo Al Ghifari", time: "07:26 WIB", status: "Tepat Waktu", roleType: "ASPRAK", division: "Tech & Systems" },
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

        {/* 3. PENILAIAN PRAKTIKAN TAB (5 KOMPONEN LMS CE-LOE) */}
        {activeTab === "penilaian" && (() => {
          const currentGrades = gradesByClass[selectedClassCode] || getStudentsByClass(selectedClassCode);
          const filteredRows = currentGrades.filter(
            (r) =>
              r.name.toLowerCase().includes(gradeSearchQuery.toLowerCase()) ||
              r.nim.includes(gradeSearchQuery)
          );

          return (
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Penilaian Praktikan</h2>
                    <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                      LMS Telkom University
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Course {LMS_ALPRO_METADATA.courseId} Synced ({lmsLastSyncTime})</span>
                    </span>
                    {lmsSyncMessage && (
                      <span className="text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 animate-fade-in">
                        {lmsSyncMessage}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                    5 Komponen Resmi: Warming Up (10%), Pre Test (15%), Practice (30%), Jurnal (30%), Post Test (15%).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Tombol Sinkronisasi Live LMS */}
                  <button
                    type="button"
                    onClick={() => syncLiveGrades(selectedClassCode)}
                    disabled={isLmsSyncing}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-mono font-bold shadow-xs transition-all cursor-pointer disabled:opacity-60"
                    title="Tarik nilai terbaru langsung dari LMS CeLOE Telkom University"
                  >
                    <RotateCw size={13} className={isLmsSyncing ? "animate-spin" : ""} />
                    <span>{isLmsSyncing ? "Menyinkronkan..." : "Sinkronkan LMS"}</span>
                  </button>

                  {/* Tombol Pengaturan Token LMS */}
                  <button
                    type="button"
                    onClick={() => setIsLmsTokenModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
                    title="Atur token Moodle LMS"
                  >
                    <KeyRound size={13} className="text-purple-600 dark:text-purple-400" />
                    <span>Token LMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => switchTab("absensi")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    <span>← Presensi</span>
                  </button>

                  <Link
                    href="/dashboard/assistant/grading"
                    className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 rounded-xl text-xs font-mono font-bold border border-purple-200 dark:border-purple-800/60 transition-colors"
                  >
                    <span>Spreadsheet Lengkap</span>
                    <ArrowUpRight size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setGradeLocked(!gradeLocked)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono uppercase transition-colors cursor-pointer ${
                      gradeLocked
                        ? "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200"
                        : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <Lock size={13} />
                    {gradeLocked ? "Terkunci" : "Kunci"}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold font-mono uppercase shadow-sm cursor-pointer transition-all"
                  >
                    <Download size={13} />
                    Export .csv
                  </button>
                </div>
              </div>

              {/* Class switcher & search bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 shrink-0">Filter Kelas SI&apos;50:</span>
                  <select
                    value={selectedClassCode}
                    onChange={(e) => setSelectedClassCode(e.target.value)}
                    className="bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 cursor-pointer"
                  >
                    {SI50_CLASSES.map((cls) => (
                      <option key={cls.code} value={cls.code}>
                        {cls.code} ({cls.name}) • {cls.totalStudents} Mhs
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative min-w-[220px]">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari praktikan (NIM/Nama)..."
                    value={gradeSearchQuery}
                    onChange={(e) => setGradeSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-lg text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Spreadsheet Table with 5 Components */}
              <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin max-h-[520px]">
                <table className="w-full text-left text-xs whitespace-nowrap min-w-[850px]">
                  <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="px-5 py-3.5">NIM</th>
                      <th className="px-5 py-3.5">Nama Mahasiswa</th>
                      <th className="px-2 py-3.5 text-right w-20 text-purple-200">Warming Up (10%)</th>
                      <th className="px-2 py-3.5 text-right w-20 text-purple-200">Pre Test (15%)</th>
                      <th className="px-2 py-3.5 text-right w-20 text-purple-200">Practice (30%)</th>
                      <th className="px-2 py-3.5 text-right w-20 text-purple-200">Jurnal (30%)</th>
                      <th className="px-2 py-3.5 text-right w-20 text-purple-200">Post Test (15%)</th>
                      <th className="px-5 py-3.5 text-right text-purple-300">Nilai Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-slate-400 font-mono">
                          Tidak ada mahasiswa yang cocok dengan pencarian &quot;{gradeSearchQuery}&quot;
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row) => {
                        const originalIdx = currentGrades.findIndex((g) => g.nim === row.nim);
                        return (
                          <tr key={row.nim} className="hover:bg-slate-50 dark:hover:bg-neutral-900/60">
                            <td className="px-5 py-3 font-mono font-semibold text-slate-700 dark:text-neutral-300">{row.nim}</td>
                            <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                            <td className="px-2 py-2">
                              <input
                                type="text"
                                value={row.warmingUp}
                                disabled={gradeLocked}
                                onChange={(e) => handleGradeChange(originalIdx, "warmingUp", e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white focus:border-purple-500"
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="text"
                                value={row.preTest}
                                disabled={gradeLocked}
                                onChange={(e) => handleGradeChange(originalIdx, "preTest", e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white focus:border-purple-500"
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="text"
                                value={row.practice}
                                disabled={gradeLocked}
                                onChange={(e) => handleGradeChange(originalIdx, "practice", e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white focus:border-purple-500"
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="text"
                                value={row.jurnal}
                                disabled={gradeLocked}
                                onChange={(e) => handleGradeChange(originalIdx, "jurnal", e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white focus:border-purple-500"
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="text"
                                value={row.postTest}
                                disabled={gradeLocked}
                                onChange={(e) => handleGradeChange(originalIdx, "postTest", e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded px-2 py-1 text-right font-mono text-xs text-slate-900 dark:text-white focus:border-purple-500"
                              />
                            </td>
                            <td className="px-5 py-3 text-right font-mono font-bold text-sm text-purple-700 dark:text-purple-400">
                              {calcFinalScore(row)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* 4. DOKUMENTASI RUANGAN TAB - 3 SECTION: SEBELUM, SEDANG, SESUDAH PRAKTIKUM */}
        {activeTab === "dokumentasi" && (
          <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
            
            {/* Header Dokumentasi */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Dokumentasi Standarisasi Ruang Lab
                  </h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900/60">
                    3 Fase Operasional
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Pencatatan kondisi fisik &amp; aktivitas lab R1 Lantai 8 TULT: Sebelum, Sedang, dan Sesudah praktikum.
                </p>
              </div>

              {/* Shift Selector & Lab Status */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                  <MapPin size={13} className="text-purple-600 dark:text-purple-400" />
                  <span>R1 Lt. 8 TULT</span>
                </div>

                <select
                  value={docShiftNumber}
                  onChange={(e) => setDocShiftNumber(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900/60 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 cursor-pointer"
                >
                  {ALPRO_15_SHIFTS.map((s) => (
                    <option key={s.shiftNumber} value={s.shiftNumber}>
                      Shift {s.shiftNumber} ({s.className})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3 Section Selector Tabs: Sebelum, Sedang, Sesudah */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "sebelum" as const,
                  title: "1. SEBELUM PRAKTIKUM",
                  subtitle: "Kesiapan Lab & 45 PC",
                  badge: `${docPhotos.sebelum.length} Foto`,
                  color: "emerald",
                  icon: Sparkles,
                },
                {
                  id: "sedang" as const,
                  title: "2. SEDANG PRAKTIKUM",
                  subtitle: "Asistensi & Modul",
                  badge: `${docPhotos.sedang.length} Foto`,
                  color: "purple",
                  icon: Users,
                },
                {
                  id: "sesudah" as const,
                  title: "3. SESUDAH PRAKTIKUM",
                  subtitle: "Penutupan & Audit Lab",
                  badge: `${docPhotos.sesudah.length} Foto`,
                  color: "amber",
                  icon: CheckSquare,
                },
              ].map((phase) => {
                const Icon = phase.icon;
                const isActive = docPhase === phase.id;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setDocPhase(phase.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      isActive
                        ? "bg-purple-50/80 dark:bg-purple-950/50 border-purple-400 dark:border-purple-700 shadow-sm"
                        : "bg-slate-50/60 dark:bg-neutral-900/40 border-slate-200/80 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isActive
                              ? "bg-purple-600 text-white"
                              : "bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400"
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white font-mono">
                          {phase.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-purple-700 dark:text-purple-300">
                        {phase.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans mt-2 pl-9">
                      {phase.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Section Content (Checklist + Photo Camera Zone) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-1">
              
              {/* Left Column: Checklist & Catatan (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                    Checklist {docPhase === "sebelum" ? "Kesiapan Awal" : docPhase === "sedang" ? "Saat Praktikum" : "Penutupan Lab"}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    Standar Operasional Lab
                  </span>
                </div>

                <div className="space-y-2">
                  {docPhase === "sebelum" && [
                    { key: "pc_ready", label: "45 Unit PC praktikan menyala & siap pakai" },
                    { key: "lab_clean_start", label: "Kebersihan meja & lantai laboratorium bebas sampah" },
                    { key: "projector_screen_on", label: "Proyektor utama & slide modul telah menyala" },
                    { key: "air_conditioner_on", label: "AC ruangan laboratorium telah dinyalakan" },
                    { key: "whiteboard_ready", label: "Papan tulis bersih & spidol whiteboard tersedia" },
                  ].map((item) => {
                    const isChecked = (docChecklists.sebelum as any)[item.key];
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setDocChecklists((prev) => ({
                            ...prev,
                            sebelum: { ...prev.sebelum, [item.key]: !isChecked },
                          }))
                        }
                        className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isChecked
                            ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 text-slate-900 dark:text-white"
                            : "bg-slate-50 dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400"
                        }`}
                      >
                        <span className="text-xs font-medium">{item.label}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "border border-slate-300 dark:border-neutral-700"
                          }`}
                        >
                          {isChecked && <Check size={13} />}
                        </div>
                      </button>
                    );
                  })}

                  {docPhase === "sedang" && [
                    { key: "student_attendance_verified", label: "Seluruh praktikan diverifikasi presensi resminya" },
                    { key: "active_group_mentoring", label: "Asistensi aktif berjalan merata di tiap kelompok" },
                    { key: "lab_code_of_conduct", label: "Tata tertib lab ditegakkan (ID card, pakaian, no snack)" },
                    { key: "lms_network_stable", label: "Akses LMS CeLOE dan jaringan lab lancar tanpa kendala" },
                    { key: "health_safety_clean", label: "Kondisi ruang praktikum tertib dan kondusif" },
                  ].map((item) => {
                    const isChecked = (docChecklists.sedang as any)[item.key];
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setDocChecklists((prev) => ({
                            ...prev,
                            sedang: { ...prev.sedang, [item.key]: !isChecked },
                          }))
                        }
                        className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isChecked
                            ? "bg-purple-50/70 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800/80 text-slate-900 dark:text-white"
                            : "bg-slate-50 dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400"
                        }`}
                      >
                        <span className="text-xs font-medium">{item.label}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-purple-600 text-white"
                              : "border border-slate-300 dark:border-neutral-700"
                          }`}
                        >
                          {isChecked && <Check size={13} />}
                        </div>
                      </button>
                    );
                  })}

                  {docPhase === "sesudah" && [
                    { key: "pc_shutdown_all", label: "Seluruh PC praktikan (1 s.d. 45) dimatikan (shutdown)" },
                    { key: "peripherals_tidy", label: "Keyboard, mouse & headset tertata rapi di atas meja" },
                    { key: "trash_cleared", label: "Meja & lantai laboratorium bersih bebas sampah sisa" },
                    { key: "projector_off", label: "Proyektor utama & papan tulis telah dibersihkan" },
                    { key: "ac_lights_off", label: "AC dan lampu ruangan dimatikan (jika shift terakhir)" },
                  ].map((item) => {
                    const isChecked = (docChecklists.sesudah as any)[item.key];
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setDocChecklists((prev) => ({
                            ...prev,
                            sesudah: { ...prev.sesudah, [item.key]: !isChecked },
                          }))
                        }
                        className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isChecked
                            ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/80 text-slate-900 dark:text-white"
                            : "bg-slate-50 dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400"
                        }`}
                      >
                        <span className="text-xs font-medium">{item.label}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-amber-600 text-white"
                              : "border border-slate-300 dark:border-neutral-700"
                          }`}
                        >
                          {isChecked && <Check size={13} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Catatan Khusus Fase Ini */}
                <div className="pt-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-bold block mb-1.5">
                    Catatan Fase {docPhase.toUpperCase()}:
                  </label>
                  <textarea
                    rows={3}
                    value={docNotes[docPhase]}
                    onChange={(e) =>
                      setDocNotes((prev) => ({ ...prev, [docPhase]: e.target.value }))
                    }
                    className="w-full bg-slate-50/90 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    placeholder={`Tambahkan catatan untuk fase ${docPhase}...`}
                  />
                </div>
              </div>

              {/* Right Column: Kamera HP & Galeri Foto (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Action Bar: Kamera HP, Upload, & Draft */}
                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold font-mono text-purple-950 dark:text-purple-200 uppercase tracking-wide flex items-center gap-1.5">
                        <Camera size={14} className="text-purple-600 dark:text-purple-400" />
                        <span>Bukti Foto: {docPhase.toUpperCase()} PRAKTIKUM</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans mt-0.5">
                        Ambil langsung via kamera HP atau unggah dari galeri perangkat.
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold">
                      {docPhotos[docPhase].length} Foto Tersimpan
                    </span>
                  </div>

                  {/* Buttons: Direct Phone Camera + Gallery + Draft */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* 1. TOMBOL BUKA KAMERA HP (capture="environment" langsung buka kamera belakang di smartphone) */}
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg cursor-pointer transition-all active:scale-95">
                      <Camera size={15} />
                      <span>Buka Kamera HP</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAddDocPhoto(file, docPhase);
                        }}
                      />
                    </label>

                    {/* 2. TOMBOL UNGGAH DARI GALERI / FILE */}
                    <label className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-700 text-xs font-bold shadow-2xs cursor-pointer transition-all">
                      <Upload size={14} />
                      <span>Galeri / File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAddDocPhoto(file, docPhase);
                        }}
                      />
                    </label>

                    {/* 3. DRAFT FOTO LAB CEPAT */}
                    <button
                      type="button"
                      onClick={() => {
                        const now = new Date();
                        const timeStr = `${now.getHours().toString().padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")} WIB`;
                        setDocPhotos((prev) => ({
                          ...prev,
                          [docPhase]: [
                            {
                              id: `draft-${Date.now()}`,
                              url: prev[docPhase].length % 2 === 0 ? "/images/asprak-draft-1.jpg" : "/images/asprak-draft-2.jpg",
                              time: timeStr,
                              note: `Foto kondisi ${docPhase} shift ${docShiftNumber}`,
                            },
                            ...prev[docPhase],
                          ],
                        }));
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-mono font-medium hover:bg-purple-200 transition-colors cursor-pointer"
                      title="Gunakan draft foto lab instan"
                    >
                      <ImageIcon size={13} />
                      <span>Draft Foto Lab</span>
                    </button>
                  </div>
                </div>

                {/* Grid Foto Bukti untuk Fase Ini */}
                {docPhotos[docPhase].length === 0 ? (
                  <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/30 text-center space-y-2">
                    <Camera size={28} className="text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                      Belum ada foto bukti untuk fase {docPhase}
                    </p>
                    <p className="text-[11px] text-slate-400 font-sans max-w-xs mx-auto">
                      Gunakan tombol <strong>Buka Kamera HP</strong> di atas untuk memotret kondisi laboratorium.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {docPhotos[docPhase].map((photo) => (
                      <div
                        key={photo.id}
                        className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 aspect-video shadow-xs"
                      >
                        <img
                          src={photo.url}
                          alt={photo.note}
                          onClick={() => setDocZoomPhoto(photo.url)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 text-white flex items-center justify-between text-[10px] font-mono">
                          <span className="truncate pr-1">{photo.time}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteDocPhoto(docPhase, photo.id)}
                            className="p-1 rounded bg-rose-600/80 hover:bg-rose-600 text-white shrink-0 transition-colors cursor-pointer"
                            title="Hapus foto ini"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info SOP Lab Standar */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-400 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-mono text-[11px]">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Standar Audit Dokumentasi Shift EDM</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Setiap shift praktikum wajib melampirkan minimal 1 foto kesiapan awal, 1 foto asistensi aktif, dan 1 foto penutupan lab sebelum shift asisten berikutnya dimulai.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Zoom Foto */}
            {docZoomPhoto && (
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setDocZoomPhoto(null)}
              >
                <div className="relative max-w-4xl max-h-[90vh] bg-slate-950 rounded-2xl overflow-hidden border border-white/20 p-2">
                  <button
                    type="button"
                    onClick={() => setDocZoomPhoto(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white cursor-pointer z-10"
                  >
                    <X size={18} />
                  </button>
                  <img
                    src={docZoomPhoto}
                    alt="Zoom Dokumentasi"
                    className="max-w-full max-h-[85vh] object-contain rounded-xl"
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* 5. PERTUKARAN JADWAL TAB (SHIFT SWAP ENGINE) */}
        {/* 5. JADWAL SAYA TAB (Clean & Simple Layout Matching Image 2) */}
        {activeTab === "jadwal_saya" && (
          <div className="space-y-6">
            {/* Header: Title & Sumber Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center tracking-tight">
                Jadwal Saya<span className="text-[#F97316]">.</span>
              </h1>

              <button
                type="button"
                onClick={() => switchTab("jadwal_praktikum")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#0e071a] border border-slate-200/80 dark:border-purple-950/60 text-xs font-semibold text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-purple-950/30 transition-colors shadow-2xs font-mono cursor-pointer"
              >
                <span>Sumber</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </button>
            </div>

            {/* Main Card Container */}
            <div className="bg-white dark:bg-[#0e071a] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
              {/* Card Sub-Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Kelas penugasan
                  </h2>
                  <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center">
                    {myAssistantShifts.length}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-neutral-500">
                  Waktu mulai · WIB
                </div>
              </div>

              {/* Status Subtitle Banner */}
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>SUDAH SELESAI MINGGU INI</span>
              </div>

              {/* List of Class Rows (Matching Image 2) */}
              <div className="space-y-3">
                {myAssistantShifts.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800 text-center space-y-2">
                    <Calendar size={28} className="text-purple-500 mx-auto opacity-70" />
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      Belum ada kelas penugasan untuk asisten {currentAssistantProfile.code}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans">
                      Silakan periksa jadwal keseluruhan di menu Jadwal Praktikum.
                    </p>
                  </div>
                ) : (
                  myAssistantShifts.map((item) => {
                    const isExpanded = expandedShiftId === item.shiftNum;
                    return (
                      <div
                        key={`${item.shiftNum}-${item.classCode}-${item.group}`}
                        className="rounded-2xl border border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/30 hover:bg-white dark:hover:bg-neutral-900/80 hover:border-purple-200 dark:hover:border-purple-900/50 transition-all p-4 sm:p-5 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Left: Pill & Class Details */}
                          <div className="flex items-center gap-4">
                            {/* Day & Start Time Pill */}
                            <div
                              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border shadow-2xs ${item.pillColor}`}
                            >
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                                {item.dayAbbr}
                              </span>
                              <span className="text-xs font-mono font-black">{item.startTime}</span>
                            </div>

                            {/* Class Info */}
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-base text-slate-900 dark:text-white">
                                  {item.classCode}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  {item.status}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mt-1 font-mono">
                                <Clock size={13} className="text-slate-400" />
                                <span>
                                  {item.day} · SHIFT {item.shiftNum} · Grup {item.group}
                                </span>
                                {item.isPindahan && (
                                  <span className="text-[9px] font-mono font-extrabold uppercase bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 px-1.5 py-0.5 rounded tracking-wider">
                                    PINDAHAN
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right: Buka Button & Accordion Toggle */}
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedClassCode(item.rawClassCode || item.classCode.replace("-", ""));
                                switchTab("praktikan");
                              }}
                              className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#7C3AED] dark:hover:bg-[#6D28D9] text-white px-5 py-2 rounded-full font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                            >
                              Buka
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedShiftId(isExpanded ? null : item.shiftNum)
                              }
                              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                              title="Tampilkan detail sesi"
                            >
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Accordion Expansion Details */}
                        {isExpanded && (
                          <div className="pt-3 border-t border-slate-200/70 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-300 space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <MapPin size={13} className="text-[#7C3AED]" />
                                <span>{item.room}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock size={13} className="text-[#7C3AED]" />
                                <span>{item.timeDisplay} WIB</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users size={13} className="text-[#7C3AED]" />
                                <span>
                                  Grup {item.group} • {item.studentCount} Praktikan
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. PERTUKARAN JADWAL TAB (SHIFT SWAP ENGINE) */}
        {(activeTab === "pertukaran_shift" || activeTab === "swap") && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pertukaran Jadwal (Shift Swap Engine)</h2>
                  <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                    EDM LAB • SI&apos;50
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                  Matriks resmi permohonan dan pertukaran jadwal jaga asisten praktikum Algoritma &amp; Pemrograman 2026/2027.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold flex items-center gap-2">
                  <ShieldCheck size={14} />
                  {swaps.filter((s) => s.status === "APPROVED").length} Pertukaran Aktif Disetujui
                </span>
              </div>
            </div>

            {/* Form Pengajuan Pertukaran Jadwal (Mirroring the Spreadsheet Fields) */}
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-5 transition-colors">
              <div className="border-b border-slate-100 dark:border-neutral-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ArrowLeftRight size={18} className="text-[#7C3AED]" />
                    Formulir Pengajuan Pertukaran Shift
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                    Tentukan data asisten yang mengajukan serta asisten pengganti sesuai plottingan 15 shift.
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 px-2.5 py-1 rounded-md font-bold">
                  SOP EDM-ALPRO
                </span>
              </div>

              <form onSubmit={handleAddSwap} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Bagian 1: Asprak yang Mengajukan (Blue-tinted box) */}
                  <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/50 space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-sky-200/60 dark:border-sky-900/40">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                        Asprak yang Mengajukan
                      </span>
                      <span className="text-[10px] font-mono text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 rounded font-bold">
                        Pemohon
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                        Nama Lengkap &amp; Kode Asprak
                      </label>
                      <select
                        value={requesterCode}
                        onChange={(e) => setRequesterCode(e.target.value)}
                        className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 cursor-pointer shadow-2xs"
                      >
                        {ALPRO_ASSISTANTS.map((asst) => (
                          <option key={`req-${asst.code}`} value={asst.code}>
                            [{asst.code}] {asst.name} — {asst.position}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Shift Asal (Ditinggalkan)
                        </label>
                        <select
                          value={shiftSourceNum}
                          onChange={(e) => setShiftSourceNum(Number(e.target.value))}
                          className="w-full bg-white dark:bg-neutral-800 border border-emerald-300 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer shadow-2xs"
                        >
                          {ALPRO_15_SHIFTS.map((s) => (
                            <option key={`src-shift-${s.shiftNumber}`} value={s.shiftNumber}>
                              SHIFT {s.shiftNumber} • {s.classCode} ({s.day}, {s.timeDisplay})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          Shift Tujuan (Diambil)
                        </label>
                        <select
                          value={shiftTargetNum}
                          onChange={(e) => setShiftTargetNum(Number(e.target.value))}
                          className="w-full bg-white dark:bg-neutral-800 border border-sky-300 dark:border-sky-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer shadow-2xs"
                        >
                          {ALPRO_15_SHIFTS.map((s) => (
                            <option key={`tgt-shift-${s.shiftNumber}`} value={s.shiftNumber}>
                              SHIFT {s.shiftNumber} • {s.classCode} ({s.day}, {s.timeDisplay})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bagian 2: Asprak Pengganti (Green-tinted box) */}
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-900/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          Asprak Pengganti
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded font-bold">
                          Pengganti
                        </span>
                      </div>

                      <div className="space-y-1.5 mt-3">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                          Nama Lengkap &amp; Kode Asprak Pengganti
                        </label>
                        <select
                          value={replacementCode}
                          onChange={(e) => setReplacementCode(e.target.value)}
                          className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 cursor-pointer shadow-2xs"
                        >
                          {ALPRO_ASSISTANTS.filter((a) => a.code !== requesterCode).map((asst) => (
                            <option key={`rep-${asst.code}`} value={asst.code}>
                              [{asst.code}] {asst.name} — {asst.position}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5 mt-3">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                          Alasan / Catatan Pertukaran
                        </label>
                        <input
                          type="text"
                          value={swapNote}
                          onChange={(e) => setSwapNote(e.target.value)}
                          placeholder="Contoh: Bentrok kuliah pengganti, urusan dinas organisasi, dsb."
                          className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <ArrowLeftRight size={15} />
                        Ajukan Pertukaran Jadwal
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Official Table Matching Spreadsheet Image (media_1793460693411_6d5e38e9.png) */}
            <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-neutral-800 pb-3">
                <div>
                  <h3 className="font-mono text-xs text-slate-800 dark:text-neutral-200 uppercase tracking-widest font-bold flex items-center gap-2">
                    <FileText size={15} className="text-[#7C3AED]" />
                    Matriks Rekapitulasi Pertukaran Jadwal Asprak
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5">
                    Data sinkron dengan lembar kerja resmi Laboratorium Enterprise Data Management (EDM).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                    Total: <strong className="text-slate-800 dark:text-white">{swaps.length}</strong> pengajuan
                  </span>
                </div>
              </div>

              {/* Table Container with Horizontal Scroll */}
              <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-neutral-700">
                <table className="w-full border-collapse text-left text-xs font-mono">
                  {/* Top Header Group */}
                  <thead>
                    <tr>
                      <th
                        colSpan={4}
                        className="bg-[#99c0ec] text-[#0f2e59] dark:bg-sky-950 dark:text-sky-200 border-b border-r border-slate-300 dark:border-neutral-700 py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider"
                      >
                        Asprak yang Mengajukan
                      </th>
                      <th
                        colSpan={2}
                        className="bg-[#c2dfb8] text-[#1a4413] dark:bg-emerald-950 dark:text-emerald-200 border-b border-r border-slate-300 dark:border-neutral-700 py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider"
                      >
                        Asprak Pengganti
                      </th>
                      <th
                        colSpan={2}
                        className="bg-slate-200 text-slate-800 dark:bg-neutral-800 dark:text-neutral-200 border-b border-slate-300 dark:border-neutral-700 py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider"
                      >
                        Status &amp; Validasi
                      </th>
                    </tr>

                    {/* Sub Header */}
                    <tr className="border-b border-slate-300 dark:border-neutral-700">
                      {/* Under Asprak yang Mengajukan */}
                      <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs whitespace-nowrap min-w-[200px]">
                        Nama Lengkap
                      </th>
                      <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[100px]">
                        Kode Asprak
                      </th>
                      <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[140px]">
                        Shift Asal
                      </th>
                      <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[140px]">
                        Shift Tujuan
                      </th>

                      {/* Under Asprak Pengganti */}
                      <th className="bg-[#fdecae] text-[#5c3e03] dark:bg-amber-950/70 dark:text-amber-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs whitespace-nowrap min-w-[200px]">
                        Nama Lengkap
                      </th>
                      <th className="bg-[#fdecae] text-[#5c3e03] dark:bg-amber-950/70 dark:text-amber-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[100px]">
                        Kode Asprak
                      </th>

                      {/* Under Status & Validasi */}
                      <th className="bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[110px]">
                        Status
                      </th>
                      <th className="bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[90px]">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  {/* Rows */}
                  <tbody className="divide-y divide-slate-200 dark:divide-neutral-800 bg-white dark:bg-[#0c0516]">
                    {swaps.map((row) => {
                      const srcInfo = getShiftDetails(row.shiftSource);
                      const tgtInfo = getShiftDetails(row.shiftTarget);
                      return (
                        <tr
                          key={row.id}
                          className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors"
                        >
                          {/* Nama Lengkap Pemohon */}
                          <td className="py-3 px-3.5 border-r border-slate-200 dark:border-neutral-800">
                            <div className="font-semibold text-slate-900 dark:text-white font-sans text-xs">
                              {row.requesterName}
                            </div>
                            {row.note && (
                              <div className="text-[10px] text-slate-500 dark:text-neutral-400 italic mt-0.5 line-clamp-1">
                                {row.note}
                              </div>
                            )}
                          </td>

                          {/* Kode Asprak Pemohon */}
                          <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                            <span className="inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-purple-100/70 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                              {row.requesterCode}
                            </span>
                          </td>

                          {/* Shift Asal (Green Badge with Caret matching Image) */}
                          <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                            <div className="inline-flex flex-col items-center gap-1">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#c7e9bf] text-[#1b5e20] dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-400/80 dark:border-emerald-700 shadow-2xs">
                                SHIFT {row.shiftSource}
                                <ChevronDown size={12} className="text-[#1b5e20] dark:text-emerald-300" />
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                                {srcInfo.classCode} ({srcInfo.day})
                              </span>
                            </div>
                          </td>

                          {/* Shift Tujuan (Blue Badge with Caret matching Image) */}
                          <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                            <div className="inline-flex flex-col items-center gap-1">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#badbfb] text-[#0d47a1] dark:bg-sky-950/80 dark:text-sky-300 border border-sky-400/80 dark:border-sky-700 shadow-2xs">
                                SHIFT {row.shiftTarget}
                                <ChevronDown size={12} className="text-[#0d47a1] dark:text-sky-300" />
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                                {tgtInfo.classCode} ({tgtInfo.day})
                              </span>
                            </div>
                          </td>

                          {/* Nama Lengkap Pengganti */}
                          <td className="py-3 px-3.5 border-r border-slate-200 dark:border-neutral-800">
                            <div className="font-semibold text-slate-900 dark:text-white font-sans text-xs">
                              {row.replacementName}
                            </div>
                          </td>

                          {/* Kode Asprak Pengganti */}
                          <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                            <span className="inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {row.replacementCode}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                            {row.status === "APPROVED" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 size={11} />
                                Disetujui
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                <Clock size={11} />
                                Menunggu
                              </span>
                            )}
                          </td>

                          {/* Aksi */}
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleToggleSwapStatus(row.id)}
                                title={row.status === "APPROVED" ? "Tandai sebagai Menunggu" : "Setujui Permohonan"}
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 transition-colors"
                              >
                                <Check size={13} className={row.status === "APPROVED" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSwap(row.id)}
                                title="Hapus catatan pertukaran"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. JADWAL PRAKTIKUM TAB (Full Matrix Timetable 26/27 matching Image 1) */}
        {activeTab === "jadwal_praktikum" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      Jadwal Praktikum ALPRO 26/27
                    </h2>
                    <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
                      15 Shift • Senin s.d. Sabtu
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                    Matriks plotting jadwal praktikum dan penugasan shift asisten semester ganjil 2026/2027.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/assistant/presensi-asprak"
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Camera size={13} />
                    <span>Presensi Asprak ↗</span>
                  </Link>
                </div>
              </div>

              {/* TIMETABLE MATRIX TABLE */}
              <div className="border border-slate-300 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
                {/* Main Blue Header Banner matching Image 1 */}
                <div className="bg-[#1E3A8A] text-white py-3.5 px-6 text-center font-black tracking-widest text-sm uppercase">
                  JADWAL PRAKTIKUM ALPRO 26/27
                </div>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full border-collapse text-xs text-center min-w-[900px]">
                    <thead>
                      <tr className="bg-[#2563EB] text-white font-mono text-xs uppercase font-bold divide-x divide-blue-400/40">
                        <th className="py-2.5 px-3 w-28">JAM</th>
                        <th className="py-2.5 px-3">SENIN</th>
                        <th className="py-2.5 px-3">SELASA</th>
                        <th className="py-2.5 px-3">RABU</th>
                        <th className="py-2.5 px-3">KAMIS</th>
                        <th className="py-2.5 px-3">JUMAT</th>
                        <th className="py-2.5 px-3">SABTU</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-neutral-800 font-sans">
                      {/* Slot 1: 06.30 - 07.30 */}
                      <tr className="divide-x divide-slate-200 dark:divide-neutral-800 h-10 text-[11px] font-mono text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-neutral-900/30">
                        <td className="font-bold bg-slate-100 dark:bg-neutral-900">06.30-07.30</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      {/* Slot 2: 07.30 - 09.30 (Shift 1, 4, 9, 11, 13) */}
                      <tr className="divide-x divide-slate-200 dark:divide-neutral-800 h-24">
                        <td className="font-mono text-[11px] font-bold text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900">
                          07.30-09.30
                        </td>
                        {/* SENIN: SHIFT 1 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => setSelectedShiftForModal(1)}
                            className="w-full h-full p-2.5 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950/80 dark:hover:bg-blue-900/80 border border-blue-300 dark:border-blue-700 text-blue-950 dark:text-blue-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 1</div>
                            <div className="font-bold text-sm text-blue-900 dark:text-blue-200">(SI-50-12)</div>
                            <div className="text-[10px] font-mono text-blue-700 dark:text-blue-300 mt-1">7 Grup (ADDH, IPGA, ...)</div>
                          </button>
                        </td>
                        {/* SELASA: SHIFT 4 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => setSelectedShiftForModal(4)}
                            className="w-full h-full p-2.5 rounded-xl bg-teal-100 hover:bg-teal-200 dark:bg-teal-950/80 dark:hover:bg-teal-900/80 border border-teal-300 dark:border-teal-700 text-teal-950 dark:text-teal-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 4</div>
                            <div className="font-bold text-sm text-teal-900 dark:text-teal-200">(SI-50-04)</div>
                            <div className="text-[10px] font-mono text-teal-700 dark:text-teal-300 mt-1">7 Grup (MUDI, MACY, ...)</div>
                          </button>
                        </td>
                        {/* RABU: EMPTY */}
                        <td></td>
                        {/* KAMIS: SHIFT 9 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(9);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-rose-200 hover:bg-rose-300 dark:bg-rose-950/80 dark:hover:bg-rose-900/80 border border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 9</div>
                            <div className="font-bold text-sm text-rose-900 dark:text-rose-200">(SI-50-03)</div>
                            <div className="text-[10px] font-mono text-rose-700 dark:text-rose-300 mt-1">7 Grup (HAFK, ALRS, ...)</div>
                          </button>
                        </td>
                        {/* JUMAT: SHIFT 11 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(11);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-sky-200 hover:bg-sky-300 dark:bg-sky-950/80 dark:hover:bg-sky-900/80 border border-sky-300 dark:border-sky-700 text-sky-950 dark:text-sky-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 11</div>
                            <div className="font-bold text-sm text-sky-900 dark:text-sky-200">(SI-50-01)</div>
                            <div className="text-[10px] font-mono text-sky-700 dark:text-sky-300 mt-1">7 Grup (AITS, ALRS, ...)</div>
                          </button>
                        </td>
                        {/* SABTU: SHIFT 13 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(13);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-blue-200 hover:bg-blue-300 dark:bg-blue-950/80 dark:hover:bg-blue-900/80 border border-blue-300 dark:border-blue-700 text-blue-950 dark:text-blue-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 13</div>
                            <div className="font-bold text-sm text-blue-900 dark:text-blue-200">(SI-50-INT)</div>
                            <div className="text-[10px] font-mono text-blue-700 dark:text-blue-300 mt-1">3 Grup (RAZA, FAAA, ...)</div>
                          </button>
                        </td>
                      </tr>

                      {/* Slot 3: 09.30 - 11.30 (Shift 7 Rabu) */}
                      <tr className="divide-x divide-slate-200 dark:divide-neutral-800 h-24">
                        <td className="font-mono text-[11px] font-bold text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900">
                          09.30-11.30
                        </td>
                        <td></td>
                        <td></td>
                        {/* RABU: SHIFT 7 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(7);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 7</div>
                            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200">(SI-50-13)</div>
                            <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 mt-1">6 Grup (DEVO, GRGS, ...)</div>
                          </button>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      {/* Slot 4: 10.30 - 12.30 (Shift 2, 5, 14) */}
                      <tr className="divide-x divide-slate-200 dark:divide-neutral-800 h-24">
                        <td className="font-mono text-[11px] font-bold text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900">
                          10.30-12.30
                        </td>
                        {/* SENIN: SHIFT 2 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(2);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-rose-200 hover:bg-rose-300 dark:bg-rose-950/80 dark:hover:bg-rose-900/80 border border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 2</div>
                            <div className="font-bold text-sm text-rose-900 dark:text-rose-200">(SI-50-02)</div>
                            <div className="text-[10px] font-mono text-rose-700 dark:text-rose-300 mt-1">7 Grup (GRGS, DEVO, ...)</div>
                          </button>
                        </td>
                        {/* SELASA: SHIFT 5 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(5);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-teal-100 hover:bg-teal-200 dark:bg-teal-950/80 dark:hover:bg-teal-900/80 border border-teal-300 dark:border-teal-700 text-teal-950 dark:text-teal-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 5</div>
                            <div className="font-bold text-sm text-teal-900 dark:text-teal-200">(SI-50-09)</div>
                            <div className="text-[10px] font-mono text-teal-700 dark:text-teal-300 mt-1">7 Grup (TICS, SYOW, ...)</div>
                          </button>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {/* SABTU: SHIFT 14 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(14);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 14</div>
                            <div className="font-bold text-sm text-slate-800 dark:text-neutral-200">(SI-50-07)</div>
                            <div className="text-[10px] font-mono text-slate-600 dark:text-neutral-400 mt-1">7 Grup (IREM, NNUA, ...)</div>
                          </button>
                        </td>
                      </tr>

                      {/* Slot 5: 13.30 - 15.30 (Shift 8 Rabu, Shift 12 Jumat) */}
                      <tr className="divide-x divide-slate-200 dark:divide-neutral-800 h-24">
                        <td className="font-mono text-[11px] font-bold text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900">
                          13.30-15.30
                        </td>
                        <td></td>
                        <td></td>
                        {/* RABU: SHIFT 8 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(8);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-orange-200 hover:bg-orange-300 dark:bg-orange-950/80 dark:hover:bg-orange-900/80 border border-orange-300 dark:border-orange-700 text-orange-950 dark:text-orange-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 8</div>
                            <div className="font-bold text-sm text-orange-900 dark:text-orange-200">(SI-50-05)</div>
                            <div className="text-[10px] font-mono text-orange-700 dark:text-orange-300 mt-1">7 Grup (MJFA, MACY, ...)</div>
                          </button>
                        </td>
                        <td></td>
                        {/* JUMAT: SHIFT 12 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(12);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-amber-200 hover:bg-amber-300 dark:bg-amber-950/80 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 12</div>
                            <div className="font-bold text-sm text-amber-900 dark:text-amber-200">(SI-50-08)</div>
                            <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1">7 Grup (ADRP, INTC, ...)</div>
                          </button>
                        </td>
                        <td></td>
                      </tr>

                      {/* Slot 6: 14.30 - 16.30 (Shift 3, 6, 10, 15) */}
                      <tr className="divide-x divide-slate-200 dark:divide-neutral-800 h-24">
                        <td className="font-mono text-[11px] font-bold text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900">
                          14.30-16.30
                        </td>
                        {/* SENIN: SHIFT 3 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(3);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900/80 border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 3</div>
                            <div className="font-bold text-sm text-rose-900 dark:text-rose-200">(SI-50-11)</div>
                            <div className="text-[10px] font-mono text-rose-700 dark:text-rose-300 mt-1">7 Grup (TICS, LAUF, ...)</div>
                          </button>
                        </td>
                        {/* SELASA: SHIFT 6 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(6);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 6</div>
                            <div className="font-bold text-sm text-amber-900 dark:text-amber-200">(SI-50-10)</div>
                            <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1">7 Grup (IPGA, ADRP, ...)</div>
                          </button>
                        </td>
                        <td></td>
                        {/* KAMIS: SHIFT 10 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(10);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/80 dark:hover:bg-purple-900/80 border border-purple-300 dark:border-purple-700 text-purple-950 dark:text-purple-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 10</div>
                            <div className="font-bold text-sm text-purple-900 dark:text-purple-200">(SI-50-06)</div>
                            <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300 mt-1">7 Grup (RAAP, ARSM, ...)</div>
                          </button>
                        </td>
                        <td></td>
                        {/* SABTU: SHIFT 15 */}
                        <td className="p-1.5 align-top">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedShiftForModal(15);
                              setSelectedModalGroup(null);
                            }}
                            className="w-full h-full p-2.5 rounded-xl bg-rose-300/80 hover:bg-rose-300 dark:bg-rose-950 dark:hover:bg-rose-900 border border-rose-400 dark:border-rose-600 text-rose-950 dark:text-rose-100 font-sans text-left transition-all cursor-pointer shadow-xs"
                          >
                            <div className="font-black text-xs">SHIFT 15</div>
                            <div className="font-bold text-sm text-rose-900 dark:text-rose-200">(SI-50-14)</div>
                            <div className="text-[10px] font-mono text-rose-700 dark:text-rose-300 mt-1">7 Grup (MACY, MUNR, ...)</div>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MODAL POPUP: DETAIL PLOTTING SHIFT */}
              {selectedShiftForModal && (() => {
                const shiftDetail = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftForModal);
                const plottingDetail = ALL_SHIFT_PLOTTINGS[selectedShiftForModal];

                return (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] border border-slate-200 dark:border-purple-950 max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                        <div>
                          <div className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 uppercase">
                            DETAIL PLOTTING RESMI
                          </div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white">
                            SHIFT {shiftDetail?.shiftNumber}: {shiftDetail?.className}
                          </h3>
                          <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-0.5">
                            {shiftDetail?.day}, {shiftDetail?.timeDisplay} WIB • {shiftDetail?.room}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedShiftForModal(null)}
                          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-700 dark:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      {plottingDetail && plottingDetail.isFinalized ? (
                        <div className="space-y-4">
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                            <span>Daftar Asisten &amp; Grup Mahasiswa:</span>
                            <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                              ✓ Terverifikasi SK Plotting
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {plottingDetail.assistants.map((asst) => {
                              const profile = getAssistantByCode(asst.assistantCode);
                              const isSelected = selectedModalGroup === asst.group;
                              return (
                                <button
                                  type="button"
                                  key={asst.group}
                                  onClick={() => setSelectedModalGroup(isSelected ? null : asst.group)}
                                  className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-purple-100 dark:bg-purple-950/80 border-purple-400 dark:border-purple-600 ring-2 ring-purple-500/30"
                                      : "bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-800"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-purple-700 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                      {asst.assistantCode}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <span>Grup {asst.group}</span>
                                        <span className="text-[10px] font-normal text-slate-500">({asst.studentCount} praktikan)</span>
                                      </div>
                                      <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 truncate max-w-[140px]">
                                        {profile?.name || asst.assistantCode}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200">
                                      {profile?.role || "ASPRAK"}
                                    </span>
                                    <span className="text-[9px] font-mono text-purple-700 dark:text-purple-300">
                                      {isSelected ? "Tutup ▲" : "Lihat Praktikan ▼"}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* EXPANDED STUDENT LIST FOR SELECTED GROUP */}
                          {selectedModalGroup && (
                            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2.5 animate-fade-in">
                              <div className="flex items-center justify-between text-xs font-bold text-purple-950 dark:text-purple-200 border-b border-purple-200/60 dark:border-purple-900/40 pb-2">
                                <span>Daftar Praktikan Grup {selectedModalGroup}:</span>
                                <button
                                  type="button"
                                  onClick={() => setSelectedModalGroup(null)}
                                  className="text-[10px] font-mono text-purple-700 dark:text-purple-300 hover:underline cursor-pointer"
                                >
                                  Tutup List ✕
                                </button>
                              </div>
                              <div className="max-h-48 overflow-y-auto space-y-1.5 divide-y divide-purple-100 dark:divide-purple-900/30 pr-1">
                                {plottingDetail.students
                                  .filter((s) => s.group === selectedModalGroup)
                                  .map((s, idx) => (
                                    <div key={s.nim} className="pt-1.5 flex items-center justify-between text-[11px]">
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="font-mono text-slate-400 text-[10px] w-4">{idx + 1}.</span>
                                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{s.nim}</span>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[240px]">{s.name}</span>
                                      </div>
                                      <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold shrink-0">{s.className}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (shiftDetail) setSelectedClassCode(shiftDetail.classCode);
                                switchTab("absensi");
                                setSelectedShiftForModal(null);
                              }}
                              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer"
                            >
                              Buka Absensi Kelas Ini →
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 text-center space-y-2 bg-slate-50 dark:bg-neutral-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-neutral-700">
                          <Info size={28} className="text-amber-500 mx-auto" />
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Data Plotting Grup Menyusul
                          </div>
                          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-md mx-auto">
                            Data asisten penanggung jawab per grup praktikan untuk Shift {selectedShiftForModal} ({shiftDetail?.className}) sedang diproses oleh Koordinator Praktikum &amp; BPH.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}



        {/* MODUL & SILABUS TAB */}
        {(activeTab === "modul" || activeTab === "informasi") && (
          <div className="space-y-6">
            {/* Header matching Image 4 */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Informasi Praktikan<span className="text-orange-500">.</span>
              </h1>
            </div>

            {/* Filter Pills & Search Bar matching Image 4 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-white dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold shadow-xs border border-slate-200/80 dark:border-white/10 cursor-pointer"
                >
                  Aktif
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 text-xs font-medium hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>

              {/* Search Bar matching Image 4 */}
              <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={studentInfoSearch}
                  onChange={(e) => setStudentInfoSearch(e.target.value)}
                  placeholder="Nama / NIM"
                  className="w-full pl-11 pr-10 py-2.5 bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 rounded-full text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-xs"
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Filter size={14} />
                </button>
              </div>
            </div>

            {/* Sub-header & Records matching Image 4 */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 space-y-0.5">
                <div className="font-semibold text-slate-600 dark:text-neutral-300">Modul 1</div>
                <div>{studentInfoRecords.length} catatan</div>
              </div>

              {studentInfoRecords.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs text-center space-y-2">
                  <Info size={26} className="text-purple-500 mx-auto opacity-70" />
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Belum ada catatan informasi praktikan
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans max-w-sm mx-auto">
                    Seluruh praktikan saat ini tercatat mengikuti jadwal shift reguler tanpa kendala atau perpindahan shift.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {studentInfoRecords
                    .filter(
                      (item) =>
                        item.name.toLowerCase().includes(studentInfoSearch.toLowerCase()) ||
                        item.detail.toLowerCase().includes(studentInfoSearch.toLowerCase())
                    )
                    .map((item) => (
                      <div
                        key={item.name}
                        className="p-4 rounded-2xl bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs flex items-center justify-between gap-4 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-tight truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                            {item.detail}
                          </div>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold font-mono shrink-0 ${
                            item.type === "danger"
                              ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. LAPORAN KECURANGAN TAB matching Image 5 */}
        {activeTab === "komdis" && (
          <div className="space-y-6">
            {/* Header matching Image 5 */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Laporan Kecurangan<span className="text-orange-500">.</span>
              </h1>
            </div>

            {/* Filter Pill & Search Bar matching Image 5 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-white dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold shadow-xs border border-slate-200/80 dark:border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <Flag size={13} className="text-purple-600" />
                  <span>Semua laporan</span>
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold flex items-center justify-center">
                    {cheatingReports.length}
                  </span>
                </button>
              </div>

              {/* Search Bar matching Image 5 */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={cheatingSearchQuery}
                    onChange={(e) => setCheatingSearchQuery(e.target.value)}
                    placeholder="Nama, NIM, asisten..."
                    className="w-full pl-11 pr-10 py-2.5 bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 rounded-full text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-xs"
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <Filter size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCheatingSearchQuery("")}
                  className="w-10 h-10 rounded-full bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-purple-600 shadow-xs cursor-pointer shrink-0"
                >
                  <RotateCw size={15} />
                </button>
              </div>
            </div>

            {/* Reports Grid matching Image 5 */}
            {cheatingReports.length === 0 ? (
              <div className="bg-white dark:bg-[#120824] rounded-2xl p-8 border border-slate-200/80 dark:border-purple-900/40 text-center space-y-2 shadow-xs">
                <ShieldCheck size={32} className="text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  Tidak ada laporan kecurangan
                </p>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans max-w-sm mx-auto">
                  Sistem pengawasan praktikum ALPRO bersih. Belum ada catatan indikasi kecurangan atau pelanggaran integritas akademik.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cheatingReports
                  .filter((rep) =>
                    !cheatingSearchQuery ||
                    rep.name?.toLowerCase().includes(cheatingSearchQuery.toLowerCase()) ||
                    rep.nim?.includes(cheatingSearchQuery) ||
                    rep.reporter?.toLowerCase().includes(cheatingSearchQuery.toLowerCase())
                  )
                  .map((rep) => (
                    <div
                      key={rep.id || rep.nim}
                      className="p-5 rounded-2xl bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                          {rep.status || "Terbuka"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-tight leading-snug">
                          {rep.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {rep.nim} · {rep.cls} · {rep.mod}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-1">
                        <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                          {rep.viol}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {rep.reporter} · {rep.time}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* 6. AKUN ASISTEN TAB - Full Modern Profile Page */}
        {activeTab === "akun" && (
          <div className="space-y-6">
            {/* Profile Header Card with Cover Banner & Avatar */}
            <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] border border-slate-200/80 dark:border-purple-950/60 shadow-xs overflow-hidden transition-colors">
              {/* Cover Banner with Official EDM 3 Mascots Panorama */}
              <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden bg-[#ECE8F8] dark:bg-[#1C0D38]">
                <Image
                  src="/images/edm-3maskot-banner.png"
                  alt="EDM Laboratory 3 Mascots Banner"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3.5 right-4 flex items-center gap-2 z-10">
                  <span className="text-[11px] font-mono font-bold text-purple-950 dark:text-purple-200 bg-white/85 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200/70 dark:border-purple-800/60 shadow-xs">
                    R1 Lantai 8 TULT • EDM Lab
                  </span>
                </div>
              </div>

              {/* Profile Details & Avatar Bar */}
              <div className="px-5 sm:px-8 pb-6 pt-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-12 sm:-mt-14 mb-5 relative z-10">
                  {/* Large Avatar & Name Information */}
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 p-1 shadow-xl ring-4 ring-white dark:ring-[#0e071a]">
                        <div className="w-full h-full rounded-xl bg-purple-950 flex items-center justify-center text-white text-3xl sm:text-4xl font-black font-mono shadow-inner">
                          {sessionUser.slice(0, 2)}
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-3 ring-white dark:ring-[#0e071a] animate-pulse" title="Sesi Aktif Online" />
                    </div>

                    <div className="space-y-1.5 pb-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                          {currentAssistantProfile.name}
                        </h2>
                        <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-lg border border-purple-300 dark:border-purple-800">
                          {currentAssistantProfile.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono flex items-center gap-1.5 flex-wrap">
                        <span>NIM: <strong className="text-slate-900 dark:text-neutral-200">{currentAssistantProfile.nim}</strong></span>
                        <span className="text-slate-300 dark:text-neutral-700">•</span>
                        <span>Kelas Asal: <strong className="text-slate-900 dark:text-neutral-200">{currentAssistantProfile.originClass}</strong></span>
                        <span className="text-slate-300 dark:text-neutral-700">•</span>
                        <span>Telkom University</span>
                      </p>
                      <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                        <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200/80 dark:border-purple-800/80">
                          {currentAssistantProfile.position} ({currentAssistantProfile.division})
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Aktif Mengajar 2026/2027
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => alert("Profil telah disinkronkan dengan Data Asisten Resmi EDM Laboratory Telkom University.")}
                      className="px-4 py-2 rounded-xl border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <Edit3 size={14} />
                      <span>Data Resmi</span>
                    </button>
                  </div>
                </div>

                {/* Quick Performance & Assignment Stats Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-neutral-800 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Divisi Lab</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate">{currentAssistantProfile.division}</div>
                    <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">{currentAssistantProfile.position}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Total Mahasiswa</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">568 Mhs</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">15 Kelas SI&apos;50</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">ID LINE</div>
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">{currentAssistantProfile.lineId}</div>
                    <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono">Kontak Asisten</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Tim Laboratorium</div>
                    <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-0.5">32 Asisten</div>
                    <div className="text-[10px] text-purple-600 font-mono">EDM Laboratory</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Data Diri & Kontak Asisten */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-5 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-purple-600 dark:text-purple-400" />
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider">
                      Informasi Asisten Praktikum
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 font-bold">
                    EDM Lab Official
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Nama Lengkap</div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {currentAssistantProfile.name}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Kode Lab / ID Asisten</div>
                    <div className="font-mono font-bold text-purple-700 dark:text-purple-300">{currentAssistantProfile.code}</div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Nomor Induk Mahasiswa (NIM)</div>
                    <div className="font-mono font-semibold text-slate-900 dark:text-white">
                      {currentAssistantProfile.nim}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Kelas Asal • Angkatan</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{currentAssistantProfile.originClass} • S1 Sistem Informasi</div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <Mail size={12} />
                      <span>Email Student Telkom</span>
                    </div>
                    <div className="font-mono text-slate-800 dark:text-slate-200 truncate" title={currentAssistantProfile.studentEmail}>
                      {currentAssistantProfile.studentEmail}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <Mail size={12} />
                      <span>Email Pribadi</span>
                    </div>
                    <div className="font-mono text-slate-800 dark:text-slate-200 truncate" title={currentAssistantProfile.personalEmail}>
                      {currentAssistantProfile.personalEmail}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <Phone size={12} />
                      <span>No. WhatsApp / HP</span>
                    </div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {currentAssistantProfile.phone}
                    </div>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-slate-50/70 dark:bg-neutral-900/40 border border-slate-100 dark:border-neutral-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">ID LINE</div>
                    <div className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      @{currentAssistantProfile.lineId}
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
                    {currentRole === "SUPER_ADMIN"
                      ? "Super Admin (MACY): Otoritas tertinggi sistem, kendali penuh seluruh modul, inventaris, perizinan, dan penugasan laboratorium."
                      : currentRole === "ADMIN"
                      ? "Administrator (Executive Board & Compliance and Integrity): Akses penuh inventaris, rekap kehadiran, pembukuan kas, serta tata tertib komdis."
                      : "Asisten Praktikum (Asprak Biasa): Pengampu shift materi praktikum, bimbingan modul, penilaian, dan live rating."}
                  </p>

                  {/* Simulasi Role Switcher with Clean Pills */}
                  <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 space-y-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Tingkat Hak Akses Pengguna:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["SUPER_ADMIN", "ADMIN", "ASPRAK"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setCurrentRole(r)}
                          className={`py-2 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
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
                      <span className="text-slate-500 dark:text-neutral-400 font-mono">Kata Sandi Akun</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white tracking-widest">
                        ••••••••••••
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

            {/* FULL 32-ASSISTANT DIRECTORY TABLE (Admin Only Access) */}
            {currentRole === "SUPER_ADMIN" || currentRole === "ADMIN" || currentRole === "KOMDIS" || currentRole === "SEKBEN" ? (
              <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-5 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Direktori Tim Asisten & Divisi Laboratorium EDM
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-2.5 py-0.5 rounded-full">
                        32 Asisten Resmi
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                      Daftar lengkap seluruh asisten praktikum Algoritma & Pemrograman beserta divisi, kontak WhatsApp, dan ID Line.
                    </p>
                  </div>

                  {/* Search input */}
                  <div className="relative min-w-[240px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari Asisten (Nama/Kode/NIM)..."
                      value={rosterSearch}
                      onChange={(e) => setRosterSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Division Filter Badges */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: "ALL", label: "Semua (32)" },
                    { id: "Koordinator", label: "Koordinator (1)" },
                    { id: "Sekretaris & Bendahara", label: "BPH/Sekben (3)" },
                    { id: "Compliance & Integrity", label: "CnI / Komdis (7)" },
                    { id: "Creative & Multimedia", label: "CnM (7)" },
                    { id: "Tech & Systems", label: "TnC (8)" },
                    { id: "Module Development", label: "MD (6)" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setRosterDivisionFilter(f.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        rosterDivisionFilter === f.id
                          ? "bg-purple-700 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Roster Table */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-x-auto scrollbar-thin max-h-[500px]">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[950px]">
                    <thead className="bg-[#0e071a] dark:bg-[#140826] text-white text-[10px] font-mono uppercase tracking-wider sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3">Kode</th>
                        <th className="px-4 py-3">Nama Lengkap</th>
                        <th className="px-4 py-3">NIM</th>
                        <th className="px-4 py-3">Kelas Asal</th>
                        <th className="px-4 py-3">Jabatan & Divisi</th>
                        <th className="px-4 py-3">ID LINE</th>
                        <th className="px-4 py-3">No. HP / WhatsApp</th>
                        <th className="px-4 py-3">Email Student</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                      {ALPRO_ASSISTANTS
                        .filter((a) => {
                          const matchDiv = rosterDivisionFilter === "ALL" || a.division === rosterDivisionFilter;
                          const matchSearch =
                            !rosterSearch ||
                            a.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                            a.code.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                            a.nim.includes(rosterSearch) ||
                            a.lineId.toLowerCase().includes(rosterSearch.toLowerCase());
                          return matchDiv && matchSearch;
                        })
                        .map((asst) => {
                          const isCurrent = asst.code === sessionUser;
                          return (
                            <tr
                              key={asst.code}
                              className={`transition-colors ${
                                isCurrent
                                  ? "bg-purple-50/80 dark:bg-purple-950/40 font-semibold"
                                  : "hover:bg-slate-50 dark:hover:bg-neutral-900/60"
                              }`}
                            >
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center gap-1 font-mono font-bold text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                                  {asst.code}
                                  {isCurrent && <span className="text-[10px] text-emerald-600 dark:text-emerald-400">●</span>}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                                {asst.name}
                              </td>
                              <td className="px-4 py-3 font-mono text-slate-600 dark:text-neutral-400">
                                {asst.nim}
                              </td>
                              <td className="px-4 py-3 font-mono text-slate-600 dark:text-neutral-400">
                                {asst.originClass}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                  asst.division === "Koordinator"
                                    ? "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                                    : asst.division === "Sekretaris & Bendahara"
                                    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                                    : asst.division === "Compliance & Integrity"
                                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                                    : asst.division === "Creative & Multimedia"
                                    ? "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300"
                                    : asst.division === "Tech & Systems"
                                    ? "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300"
                                    : "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300"
                                }`}>
                                  {asst.position}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                @{asst.lineId}
                              </td>
                              <td className="px-4 py-3 font-mono text-slate-700 dark:text-neutral-300">
                                {asst.phone}
                              </td>
                              <td className="px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-neutral-400 truncate max-w-[200px]" title={asst.studentEmail}>
                                {asst.studentEmail}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-8 border border-slate-200/80 dark:border-purple-950/60 shadow-xs text-center space-y-4 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-2xs">
                  <Lock size={24} />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Direktori Kontak Tim Asisten Dibatasi
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono leading-relaxed">
                    Direktori lengkap kontak pribadi 32 asisten (No. HP/WhatsApp, ID Line, dan Email Student) hanya dapat diakses oleh akun <strong>Administrator &amp; Tim BPH Laboratorium EDM</strong> demi menjaga kerahasiaan dan privasi data asisten.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 text-xs font-mono font-semibold">
                  <Shield size={14} className="text-purple-600 dark:text-purple-400" />
                  Hak Akses Akun: Asisten Praktikum (Asprak Biasa)
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL PENGATURAN TOKEN LMS MOODLE */}
      {isLmsTokenModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#120824] w-full max-w-md rounded-3xl p-6 border border-slate-200 dark:border-purple-900/60 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                  <KeyRound size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Pengaturan Token LMS Tel-U
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    CeLOE Course {LMS_ALPRO_METADATA.courseId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLmsTokenModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                Token WebService Moodle digunakan untuk menarik otomatis seluruh nilai praktikan (Warming Up, Pre Test, Practice, Jurnal, Post Test) secara real-time dari LMS.
              </p>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
                  Webservice Token:
                </label>
                <input
                  type="text"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value.trim())}
                  placeholder="Masukkan 32 karakter token Moodle..."
                  className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-800 dark:text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Token Aktif Resmi:</span>
                </div>
                <div className="text-[10px] break-all opacity-90">
                  fc6d5658f31cb68d90907134703b5694
                </div>
                <div className="text-[10px] opacity-75">
                  Pemilik: MAURELLIO CHRISTOPHER YONATHAN
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setInputToken("fc6d5658f31cb68d90907134703b5694");
                  setLmsToken("fc6d5658f31cb68d90907134703b5694");
                  if (typeof window !== "undefined") {
                    localStorage.setItem("EDM_LMS_TOKEN", "fc6d5658f31cb68d90907134703b5694");
                  }
                  setIsLmsTokenModalOpen(false);
                  syncLiveGrades();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reset Default
              </button>
              <button
                type="button"
                onClick={() => {
                  setLmsToken(inputToken);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("EDM_LMS_TOKEN", inputToken);
                  }
                  setIsLmsTokenModalOpen(false);
                  syncLiveGrades();
                }}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold font-mono shadow-sm transition-all cursor-pointer"
              >
                Simpan &amp; Sinkronkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR (Phones: sm:hidden) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0e071a]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-purple-950/60 px-3 pt-2 pb-2 safe-pb flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => switchTab("dashboard")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "dashboard" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab("absensi")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "absensi" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <CheckSquare size={18} />
          <span>Presensi</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab("penilaian")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === "penilaian" ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          <BarChart3 size={18} />
          <span>Nilai</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab("jadwal")}
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
