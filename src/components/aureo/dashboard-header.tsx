"use client";

import React, { useState } from "react";
import Image from "next/image";
import { logoutAction } from "@/app/(auth)/actions/auth";
import { Calendar, Bell, ChevronDown, LogOut, User, Shield, CheckCircle2, RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  assistantCode?: string;
  currentRole?: string;
  onRoleChange?: (role: "ASPRAK" | "KOMDIS" | "SEKBEN") => void;
}

export function DashboardHeader({
  assistantCode = "GWAN",
  currentRole = "ASPRAK",
  onRoleChange,
}: DashboardHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [activeRole, setActiveRole] = useState(currentRole);

  const handleSwitchRole = (role: "ASPRAK" | "KOMDIS" | "SEKBEN") => {
    setActiveRole(role);
    if (onRoleChange) onRoleChange(role);
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "KOMDIS":
        return "bg-rose-900/60 text-rose-300 border-rose-700/60";
      case "SEKBEN":
        return "bg-indigo-900/60 text-indigo-300 border-indigo-700/60";
      default:
        return "bg-purple-900/60 text-purple-300 border-purple-700/60";
    }
  };

  return (
    <header className="w-full bg-[#140827] text-white border-b border-purple-900/40 px-3.5 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40 select-none shadow-md">
      {/* Brand Logo with Official EDM Emblem */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative h-6 sm:h-7 w-8 sm:w-9 shrink-0">
          <Image
            src="/images/edm-emblem-white.png"
            alt="EDM Laboratory Logo"
            fill
            sizes="36px"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-baseline">
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">EDM</span>
          <span className="font-light text-base sm:text-lg tracking-normal text-rose-300 ml-1">Laboratory</span>
        </div>
      </div>

      {/* Right Controls: Role Badge, Calendar, Bell, Profile dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-6">
        
        {/* Active Role Indicator Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden md:inline text-[10px] font-mono text-slate-400 uppercase">Role:</span>
          <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getRoleBadgeStyle(activeRole)}`}>
            {activeRole === "KOMDIS" ? "🛡️ KOMDIS" : activeRole === "SEKBEN" ? "📋 SEKBEN" : "⚡ ASPRAK"}
          </span>
        </div>

        {/* Calendar Icon [3] */}
        <button
          type="button"
          className="relative text-slate-300 hover:text-white transition-colors p-1"
          title="Jadwal Shift Praktikum"
        >
          <div className="relative">
            <Calendar size={18} />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-rose-600 rounded-full text-[9px] font-bold font-mono flex items-center justify-center text-white">
              3
            </span>
          </div>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => setNotificationCount(0)}
          className="relative text-slate-300 hover:text-white transition-colors p-1"
          title="Notifikasi Operasional"
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#140827]" />
          )}
        </button>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 sm:gap-2.5 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-purple-600 via-rose-600 to-indigo-500 p-[1.5px] shadow-sm">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="text-[10px] sm:text-[11px] font-bold text-white font-mono">{assistantCode.slice(0, 2)}</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">
                {assistantCode === "IZIN" ? "Izin (Komdis)" : assistantCode === "LEVI" ? "Levi (Sekben)" : "Gwan (Asprak)"}
              </span>
              <span className="text-[10px] font-mono text-purple-300">ID: {assistantCode} • {activeRole}</span>
            </div>

            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-slate-200 text-slate-800 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="font-bold text-xs text-slate-900">
                  {assistantCode === "IZIN" ? "Muhammad Izin" : assistantCode === "LEVI" ? "Levina Sekar" : "Andi Prasetyo (Gwan)"}
                </div>
                <div className="text-[11px] font-mono text-slate-500">ID: {assistantCode} • Telkom University</div>
              </div>

              {/* Quick Switch Role Inside Dashboard */}
              <div className="px-4 py-2.5 border-b border-slate-100 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <RefreshCw size={11} className="text-[#9E1B32]" />
                  Simulasi Ganti Role:
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleSwitchRole(r)}
                      className={`text-[10px] font-mono font-bold py-1 px-1 rounded transition-all cursor-pointer ${
                        activeRole === r
                          ? "bg-[#250B47] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Keluar / Logout</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
