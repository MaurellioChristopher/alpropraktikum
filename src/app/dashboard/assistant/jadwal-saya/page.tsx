"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { ALPRO_15_SHIFTS, getAssistantShifts } from "@/data/alpro-schedule-plotting";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronDown,
  Layers,
  MapPin,
  Users,
} from "lucide-react";

export default function JadwalSayaPage() {
  const [expandedShiftId, setExpandedShiftId] = useState<number | null>(null);
  const [sessionUser, setSessionUser] = useState<string>("MACY");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const rawCookies = document.cookie ? document.cookie.split("; ") : [];
      for (const c of rawCookies) {
        const [k, v] = c.split("=");
        if (k === "mock_session" && v) {
          setSessionUser(decodeURIComponent(v));
          break;
        }
      }
    }
  }, []);

  const rawPlottingShifts = getAssistantShifts(sessionUser);
  const myAssignedShifts = rawPlottingShifts.map((item) => {
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
      day: shift.day,
      dayAbbr,
      startTime,
      timeDisplay: shift.timeDisplay,
      room: "Ruang R1 Lantai 8 TULT",
      group: item.group,
      studentCount: item.studentCount,
      status: "Terjadwal",
      isPindahan: false,
      pillColor,
    };
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-28 sm:pb-8">
      {/* Sidebar with active tab jadwal_saya */}
      <DashboardSidebar activeTab="jadwal_saya" />

      {/* Main Content */}
      <div className="flex-1 w-full min-w-0 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/assistant"
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1.5 font-mono"
          >
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
        </div>

        {/* Page Header matching Image 2 */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center tracking-tight">
            Jadwal Saya<span className="text-[#F97316]">.</span>
          </h1>

          <a
            href="/dashboard/assistant?tab=jadwal_praktikum"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#0e071a] border border-slate-200/80 dark:border-purple-950/60 text-xs font-semibold text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-purple-950/30 transition-colors shadow-2xs font-mono"
          >
            <span>Sumber</span>
            <ArrowUpRight size={14} className="text-slate-400" />
          </a>
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
                {myAssignedShifts.length}
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

          {/* List of Class Rows */}
          <div className="space-y-3">
            {myAssignedShifts.length === 0 ? (
              <div className="bg-white dark:bg-[#120824] rounded-2xl p-8 border border-slate-200/80 dark:border-purple-900/40 text-center space-y-2 shadow-xs">
                <Users size={32} className="text-purple-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  Belum ada jadwal shift praktikum
                </p>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans max-w-sm mx-auto">
                  Anda belum dialokasikan ke shift praktikum aktif untuk periode ini.
                </p>
              </div>
            ) : (
              myAssignedShifts.map((item) => {
              const isExpanded = expandedShiftId === item.shiftNum;
              return (
                <div
                  key={`${item.shiftNum}-${item.classCode}`}
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
                            {item.day} · SHIFT {item.shiftNum}
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
                      <Link
                        href={`/dashboard/assistant?tab=praktikan&class=${item.classCode}`}
                        className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#7C3AED] dark:hover:bg-[#6D28D9] text-white px-5 py-2 rounded-full font-semibold text-xs transition-colors shadow-2xs text-center inline-block"
                      >
                        Buka
                      </Link>
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
            }))}
          </div>
        </div>
      </div>
    </div>
  );
}

