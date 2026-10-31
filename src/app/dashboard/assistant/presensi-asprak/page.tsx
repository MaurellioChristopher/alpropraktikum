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
  SwitchCamera,
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
  UploadCloud,
  Trash2,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Camera & Photo Upload states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedFileSize, setUploadedFileSize] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
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

  // Video Ref callback that attaches stream immediately upon DOM mount
  const setVideoRef = (node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && streamRef.current) {
      node.srcObject = streamRef.current;
      node.play().catch((err) => console.log("Video play deferred:", err));
    }
  };

  // Camera start function
  const startCamera = async (targetMode?: "user" | "environment") => {
    setCameraError(null);
    const mode = targetMode || facingMode;
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: mode,
        },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => console.log("Video play deferred:", err));
      }
    } catch (err: any) {
      console.warn("Camera access failed or denied:", err);
      setCameraError(
        "Kamera tidak dapat diakses langsung. Pastikan izin kamera telah diberikan di browser atau Anda dapat mengunggah file foto."
      );
      setIsCameraActive(false);
    }
  };

  // Toggle Front / Back camera on phones
  const toggleFacingMode = () => {
    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Stop camera function
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Auto-connect to camera on mount if no photo has been captured yet
  useEffect(() => {
    if (!capturedImage) {
      startCamera("user");
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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
        if (facingMode === "user") {
          ctx.save();
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        setCapturedImage(dataUrl);
        setUploadedFileName("Foto Presensi.jpg");
        setUploadedFileSize("Kamera Langsung");
        stopCamera();
      }
      setIsCapturing(false);
    }, 150);
  };

  // Process image file from upload or drop
  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Format file tidak didukung. Harap unggah file foto (JPG, PNG, atau WEBP).");
      return;
    }
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setUploadedFileName(file.name);
    setUploadedFileSize(`${sizeInMB} MB`);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setCapturedImage(uploadEvent.target?.result as string);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemovePhoto = () => {
    setCapturedImage(null);
    setUploadedFileName("");
    setUploadedFileSize("");
    stopCamera();
  };

  // Submit attendance record
  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) {
      alert("Harap unggah atau ambil foto bukti kehadiran sebelum mengirim presensi!");
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
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F2F6] dark:bg-[#070312] text-slate-900 dark:text-neutral-100 transition-colors">
      {/* Floating Rounded Sidebar */}
      <DashboardSidebar
        activeTab="presensi_asprak"
        role="ASPRAK"
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        
        {/* Top Header inside safe padding wrapper */}
        <div className="px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 shrink-0 safe-pt">
          <DashboardHeader
            assistantCode={selectedAssistantCode}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        </div>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pb-12 safe-pb space-y-5">
          
          {/* Breadcrumb & Real-time Clock */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Link
                href="/dashboard/assistant"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 font-medium text-slate-600 dark:text-neutral-300 hover:text-purple-600 transition-colors shadow-2xs"
              >
                <ArrowLeft size={13} />
                <span>Dashboard</span>
              </Link>
              <span className="text-slate-300 dark:text-neutral-700">/</span>
              <span className="text-slate-900 dark:text-white font-medium">
                Presensi Asprak
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400 bg-white dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentTimeStr || "Memuat waktu..."}</span>
            </div>
          </div>

          {/* Clean Header & Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Presensi Asisten Praktikum
              </h1>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-sans mt-0.5">
                Ruang R1 Lantai 8 TULT • Pencatatan kehadiran jaga shift EDM Laboratory
              </p>
            </div>

            {/* Segmented Pill Tabs */}
            <div className="inline-flex p-1 bg-slate-200/80 dark:bg-white/5 rounded-xl border border-slate-300/60 dark:border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setActiveMainTab("formulir")}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === "formulir"
                    ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-2xs font-semibold"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Camera size={14} />
                <span>Formulir Presensi</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab("rekap")}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === "rekap"
                    ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-2xs font-semibold"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Users size={14} />
                <span>Rekap Kehadiran ({attendanceLogs.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: FORMULIR PRESENSI MANDIRI */}
          {activeMainTab === "formulir" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Form Column (Left: 7 Cols) */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0E071A] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5 transition-colors">
                <div className="border-b border-slate-100 dark:border-white/5 pb-3">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    Formulir Presensi Shift
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-sans mt-0.5">
                    Pilih nama asisten, tentukan shift jaga, dan lampirkan bukti foto lab.
                  </p>
                </div>

                <form onSubmit={handleSubmitAttendance} className="space-y-4">
                  {/* 1. Dropdown Nama & Kode Asisten */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                      <span>1. Identitas Asisten</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {selectedAssistant.division}
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
                      className="w-full bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium cursor-pointer transition-all"
                    >
                      {ALPRO_ASSISTANTS.map((asst) => (
                        <option key={asst.code} value={asst.code}>
                          [{asst.code}] {asst.name} — {asst.position}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400 pt-0.5 px-0.5">
                      <span>{selectedAssistant.position} • {selectedAssistant.originClass}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-neutral-300 font-medium">
                        {selectedAssistant.role}
                      </span>
                    </div>
                  </div>

                  {/* 2. Dropdown Shift Jaga */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                      <span>2. Shift Jaga Praktikum</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        Ruang R1 TULT Lt. 8
                      </span>
                    </label>

                    <select
                      value={selectedShiftNumber}
                      onChange={(e) => setSelectedShiftNumber(Number(e.target.value))}
                      className="w-full bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium cursor-pointer transition-all"
                    >
                      {ALPRO_15_SHIFTS.map((shift) => (
                        <option key={shift.shiftNumber} value={shift.shiftNumber}>
                          Shift {shift.shiftNumber}: {shift.className} ({shift.day}, {shift.timeDisplay} WIB)
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400 pt-0.5 px-0.5">
                      <span>Jadwal: {selectedShift.day}, {selectedShift.timeDisplay} WIB</span>
                      {isShiftCurrentlyActive ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Sedang Berlangsung
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">Terjadwal</span>
                      )}
                    </div>
                  </div>

                  {/* 3. BUKTI FOTO KEHADIRAN (DRAG & DROP + KAMERA) */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon size={14} className="text-purple-600 dark:text-purple-400" />
                        <span>3. Bukti Foto Kehadiran</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {capturedImage ? "✓ Foto Terlampir" : "Upload / Ambil Kamera"}
                      </span>
                    </div>

                    {/* VIEW 1: LIVE WEBCAM ACTIVE (Clean & Direct Camera, No Templates) */}
                    {isCameraActive ? (
                      <div className="relative w-full h-80 sm:h-96 bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
                        <video
                          ref={setVideoRef}
                          autoPlay
                          playsInline
                          muted
                          style={{
                            transform: facingMode === "user" ? "scaleX(-1)" : "none",
                          }}
                          className="w-full h-full object-cover"
                        />

                        {/* Super Easy & Clean Bottom Shutter Controls */}
                        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 z-20">
                          {/* Balik kamera depan/belakang */}
                          <button
                            type="button"
                            onClick={toggleFacingMode}
                            className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center cursor-pointer transition-transform active:scale-95 border border-white/20 shadow-md"
                            title="Balik Kamera Depan / Belakang"
                          >
                            <SwitchCamera size={18} />
                          </button>

                          {/* Tombol Ambil Foto Utama - Jelas & Mudah */}
                          <button
                            type="button"
                            onClick={captureSnapshot}
                            disabled={isCapturing}
                            className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                          >
                            <Camera size={18} />
                            <span>Ambil Foto</span>
                          </button>

                          {/* Opsi pilih file jika ingin upload */}
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center cursor-pointer transition-transform active:scale-95 border border-white/20 shadow-md"
                            title="Pilih File dari Galeri / Folder"
                          >
                            <Upload size={17} />
                          </button>
                        </div>
                      </div>
                    ) : capturedImage ? (
                      /* VIEW 2: PHOTO PREVIEW (Clean Photo, No Template Overlays) */
                      <div className="space-y-2">
                        <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs">
                          <img
                            src={capturedImage}
                            alt="Bukti Kehadiran Asprak"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Action Strip: Foto Ulang & Hapus */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span className="font-semibold text-slate-800 dark:text-white truncate">
                              Foto presensi siap dikirim
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => startCamera()}
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Camera size={13} />
                              <span>Ambil Ulang</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
                              title="Hapus foto"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* VIEW 3: DRAG & DROP PHOTO ZONE + CAMERA TRIGGER */
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative rounded-xl border-2 border-dashed p-6 sm:p-7 flex flex-col items-center justify-center text-center transition-all ${
                          isDragging
                            ? "border-purple-600 bg-purple-50/60 dark:bg-purple-950/30"
                            : "border-slate-200 dark:border-white/15 bg-slate-50/60 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/25"
                        }`}
                      >
                        <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2.5 shadow-2xs">
                          <UploadCloud size={22} />
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                          Tarik &amp; lepas foto di sini, atau{" "}
                          <label className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
                            <span>pilih file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </p>

                        <p className="text-[11px] text-slate-400 font-mono mt-1">
                          Mendukung JPG, PNG, atau WEBP (Maksimal 10 MB)
                        </p>

                        {/* Divider */}
                        <div className="flex items-center gap-2 my-2.5 w-full max-w-xs">
                          <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
                          <span className="text-[10px] font-mono text-slate-400 uppercase">atau</span>
                          <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
                        </div>

                        {/* Webcam Trigger Button */}
                        <button
                          type="button"
                          onClick={() => startCamera()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-xs font-medium text-slate-700 dark:text-neutral-200 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Camera size={14} className="text-purple-600 dark:text-purple-400" />
                          <span>Ambil Foto via Kamera</span>
                        </button>
                      </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  {/* 4. Status Kehadiran & Catatan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider">
                        Status Kehadiran
                      </label>
                      <select
                        value={status}
                        onChange={(e: any) => setStatus(e.target.value)}
                        className="w-full bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                      >
                        <option value="Hadir Tepat Waktu">Hadir Tepat Waktu</option>
                        <option value="Terlambat">Terlambat (&lt; 15 menit)</option>
                        <option value="Shift Swap (Pengganti)">Shift Swap (Pengganti)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider">
                        Aktivitas Jaga
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Pendampingan Modul BST"
                        className="w-full bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 size={15} />
                    <span>Kirim Presensi Kehadiran</span>
                  </button>
                </form>

                {/* Success Alert */}
                {isSubmittedSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <div className="font-semibold text-emerald-900 dark:text-emerald-200">
                        Presensi Berhasil Dicatat
                      </div>
                      <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed text-[11px]">
                        Presensi <strong>{selectedAssistant.name}</strong> pada Shift {selectedShiftNumber} ({selectedShift.className}) telah tersimpan.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveMainTab("rekap")}
                        className="text-emerald-800 dark:text-emerald-200 font-mono font-medium underline cursor-pointer inline-block"
                      >
                        Buka Rekap Kehadiran →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Feed Column (Right: 5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Box 1: Shift Berjalan Hari Ini */}
                <div className="bg-white dark:bg-[#0E071A] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                    <h3 className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <Clock size={14} className="text-slate-500" />
                      <span>Shift Hari Ini</span>
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                      {ongoing.currentDayName}
                    </span>
                  </div>

                  {ongoing.activeShift ? (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-300">
                          SHIFT {ongoing.activeShift.shiftNumber}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Sedang Berlangsung
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {ongoing.activeShift.className}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                        {ongoing.activeShift.timeDisplay} WIB • {ongoing.activeShift.room}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-center space-y-1">
                      <p className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                        Tidak ada shift aktif saat ini
                      </p>
                      {ongoing.nextShiftToday && (
                        <p className="text-[11px] font-mono text-slate-500">
                          Berikutnya: Shift {ongoing.nextShiftToday.shiftNumber} ({ongoing.nextShiftToday.className}) pukul {ongoing.nextShiftToday.timeDisplay} WIB.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Box 2: Feed Cepat Kehadiran Terbaru */}
                <div className="bg-white dark:bg-[#0E071A] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                    <h3 className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                      <Users size={14} className="text-slate-500" />
                      <span>Kehadiran Terbaru</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveMainTab("rekap")}
                      className="text-[11px] font-mono text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                    >
                      Lihat Semua ({attendanceLogs.length}) →
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {attendanceLogs.slice(0, 5).map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1.5 hover:border-slate-300 dark:hover:border-white/15 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Photo Thumbnail */}
                            <button
                              type="button"
                              onClick={() => setActivePhotoModal(log)}
                              className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-200 dark:border-white/10 cursor-pointer"
                              title="Klik untuk perbesar"
                            >
                              <img
                                src={log.photoUrl}
                                alt={log.assistantName}
                                className="w-full h-full object-cover"
                              />
                            </button>
                            <div className="min-w-0">
                              <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                                [{log.assistantCode}] {log.assistantName}
                              </div>
                              <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                                Shift {log.shiftNumber} • {log.className}
                              </div>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shrink-0 border border-emerald-200 dark:border-emerald-800/60">
                            {log.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 dark:border-white/5 pt-1">
                          <span>{log.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => setActivePhotoModal(log)}
                            className="text-slate-600 dark:text-neutral-300 hover:text-purple-600 font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={11} />
                            <span>Foto Bukti</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REKAP ABSENSI SELURUH ASISTEN */}
          {activeMainTab === "rekap" && (
            <div className="space-y-5">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0E071A] border border-slate-200/80 dark:border-white/10 shadow-2xs">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase">Total Kehadiran</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{totalHadir} Asisten</div>
                  <div className="text-[10px] text-slate-400 font-mono">Tersimpan di Sistem</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0E071A] border border-slate-200/80 dark:border-white/10 shadow-2xs">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase">Tepat Waktu</div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{tepatWaktuCount}</div>
                  <div className="text-[10px] text-emerald-600/80 font-mono">Sesuai Jadwal</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0E071A] border border-slate-200/80 dark:border-white/10 shadow-2xs">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase">Terlambat (&lt;15m)</div>
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">{terlambatCount}</div>
                  <div className="text-[10px] text-amber-600/80 font-mono">Tercatat Sistem</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0E071A] border border-slate-200/80 dark:border-white/10 shadow-2xs">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase">Shift Swap</div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{swapCount}</div>
                  <div className="text-[10px] text-indigo-600/80 font-mono">Asisten Pengganti</div>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="bg-white dark:bg-[#0E071A] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama, kode asisten, atau kelas..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  {/* Dropdown Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Shift Filter */}
                    <select
                      value={filterShift}
                      onChange={(e) => setFilterShift(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-neutral-300 cursor-pointer"
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
                      className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-neutral-300 cursor-pointer"
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
                      className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-neutral-300 cursor-pointer"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-slate-50/70 dark:bg-white/5 rounded-xl p-3.5 border border-slate-200/70 dark:border-white/10 space-y-2.5 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-2xs"
                      >
                        {/* Header card */}
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Photo Thumbnail */}
                            <button
                              type="button"
                              onClick={() => setActivePhotoModal(log)}
                              className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-200 dark:border-white/10 cursor-pointer"
                              title="Klik untuk perbesar"
                            >
                              <img
                                src={log.photoUrl}
                                alt={log.assistantName}
                                className="w-full h-full object-cover"
                              />
                            </button>
                            <div className="min-w-0">
                              <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                                [{log.assistantCode}] {log.assistantName}
                              </div>
                              <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300 truncate">
                                {log.assistantRole}
                              </div>
                              <div className="text-[9px] font-mono text-slate-400">
                                {log.division}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded shrink-0 ${
                              log.status === "Hadir Tepat Waktu"
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                                : log.status === "Terlambat"
                                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                                : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60"
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>

                        {/* Shift and time */}
                        <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-[11px] font-mono space-y-0.5">
                          <div className="flex items-center justify-between text-slate-700 dark:text-neutral-300">
                            <span className="font-semibold text-purple-700 dark:text-purple-300">
                              Shift {log.shiftNumber} ({log.className})
                            </span>
                            <span className="text-slate-400 text-[10px]">R1 TULT Lt 8</span>
                          </div>
                          <div className="text-slate-500 dark:text-neutral-400 text-[10px]">
                            {log.shiftTime}
                          </div>
                        </div>

                        {/* Notes */}
                        <p className="text-[11px] text-slate-600 dark:text-neutral-300 font-sans italic line-clamp-2">
                          &quot;{log.notes}&quot;
                        </p>

                        {/* Footer Info & Action */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-white/5">
                          <span>{log.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => setActivePhotoModal(log)}
                            className="text-slate-600 dark:text-neutral-300 hover:text-purple-600 font-medium flex items-center gap-1 cursor-pointer"
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
              <div className="relative w-full max-w-lg bg-white dark:bg-[#0E071A] rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-white/10 space-y-3.5">
                {/* Modal Header */}
                <div className="p-4 sm:p-5 pb-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Bukti Validasi Kehadiran
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400">
                        EDM Laboratory Official Proof
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePhotoModal(null)}
                    className="p-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Modal Image View */}
                <div className="px-4 sm:px-5">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10">
                    <img
                      src={activePhotoModal.photoUrl}
                      alt={activePhotoModal.assistantName}
                      className="w-full h-full object-cover"
                    />

                    {/* Watermark Details */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 pt-5 text-white font-mono text-[10px]">
                      <div className="flex items-center justify-between">
                        <span>LAB EDM • ALPRO 26/27</span>
                        <span className="text-emerald-400">GPS VALID</span>
                      </div>
                      <div className="text-[10px] text-white/80 mt-0.5 truncate">
                        [{activePhotoModal.assistantCode}] {activePhotoModal.assistantName} • Shift {activePhotoModal.shiftNumber} ({activePhotoModal.className})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assistant Details Strip */}
                <div className="px-4 sm:px-5 pb-4 space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {activePhotoModal.assistantName} ({activePhotoModal.assistantCode})
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                        {activePhotoModal.assistantRole} • {activePhotoModal.division}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
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
