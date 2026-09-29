"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  BookOpen,
  CheckSquare,
  BarChart3,
  Code2,
  ShieldAlert,
  ArrowLeftRight,
  Camera,
  Package,
  UserCheck,
  ExternalLink,
  Shield,
  Briefcase,
  Users,
  X,
} from "lucide-react";

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
  // Define menu items with role access restrictions
  // Komdis features only visible to KOMDIS
  // Sekben features (Kas Lab) only visible to SEKBEN
  const isKomdis = role === "KOMDIS";
  const isSekben = role === "SEKBEN";

  const menuSections = [
    {
      group: "Operasional Praktikum",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "modul", label: "Modul & Silabus Lab", icon: BookOpen },
        { id: "absensi", label: "Absensi Praktikan & Asprak", icon: CheckSquare },
        { id: "penilaian", label: "Penilaian Praktikan", icon: BarChart3 },
      ],
    },
    {
      group: isKomdis ? "Wewenang Komdis" : "Jadwal & Shift",
      items: [
        // ONLY VISIBLE TO KOMDIS
        ...(isKomdis
          ? [{ id: "komdis", label: "Pelanggaran & Sanksi Komdis", icon: ShieldAlert, badge: "KOMDIS" }]
          : []),
        { id: "jadwal", label: "Pertukaran Jadwal (Swap)", icon: ArrowLeftRight },
      ],
    },
    {
      group: isSekben ? "Logistik & Kas Lab (Sekben)" : "Fasilitas & Ruangan",
      items: [
        { id: "dokumentasi", label: "Dokumentasi Ruangan", icon: Camera },
        // ONLY VISIBLE TO SEKBEN
        ...(isSekben
          ? [{ id: "inventaris", label: "Inventaris & Kas Lab", icon: Package, badge: "SEKBEN" }]
          : []),
      ],
    },
    {
      group: "Pengaturan Akun",
      items: [
        { id: "akun", label: "Akun Asisten", icon: UserCheck },
      ],
    },
  ];

  const renderSidebarContent = (isDrawer = false) => (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-5">
        {/* Header Title & Role Indicator */}
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-5 shrink-0">
                <Image
                  src="/images/edm-emblem-crimson.png"
                  alt="EDM Logo"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-700 dark:text-slate-200 uppercase font-bold tracking-wider">
                Menu Operasional
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded font-bold border border-purple-200/60 dark:border-purple-800/60">
                SI&apos;50
              </span>
              {isDrawer && onCloseMobile && (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer group"
                  title="Tutup Menu"
                >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                </button>
              )}
            </div>
          </div>

          {/* Current Active Role Pill */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-[#140C2C] border border-purple-100 dark:border-purple-900/50">
            {role === "KOMDIS" ? (
              <Shield size={15} className="text-purple-600 dark:text-purple-400 shrink-0" />
            ) : role === "SEKBEN" ? (
              <Briefcase size={15} className="text-purple-600 dark:text-purple-400 shrink-0" />
            ) : (
              <Users size={15} className="text-purple-600 dark:text-purple-400 shrink-0" />
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">
                {role === "KOMDIS" ? "Komisi Disiplin" : role === "SEKBEN" ? "Sekben (Role Inti)" : "Asisten Praktikum"}
              </span>
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-400 leading-tight">
                {role === "KOMDIS" ? "Akses Pengawasan & Sanksi" : role === "SEKBEN" ? "Akses Logistik & Kas" : "Akses Pengajaran Modul"}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Sections with comfortable spacing between items */}
        <div className="space-y-4">
          {menuSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                {sec.group}
              </div>

              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isItemActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (onTabChange) onTabChange(item.id);
                        if (isDrawer && onCloseMobile) onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group cursor-pointer ${
                        isItemActive
                          ? "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 shadow-xs font-bold"
                          : "text-slate-600 dark:text-slate-400 hover:text-purple-900 dark:hover:text-white hover:bg-purple-50/60 dark:hover:bg-purple-950/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={17}
                          className={`transition-colors shrink-0 ${
                            isItemActive ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-300"
                          }`}
                        />
                        <span className="leading-snug">{item.label}</span>
                      </div>

                      {/* Role-Specific Badge */}
                      {"badge" in item && item.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-900 text-purple-200 border border-purple-700">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Footer with clean spacing */}
      <div className="pt-4 border-t border-purple-100 dark:border-purple-950 px-2 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <div className="relative h-3.5 w-4 shrink-0">
              <Image src="/images/edm-emblem-crimson.png" alt="EDM" fill sizes="16px" className="object-contain" />
            </div>
            EDM Lab System
          </span>
          <span className="font-semibold text-purple-700 dark:text-purple-300">15 Kelas SI&apos;50</span>
        </div>
        <Link
          href="/"
          className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors py-1 group"
        >
          <span>Ke Halaman Utama</span>
          <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP STICKY SIDEBAR (Hidden on mobile and tablet < lg) */}
      <aside className="hidden lg:flex w-64 lg:w-72 shrink-0 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex-col justify-between select-none sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin transition-colors">
        {renderSidebarContent(false)}
      </aside>

      {/* 2. MOBILE & TABLET SLIDE-OVER DRAWER (Visible when isMobileOpen is true) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop blur */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/60 dark:bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl p-5 z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
            {renderSidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
