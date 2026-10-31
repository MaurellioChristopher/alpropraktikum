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
} from "lucide-react";
import { useState } from "react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { ALPRO_ASSISTANTS, getAssistantByCode } from "@/data/assistants-roster";
import { ALPRO_15_SHIFTS } from "@/data/alpro-schedule-plotting";
import Link from "next/link";

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

export default function SwapEngineDashboard() {
  const [swaps, setSwaps] = useState<OfficialSwapItem[]>(INITIAL_OFFICIAL_SWAPS);
  const [requesterCode, setRequesterCode] = useState("MJFA");
  const [shiftSourceNum, setShiftSourceNum] = useState<number>(6);
  const [shiftTargetNum, setShiftTargetNum] = useState<number>(15);
  const [replacementCode, setReplacementCode] = useState("MAYR");
  const [swapNote, setSwapNote] = useState("");

  const getShiftDetails = (shiftNum: number) => {
    const s = ALPRO_15_SHIFTS.find((shift) => shift.shiftNumber === shiftNum);
    if (!s) return { classCode: `Shift ${shiftNum}`, day: "Senin", time: "07.30 - 09.30" };
    return { classCode: s.classCode, day: s.day, time: s.timeDisplay };
  };

  const handleAddSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacementCode || !shiftSourceNum || !shiftTargetNum) return;
    const reqObj = getAssistantByCode(requesterCode);
    const repObj = getAssistantByCode(replacementCode);

    const newRecord: OfficialSwapItem = {
      id: Date.now(),
      requesterName: reqObj ? reqObj.name : requesterCode,
      requesterCode: reqObj ? reqObj.code : requesterCode,
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
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pertukaran Jadwal (Shift Swap Engine)</h1>
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
    </div>
  );
}
