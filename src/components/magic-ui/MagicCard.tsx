import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function MagicCard({
  children,
  className = "",
  glowColor = "rgba(13, 148, 136, 0.3)",
}: MagicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 50%)`,
        }}
      />

      {/* Border gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 148, 136, 0.8), transparent 50%)`,
          padding: "1px",
        }}
      >
        <div className="w-full h-full rounded-2xl bg-surface" />
      </div>

      {/* Main card */}
      <div className="relative bg-surface rounded-2xl border border-border/50 group-hover:border-primary/30 transition-all duration-300 overflow-hidden">
        {/* Spotlight effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 50%)`,
              width: "100%",
              height: "100%",
            }}
          />
        )}

        {children}
      </div>
    </motion.div>
  );
}
