"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { DashboardHeader } from "@/components/aureo/dashboard-header";
import { ALPRO_ASSISTANTS, AssistantProfile, getAssistantByCode } from "@/data/assistants-roster";
import {
  ALPRO_15_SHIFTS,
  ShiftSchedule,
  getCurrentOngoingShift,
  getAssistantDutyStatus,
} from "@/data/alpro-schedule-plotting";
import {
  Camera,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowLeft,
  Upload,
  Download,
  Info,
  ChevronDown,
  Check,
  Search,
  ExternalLink,
  RefreshCw,
  Image as ImageIcon,
  X,
  Filter,
  Eye,
  CheckSquare,
} from "lucide-react";

export interface AttendanceRecord {
  id: string;
  assistantCode: string;
  assistantName: string;
  assistantRole: string;
  division: string;
  shiftNumber: number;
  className: string;
  shiftTime: string;
  timestamp: string;
  photoUrl: string;
  status: "Hadir Tepat Waktu" | "Terlambat" | "Shift Swap (Pengganti)";
  notes: string;
  verifiedBySystem?: boolean;
}

const STORAGE_KEY = "EDM_ASPRAK_ATTENDANCE_LOGS_v1";

const DRAFT_LAB_PHOTOS = [
  {
    id: "draft-1",
    title: "Draft 1: Suasana PC Lab R1",
    subtitle: "Selfie meja lab & monitor praktikum",
    url: "/images/asprak-draft-1.jpg",
  },
  {
    id: "draft-2",
    title: "Draft 2: Lanyard Lab EDM",
    subtitle: "Selfie ruang praktikum TULT Lantai 8",
    url: "/images/asprak-draft-2.jpg",
  },
];

const INITIAL_ATTENDANCE_LOGS: AttendanceRecord[] = [
  {
    id: "att-1",
    assistantCode: "MACY",
    assistantName: "Maurellio Christopher Yonathan",
    assistantRole: "Koor CnI (Admin Besar)",
    division: "Compliance & Integrity",
    shiftNumber: 14,
    className: "SI-50-07",
    shiftTime: "Sabtu 10.30 - 12.30",
    timestamp: "31 Okt 2026, 10:20:15 WIB",
    photoUrl: "/images/asprak-draft-2.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Pengawasan briefing tata tertib praktikan dan validasi kehadiran shift.",
    verifiedBySystem: true,
  },
  {
    id: "att-2",
    assistantCode: "DEVO",
    assistantName: "Devin Octavian",
    assistantRole: "Koordinator",
    division: "Koordinator",
    shiftNumber: 2,
    className: "SI-50-02",
    shiftTime: "Senin 10.30 - 12.30",
    timestamp: "31 Okt 2026, 10:25:12 WIB",
    photoUrl: "/images/asprak-draft-2.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Standby pembukaan shift 2 dan pengawasan briefing modul.",
    verifiedBySystem: true,
  },
  {
    id: "att-3",
    assistantCode: "GRGS",
    assistantName: "Gracia Gebriella Sianturi",
    assistantRole: "Sekretaris 1",
    division: "Sekretaris & Bendahara",
    shiftNumber: 2,
    className: "SI-50-02",
    shiftTime: "Senin 10.30 - 12.30",
    timestamp: "31 Okt 2026, 10:28:44 WIB",
    photoUrl: "/images/asprak-draft-1.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Rekap absensi kehadiran mahasiswa SI-50-02.",
    verifiedBySystem: true,
  },
  {
    id: "att-4",
    assistantCode: "SYOW",
    assistantName: "Siti Yona Oktaviani Waluya",
    assistantRole: "Bendahara",
    division: "Sekretaris & Bendahara",
    shiftNumber: 4,
    className: "SI-50-04",
    shiftTime: "Selasa 08.30 - 10.30",
    timestamp: "31 Okt 2026, 08:22:10 WIB",
    photoUrl: "/images/asprak-draft-1.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Monitoring logistik praktikum dan inventaris PC 1-45.",
    verifiedBySystem: true,
  },
  {
    id: "att-5",
    assistantCode: "ADDH",
    assistantName: "Adly Dwi Hendrawan",
    assistantRole: "Subkoor CnI",
    division: "Compliance & Integrity",
    shiftNumber: 4,
    className: "SI-50-04",
    shiftTime: "Selasa 08.30 - 10.30",
    timestamp: "31 Okt 2026, 08:27:03 WIB",
    photoUrl: "/images/asprak-draft-2.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Pemeriksaan atribut seragam dan kartu praktikan.",
    verifiedBySystem: true,
  },
  {
    id: "att-6",
    assistantCode: "TICS",
    assistantName: "Thoriq Ibadurrahman Ciptasanjaya",
    assistantRole: "Staff CnI",
    division: "Compliance & Integrity",
    shiftNumber: 6,
    className: "SI-50-06",
    shiftTime: "Rabu 10.30 - 12.30",
    timestamp: "31 Okt 2026, 10:41:20 WIB",
    photoUrl: "/images/asprak-draft-2.jpg",
    status: "Terlambat",
    notes: "Terlambat 11 menit karena kendala lift TULT. Sudah konfirmasi ke Koordinator.",
    verifiedBySystem: true,
  },
  {
    id: "att-7",
    assistantCode: "MUDI",
    assistantName: "Muhammad Daffa Izzati",
    assistantRole: "Koor Module Development",
    division: "Module Development",
    shiftNumber: 8,
    className: "SI-50-08",
    shiftTime: "Kamis 06.30 - 08.30",
    timestamp: "31 Okt 2026, 06:24:50 WIB",
    photoUrl: "/images/asprak-draft-2.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Pengawalan guided problem set algoritma percabangan.",
    verifiedBySystem: true,
  },
  {
    id: "att-8",
    assistantCode: "GWAN",
    assistantName: "Gwyneth Angela",
    assistantRole: "Koor Creative & Multimedia",
    division: "Creative & Multimedia",
    shiftNumber: 10,
    className: "SI-50-10",
    shiftTime: "Kamis 10.30 - 12.30",
    timestamp: "31 Okt 2026, 10:22:31 WIB",
    photoUrl: "/images/asprak-draft-1.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Dokumentasi visual jalannya praktikum modul algoritma.",
    verifiedBySystem: true,
  },
  {
    id: "att-9",
    assistantCode: "DAFI",
    assistantName: "Muhammad Daffa Izzuddin",
    assistantRole: "Koor Tech & Systems",
    division: "Tech & Systems",
    shiftNumber: 12,
    className: "SI-50-12",
    shiftTime: "Jumat 13.30 - 15.30",
    timestamp: "31 Okt 2026, 13:20:45 WIB",
    photoUrl: "/images/asprak-draft-2.jpg",
    status: "Hadir Tepat Waktu",
    notes: "Maintenance server LMS Moodle dan pengecekan jaringan lab.",
    verifiedBySystem: true,
  },
];

