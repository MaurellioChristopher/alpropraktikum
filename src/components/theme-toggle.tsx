"use client";

import React from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
      className={`relative flex items-center gap-2 p-2 rounded-full cursor-pointer transition-colors duration-300 ${
        isDark
          ? "bg-[#180C2E] text-purple-200 border border-purple-700/60 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-[#261448]"
          : "bg-white text-purple-900 border border-purple-200 shadow-2xs hover:bg-purple-50 hover:text-purple-950"
      } ${className}`}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center text-purple-300"
            >
              <Sun size={15} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center text-purple-900"
            >
              <Moon size={15} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-semibold tracking-wider">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </motion.button>
  );
}
