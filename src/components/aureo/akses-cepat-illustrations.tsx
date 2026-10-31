"use client";

import React from "react";

export function PraktikanCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Blob */}
      <div className="absolute w-28 h-28 rounded-full bg-blue-200/50 dark:bg-blue-600/20 blur-xl top-1 right-3" />
      <div className="absolute w-16 h-16 rounded-full bg-indigo-200/40 dark:bg-indigo-600/15 blur-lg bottom-2 left-4" />

      {/* Floating sparkles */}
      <div className="absolute top-2 left-6 text-blue-300 dark:text-blue-400 text-xs animate-pulse">✦</div>
      <div className="absolute top-6 right-8 text-blue-200 dark:text-blue-500 text-[10px]">✦</div>
      <div className="absolute bottom-6 left-8 text-blue-300/80 text-[10px]">●</div>

      {/* Vector Illustration matching Image 1 */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-32 drop-shadow-[0_8px_16px_rgba(37,99,235,0.12)]"
      >
        {/* Clipboard Body */}
        <rect x="35" y="22" width="90" height="106" rx="14" fill="#DCE7FA" />
        <rect x="38" y="25" width="84" height="100" rx="12" fill="#EEF4FE" />

        {/* Paper Sheet */}
        <rect x="44" y="32" width="72" height="90" rx="8" fill="#FFFFFF" />

        {/* Top Clip (Vibrant Royal Blue) */}
        <rect x="62" y="14" width="36" height="15" rx="6" fill="#1D4ED8" />
        <rect x="64" y="16" width="32" height="11" rx="4.5" fill="#2563EB" />
        <rect x="74" y="19" width="12" height="4" rx="2" fill="#60A5FA" opacity="0.8" />

        {/* Checkmark 1 */}
        <circle cx="56" cy="48" r="7.5" fill="#10B981" />
        <path
          d="M52.5 48L55 50.5L60 45.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="68" y="46" width="40" height="4" rx="2" fill="#E2E8F0" />

        {/* Checkmark 2 */}
        <circle cx="56" cy="67" r="7.5" fill="#10B981" />
        <path
          d="M52.5 67L55 69.5L60 64.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="68" y="65" width="34" height="4" rx="2" fill="#E2E8F0" />

        {/* Checkmark 3 */}
        <circle cx="56" cy="86" r="7.5" fill="#10B981" />
        <path
          d="M52.5 86L55 88.5L60 83.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="68" y="84" width="38" height="4" rx="2" fill="#E2E8F0" />

        {/* Yellow Pencil (pointing diagonally up-right) */}
        <g transform="translate(18, 92) rotate(-35)">
          {/* Pencil Tip */}
          <polygon points="40,5 50,0 50,10" fill="#FBBF24" />
          <polygon points="40,5 44,3 44,7" fill="#1E293B" />
          {/* Pencil Shaft */}
          <rect x="50" y="0" width="34" height="10" fill="#F59E0B" rx="1" />
          <line x1="50" y1="3.5" x2="84" y2="3.5" stroke="#FBBF24" strokeWidth="1.5" />
          {/* Ferrule */}
          <rect x="84" y="0" width="6" height="10" fill="#94A3B8" />
          {/* Eraser */}
          <rect x="90" y="0" width="8" height="10" rx="2" fill="#F43F5E" />
        </g>

        {/* Orange Grade "A" Badge */}
        <g transform="translate(112, 92)">
          <circle cx="16" cy="16" r="16" fill="#F97316" />
          <circle cx="16" cy="16" r="14" fill="#FB923C" />
          <text
            x="16"
            y="21.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="16"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            A
          </text>
        </g>
      </svg>
    </div>
  );
}

