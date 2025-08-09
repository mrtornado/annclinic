import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  disableAnimation?: boolean;
}

export default function MagicCard({
  children,
  className = "",
  glowColor = "rgba(13, 148, 136, 0.2)",
  disableAnimation = false,
}: MagicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableAnimation) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Varianta simplificată, fără animații care distrag
  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disableAnimation && setIsHovered(true)}
      onMouseLeave={() => !disableAnimation && setIsHovered(false)}
      whileHover={disableAnimation ? {} : { y: -3 }} // Reducere subtilă, nu salt mare
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Efect de glow subtil */}
      {!disableAnimation && (
        <div
          className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-md"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 70%)`,
            opacity: isHovered ? 0.4 : 0,
          }}
        />
      )}

      {/* Card principal */}
      <div className="relative rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md">
        {/* Efect de strălucire subtil */}
        {isHovered && !disableAnimation && (
          <div
            className="absolute pointer-events-none opacity-20 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 60%)`,
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
