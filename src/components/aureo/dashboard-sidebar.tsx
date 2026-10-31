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
  role?: "ASPRAK" | "KOMDIS" | "SEKBEN";
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
    position: "Koor CnI",
    division: "Compliance & Integrity",
    role: "KOMDIS",
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
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 text-white">
      {/* Top Header Logo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center p-1.5 shadow-inner shrink-0 overflow-hidden">
              <Image
                src="/images/edm-emblem-white.png"
                alt="EDM Laboratory Logo"
                fill
                sizes="36px"
                className="object-contain p-1.5"
                priority
              />
            </div>
            {!collapsed && (
              <div>
                <div className="font-bold text-sm tracking-tight leading-none text-white">
                  ALPRO EDM
                </div>
                <div className="text-[10px] font-mono text-purple-200 mt-0.5">
                  Easy Tools
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors cursor-pointer"
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
                    ? "bg-white text-[#3E2D6F] shadow-md font-bold scale-[1.02]"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={18} className={active ? "text-[#4C3B82]" : "text-white/90"} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings & Profile Pill & Logout */}
      <div className="pt-4 border-t border-white/15 space-y-3">
        {/* Settings button */}
        <button
          type="button"
          onClick={() => handleSelectTab("akun")}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === "akun"
              ? "bg-white text-[#3E2D6F] font-bold shadow-xs"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Settings size={17} className={activeTab === "akun" ? "text-[#4C3B82]" : "text-white/90"} />
          {!collapsed && <span>Pengaturan</span>}
        </button>

        {/* User Profile Pill matching reference */}
        <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentProfile.code.slice(0, 2)}
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left">
                <div className="text-xs font-bold text-white truncate">
                  {currentProfile.name.split(" ")[0]}
                </div>
                <div className="text-[10px] font-mono text-purple-200 truncate">
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
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
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
      {/* DESKTOP FLOATING SIDEBAR (lg+) */}
      <aside
        className={`hidden lg:flex shrink-0 ${
          collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-[#4C3B82] via-[#3E2D6F] to-[#2B1B52] dark:from-[#261543] dark:via-[#1B0D33] dark:to-[#100620] rounded-[2.2rem] shadow-[0_20px_50px_rgba(40,16,80,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] sticky top-6 h-[calc(100vh-3rem)] transition-all duration-300 z-30 overflow-hidden border border-purple-300/20 dark:border-purple-800/30`}
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
          <div className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-[#4C3B82] via-[#3E2D6F] to-[#2B1B52] text-white shadow-2xl z-10 flex flex-col">
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-full bg-white/20 text-white"
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
