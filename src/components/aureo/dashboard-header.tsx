"use client";

import React, { useState } from "react";
import Image from "next/image";
import { logoutAction } from "@/app/(auth)/actions/auth";
import {
  RotateCw,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Shield,
  CheckCircle2,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAssistantByCode } from "@/data/assistants-roster";

interface DashboardHeaderProps {
  assistantCode?: string;
  currentRole?: string;
  onRoleChange?: (role: "ASPRAK" | "KOMDIS" | "SEKBEN") => void;
  onOpenMobileMenu?: () => void;
}

export function DashboardHeader({
  assistantCode = "MACY",
  currentRole = "KOMDIS",
  onRoleChange,
  onOpenMobileMenu,
}: DashboardHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentAsst = getAssistantByCode(assistantCode) || {
    name: "Maurellio Christopher Yonathan",
    code: "MACY",
    position: "Koor CnI",
    division: "Compliance & Integrity",
    role: "KOMDIS",
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <header className="w-full flex items-center justify-between py-2 sm:py-3 mb-4 select-none">
      {/* Left: Breadcrumb / Subject badge matching Image 1 */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-white dark:bg-[#120824] border border-slate-200 dark:border-purple-900/40 text-slate-700 dark:text-neutral-200 shadow-2xs cursor-pointer"
        >
          <Menu size={18} />
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs">
          <div className="relative w-4 h-4 shrink-0">
            <Image
              src="/images/edm-emblem-crimson.png"
              alt="EDM Logo"
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-white">
            Praktikum ALPRO
          </span>
        </div>

        <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-neutral-400">
          2026/2027 • Ganjil
        </span>
      </div>

      {/* Right Action Icons matching Image 1 */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Refresh button */}
        <button
          type="button"
          onClick={handleRefresh}
          className="w-9 h-9 rounded-full bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-xs transition-colors cursor-pointer"
          title="Sinkronisasi Data"
        >
          <RotateCw size={15} className={isRefreshing ? "animate-spin text-purple-600" : ""} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationCount(0)}
            className="w-9 h-9 rounded-full bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-xs transition-colors cursor-pointer"
            title="Pemberitahuan"
          >
            <Bell size={15} />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white dark:ring-[#120824]" />
            )}
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 rounded-full p-1 shadow-xs">
          <ThemeToggle />
        </div>

        {/* User Pill matching Image 1: Avatar Initial + Name */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white dark:bg-[#120824] border border-slate-200/80 dark:border-purple-900/40 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-mono font-bold text-xs flex items-center justify-center shadow-xs">
              {currentAsst.code.slice(0, 2)}
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-white max-w-[120px] truncate">
              {currentAsst.name.split(" ")[0]}
            </span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {/* User Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#120824] border border-slate-200 dark:border-purple-900/50 shadow-xl p-3 z-50 space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 space-y-0.5">
                <div className="font-bold text-slate-900 dark:text-white truncate">
                  {currentAsst.name}
                </div>
                <div className="text-[10px] font-mono text-purple-700 dark:text-purple-300">
                  {currentAsst.code} • {currentAsst.position}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {currentAsst.division}
                </div>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold cursor-pointer transition-colors"
                >
                  <LogOut size={14} />
                  <span>Keluar Sesi</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
