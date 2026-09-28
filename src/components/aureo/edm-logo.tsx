import React from "react";
import Image from "next/image";

export function EdmLogo({
  className = "h-8",
  variant = "dark",
  showText = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  showText?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official EDM Laboratory Emblem */}
      <div className="relative h-8 sm:h-9 w-10 sm:w-11 shrink-0">
        <Image
          src={isLight ? "/images/edm-emblem-white.png" : "/images/edm-emblem-crimson.png"}
          alt="EDM Laboratory Logo"
          fill
          sizes="48px"
          className="object-contain"
          priority
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex items-baseline tracking-tight">
          <span className={`font-extrabold text-lg sm:text-xl tracking-tighter ${isLight ? "text-white" : "text-[#0F172A]"}`}>
            EDM
          </span>
          <span className={`font-normal text-lg sm:text-xl tracking-normal ml-1 ${isLight ? "text-rose-300" : "text-[#9E1B32]"}`}>
            Laboratory
          </span>
        </div>
      )}
    </div>
  );
}
