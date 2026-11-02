"use client";

import {
  ArrowLeftRight,
  Check,
  X,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Clock,
  FileText,
  Gift,
  Paperclip,
  Upload,
  Info,
  XCircle,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { ALPRO_ASSISTANTS, getAssistantByCode } from "@/data/assistants-roster";
import { ALPRO_15_SHIFTS } from "@/data/alpro-schedule-plotting";
import Link from "next/link";

export interface OfficialSwapItem {
  id: string | number;
  requesterName: string;
  requesterCode: string;
  shiftSource: number;
  shiftTarget?: number;
  replacementName: string;
  replacementCode: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  note?: string;
  date?: string;
  swapType?: "SWAP" | "HIBAH";
  hibahCategory?: string;
  hibahProofUrl?: string;
  hibahProofName?: string;
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
    swapType: "SWAP",
  },
  {
    id: 2,
    requesterName: "Laula Fatimatusshifa",
    requesterCode: "LAUF",
    shiftSource: 11,
    shiftTarget: 0,
    replacementName: "Dinar Fadlilatunnisa",
    replacementCode: "DINF",
    status: "APPROVED",
    note: "Sakit demam & flu berat, istirahat dokter 2 hari sesuai surat keterangan klinik Telkom University",
    date: "31 Okt 2026",
    swapType: "HIBAH",
    hibahCategory: "Sakit (Surat Keterangan Dokter)",
    hibahProofUrl: "/images/asprak-draft-2.jpg",
    hibahProofName: "Surat_Dokter_Klinik_LAUF.jpg",
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
    swapType: "SWAP",
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
    swapType: "SWAP",
  },
];

