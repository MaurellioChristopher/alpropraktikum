"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Home,
  CheckSquare,
  Users,
  Flag,
  Camera,
  Calendar,
  CalendarDays,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { logoutAction } from "@/app/(auth)/actions/auth";
import { getAssistantByCode } from "@/data/assistants-roster";

interface DashboardSidebarProps {
  activeTab?: string;
  role?: "ASPRAK" | "KOMDIS" | "SEKBEN" | "ADMIN" | "SUPER_ADMIN";
  onTabChange?: (tab: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  activeTab = "dashboard",
  role = "ASPRAK",
  onTabChange,
  isMobileOpen = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [sessionUser, setSessionUser] = useState("MACY");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const rawCookies = document.cookie ? document.cookie.split("; ") : [];
      for (const c of rawCookies) {
        const [k, v] = c.split("=");
        if (k === "mock_session" && v) setSessionUser(decodeURIComponent(v));
      }
    }
  }, []);

  const currentProfile = getAssistantByCode(sessionUser) || {
    name: "Maurellio Christopher Yonathan",
    code: "MACY",
    position: "Koor CnI (Admin Besar)",
    division: "Compliance & Integrity",
    role: "SUPER_ADMIN" as const,
  };

  const navItems = [
    { id: "dashboard", label: "Beranda", icon: Home },
    { id: "presensi_asprak", label: "Presensi Asprak", icon: Camera },
    { id: "praktikan", label: "Praktikan", icon: CheckSquare },
    { id: "informasi", label: "Informasi Praktikan", icon: Users },
    { id: "komdis", label: "Laporan Kecurangan", icon: Flag },
    { id: "dokumentasi", label: "Dokumentasi", icon: Camera },
    { id: "jadwal_saya", label: "Jadwal Saya", icon: Calendar },
    { id: "jadwal_praktikum", label: "Jadwal Praktikum", icon: CalendarDays },
  ];

  const handleSelectTab = (tabId: string) => {
    if (tabId === "presensi_asprak") {
      router.push("/dashboard/assistant/presensi-asprak");
      if (onCloseMobile) onCloseMobile();
      return;
    }

    if (pathname !== "/dashboard/assistant") {
      router.push(`/dashboard/assistant?tab=${tabId}`);
      if (onCloseMobile) onCloseMobile();
      return;
    }

    if (onTabChange) onTabChange(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const isItemActive = (id: string) => {
    if (id === "dashboard" && (activeTab === "dashboard" || activeTab === "beranda")) return true;
    if (id === "presensi_asprak" && activeTab === "presensi_asprak") return true;
    if (id === "praktikan" && (activeTab === "praktikan" || activeTab === "absensi" || activeTab === "penilaian")) return true;
    if (id === "informasi" && (activeTab === "informasi" || activeTab === "modul")) return true;
    if (id === "komdis" && activeTab === "komdis") return true;
    if (id === "dokumentasi" && activeTab === "dokumentasi") return true;
    if (id === "jadwal_saya" && activeTab === "jadwal_saya") return true;
    if (id === "jadwal_praktikum" && (activeTab === "jadwal_praktikum" || activeTab === "jadwal")) return true;
    return activeTab === id;
  };

  const sidebarBody = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 text-slate-900 dark:text-white">
      {/* Top Header Logo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-purple-200/70 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-2xl bg-white dark:bg-purple-950/80 flex items-center justify-center p-1.5 shadow-xs border border-purple-200/80 dark:border-purple-800/60 shrink-0 overflow-hidden">
              <Image
                src="/images/edm-emblem-crimson.png"
                alt="EDM Laboratory Logo"
                fill
                sizes="36px"
                className="object-contain p-1.5"
                priority
              />
            </div>
            {!collapsed && (
              <div>
                <div className="font-bold text-sm tracking-tight leading-none text-slate-900 dark:text-white">
                  ALPRO EDM
                </div>
                <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold mt-0.5">
                  Easy Tools
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-full bg-white/70 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 items-center justify-center text-slate-700 dark:text-neutral-200 shadow-2xs border border-purple-200/60 dark:border-transparent transition-colors cursor-pointer"
            title={collapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation Menu List matching Image 1 */}
        <nav className="space-y-1.5 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? "bg-white dark:bg-[#28184C] text-purple-900 dark:text-white shadow-[0_4px_16px_rgba(76,59,130,0.10)] font-bold scale-[1.02] border border-purple-100 dark:border-purple-800/50"
                    : "text-slate-700 dark:text-neutral-300 hover:text-purple-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10 font-medium"
                }`}
              >
                <Icon size={18} className={active ? "text-purple-700 dark:text-purple-300" : "text-slate-500 dark:text-neutral-400"} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings & Profile Pill & Logout */}
      <div className="pt-4 border-t border-purple-200/70 dark:border-white/10 space-y-3">
        {/* Settings button */}
        <button
          type="button"
          onClick={() => handleSelectTab("akun")}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === "akun"
              ? "bg-white dark:bg-[#28184C] text-purple-900 dark:text-white font-bold shadow-xs border border-purple-100 dark:border-purple-800/50"
              : "text-slate-700 dark:text-neutral-300 hover:text-purple-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
          }`}
        >
          <Settings size={17} className={activeTab === "akun" ? "text-purple-700 dark:text-purple-300" : "text-slate-500 dark:text-neutral-400"} />
          {!collapsed && <span>Pengaturan</span>}
        </button>

        {/* User Profile Pill */}
        <div className="p-2 rounded-2xl bg-white/80 dark:bg-black/30 backdrop-blur-md border border-purple-200/80 dark:border-purple-900/40 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentProfile.code.slice(0, 2)}
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentProfile.name.split(" ")[0]}
                </div>
                <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold truncate">
                  {currentProfile.code} • {currentProfile.position}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Action */}
        <form action={logoutAction} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-mono text-slate-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/70 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            {!collapsed && <span>Keluar</span>}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP FLOATING SIDEBAR (lg+) with exact pastel lilac gradient matching swatch */}
      <aside
        className={`hidden lg:flex shrink-0 ${
          collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-[#E0E6FE] via-[#E4E7FF] to-[#EBE9FE] dark:from-[#1A122E] dark:via-[#140C26] dark:to-[#0D061A] rounded-[2.2rem] shadow-[0_15px_40px_rgba(76,59,130,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] sticky top-6 h-[calc(100vh-3rem)] transition-all duration-300 z-30 overflow-hidden border border-purple-200/80 dark:border-purple-900/50`}
      >
        {sidebarBody}
      </aside>

      {/* MOBILE DRAWER OVERLAY (< lg) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-[#E0E6FE] via-[#E4E7FF] to-[#EBE9FE] dark:from-[#1A122E] dark:via-[#140C26] dark:to-[#0D061A] text-slate-900 dark:text-white shadow-2xl z-10 flex flex-col border-r border-purple-200/80 dark:border-purple-900/50">
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-full bg-white/70 hover:bg-white text-slate-700 shadow-2xs"
              >
                <X size={18} />
              </button>
            </div>
            {sidebarBody}
          </div>
        </div>
      )}
    </>
  );
}
