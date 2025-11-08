"use client";

// 🌙 CYBERPUNK LOGO - Stunning animated logo
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function CyberpunkLogo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
        
        {/* Main Logo */}
        <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary overflow-hidden group-hover:scale-110 transition-transform duration-300">
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:8px_8px] opacity-30" />
          
          {/* Letter E */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black text-white drop-shadow-lg">E</span>
          </div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-black leading-none gradient-text group-hover:scale-105 transition-transform">
            Elite Store
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Next-Gen Shopping
          </span>
        </div>
      )}
    </Link>
  );
}
