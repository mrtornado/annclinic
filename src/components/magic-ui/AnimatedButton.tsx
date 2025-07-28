import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  magicUIConfig,
  type ButtonVariant,
  type ButtonSize,
} from "../../config/magic-ui";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = magicUIConfig.defaults.button.variant,
  size = magicUIConfig.defaults.button.size,
  className = "",
}: AnimatedButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-secondary to-secondary-hover text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-surface shadow-md backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const ButtonContent = () => (
    <>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_0.8s_ease-out] pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-primary-hover/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ButtonContent />
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ButtonContent />
    </motion.button>
  );
}

// Add shimmer animation to global CSS
const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}
`;
