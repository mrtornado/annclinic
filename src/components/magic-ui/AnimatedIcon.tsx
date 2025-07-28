import { motion } from "framer-motion";

interface AnimatedIconProps {
  icon: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

export default function AnimatedIcon({
  icon,
  size = "md",
  color = "text-white",
  className = "",
}: AnimatedIconProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <motion.span
      className={`${sizes[size]} ${color} ${className}`}
      whileHover={{
        scale: 1.2,
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.span>
  );
}
