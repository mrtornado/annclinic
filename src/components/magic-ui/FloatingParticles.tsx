import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const DEFAULT_COLORS = ["#1e40af", "#3b82f6", "#059669", "#10b981"];

export default function FloatingParticles({
  count = 20,
  colors = DEFAULT_COLORS,
  className = "",
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Memoize colors to prevent infinite re-renders
  const memoizedColors = useMemo(() => colors, [colors.join(",")]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color:
          memoizedColors[Math.floor(Math.random() * memoizedColors.length)],
        duration: Math.random() * 20 + 10,
      });
    }
    setParticles(newParticles);
  }, [count, memoizedColors]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
