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
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  assistantCode: string;
  assistantName: string;
  assistantRole: string;
  shiftNumber: number;
  className: string;
  shiftTime: string;
  timestamp: string;
  photoUrl: string;
  status: "Hadir Tepat Waktu" | "Terlambat" | "Shift Swap (Pengganti)";
  notes: string;
}

export default function PresensiAsprakPage() {
  const [selectedAssistantCode, setSelectedAssistantCode] = useState<string>("MACY");
  const [selectedShiftNumber, setSelectedShiftNumber] = useState<number>(4);
  const [status, setStatus] = useState<"Hadir Tepat Waktu" | "Terlambat" | "Shift Swap (Pengganti)">("Hadir Tepat Waktu");
  const [notes, setNotes] = useState<string>("Mengawal praktikan dan mendampingi pelaksanaan modul.");
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");

  // Camera stream states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initial Attendance Records
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>([
    {
      id: "att-1",
      assistantCode: "DEVO",
      assistantName: "Devin Octavian",
      assistantRole: "Koordinator",
      shiftNumber: 2,
      className: "SI-50-02",
      shiftTime: "Senin 10.30 - 12.30",
      timestamp: "31 Okt 2026, 10:25:12 WIB",
      photoUrl: "/images/edm-mascot.png",
      status: "Hadir Tepat Waktu",
      notes: "Standby pembukaan shift 2 dan pengawasan briefing modul.",
    },
    {
      id: "att-2",
      assistantCode: "GRGS",
      assistantName: "Gracia Gebriella Sianturi",
      assistantRole: "Sekretaris 1",
      shiftNumber: 2,
      className: "SI-50-02",
      shiftTime: "Senin 10.30 - 12.30",
      timestamp: "31 Okt 2026, 10:28:44 WIB",
      photoUrl: "/images/edm-mascot.png",
      status: "Hadir Tepat Waktu",
      notes: "Absensi kehadiran praktikan SI-50-02.",
    },
  ]);

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
          // Auto select shift for this assistant
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

  // Auto start camera function
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
    } catch (err: any) {
      console.warn("Camera access failed or denied:", err);
      setCameraError(
        "Kamera tidak dapat diakses langsung (izin browser ditolak atau tidak ada webcam). Anda dapat menggunakan fitur upload foto selfie sebagai alternatif."
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

  // Auto trigger camera when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Capture snapshot from video feed
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

        // Draw EDM watermark banner on the photo
        ctx.fillStyle = "rgba(14, 7, 26, 0.75)";
        ctx.fillRect(0, canvas.height - 54, canvas.width, 54);

        ctx.fillStyle = "#A855F7";
        ctx.font = "bold 14px monospace";
        ctx.fillText("LAB EDM • ALPRO 26/27", 16, canvas.height - 32);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "12px sans-serif";
        const asst = getAssistantByCode(selectedAssistantCode);
        const shiftObj = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftNumber);
        ctx.fillText(
          `${asst?.code || selectedAssistantCode} • Shift ${selectedShiftNumber} (${shiftObj?.className || "ALPRO"}) • ${new Date().toLocaleTimeString("id-ID")} WIB`,
          16,
          canvas.height - 14
        );

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImage(dataUrl);
        stopCamera();
      }
      setIsCapturing(false);
    }, 150);
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Fallback file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCapturedImage(uploadEvent.target?.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit attendance record
  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) {
      alert("Harap ambil foto bukti kehadiran selfie sebelum mengirim presensi!");
      return;
    }

    const asst = getAssistantByCode(selectedAssistantCode);
    const shiftObj = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftNumber);

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      assistantCode: selectedAssistantCode,
      assistantName: asst?.name || selectedAssistantCode,
      assistantRole: asst?.position || "Asisten Praktikum",
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
    };

    setAttendanceLogs([newRecord, ...attendanceLogs]);
    setIsSubmittedSuccess(true);
  };

  const selectedAssistant = getAssistantByCode(selectedAssistantCode) || ALPRO_ASSISTANTS[0];
  const selectedShift = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === selectedShiftNumber) || ALPRO_15_SHIFTS[0];
  const ongoing = getCurrentOngoingShift();
  const isShiftCurrentlyActive = ongoing.activeShift?.shiftNumber === selectedShiftNumber;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F0F2F6] dark:bg-[#070312] text-slate-900 dark:text-neutral-100 transition-colors">
      {/* Floating Rounded Sidebar */}
      <DashboardSidebar activeTab="presensi_asprak" role="ASPRAK" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <DashboardHeader />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
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
          <div className="relative rounded-[2.2rem] bg-gradient-to-r from-purple-900 via-indigo-900 to-[#120824] p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-purple-800/40">
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
                  Pencatatan kehadiran jaga shift laboratorium secara real-time dengan verifikasi foto selfie instan (auto camera capture), timestamp server, dan plotting asisten praktikum.
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

          {/* Main Grid: Form Presensi (Kamera & Dropdown) vs Live Feed Riwayat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column (Left: 7 Cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0e071a] rounded-[2rem] p-6 sm:p-7 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-6 transition-colors">
              <div className="border-b border-slate-100 dark:border-neutral-800 pb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Camera size={20} className="text-purple-600 dark:text-purple-400" />
                  <span>Formulir Presensi Mandiri Asisten</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                  Pilih identitas asisten, tentukan shift jaga, dan ambil foto bukti kehadiran langsung di lab.
                </p>
              </div>

              <form onSubmit={handleSubmitAttendance} className="space-y-5">
                {/* 1. Dropdown Nama & Kode Asisten */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                    <span>1. Pilih Nama &amp; Kode Asisten</span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 lowercase font-normal">
                      32 asisten terdaftar
                    </span>
                  </label>

                  <div className="relative">
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
                  </div>

                  {/* Assistant Preview Chip */}
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-700 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
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
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200">
                      Role: {selectedAssistant.role}
                    </span>
                  </div>
                </div>

                {/* 2. Dropdown Shift Jaga */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                    <span>2. Pilih Shift Jaga Laboratorium</span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 lowercase font-normal">
                      15 shift aktif
                    </span>
                  </label>

                  <select
                    value={selectedShiftNumber}
                    onChange={(e) => setSelectedShiftNumber(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-sans cursor-pointer transition-all"
                  >
                    {ALPRO_15_SHIFTS.map((shift) => (
                      <option key={shift.shiftNumber} value={shift.shiftNumber}>
                        Shift {shift.shiftNumber}: {shift.className} ({shift.day}, {shift.timeDisplay} WIB)
                      </option>
                    ))}
                  </select>

                  {/* Shift Status Indicator */}
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
                        Terjadwal
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Bukti Ngasprak: Auto Camera Viewfinder */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider">
                      3. Bukti Ngasprak (Selfie Kamera Langsung)
                    </label>
                    {capturedImage ? (
                      <button
                        type="button"
                        onClick={retakePhoto}
                        className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        <span>Foto Ulang</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Kamera Aktif
                      </span>
                    )}
                  </div>

                  {/* Camera Viewfinder Box */}
                  <div className="relative w-full aspect-video sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border-2 border-dashed border-purple-400/50 dark:border-purple-600/50 flex flex-col items-center justify-center shadow-inner group">
                    {capturedImage ? (
                      // Captured Image View
                      <div className="relative w-full h-full">
                        <img
                          src={capturedImage}
                          alt="Bukti Kehadiran Asprak"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Check size={12} />
                          <span>Foto Berhasil Diambil</span>
                        </div>
                      </div>
                    ) : isCameraActive ? (
                      // Live Video Stream
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover mirror"
                        />

                        {/* Cyber overlay frame & crosshairs */}
                        <div className="absolute inset-4 pointer-events-none border border-white/25 rounded-xl flex flex-col justify-between p-3">
                          <div className="flex justify-between items-center text-[10px] font-mono text-purple-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                            <span>REC ● LIVE LAB CAMERA</span>
                            <span>{selectedAssistantCode}</span>
                          </div>

                          <div className="text-center text-[11px] font-mono text-white/80 bg-black/40 backdrop-blur-xs py-1 rounded">
                            Arahkan wajah &amp; pastikan berada di area laboratorium
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
                    ) : (
                      // Camera Inactive / Denied State
                      <div className="p-6 text-center space-y-3">
                        <Camera size={36} className="text-purple-400 mx-auto" />
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white">
                            Kamera Belum Aktif
                          </p>
                          <p className="text-xs text-slate-400 max-w-sm">
                            {cameraError || "Klik tombol di bawah untuk menyalakan kamera webcam perangkat Anda."}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={startCamera}
                            className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-mono font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                          >
                            <Camera size={14} />
                            <span>Buka Kamera Sekarang</span>
                          </button>

                          <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-2">
                            <Upload size={14} />
                            <span>Upload Foto Selfie</span>
                            <input
                              type="file"
                              accept="image/*"
                              capture="user"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
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
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-mono text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 size={18} />
                  <span>Kirim Presensi Kehadiran Asprak</span>
                </button>
              </form>

              {/* Success Alert Modal */}
              {isSubmittedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3 animate-fade-in">
                  <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-emerald-900 dark:text-emerald-200">
                      Presensi Berhasil Dicatat ke Server EDM!
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed font-sans">
                      Terima kasih, <strong>{selectedAssistant.name}</strong>. Presensi Anda pada <strong>Shift {selectedShiftNumber} ({selectedShift.className})</strong> telah terverifikasi secara resmi dengan stempel waktu real-time.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmittedSuccess(false)}
                      className="text-emerald-800 dark:text-emerald-200 font-mono font-bold underline mt-1 cursor-pointer"
                    >
                      Tutup Pesan Ini
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
                    {ongoing.nextShiftToday ? (
                      <p className="text-[11px] font-mono text-purple-600 dark:text-purple-400">
                        Shift berikutnya: Shift {ongoing.nextShiftToday.shiftNumber} ({ongoing.nextShiftToday.className}) pukul {ongoing.nextShiftToday.timeDisplay} WIB.
                      </p>
                    ) : (
                      <p className="text-[11px] font-mono text-slate-400">
                        Seluruh jadwal shift praktikum hari {ongoing.currentDayName} telah selesai.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Box 2: Riwayat Presensi Asprak Hari Ini */}
              <div className="bg-white dark:bg-[#0e071a] rounded-[2rem] p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Users size={16} className="text-purple-600 dark:text-purple-400" />
                    <span>Riwayat Kehadiran Hari Ini</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-neutral-400">
                    {attendanceLogs.length} Asisten
                  </span>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {attendanceLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/70 dark:border-neutral-800 space-y-2 hover:border-purple-300 dark:hover:border-purple-800 transition-all"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Photo Thumbnail */}
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-purple-100 dark:bg-purple-950 shrink-0 border border-purple-200 dark:border-purple-800">
                            <img
                              src={log.photoUrl}
                              alt={log.assistantName}
                              className="w-full h-full object-cover"
                            />
                          </div>
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

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 dark:border-neutral-800/80 pt-2">
                        <span>{log.timestamp}</span>
                        <span className="truncate max-w-[140px] text-slate-500 italic">
                          &quot;{log.notes}&quot;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
