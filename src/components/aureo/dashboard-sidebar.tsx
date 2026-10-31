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
    <div className="flex flex-col justify-between h-full p-3 sm:p-3.5 text-white relative">
      {/* Top Header Logo & Collapse Toggle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between relative px-1 pt-1">
          <div className="flex items-center gap-3">
            {/* White rounded square logo container matching Image 1 */}
            <div className="w-11 h-11 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 p-1.5 transition-transform hover:scale-105">
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-mono font-black text-sm shadow-inner">
                &lt;/&gt;
              </div>
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <div className="font-extrabold text-sm tracking-tight leading-none text-white drop-shadow-xs truncate">
                  EDM-ALPRO
                </div>
                <div className="text-[10px] font-mono text-purple-200 font-bold mt-1 tracking-wider uppercase">
                  Practicum Tools
                </div>
              </div>
            )}
          </div>

          {/* Floating Collapse Toggle on Edge matching Image 1 */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex absolute -right-6 top-3 w-6 h-6 rounded-full bg-white text-purple-800 shadow-md border border-purple-100 items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-40"
            title={collapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
          >
            {collapsed ? <ChevronRight size={13} strokeWidth={3} /> : <ChevronLeft size={13} strokeWidth={3} />}
          </button>
        </div>

        {/* Navigation Menu List matching Image 1 */}
        <nav className="space-y-2 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? "justify-center px-0" : "px-3.5"
                } py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-white text-purple-800 shadow-[0_8px_20px_rgba(0,0,0,0.15)] font-bold scale-[1.03]"
                    : "text-white/80 hover:text-white hover:bg-white/15"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 2}
                  className={active ? "text-purple-700 shrink-0" : "text-white/90 shrink-0"}
                />
                {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings & Profile Pill & Logout matching Image 1 */}
      <div className="pt-3 border-t border-white/20 space-y-2.5">
        {/* Settings button */}
        <button
          type="button"
          onClick={() => handleSelectTab("akun")}
          className={`w-full flex items-center ${
            collapsed ? "justify-center px-0" : "px-3.5"
          } py-2.5 rounded-2xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === "akun"
              ? "bg-white text-purple-800 font-bold shadow-md"
              : "text-white/80 hover:text-white hover:bg-white/15"
          }`}
          title={collapsed ? "Pengaturan" : undefined}
        >
          <Settings size={19} className={activeTab === "akun" ? "text-purple-700 shrink-0" : "text-white/90 shrink-0"} />
          {!collapsed && <span className="ml-3">Pengaturan</span>}
        </button>

        {/* User Profile Avatar matching Image 1 */}
        <div
          onClick={() => handleSelectTab("akun")}
          className={`rounded-2xl transition-all cursor-pointer ${
            collapsed ? "flex justify-center p-1" : "p-2 bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-2.5"
          }`}
          title={currentProfile.name}
        >
          <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-900 font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-md ring-2 ring-white/30">
            {currentProfile.code.slice(0, 2)}
          </div>
          {!collapsed && (
            <div className="min-w-0 text-left">
              <div className="text-xs font-bold text-white truncate leading-tight">
                {currentProfile.name.split(" ")[0]}
              </div>
              <div className="text-[10px] font-mono text-purple-200 font-medium truncate mt-0.5">
                {currentProfile.code} • {currentProfile.position.split(" ")[0]}
              </div>
            </div>
          )}
        </div>

        {/* Logout Action */}
        <form action={logoutAction} className="w-full">
          <button
            type="submit"
            className={`w-full flex items-center ${
              collapsed ? "justify-center px-0" : "px-3.5"
            } py-2 text-xs font-mono text-white/75 hover:text-rose-200 hover:bg-rose-500/20 rounded-2xl transition-colors cursor-pointer`}
            title={collapsed ? "Keluar" : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span className="ml-3">Keluar</span>}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP FLOATING SIDEBAR (lg+) matching Image 1 shape with vibrant purple/indigo theme */}
      <aside
        className={`hidden lg:flex shrink-0 ${
          collapsed ? "w-20" : "w-60"
        } bg-gradient-to-b from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] dark:from-[#3B1977] dark:via-[#281156] dark:to-[#170836] rounded-[2.5rem] shadow-[0_20px_50px_rgba(109,40,217,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] sticky top-6 h-[calc(100vh-3rem)] transition-all duration-300 z-30 overflow-visible border border-purple-400/30 dark:border-purple-800/40`}
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
          <div className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] dark:from-[#3B1977] dark:via-[#281156] dark:to-[#170836] text-white shadow-2xl z-10 flex flex-col border-r border-purple-400/30">
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white shadow-xs"
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