export default function SwapEngineDashboard() {
  const [swaps, setSwaps] = useState<OfficialSwapItem[]>(INITIAL_OFFICIAL_SWAPS);
  const [swapType, setSwapType] = useState<"SWAP" | "HIBAH">("SWAP");
  const [requesterCode, setRequesterCode] = useState("MJFA");
  const [shiftSourceNum, setShiftSourceNum] = useState<number>(6);
  const [shiftTargetNum, setShiftTargetNum] = useState<number>(15);
  const [replacementCode, setReplacementCode] = useState("MAYR");
  const [swapNote, setSwapNote] = useState("");

  // Hibah specific state
  const [hibahCategory, setHibahCategory] = useState("Sakit (Surat Keterangan Dokter)");
  const [hibahProofPreview, setHibahProofPreview] = useState<string | null>(null);
  const [hibahProofFileName, setHibahProofFileName] = useState("");
  const [activeProofModal, setActiveProofModal] = useState<OfficialSwapItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSwaps = localStorage.getItem("alpro_official_swaps");
        if (savedSwaps) {
          setSwaps(JSON.parse(savedSwaps));
        }
      } catch (e) {}
    }
  }, []);

  const getShiftDetails = (shiftNum?: number) => {
    if (!shiftNum || shiftNum === 0) {
      return { classCode: "Hibah Lepas", day: "1 Arah", time: "Tanpa Balasan" };
    }
    const s = ALPRO_15_SHIFTS.find((shift) => shift.shiftNumber === shiftNum);
    if (!s) return { classCode: `Shift ${shiftNum}`, day: "Senin", time: "07.30 - 09.30" };
    return { classCode: s.classCode, day: s.day, time: s.timeDisplay };
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHibahProofFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setHibahProofPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacementCode || !shiftSourceNum) return;
    if (swapType === "SWAP" && !shiftTargetNum) return;

    const reqObj = getAssistantByCode(requesterCode);
    const repObj = getAssistantByCode(replacementCode);
    const isHibah = swapType === "HIBAH";

    const newRecord: OfficialSwapItem = {
      id: Date.now(),
      requesterName: reqObj ? reqObj.name : requesterCode,
      requesterCode: reqObj ? reqObj.code : requesterCode,
      shiftSource: Number(shiftSourceNum),
      shiftTarget: isHibah ? 0 : Number(shiftTargetNum),
      replacementName: repObj ? repObj.name : replacementCode,
      replacementCode: repObj ? repObj.code : replacementCode,
      status: "APPROVED",
      note: swapNote.trim() || (isHibah ? `Hibah resmi jadwal praktikum (${hibahCategory})` : "Pertukaran resmi jadwal praktikum"),
      date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      swapType: isHibah ? "HIBAH" : "SWAP",
      hibahCategory: isHibah ? hibahCategory : undefined,
      hibahProofUrl: isHibah ? (hibahProofPreview || "/images/asprak-draft-2.jpg") : undefined,
      hibahProofName: isHibah ? (hibahProofFileName || "Bukti_Hibah_Shift.jpg") : undefined,
    };

    const updated = [newRecord, ...swaps];
    setSwaps(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("alpro_official_swaps", JSON.stringify(updated));
      } catch (err) {}
    }
    setSwapNote("");
    setHibahProofPreview(null);
    setHibahProofFileName("");
  };

  const handleSetSwapStatus = (
    id: string | number,
    newStatus: "APPROVED" | "PENDING" | "REJECTED"
  ) => {
    setSwaps((prev) => {
      const updated = prev.map((s) => {
        if (s.id === id) {
          return { ...s, status: newStatus };
        }
        return s;
      });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("alpro_official_swaps", JSON.stringify(updated));
        } catch (err) {}
      }
      return updated;
    });
  };

  const handleToggleSwapStatus = (id: string | number) => {
    setSwaps((prev) => {
      const updated = prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "APPROVED" ? "PENDING" : "APPROVED";
          return { ...s, status: nextStatus as any };
        }
        return s;
      });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("alpro_official_swaps", JSON.stringify(updated));
        } catch (err) {}
      }
      return updated;
    });
  };

  const handleDeleteSwap = (id: string | number) => {
    setSwaps((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("alpro_official_swaps", JSON.stringify(updated));
        } catch (err) {}
      }
      return updated;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-28 sm:pb-8">
      <DashboardSidebar activeTab="pertukaran_shift" />

      <div className="flex-1 w-full min-w-0 space-y-6">
        {/* Header Card */}
        <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/dashboard/assistant?tab=jadwal_saya"
                className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1 font-mono"
              >
                <ArrowLeft size={14} /> Kembali ke Jadwal Saya
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pertukaran &amp; Hibah Jadwal Shift</h1>
              <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded">
                EDM LAB • SI&apos;50
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
              Matriks resmi permohonan pertukaran jadwal (2 arah) dan pelimpahan tugas hibah shift jaga praktikum Algoritma &amp; Pemrograman 2026/2027.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              {swaps.filter((s) => s.status === "APPROVED").length} ACC Disetujui
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1.5">
              <Clock size={13} />
              {swaps.filter((s) => s.status === "PENDING").length} ON HOLD Menunggu
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1.5">
              <XCircle size={13} />
              {swaps.filter((s) => s.status === "REJECTED").length} REJECT Ditolak
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1.5">
              <Gift size={13} />
              {swaps.filter((s) => s.swapType === "HIBAH").length} Hibah Terdata
            </span>
          </div>
        </div>

        {/* Form Pengajuan Pertukaran / Hibah Jadwal */}
        <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-5 transition-colors">
          <div className="border-b border-slate-100 dark:border-neutral-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {swapType === "SWAP" ? (
                  <ArrowLeftRight size={18} className="text-[#7C3AED]" />
                ) : (
                  <Gift size={18} className="text-amber-500" />
                )}
                {swapType === "SWAP" ? "Formulir Pengajuan Pindah / Tukar Shift" : "Formulir Pengajuan Hibah Shift (Pelimpahan)"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                {swapType === "SWAP"
                  ? "Pilih asisten pemohon, shift asal yang ditinggalkan, shift tujuan yang diambil, dan asisten pengganti."
                  : "Pilih asisten pemberi hibah, shift yang dilimpahkan, asisten penerima hibah, serta sertakan alasan resmi dan bukti valid."}
              </p>
            </div>

            {/* Mode Switcher: Pindah Shift vs Hibah Shift */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={() => setSwapType("SWAP")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  swapType === "SWAP"
                    ? "bg-[#7C3AED] text-white shadow-xs"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ArrowLeftRight size={13} />
                <span>Pindah Shift</span>
              </button>
              <button
                type="button"
                onClick={() => setSwapType("HIBAH")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  swapType === "HIBAH"
                    ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Gift size={13} />
                <span>Hibah Shift</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleAddSwap} className="space-y-4">
            {/* JIKA MEMILIH PINDAH SHIFT: ALUR SEPERTI BIASA */}
            {swapType === "SWAP" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-in fade-in duration-200">
                {/* Bagian 1: Asprak yang Mengajukan (Blue-tinted box) */}
                <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/50 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-sky-200/60 dark:border-sky-900/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                      Asprak yang Mengajukan
                    </span>
                    <span className="text-[10px] font-mono text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 rounded font-bold">
                      Pemohon (Tukar 2 Arah)
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
                        <option key={`swap-req-${asst.code}`} value={asst.code}>
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
                          <option key={`swap-src-${s.shiftNumber}`} value={s.shiftNumber}>
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
                          <option key={`swap-tgt-${s.shiftNumber}`} value={s.shiftNumber}>
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
                        Rekan Tukar
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
                          <option key={`swap-rep-${asst.code}`} value={asst.code}>
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
            )}

            {/* JIKA MEMILIH HIBAH: SESUAIKAN DENGAN ALASAN HIBAH DAN BUKTI HIBAH */}
            {swapType === "HIBAH" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-in fade-in duration-200">
                {/* Box 1: Asprak Pemberi Hibah (Pemohon) & Shift yang Dihibahkan */}
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200/80 dark:border-amber-900/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <Gift size={14} className="text-amber-600 dark:text-amber-400" />
                      Asprak Pemberi Hibah
                    </span>
                    <span className="text-[10px] font-mono text-amber-800 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-900/50 px-2 py-0.5 rounded font-bold">
                      Pelimpahan Shift (1 Arah)
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                      Nama Lengkap &amp; Kode Asprak Pemberi Hibah
                    </label>
                    <select
                      value={requesterCode}
                      onChange={(e) => setRequesterCode(e.target.value)}
                      className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer shadow-2xs"
                    >
                      {ALPRO_ASSISTANTS.map((asst) => (
                        <option key={`hibah-req-${asst.code}`} value={asst.code}>
                          [{asst.code}] {asst.name} — {asst.position}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Shift yang Dihibahkan (Shift Asal)
                    </label>
                    <select
                      value={shiftSourceNum}
                      onChange={(e) => setShiftSourceNum(Number(e.target.value))}
                      className="w-full bg-white dark:bg-neutral-800 border border-amber-300 dark:border-amber-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer shadow-2xs"
                    >
                      {ALPRO_15_SHIFTS.map((s) => (
                        <option key={`hibah-src-${s.shiftNumber}`} value={s.shiftNumber}>
                          SHIFT {s.shiftNumber} • {s.classCode} ({s.day}, {s.timeDisplay})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Info SOP Hibah */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#140b20] border border-amber-200 dark:border-amber-800/60 text-xs font-mono space-y-1">
                    <div className="font-bold text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Info size={13} />
                      Ketentuan Hibah Shift:
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">
                      Shift ini akan dilimpahkan sepenuhnya kepada asisten penerima hibah tanpa kewajiban mengambil shift balasan. Asisten pemberi hibah wajib melampirkan alasan jelas dan bukti sah (surat dokter / dispensasi / bukti chat persetujuan).
                    </p>
                  </div>
                </div>

                {/* Box 2: Asprak Penerima Hibah, Alasan Hibah, & Bukti Hibah */}
                <div className="p-4 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-orange-200/60 dark:border-orange-900/40">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-900 dark:text-orange-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                        Asprak Penerima Hibah &amp; Bukti
                      </span>
                      <span className="text-[10px] font-mono text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50 px-2 py-0.5 rounded font-bold">
                        Penerima Tugas
                      </span>
                    </div>

                    {/* Penerima Hibah Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                        Nama Lengkap &amp; Kode Asprak Penerima Hibah
                      </label>
                      <select
                        value={replacementCode}
                        onChange={(e) => setReplacementCode(e.target.value)}
                        className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer shadow-2xs"
                      >
                        {ALPRO_ASSISTANTS.filter((a) => a.code !== requesterCode).map((asst) => (
                          <option key={`hibah-rep-${asst.code}`} value={asst.code}>
                            [{asst.code}] {asst.name} — {asst.position}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Kategori Alasan Hibah */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                        Kategori Alasan Hibah
                      </label>
                      <select
                        value={hibahCategory}
                        onChange={(e) => setHibahCategory(e.target.value)}
                        className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer shadow-2xs"
                      >
                        <option value="Sakit (Surat Keterangan Dokter)">Sakit (Surat Keterangan Dokter)</option>
                        <option value="Ujian / Sidang Tugas Akhir">Ujian / Sidang Tugas Akhir</option>
                        <option value="Dispensasi Dinas / Surat Tugas Kampus">Dispensasi Dinas / Surat Tugas Kampus</option>
                        <option value="Keperluan Keluarga Mendesak / Duka Cita">Keperluan Keluarga Mendesak / Duka Cita</option>
                        <option value="Lainnya (Izin Khusus Koordinator)">Lainnya (Izin Khusus Koordinator)</option>
                      </select>
                    </div>

                    {/* Rincian Alasan Hibah */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold">
                        Rincian Alasan Hibah
                      </label>
                      <textarea
                        rows={2}
                        value={swapNote}
                        onChange={(e) => setSwapNote(e.target.value)}
                        placeholder="Jelaskan alasan detail permohonan hibah shift (contoh: Rawat inap di rumah sakit, ada jadwal sidang komprehensif, dsb.)..."
                        className="w-full bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/30 shadow-2xs resize-none"
                      />
                    </div>

                    {/* Upload Bukti Hibah */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-300 font-bold flex items-center justify-between">
                        <span>Bukti Pendukung Hibah (Surat Dokter / Chat / Dispensasi)</span>
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold">*Wajib</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleProofUpload}
                            className="hidden"
                          />
                          <div className="p-2.5 rounded-xl border border-dashed border-orange-300 dark:border-orange-700 bg-white/80 dark:bg-neutral-800/80 hover:bg-orange-50/50 dark:hover:bg-orange-950/30 flex items-center justify-center gap-2 text-xs font-mono text-orange-900 dark:text-orange-300 transition-colors">
                            <Upload size={14} className="text-orange-600 dark:text-orange-400" />
                            <span className="truncate max-w-[200px]">
                              {hibahProofFileName ? hibahProofFileName : "Pilih File Bukti / Foto..."}
                            </span>
                          </div>
                        </label>
                        {hibahProofPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setHibahProofPreview(null);
                              setHibahProofFileName("");
                            }}
                            className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-xs font-mono cursor-pointer"
                            title="Hapus lampiran bukti"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Gift size={15} />
                      Ajukan Hibah Shift
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Official Table Matching Spreadsheet Image (media_1793460693411_6d5e38e9.png) */}
        <div className="bg-white dark:bg-[#0e071a] rounded-2xl p-6 border border-slate-200/80 dark:border-purple-950/60 shadow-xs space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-neutral-800 pb-3">
            <div>
              <h3 className="font-mono text-xs text-slate-800 dark:text-neutral-200 uppercase tracking-widest font-bold flex items-center gap-2">
                <FileText size={15} className="text-[#7C3AED]" />
                Matriks Rekapitulasi Pertukaran &amp; Hibah Jadwal Asprak
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5">
                Data sinkron dengan lembar kerja resmi Laboratorium Enterprise Data Management (EDM).
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
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
                    Asprak yang Mengajukan / Pemberi Hibah
                  </th>
                  <th
                    colSpan={2}
                    className="bg-[#c2dfb8] text-[#1a4413] dark:bg-emerald-950 dark:text-emerald-200 border-b border-r border-slate-300 dark:border-neutral-700 py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider"
                  >
                    Asprak Pengganti / Penerima Hibah
                  </th>
                  <th
                    colSpan={5}
                    className="bg-slate-200 text-slate-800 dark:bg-neutral-800 dark:text-neutral-200 border-b border-slate-300 dark:border-neutral-700 py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider"
                  >
                    Status &amp; Validasi
                  </th>
                </tr>

                {/* Sub Header */}
                <tr className="border-b border-slate-300 dark:border-neutral-700">
                  {/* Under Asprak yang Mengajukan */}
                  <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs whitespace-nowrap min-w-[200px]">
                    Nama Lengkap &amp; Catatan
                  </th>
                  <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[110px]">
                    Kode &amp; Tipe
                  </th>
                  <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[140px]">
                    Shift Asal
                  </th>
                  <th className="bg-[#cfc8ea] text-[#2c134a] dark:bg-purple-950/70 dark:text-purple-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[150px]">
                    Shift Tujuan / Status
                  </th>

                  {/* Under Asprak Pengganti */}
                  <th className="bg-[#fdecae] text-[#5c3e03] dark:bg-amber-950/70 dark:text-amber-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs whitespace-nowrap min-w-[180px]">
                    Nama Lengkap
                  </th>
                  <th className="bg-[#fdecae] text-[#5c3e03] dark:bg-amber-950/70 dark:text-amber-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[100px]">
                    Kode Asprak
                  </th>

                  {/* Under Status & Validasi */}
                  <th className="bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 border-r border-slate-300 dark:border-neutral-700 py-2 px-3 font-semibold text-xs text-center whitespace-nowrap min-w-[130px]">
                    Status
                  </th>
                  <th className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-2.5 font-bold text-xs text-center whitespace-nowrap min-w-[70px]">
                    ACC
                  </th>
                  <th className="bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-2.5 font-bold text-xs text-center whitespace-nowrap min-w-[85px]">
                    ON HOLD
                  </th>
                  <th className="bg-rose-100 text-rose-900 dark:bg-rose-950/80 dark:text-rose-200 border-r border-slate-300 dark:border-neutral-700 py-2 px-2.5 font-bold text-xs text-center whitespace-nowrap min-w-[75px]">
                    REJECT
                  </th>
                  <th className="bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 py-2 px-2 font-semibold text-xs text-center whitespace-nowrap min-w-[50px]">
                    Hapus
                  </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-slate-200 dark:divide-neutral-800 bg-white dark:bg-[#0c0516]">
                {swaps.map((row) => {
                  const isHibahRow = row.swapType === "HIBAH";
                  const srcInfo = getShiftDetails(row.shiftSource);
                  const tgtInfo = getShiftDetails(row.shiftTarget);

                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors"
                    >
                      {/* Nama Lengkap Pemohon & Catatan / Bukti */}
                      <td className="py-3 px-3.5 border-r border-slate-200 dark:border-neutral-800">
                        <div className="font-semibold text-slate-900 dark:text-white font-sans text-xs">
                          {row.requesterName}
                        </div>
                        {isHibahRow && row.hibahCategory && (
                          <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold mt-0.5">
                            [{row.hibahCategory}]
                          </div>
                        )}
                        {row.note && (
                          <div className="text-[10px] text-slate-500 dark:text-neutral-400 italic mt-0.5 line-clamp-2">
                            {row.note}
                          </div>
                        )}
                        {isHibahRow && row.hibahProofUrl && (
                          <button
                            type="button"
                            onClick={() => setActiveProofModal(row)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-mono font-bold transition-all cursor-pointer mt-1.5 shadow-2xs"
                          >
                            <Paperclip size={10} />
                            <span>Lihat Bukti Hibah</span>
                          </button>
                        )}
                      </td>

                      {/* Kode Asprak & Tipe Pemohon */}
                      <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-purple-100/70 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            {row.requesterCode}
                          </span>
                          {isHibahRow ? (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-black bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-2xs">
                              <Gift size={9} /> HIBAH
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                              <ArrowLeftRight size={9} /> TUKAR
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Shift Asal (Green Badge with Caret) */}
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

                      {/* Shift Tujuan / Status Hibah */}
                      <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                        {isHibahRow ? (
                          <div className="inline-flex flex-col items-center gap-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                              <Gift size={12} className="text-amber-600 dark:text-amber-400" />
                              HIBAH LEPAS
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                              1 Arah (Tanpa Balasan)
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex flex-col items-center gap-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#badbfb] text-[#0d47a1] dark:bg-sky-950/80 dark:text-sky-300 border border-sky-400/80 dark:border-sky-700 shadow-2xs">
                              SHIFT {row.shiftTarget}
                              <ChevronDown size={12} className="text-[#0d47a1] dark:text-sky-300" />
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                              {tgtInfo.classCode} ({tgtInfo.day})
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Nama Lengkap Pengganti */}
                      <td className="py-3 px-3.5 border-r border-slate-200 dark:border-neutral-800">
                        <div className="font-semibold text-slate-900 dark:text-white font-sans text-xs">
                          {row.replacementName}
                        </div>
                        {isHibahRow && (
                          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                            (Penerima Tugas Hibah)
                          </span>
                        )}
                      </td>

                      {/* Kode Asprak Pengganti */}
                      <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                        <span className="inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {row.replacementCode}
                        </span>
                      </td>

                      {/* 1. Status (Ditampilkan & Tidak Dihilangkan) */}
                      <td className="py-3 px-3 text-center border-r border-slate-200 dark:border-neutral-800">
                        {row.status === "APPROVED" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                            <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>Disetujui</span>
                          </span>
                        ) : row.status === "PENDING" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                            <Clock size={12} className="text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>Menunggu</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-700 shadow-2xs">
                            <XCircle size={12} className="text-rose-600 dark:text-rose-400 shrink-0" />
                            <span>Ditolak</span>
                          </span>
                        )}
                      </td>

                      {/* 2. Kolom ACC */}
                      <td className="py-3 px-2 text-center border-r border-slate-200 dark:border-neutral-800">
                        <button
                          type="button"
                          onClick={() => handleSetSwapStatus(row.id, "APPROVED")}
                          title="Setujui (ACC)"
                          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            row.status === "APPROVED"
                              ? "bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300 dark:ring-emerald-700"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80"
                          }`}
                        >
                          <Check size={12} />
                          <span>ACC</span>
                        </button>
                      </td>

                      {/* 3. Kolom ON HOLD */}
                      <td className="py-3 px-2 text-center border-r border-slate-200 dark:border-neutral-800">
                        <button
                          type="button"
                          onClick={() => handleSetSwapStatus(row.id, "PENDING")}
                          title="Tunda (ON HOLD)"
                          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            row.status === "PENDING"
                              ? "bg-amber-500 text-slate-950 font-black shadow-xs ring-2 ring-amber-300 dark:ring-amber-700"
                              : "bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80"
                          }`}
                        >
                          <Clock size={12} />
                          <span>ON HOLD</span>
                        </button>
                      </td>

                      {/* 4. Kolom REJECT */}
                      <td className="py-3 px-2 text-center border-r border-slate-200 dark:border-neutral-800">
                        <button
                          type="button"
                          onClick={() => handleSetSwapStatus(row.id, "REJECTED")}
                          title="Tolak (REJECT)"
                          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            row.status === "REJECTED"
                              ? "bg-rose-600 text-white shadow-xs ring-2 ring-rose-300 dark:ring-rose-700"
                              : "bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80"
                          }`}
                        >
                          <X size={12} />
                          <span>REJECT</span>
                        </button>
                      </td>

                      {/* 5. Kolom Hapus */}
                      <td className="py-3 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteSwap(row.id)}
                          title="Hapus catatan pertukaran / hibah"
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL POPUP PREVIEW BUKTI HIBAH SHIFT */}
        {activeProofModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white dark:bg-[#110722] border-2 border-amber-300 dark:border-amber-600 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
                    <Gift size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Bukti Pendukung Hibah Shift
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                      Pemberi Hibah: [{activeProofModal.requesterCode}] {activeProofModal.requesterName}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProofModal(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Shift Dihibahkan:</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      Shift {activeProofModal.shiftSource} ({getShiftDetails(activeProofModal.shiftSource).classCode})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Penerima Hibah:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">
                      [{activeProofModal.replacementCode}] {activeProofModal.replacementName}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
                  <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 uppercase block">
                    Alasan Hibah: {activeProofModal.hibahCategory || "Keperluan Khusus"}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
                    {activeProofModal.note || "Tidak ada catatan tambahan."}
                  </p>
                </div>

                {/* Lampiran Bukti File / Gambar */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400">
                    Lampiran Dokumen / Foto Bukti:
                  </span>
                  {activeProofModal.hibahProofUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-neutral-700 bg-black/5 dark:bg-black/30 p-2">
                      <img
                        src={activeProofModal.hibahProofUrl}
                        alt="Bukti Hibah Shift"
                        className="w-full max-h-72 object-contain mx-auto rounded-xl"
                      />
                      {activeProofModal.hibahProofName && (
                        <div className="mt-2 text-center text-[10px] font-mono text-slate-500">
                          {activeProofModal.hibahProofName}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-neutral-800 text-center text-slate-500 text-xs">
                      Tidak ada file foto terlampir.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveProofModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Tutup Bukti
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