export default function PresensiAsprakPage() {
  const [activeMainTab, setActiveMainTab] = useState<"formulir" | "rekap">("formulir");
  const [selectedAssistantCode, setSelectedAssistantCode] = useState<string>("MACY");
  const [selectedShiftNumber, setSelectedShiftNumber] = useState<number>(14);
  const [status, setStatus] = useState<"Hadir Tepat Waktu" | "Terlambat" | "Shift Swap (Pengganti)">("Hadir Tepat Waktu");
  const [notes, setNotes] = useState<string>("Mengawal praktikan dan mendampingi pelaksanaan modul.");
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");

  // Camera & Draft Photo states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>("/images/asprak-draft-1.jpg");
  const [selectedDraftId, setSelectedDraftId] = useState<string>("draft-1");
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  // Modal for Viewing Photo Details
  const [activePhotoModal, setActivePhotoModal] = useState<AttendanceRecord | null>(null);

  // Rekap Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterShift, setFilterShift] = useState<string>("ALL");
  const [filterDivision, setFilterDivision] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Persistent Shared Attendance Logs
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_LOGS);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAttendanceLogs(parsed);
          } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ATTENDANCE_LOGS));
          }
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ATTENDANCE_LOGS));
        }
      } catch (err) {
        console.warn("Could not load attendance from localStorage", err);
      }
    }
  }, []);

  // Listen to cross-tab storage updates
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY && e.newValue) {
          try {
            setAttendanceLogs(JSON.parse(e.newValue));
          } catch (err) {
            console.error(err);
          }
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, []);

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }) +
          " • " +
          now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) +
          " WIB"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync selected assistant from mock session cookie if present
  useEffect(() => {
    if (typeof document !== "undefined") {
      const rawCookies = document.cookie ? document.cookie.split("; ") : [];
      for (const c of rawCookies) {
        const [k, v] = c.split("=");
        if (k === "mock_session" && v) {
          const userCode = decodeURIComponent(v);
          setSelectedAssistantCode(userCode);
          const duty = getAssistantDutyStatus(userCode);
          if (duty.activeShiftDetails) {
            setSelectedShiftNumber(duty.activeShiftDetails.shift.shiftNumber);
          } else if (duty.nextUpcomingShift) {
            setSelectedShiftNumber(duty.nextUpcomingShift.shift.shiftNumber);
          }
        }
      }
    }
  }, []);

  // Camera start function
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      setSelectedDraftId("");
    } catch (err: any) {
      console.warn("Camera access failed or denied:", err);
      setCameraError(
        "Kamera tidak dapat diakses langsung. Anda dapat menggunakan pilihan Draft Foto Lab atau upload foto sebagai gantinya."
      );
      setIsCameraActive(false);
    }
  };

  // Stop camera function
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Select Draft Photo with automatic watermark stamp
  const handleSelectDraftPhoto = (draft: { id: string; url: string }) => {
    stopCamera();
    setSelectedDraftId(draft.id);
    setCapturedImage(draft.url);
  };

  // Capture snapshot from webcam
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    setTimeout(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = video?.videoWidth || 640;
      canvas.height = video?.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      if (ctx && video) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Watermark banner
        ctx.fillStyle = "rgba(14, 7, 26, 0.85)";
        ctx.fillRect(0, canvas.height - 56, canvas.width, 56);

        ctx.fillStyle = "#C084FC";
        ctx.font = "bold 14px monospace";
        ctx.fillText("LAB EDM • ALPRO 26/27 • R1 LANTAI 8 TULT", 16, canvas.height - 32);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "12px sans-serif";
        const asst = getAssistantByCode(selectedAssistantCode);
        const shiftObj = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftNumber);
        ctx.fillText(
          `${asst?.code || selectedAssistantCode} • Shift ${selectedShiftNumber} (${shiftObj?.className || "ALPRO"}) • ${new Date().toLocaleTimeString("id-ID")} WIB • GPS VERIFIED`,
          16,
          canvas.height - 12
        );

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImage(dataUrl);
        setSelectedDraftId("camera-capture");
        stopCamera();
      }
      setIsCapturing(false);
    }, 150);
  };

  // Fallback file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCapturedImage(uploadEvent.target?.result as string);
        setSelectedDraftId("uploaded-file");
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit attendance record
  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) {
      alert("Harap pilih salah satu draft foto atau ambil foto selfie sebelum mengirim!");
      return;
    }

    const asst = getAssistantByCode(selectedAssistantCode);
    const shiftObj = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftNumber);

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      assistantCode: selectedAssistantCode,
      assistantName: asst?.name || selectedAssistantCode,
      assistantRole: asst?.position || "Asisten Praktikum",
      division: asst?.division || "Asisten Praktikum",
      shiftNumber: selectedShiftNumber,
      className: shiftObj?.className || "SI-50",
      shiftTime: `${shiftObj?.day} ${shiftObj?.timeDisplay}`,
      timestamp:
        new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
          ", " +
          new Date().toLocaleTimeString("id-ID") +
          " WIB",
      photoUrl: capturedImage,
      status: status,
      notes: notes,
      verifiedBySystem: true,
    };

    const updated = [newRecord, ...attendanceLogs];
    setAttendanceLogs(updated);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }

    setIsSubmittedSuccess(true);
  };

  const selectedAssistant = getAssistantByCode(selectedAssistantCode) || ALPRO_ASSISTANTS[0];
  const selectedShift = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftNumber) || ALPRO_15_SHIFTS[0];
  const ongoing = getCurrentOngoingShift();
  const isShiftCurrentlyActive = ongoing.activeShift?.shiftNumber === selectedShiftNumber;

  // Filtered attendance logs for "Rekap Kehadiran Seluruh Asisten"
  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesSearch =
      log.assistantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.assistantCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.className.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesShift = filterShift === "ALL" || log.shiftNumber.toString() === filterShift;
    const matchesDivision = filterDivision === "ALL" || log.division === filterDivision;
    const matchesStatus = filterStatus === "ALL" || log.status === filterStatus;

    return matchesSearch && matchesShift && matchesDivision && matchesStatus;
  });

  // Calculate statistics
  const totalHadir = attendanceLogs.length;
  const tepatWaktuCount = attendanceLogs.filter((a) => a.status === "Hadir Tepat Waktu").length;
  const terlambatCount = attendanceLogs.filter((a) => a.status === "Terlambat").length;
  const swapCount = attendanceLogs.filter((a) => a.status === "Shift Swap (Pengganti)").length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F0F2F6] dark:bg-[#070312] text-slate-900 dark:text-neutral-100 transition-colors">
      {/* Floating Rounded Sidebar */}
      <DashboardSidebar activeTab="presensi_asprak" role="ASPRAK" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header inside safe padding wrapper so right user pill never gets cut off */}
        <div className="px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 shrink-0">
          <DashboardHeader assistantCode={selectedAssistantCode} />
        </div>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/assistant"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0e071a] border border-slate-200 dark:border-purple-950/60 text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-xs transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Kembali ke Beranda</span>
              </Link>
              <span className="text-slate-400 font-mono text-xs">/</span>
              <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                Presensi Khusus Asprak
              </span>
            </div>

            {/* Real-time Clock Badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-neutral-300 bg-white/80 dark:bg-[#0e071a]/80 px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-purple-950/60 shadow-xs">
              <Clock size={13} className="text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>{currentTimeStr || "Memuat waktu..."}</span>
            </div>
          </div>

          {/* Hero Banner: Presensi Kehadiran Jaga Asisten */}
          <div className="relative rounded-[2.2rem] bg-gradient-to-r from-purple-950 via-indigo-950 to-[#120824] p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-purple-800/40">
            <div className="absolute inset-0 bg-[radial-gradient(#C084FC_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-purple-200">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>SISTEM VALIDASI PRESENSI ASPRAK RESMI</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Absensi Kehadiran Jaga Asisten Praktikum
                </h1>
                <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed font-sans">
                  Pencatatan kehadiran jaga shift laboratorium secara real-time dengan verifikasi draft foto selfie, validasi GPS ruangan R1 TULT Lantai 8, dan rekap terpusat yang dapat diakses seluruh tim asisten.
                </p>
              </div>

              {/* Status Box */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-200 font-bold">
                  <MapPin size={14} className="text-rose-400" />
                  <span>Ruang Laboratorium</span>
                </div>
                <div className="text-sm font-bold text-white">
                  R1 Lantai 8 TULT
                </div>
                <div className="text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>GPS / Geofencing Validated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Pill Tabs: Formulir Presensi vs Rekap Seluruh Asisten */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-200/80 dark:bg-[#120824] rounded-2xl border border-slate-300/60 dark:border-purple-900/50 shadow-inner max-w-md">
            <button
              type="button"
              onClick={() => setActiveMainTab("formulir")}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeMainTab === "formulir"
                  ? "bg-white dark:bg-purple-900 text-purple-950 dark:text-white shadow-xs font-extrabold"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Camera size={15} />
              <span>Formulir Presensi Saya</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab("rekap")}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeMainTab === "rekap"
                  ? "bg-white dark:bg-purple-900 text-purple-950 dark:text-white shadow-xs font-extrabold"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Users size={15} />
              <span>Rekap Absensi Semua Asisten ({attendanceLogs.length})</span>
            </button>
          </div>

          {/* TAB 1: FORMULIR PRESENSI MANDIRI */}
          {activeMainTab === "formulir" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form Column (Left: 7 Cols) */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0e071a] rounded-[2rem] p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
                <div className="border-b border-slate-100 dark:border-neutral-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Camera size={20} className="text-purple-600 dark:text-purple-400" />
                      <span>Formulir Presensi Mandiri Asisten</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                      Pilih identitas asisten, tentukan shift jaga, dan gunakan draft foto atau kamera langsung di lab.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                    Live Verified
                  </span>
                </div>

                <form onSubmit={handleSubmitAttendance} className="space-y-5">
                  {/* 1. Dropdown Nama & Kode Asisten */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                      <span>1. Identitas Asisten Praktikum</span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-normal">
                        32 asisten terdaftar
                      </span>
                    </label>

                    <select
                      value={selectedAssistantCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        setSelectedAssistantCode(code);
                        const duty = getAssistantDutyStatus(code);
                        if (duty.activeShiftDetails) {
                          setSelectedShiftNumber(duty.activeShiftDetails.shift.shiftNumber);
                        } else if (duty.nextUpcomingShift) {
                          setSelectedShiftNumber(duty.nextUpcomingShift.shift.shiftNumber);
                        }
                      }}
                      className="w-full bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-sans cursor-pointer transition-all"
                    >
                      {ALPRO_ASSISTANTS.map((asst) => (
                        <option key={asst.code} value={asst.code}>
                          [{asst.code}] {asst.name} — {asst.position} ({asst.originClass})
                        </option>
                      ))}
                    </select>

                    {/* Assistant Profile Chip */}
                    <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-purple-700 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {selectedAssistant.code}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {selectedAssistant.name}
                          </div>
                          <div className="text-[11px] font-mono text-purple-700 dark:text-purple-300">
                            {selectedAssistant.position} • {selectedAssistant.division}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 shrink-0">
                        {selectedAssistant.role}
                      </span>
                    </div>
                  </div>

                  {/* 2. Dropdown Shift Jaga */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                      <span>2. Pilih Shift Jaga Praktikum</span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-normal">
                        15 shift jadwal resmi
                      </span>
                    </label>

                    <select
                      value={selectedShiftNumber}
                      onChange={(e) => setSelectedShiftNumber(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-sans cursor-pointer transition-all"
                    >
                      {ALPRO_15_SHIFTS.map((shift) => (
                        <option key={shift.shiftNumber} value={shift.shiftNumber}>
                          Shift {shift.shiftNumber}: {shift.className} ({shift.day}, {shift.timeDisplay} WIB) — {shift.room}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between text-xs font-mono p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
                      <span className="text-slate-600 dark:text-neutral-400">
                        Jadwal: <strong>{selectedShift.day}, {selectedShift.timeDisplay} WIB</strong>
                      </span>
                      {isShiftCurrentlyActive ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          Sedang Berlangsung Sekarang
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold">
                          Terjadwal ({selectedShift.className})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 3. DRAFT FOTO & BUKTI SELFIE */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon size={14} className="text-purple-600 dark:text-purple-400" />
                        <span>3. Draft Foto Kehadiran &amp; Bukti Lab</span>
                      </label>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        ✓ Siap Verifikasi
                      </span>
                    </div>

                    {/* DRAFT PHOTO SELECTOR CARDS */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                        Pilih opsi bukti foto yang ingin dilampirkan:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DRAFT_LAB_PHOTOS.map((draft) => (
                          <button
                            key={draft.id}
                            type="button"
                            onClick={() => handleSelectDraftPhoto(draft)}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              selectedDraftId === draft.id
                                ? "bg-purple-100 dark:bg-purple-950/80 border-purple-600 ring-2 ring-purple-500/20 shadow-xs"
                                : "bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-purple-300"
                            }`}
                          >
                            <div className="relative w-full h-16 rounded-lg overflow-hidden bg-slate-900 mb-1.5">
                              <img
                                src={draft.url}
                                alt={draft.title}
                                className="w-full h-full object-cover"
                              />
                              {selectedDraftId === draft.id && (
                                <div className="absolute top-1 right-1 bg-purple-600 text-white p-0.5 rounded-full">
                                  <Check size={10} />
                                </div>
                              )}
                            </div>
                            <div className="text-[10px] font-bold text-slate-900 dark:text-white truncate">
                              {draft.title}
                            </div>
                            <div className="text-[9px] text-purple-700 dark:text-purple-300 font-mono">
                              Draft Lab EDM
                            </div>
                          </button>
                        ))}

                        {/* Webcam Option */}
                        <button
                          type="button"
                          onClick={startCamera}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                            isCameraActive
                              ? "bg-purple-100 dark:bg-purple-950/80 border-purple-600 ring-2 ring-purple-500/20"
                              : "bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-purple-300"
                          }`}
                        >
                          <Camera size={20} className="text-purple-600 dark:text-purple-400 mb-1" />
                          <span className="text-[10px] font-bold text-slate-900 dark:text-white">
                            Ambil Kamera
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">Webcam Langsung</span>
                        </button>

                        {/* File Upload Option */}
                        <label className="p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/60 hover:border-purple-300 transition-all cursor-pointer flex flex-col items-center justify-center text-center">
                          <Upload size={20} className="text-purple-600 dark:text-purple-400 mb-1" />
                          <span className="text-[10px] font-bold text-slate-900 dark:text-white">
                            Upload Foto
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">Pilih dari Galeri</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* PHOTO PREVIEW & VIEWFINDER BOX */}
                    <div className="relative w-full aspect-video sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border-2 border-dashed border-purple-400/50 dark:border-purple-600/50 flex flex-col items-center justify-center shadow-inner group">
                      {isCameraActive ? (
                        // Live Webcam Stream
                        <div className="relative w-full h-full">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover mirror"
                          />

                          <div className="absolute inset-4 pointer-events-none border border-white/25 rounded-xl flex flex-col justify-between p-3">
                            <div className="flex justify-between items-center text-[10px] font-mono text-purple-300 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                              <span>REC ● LIVE LAB CAMERA</span>
                              <span>{selectedAssistantCode}</span>
                            </div>

                            <div className="text-center text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-xs py-1 rounded-md">
                              Arahkan wajah &amp; pastikan berada di area lab R1 TULT
                            </div>
                          </div>

                          {/* Shutter Button */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                            <button
                              type="button"
                              onClick={captureSnapshot}
                              disabled={isCapturing}
                              className="w-14 h-14 rounded-full bg-white hover:bg-slate-100 text-purple-900 border-4 border-purple-500 shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                              title="Ambil Foto Presensi"
                            >
                              <div className="w-8 h-8 rounded-full bg-purple-700" />
                            </button>
                          </div>
                        </div>
                      ) : capturedImage ? (
                        // Draft or Captured Image View with Watermark
                        <div className="relative w-full h-full">
                          <img
                            src={capturedImage}
                            alt="Bukti Kehadiran Asprak"
                            className="w-full h-full object-cover"
                          />

                          {/* Top Verified Tag */}
                          <div className="absolute top-3 left-3 bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                            <CheckCircle2 size={12} />
                            <span>DRAFT FOTO TERPILIH</span>
                          </div>

                          {/* Watermark Banner */}
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 text-white font-mono text-[11px]">
                            <div className="flex items-center justify-between font-bold text-purple-300">
                              <span>LAB EDM • ALPRO 26/27 • R1 LANTAI 8 TULT</span>
                              <span className="text-emerald-400">GPS VALID</span>
                            </div>
                            <div className="text-[10px] text-white/90 mt-0.5">
                              {selectedAssistant.code} • Shift {selectedShiftNumber} ({selectedShift.className}) • {selectedAssistant.name}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 text-center space-y-2">
                          <ImageIcon size={36} className="text-purple-400 mx-auto" />
                          <p className="text-sm font-bold text-white">Pilih Draft Foto Lab di Atas</p>
                          <p className="text-xs text-slate-400">Atau gunakan webcam live untuk mengambil foto selfie kehadiran Anda.</p>
                        </div>
                      )}
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  {/* 4. Status Kehadiran & Catatan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider">
                        Status Kehadiran
                      </label>
                      <select
                        value={status}
                        onChange={(e: any) => setStatus(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-900 dark:text-white"
                      >
                        <option value="Hadir Tepat Waktu">Hadir Tepat Waktu</option>
                        <option value="Terlambat">Terlambat (&lt; 15 menit)</option>
                        <option value="Shift Swap (Pengganti)">Shift Swap (Pengganti)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider">
                        Keterangan / Aktivitas Jaga
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Pendampingan Modul BST"
                        className="w-full bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 hover:from-purple-800 hover:to-indigo-700 text-white font-mono text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 size={18} />
                    <span>Kirim Presensi Kehadiran Asprak</span>
                  </button>
                </form>

                {/* Success Alert */}
                {isSubmittedSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3 animate-fade-in">
                    <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200">
                        Presensi Berhasil Dicatat ke Server EDM!
                      </div>
                      <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed font-sans">
                        Terima kasih, <strong>{selectedAssistant.name}</strong>. Presensi Anda pada <strong>Shift {selectedShiftNumber} ({selectedShift.className})</strong> telah tersimpan dan dapat dilihat oleh seluruh asisten di tab Rekap.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveMainTab("rekap")}
                        className="text-emerald-800 dark:text-emerald-200 font-mono font-bold underline mt-1 cursor-pointer block"
                      >
                        Buka Rekap Kehadiran Seluruh Asisten →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Feed Column (Right: 5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Box 1: Shift Yang Sedang Berlangsung Hari Ini */}
                <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Clock size={16} className="text-purple-600 dark:text-purple-400" />
                      <span>Shift Berjalan Hari Ini</span>
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full">
                      {ongoing.currentDayName}
                    </span>
                  </div>

                  {ongoing.activeShift ? (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                          SHIFT {ongoing.activeShift.shiftNumber}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                          Sedang Berlangsung
                        </span>
                      </div>
                      <div className="text-base font-black text-slate-900 dark:text-white">
                        {ongoing.activeShift.className}
                      </div>
                      <div className="text-xs font-mono text-slate-600 dark:text-neutral-300">
                        Pukul: {ongoing.activeShift.timeDisplay} WIB
                      </div>
                      <div className="text-[11px] font-sans text-slate-500 dark:text-neutral-400">
                        {ongoing.activeShift.room}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-center space-y-1">
                      <p className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                        Tidak ada shift yang sedang berlangsung saat ini.
                      </p>
                      {ongoing.nextShiftToday && (
                        <p className="text-[11px] font-mono text-purple-600 dark:text-purple-400">
                          Shift berikutnya: Shift {ongoing.nextShiftToday.shiftNumber} ({ongoing.nextShiftToday.className}) pukul {ongoing.nextShiftToday.timeDisplay} WIB.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Box 2: Feed Cepat Kehadiran Terbaru */}
                <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Users size={16} className="text-purple-600 dark:text-purple-400" />
                      <span>Kehadiran Asisten Terbaru</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveMainTab("rekap")}
                      className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 hover:underline cursor-pointer"
                    >
                      Lihat Semua ({attendanceLogs.length}) →
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {attendanceLogs.slice(0, 5).map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/70 dark:border-neutral-800 space-y-2 hover:border-purple-300 dark:hover:border-purple-800 transition-all"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Photo Thumbnail - click to open modal */}
                            <button
                              type="button"
                              onClick={() => setActivePhotoModal(log)}
                              className="relative w-10 h-10 rounded-xl overflow-hidden bg-purple-100 dark:bg-purple-950 shrink-0 border border-purple-200 dark:border-purple-800 cursor-pointer hover:scale-105 transition-transform"
                              title="Klik untuk perbesar foto bukti"
                            >
                              <img
                                src={log.photoUrl}
                                alt={log.assistantName}
                                className="w-full h-full object-cover"
                              />
                            </button>
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                [{log.assistantCode}] {log.assistantName}
                              </div>
                              <div className="text-[10px] font-mono text-purple-700 dark:text-purple-400">
                                Shift {log.shiftNumber} • {log.className}
                              </div>
                            </div>
                          </div>

                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                            {log.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 dark:border-neutral-800/80 pt-1.5">
                          <span>{log.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => setActivePhotoModal(log)}
                            className="text-purple-600 dark:text-purple-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={11} />
                            <span>Lihat Bukti</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REKAP ABSENSI SELURUH ASISTEN (BISA DILIHAT OLEH SEMUA ORANG) */}
          {activeMainTab === "rekap" && (
            <div className="space-y-6">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0e071a] border border-slate-200/80 dark:border-purple-950/60 shadow-xs">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold">Total Asisten Absen</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalHadir} Asisten</div>
                  <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono mt-0.5">Tersimpan di Sistem Lab</div>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0e071a] border border-slate-200/80 dark:border-purple-950/60 shadow-xs">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold">Tepat Waktu</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{tepatWaktuCount}</div>
                  <div className="text-[10px] text-emerald-600 font-mono mt-0.5">Sesuai Jadwal Shift</div>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0e071a] border border-slate-200/80 dark:border-purple-950/60 shadow-xs">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold">Terlambat (&lt;15m)</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{terlambatCount}</div>
                  <div className="text-[10px] text-amber-600 font-mono mt-0.5">Tercatat Disiplin Lab</div>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0e071a] border border-slate-200/80 dark:border-purple-950/60 shadow-xs">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase font-bold">Shift Swap</div>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{swapCount}</div>
                  <div className="text-[10px] text-indigo-600 font-mono mt-0.5">Asisten Pengganti</div>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] p-5 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari berdasarkan nama, kode asisten, atau kelas..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                  </div>

                  {/* Dropdown Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Shift Filter */}
                    <select
                      value={filterShift}
                      onChange={(e) => setFilterShift(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <option value="ALL">Semua Shift</option>
                      {ALPRO_15_SHIFTS.map((s) => (
                        <option key={s.shiftNumber} value={s.shiftNumber.toString()}>
                          Shift {s.shiftNumber} ({s.className})
                        </option>
                      ))}
                    </select>

                    {/* Division Filter */}
                    <select
                      value={filterDivision}
                      onChange={(e) => setFilterDivision(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <option value="ALL">Semua Divisi</option>
                      <option value="Koordinator">Koordinator</option>
                      <option value="Sekretaris & Bendahara">Sekretaris & Bendahara</option>
                      <option value="Compliance & Integrity">Compliance & Integrity</option>
                      <option value="Creative & Multimedia">Creative & Multimedia</option>
                      <option value="Tech & Systems">Tech & Systems</option>
                      <option value="Module Development">Module Development</option>
                    </select>

                    {/* Status Filter */}
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <option value="ALL">Semua Status</option>
                      <option value="Hadir Tepat Waktu">Hadir Tepat Waktu</option>
                      <option value="Terlambat">Terlambat</option>
                      <option value="Shift Swap (Pengganti)">Shift Swap</option>
                    </select>
                  </div>
                </div>

                {/* Table & Cards of Attendance Records */}
                {filteredLogs.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <Users size={32} className="text-slate-300 dark:text-neutral-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-700 dark:text-neutral-300">
                      Tidak ada catatan kehadiran yang sesuai filter.
                    </p>
                    <p className="text-xs text-slate-400">Silakan ubah filter pencarian atau shift di atas.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-slate-50/80 dark:bg-neutral-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-neutral-800 space-y-3 hover:border-purple-400 dark:hover:border-purple-700 transition-all shadow-xs"
                      >
                        {/* Header card */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Photo Thumbnail */}
                            <button
                              type="button"
                              onClick={() => setActivePhotoModal(log)}
                              className="relative w-12 h-12 rounded-xl overflow-hidden bg-purple-100 dark:bg-purple-950 shrink-0 border border-purple-200 dark:border-purple-800 cursor-pointer hover:scale-105 transition-transform"
                              title="Klik untuk melihat foto selfie lengkap"
                            >
                              <img
                                src={log.photoUrl}
                                alt={log.assistantName}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                            </button>
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                [{log.assistantCode}] {log.assistantName}
                              </div>
                              <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300 truncate">
                                {log.assistantRole}
                              </div>
                              <div className="text-[9px] font-mono text-slate-500 dark:text-neutral-400">
                                {log.division}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              log.status === "Hadir Tepat Waktu"
                                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                                : log.status === "Terlambat"
                                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                                : "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300"
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>

                        {/* Shift and time */}
                        <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200/60 dark:border-neutral-800 text-[11px] font-mono space-y-1">
                          <div className="flex items-center justify-between text-slate-700 dark:text-neutral-300">
                            <span className="font-bold text-purple-700 dark:text-purple-400">
                              Shift {log.shiftNumber} ({log.className})
                            </span>
                            <span className="text-slate-400 text-[10px]">R1 TULT Lt 8</span>
                          </div>
                          <div className="text-slate-500 dark:text-neutral-400 text-[10px]">
                            {log.shiftTime}
                          </div>
                        </div>

                        {/* Notes */}
                        <p className="text-xs text-slate-600 dark:text-neutral-300 font-sans italic line-clamp-2">
                          &quot;{log.notes}&quot;
                        </p>

                        {/* Footer Info & Action */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-200/60 dark:border-neutral-800/80">
                          <span>{log.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => setActivePhotoModal(log)}
                            className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold hover:bg-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={11} />
                            <span>Foto Bukti</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FULL PHOTO PROOF MODAL */}
          {activePhotoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
              <div className="relative w-full max-w-lg bg-white dark:bg-[#0e071a] rounded-[2rem] overflow-hidden shadow-2xl border border-purple-200 dark:border-purple-900/60 space-y-4">
                {/* Modal Header */}
                <div className="p-5 pb-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Bukti Validasi Presensi Asisten
                      </h4>
                      <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400">
                        EDM Laboratory Official Proof
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePhotoModal(null)}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Image View */}
                <div className="px-5">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-neutral-800">
                    <img
                      src={activePhotoModal.photoUrl}
                      alt={activePhotoModal.assistantName}
                      className="w-full h-full object-cover"
                    />

                    {/* Watermark Details */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6 text-white font-mono text-[11px]">
                      <div className="flex items-center justify-between font-bold text-purple-300">
                        <span>LAB EDM • ALPRO 26/27</span>
                        <span className="text-emerald-400">GPS VALID</span>
                      </div>
                      <div className="text-[10px] text-white/90 mt-0.5">
                        [{activePhotoModal.assistantCode}] {activePhotoModal.assistantName} • Shift {activePhotoModal.shiftNumber} ({activePhotoModal.className})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assistant Details Strip */}
                <div className="px-5 pb-5 space-y-3">
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {activePhotoModal.assistantName} ({activePhotoModal.assistantCode})
                      </div>
                      <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300">
                        {activePhotoModal.assistantRole} • {activePhotoModal.division}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      {activePhotoModal.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-neutral-400">
                    <div>Waktu Absen: <strong>{activePhotoModal.timestamp}</strong></div>
                    <div>Jadwal Shift: <strong>{activePhotoModal.shiftTime}</strong></div>
                    <div>Aktivitas: <em>&quot;{activePhotoModal.notes}&quot;</em></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePhotoModal(null)}
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold font-mono shadow-xs cursor-pointer transition-colors"
                  >
                    Tutup Tampilan Bukti
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