export function DokumentasiCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Blob */}
      <div className="absolute w-28 h-28 rounded-full bg-emerald-200/50 dark:bg-emerald-600/20 blur-xl top-1 right-2" />
      <div className="absolute w-16 h-16 rounded-full bg-teal-200/40 dark:bg-teal-600/15 blur-lg bottom-1 left-4" />

      {/* Floating sparkles */}
      <div className="absolute top-2 left-6 text-emerald-300 dark:text-emerald-400 text-xs animate-pulse">✦</div>
      <div className="absolute top-5 right-6 text-emerald-200 dark:text-emerald-500 text-[10px]">✦</div>
      <div className="absolute bottom-6 right-8 text-emerald-300/80 text-[10px]">●</div>

      {/* Vector Illustration matching Image 1 */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-32 drop-shadow-[0_8px_16px_rgba(16,185,129,0.12)]"
      >
        {/* Left Polaroid Frame (tilted -9deg) */}
        <g transform="translate(18, 20) rotate(-9)">
          <rect x="0" y="0" width="46" height="56" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Photo content: Green Hills */}
          <rect x="4" y="4" width="38" height="38" rx="3" fill="#D1FAE5" />
          <path d="M4 34L14 24L26 36L34 29L42 38H4V34Z" fill="#10B981" />
          <circle cx="14" cy="14" r="3.5" fill="#34D399" />
        </g>

        {/* Right Polaroid Frame (tilted +10deg) */}
        <g transform="translate(94, 18) rotate(10)">
          <rect x="0" y="0" width="48" height="58" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Photo content: Blue Mountain & Orange Sun */}
          <rect x="4" y="4" width="40" height="40" rx="3" fill="#E0F2FE" />
          <circle cx="32" cy="14" r="5" fill="#F59E0B" />
          <path d="M4 38L18 22L30 34L36 28L44 40H4V38Z" fill="#0284C7" />
          <path d="M18 22L22 27L14 36L10 32L18 22Z" fill="#38BDF8" opacity="0.6" />
        </g>

        {/* Foreground Camera */}
        <g transform="translate(35, 42)">
          {/* Top Button / Flash */}
          <rect x="18" y="0" width="14" height="6" rx="2" fill="#0F172A" />
          <rect x="62" y="2" width="10" height="4" rx="1.5" fill="#E2E8F0" />

          {/* Camera Body (Sleek Dark Navy) */}
          <rect x="0" y="5" width="90" height="64" rx="16" fill="#1E293B" />
          <rect x="2" y="7" width="86" height="60" rx="14" fill="#0F172A" />

          {/* Flash Window */}
          <rect x="12" y="14" width="12" height="8" rx="3" fill="#F8FAFC" />
          <rect x="14" y="16" width="8" height="4" rx="1.5" fill="#FDE047" opacity="0.8" />

          {/* Big Multi-ring Lens */}
          <circle cx="54" cy="37" r="25" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          <circle cx="54" cy="37" r="21" fill="#0284C7" />
          <circle cx="54" cy="37" r="17" fill="#0369A1" />
          <circle cx="54" cy="37" r="13" fill="#075985" />
          <circle cx="54" cy="37" r="9" fill="#0C4A6E" />

          {/* Glossy Reflection Glint */}
          <ellipse cx="49" cy="32" rx="4" ry="2" transform="rotate(-30 49 32)" fill="#FFFFFF" opacity="0.85" />
          <circle cx="59" cy="43" r="1.5" fill="#FFFFFF" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

export function JadwalCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Blob */}
      <div className="absolute w-28 h-28 rounded-full bg-amber-200/50 dark:bg-amber-600/20 blur-xl top-1 right-2" />
      <div className="absolute w-16 h-16 rounded-full bg-orange-200/40 dark:bg-orange-600/15 blur-lg bottom-1 left-4" />

      {/* Floating sparkles */}
      <div className="absolute top-2 left-6 text-amber-300 dark:text-amber-400 text-xs animate-pulse">✦</div>
      <div className="absolute top-5 right-6 text-amber-200 dark:text-amber-500 text-[10px]">✦</div>
      <div className="absolute bottom-6 left-6 text-amber-300/80 text-[10px]">●</div>

      {/* Vector Illustration matching Image 1 */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-32 drop-shadow-[0_8px_16px_rgba(249,115,22,0.12)]"
      >
        {/* Calendar Body */}
        <g transform="translate(32, 18)">
          {/* Desk Rings / Hooks */}
          <rect x="22" y="0" width="6" height="12" rx="3" fill="#1E293B" />
          <rect x="62" y="0" width="6" height="12" rx="3" fill="#1E293B" />

          {/* Top Orange Header Bar */}
          <rect x="0" y="6" width="90" height="24" rx="8" fill="#F97316" />
          <rect x="0" y="20" width="90" height="10" fill="#EA580C" />

          {/* Calendar Page Base */}
          <rect x="0" y="24" width="90" height="80" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* Grid Dots / Cells */}
          {/* Row 1 */}
          <circle cx="16" cy="40" r="3" fill="#E2E8F0" />
          <circle cx="33" cy="40" r="3" fill="#E2E8F0" />
          <circle cx="50" cy="40" r="3" fill="#E2E8F0" />
          <circle cx="67" cy="40" r="3" fill="#E2E8F0" />

          {/* Row 2 */}
          <circle cx="16" cy="56" r="3" fill="#E2E8F0" />
          <circle cx="33" cy="56" r="3" fill="#E2E8F0" />
          {/* Active Highlighted Date (Vibrant Blue Square) */}
          <rect x="44" y="50" width="12" height="12" rx="3.5" fill="#2563EB" />
          <circle cx="67" cy="56" r="3" fill="#E2E8F0" />

          {/* Row 3 */}
          <circle cx="16" cy="72" r="3" fill="#E2E8F0" />
          <circle cx="33" cy="72" r="3" fill="#E2E8F0" />
          <circle cx="50" cy="72" r="3" fill="#E2E8F0" />
          <circle cx="67" cy="72" r="3" fill="#E2E8F0" />

          {/* Row 4 */}
          <circle cx="16" cy="88" r="3" fill="#E2E8F0" />
          <circle cx="33" cy="88" r="3" fill="#E2E8F0" />
          <circle cx="50" cy="88" r="3" fill="#E2E8F0" />
        </g>

        {/* Analog Clock Badge at bottom right of calendar */}
        <g transform="translate(100, 78)">
          <circle cx="20" cy="20" r="20" fill="#1E293B" />
          <circle cx="20" cy="20" r="17" fill="#FFFFFF" />

          {/* Clock Ticks */}
          <line x1="20" y1="5" x2="20" y2="7.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="32.5" x2="20" y2="35" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="5" y1="20" x2="7.5" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32.5" y1="20" x2="35" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Hour & Minute Hands */}
          <line x1="20" y1="20" x2="20" y2="10" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="20" x2="28" y2="24" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2" fill="#0F172A" />
        </g>
      </svg>
    </div>
  );
}

