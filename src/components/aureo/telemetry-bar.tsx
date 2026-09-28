"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export function TelemetryBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC+7');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 border-b border-[#27272A] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[var(--color-steel)]">
          <Activity size={14} className="text-[var(--color-aureo-gold)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest">Lab Server Status: Nominal</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-[#27272A]" />
        <div className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-[var(--color-steel)]">
          Active Shift: <span className="text-white">Modul 4 - Sorting</span>
        </div>
      </div>
      
      <div className="text-[10px] font-mono text-[var(--color-bone)] bg-[#12091F] border border-[#27272A] px-3 py-1 rounded-[4px]">
        {time || "00:00:00"}
      </div>
    </header>
  );
}
