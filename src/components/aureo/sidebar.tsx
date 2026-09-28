"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Terminal, 
  CalendarCheck, 
  FileSpreadsheet, 
  ArrowLeftRight, 
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions/auth";

export function AureoSidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Live Dashboard", href: "/dashboard/assistant", icon: Terminal },
    { name: "Grade Spreadsheets", href: "/dashboard/assistant/grading", icon: FileSpreadsheet },
    { name: "Shift Swap Engine", href: "/dashboard/assistant/swap", icon: ArrowLeftRight },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#09040D] border-r border-[#27272A] flex flex-col h-[100dvh] sticky top-0">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#27272A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-aureo-gold)] to-[var(--color-edm-crimson)] rounded-[2px] flex items-center justify-center text-black font-display font-bold">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[var(--color-bone)] text-lg leading-none">EDM x AUREO</span>
            <span className="font-mono text-[9px] text-[var(--color-steel)] tracking-widest uppercase">Operations</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[6px] transition-all group ${
                isActive 
                  ? "bg-[rgba(197,166,124,0.1)] text-[var(--color-aureo-gold)]" 
                  : "text-[var(--color-steel)] hover:text-[var(--color-bone)] hover:bg-[#12091F]"
              }`}
            >
              <Icon size={18} className={isActive ? "" : "group-hover:translate-x-1 transition-transform"} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Dock */}
      <div className="p-4 border-t border-[#27272A]">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase text-[var(--color-steel)]">DB Connected</span>
          </div>
          <button className="text-[var(--color-steel)] hover:text-white transition-colors">
            <Moon size={14} />
          </button>
        </div>
        
        <div className="bg-[#12091F] rounded-[6px] p-3 border border-[#27272A] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-bone)] font-medium">Asisten Aktif</span>
            <span className="text-[9px] font-mono bg-[rgba(197,166,124,0.2)] text-[var(--color-aureo-gold)] px-2 py-0.5 rounded-full">
              TUTOR
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-sm text-[var(--color-bone)]">GWAN</span>
            <form action={logoutAction}>
              <button className="text-[var(--color-steel)] hover:text-[var(--color-edm-crimson)] transition-colors">
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