export function SlideModulCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Blob */}
      <div className="absolute w-28 h-28 rounded-full bg-purple-200/50 dark:bg-purple-600/20 blur-xl top-1 right-2" />
      <div className="absolute w-16 h-16 rounded-full bg-indigo-200/40 dark:bg-indigo-600/15 blur-lg bottom-1 left-4" />

      {/* Floating sparkles */}
      <div className="absolute top-2 left-6 text-purple-300 dark:text-purple-400 text-xs animate-pulse">✦</div>
      <div className="absolute top-5 right-6 text-purple-200 dark:text-purple-500 text-[10px]">✦</div>
      <div className="absolute bottom-6 left-6 text-purple-300/80 text-[10px]">●</div>

      {/* Vector Illustration matching Image 1 */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-32 drop-shadow-[0_8px_16px_rgba(147,51,234,0.12)]"
      >
        {/* Back Purple Document (tilted +12deg) */}
        <g transform="translate(100, 26) rotate(12)">
          <rect x="0" y="0" width="38" height="54" rx="6" fill="#8B5CF6" />
          <rect x="5" y="8" width="22" height="4" rx="2" fill="#C4B5FD" />
          <rect x="5" y="16" width="28" height="3" rx="1.5" fill="#DDD6FE" />
          <rect x="5" y="23" width="20" height="3" rx="1.5" fill="#DDD6FE" />
        </g>

        {/* Middle Slide Document (tilted -8deg) */}
        <g transform="translate(42, 22) rotate(-8)">
          <rect x="0" y="0" width="46" height="62" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="6" y="8" width="24" height="5" rx="2.5" fill="#A78BFA" />
          <rect x="6" y="18" width="34" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="6" y="25" width="28" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="6" y="32" width="32" height="3" rx="1.5" fill="#E2E8F0" />
        </g>

        {/* Front Slide Document (tilted -2deg) */}
        <g transform="translate(62, 16) rotate(-2)">
          <rect x="0" y="0" width="50" height="66" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="7" y="8" width="28" height="5" rx="2.5" fill="#3B82F6" />
          <rect x="7" y="19" width="36" height="3.5" rx="1.75" fill="#CBD5E1" />
          <rect x="7" y="27" width="30" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="7" y="34" width="34" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="7" y="41" width="20" height="3" rx="1.5" fill="#E2E8F0" />
        </g>

        {/* Foreground Yellow / Gold Folder Holding the Slides */}
        <g transform="translate(32, 60)">
          {/* Folder Back Tab */}
          <path d="M0 16C0 9.37258 5.37258 4 12 4H34L44 14H84C90.6274 14 96 19.3726 96 26V54C96 60.6274 90.6274 66 84 66H12C5.37258 66 0 60.6274 0 54V16Z" fill="#D97706" />

          {/* Folder Front Flap */}
          <path d="M0 24C0 17.3726 5.37258 12 12 12H84C90.6274 12 96 17.3726 96 24V54C96 60.6274 90.6274 66 84 66H12C5.37258 66 0 60.6274 0 54V24Z" fill="#F59E0B" />
          <path d="M0 24C0 17.3726 5.37258 12 12 12H84C90.6274 12 96 17.3726 96 24V28C96 21.3726 90.6274 16 84 16H12C5.37258 16 0 21.3726 0 28V24Z" fill="#FBBF24" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
