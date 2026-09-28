"use client";

import { ArrowLeftRight, Check, X, ArrowLeft, ShieldCheck, GraduationCap } from "lucide-react";
import { useState } from "react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { SI50_CLASSES } from "@/lib/si-classes";
import Link from "next/link";

export default function SwapEngineDashboard() {
  const [swaps, setSwaps] = useState([
    { id: 1, req: "GWAN", reqRole: "TUTOR", target: "LEVI", targetRole: "VALIDATOR", shiftOut: "Modul 4 / SI5001", shiftIn: "Modul 4 / SI5004", status: "PENDING" },
    { id: 2, req: "IZIN", reqRole: "LEAD_PIC", target: "AL-05", targetRole: "LEAD_PIC", shiftOut: "Modul 4 / SI5007", shiftIn: "Modul 4 / SI50INT", status: "APPROVED" },
    { id: 3, req: "LEVI", reqRole: "VALIDATOR", target: "GWAN", targetRole: "TUTOR", shiftOut: "Modul 4 / SI5012", shiftIn: "Modul 4 / SI5002", status: "APPROVED" },
  ]);

  const [targetAsisten, setTargetAsisten] = useState("");
  const [shiftSource, setShiftSource] = useState("Modul 4 / SI5001");
  const [shiftTarget, setShiftTarget] = useState("Modul 4 / SI5002");

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
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <DashboardSidebar activeTab="perizinan" />

      <div className="flex-1 w-full min-w-0 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/dashboard/assistant" className="text-xs font-semibold text-[#9E1B32] hover:underline flex items-center gap-1">
                <ArrowLeft size={14} /> Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Shift Swap Engine & Perizinan</h1>
              <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                SI&apos;50
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Sistem otomatis pengecekan bentrok jadwal 15 kelas S1 Sistem Informasi (SI5001 s.d. SI5014 & SI50INT).
            </p>
          </div>
        </div>

        {/* Action Form */}
        <form onSubmit={handleAddSwap} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Target Asisten (Kode)
            </label>
            <input
              type="text"
              value={targetAsisten}
              onChange={(e) => setTargetAsisten(e.target.value)}
              placeholder="Contoh: LEVI"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          <div className="flex-1 space-y-2 w-full">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Shift Asal (Kelas SI&apos;50)
            </label>
            <select
              value={shiftSource}
              onChange={(e) => setShiftSource(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            >
              {SI50_CLASSES.map((cls) => (
                <option key={`src-${cls.code}`} value={`Modul 4 / ${cls.code}`}>
                  Modul 4 / {cls.code} ({cls.defaultShift})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-2 w-full">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Shift Tujuan (Kelas SI&apos;50)
            </label>
            <select
              value={shiftTarget}
              onChange={(e) => setShiftTarget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/30"
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
            className="w-full md:w-auto bg-gradient-to-r from-[#9E1B32] to-[#250B47] text-white hover:opacity-95 font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-xl font-bold transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <ArrowLeftRight size={16} />
            Ajukan Swap
          </button>
        </form>

        {/* History / Feed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest font-bold">
              Daftar Permohonan Pertukaran Shift (SI&apos;50)
            </h3>
            <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full font-semibold">
              15 Kelas Terdaftar
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {swaps.map((swap) => (
              <div key={swap.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-base font-bold text-slate-900">{swap.req}</span>
                    <span className="text-[9px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-semibold">
                      {swap.reqRole}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 px-3 text-slate-400">
                    <span className="text-[11px] font-mono text-slate-700 font-semibold">{swap.shiftOut}</span>
                    <ArrowLeftRight size={14} className="text-[#9E1B32]" />
                    <span className="text-[11px] font-mono text-slate-700 font-semibold">{swap.shiftIn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold ${
                    swap.status === "APPROVED"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {swap.status}
                  </span>
                  <span className="text-xs font-mono text-slate-700">Target: {swap.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
