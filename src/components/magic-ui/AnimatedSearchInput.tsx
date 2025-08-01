import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedIcon from "./AnimatedIcon";

interface AnimatedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function AnimatedSearchInput({
  value,
  onChange,
  placeholder = "Caută...",
  className = "",
}: AnimatedSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
          isFocused
            ? "border-primary shadow-lg shadow-primary/20"
            : "border-border hover:border-primary/50"
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-white to-surface opacity-90" />

        {/* Animated border glow */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(13, 148, 136, 0.1) 25%, 
                rgba(20, 184, 166, 0.1) 50%, 
                rgba(217, 119, 6, 0.1) 75%, 
                transparent 100%)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        )}

        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-4 z-10">
            <AnimatedIcon
              icon="🔍"
              size="sm"
              color={isFocused ? "text-primary" : "text-muted"}
            />
          </div>

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none font-medium text-lg relative z-10"
          />

          {/* Clear button */}
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange("")}
              className="absolute right-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <AnimatedIcon icon="✕" size="sm" color="text-muted" />
            </motion.button>
          )}
        </div>

        {/* Floating particles effect when focused */}
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "100%",
                  opacity: 0,
                }}
                animate={{
                  y: "-10px",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Search suggestions or results count */}
      {value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 text-sm text-secondary"
        >
          Caută după: "{value}"
        </motion.div>
      )}
    </div>
  );
}

// Add shimmer animation to global styles
const shimmerStyles = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = shimmerStyles;
  document.head.appendChild(styleSheet);
}
