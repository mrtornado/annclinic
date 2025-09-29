import { useState, useEffect } from "react";

export default function FamilyDoctorBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transform transition-all duration-1000 ease-out ${
        isAnimating
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-10 opacity-0 scale-95"
      }`}
    >
      {/* Floating Banner */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 text-white rounded-3xl shadow-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-teal-500/30 animate-pulse-slow">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-teal-300/10 to-white/5 rounded-3xl animate-pulse" />

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-teal-400/20 blur-sm animate-pulse" />

        {/* Moving shimmer effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

        {/* Enhanced animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-3 left-4 w-2 h-2 bg-cyan-300/60 rounded-full animate-bounce" />
          <div
            className="absolute top-6 right-6 w-1.5 h-1.5 bg-teal-300/70 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-4 left-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-3 w-0.5 h-0.5 bg-white/80 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute bottom-6 right-10 w-1.5 h-1.5 bg-teal-200/40 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/30 transition-all duration-200 text-sm"
          aria-label="Închide banner"
        >
          ×
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <span className="text-2xl">👨‍⚕️</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg mb-2 leading-tight">
            Ai nevoie de Medic de Familie?
          </h3>

          {/* Description */}
          <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
            Înscrie-te GRATUIT la noi și beneficiezi de consultații rapide și
            îngrijire personalizată!
          </p>

          {/* CTA Button */}
          <a
            href="/programare"
            className="block w-full bg-gradient-to-r from-white to-cyan-50 text-teal-700 font-bold py-3 px-4 rounded-2xl text-center hover:from-cyan-50 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 border border-teal-200/50"
          >
            <span className="flex items-center justify-center gap-2">
              <span>📋</span>
              <span>Înscrie-te Acum</span>
            </span>
          </a>
        </div>

        {/* Enhanced glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/30 via-cyan-400/20 to-teal-600/30 blur-xl -z-10 animate-pulse" />
      </div>
    </div>
  );
}
