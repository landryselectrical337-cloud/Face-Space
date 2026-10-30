import React from 'react';

interface SpaceRobotLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SpaceRobotLogo: React.FC<SpaceRobotLogoProps> = ({ 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  }[size];

  return (
    <div 
      className={`relative ${sizeClasses} rounded-full flex items-center justify-center shrink-0 group select-none ${className}`}
      title="Face Space Cosmic Wingman"
    >
      {/* Deep Space Cosmic Canvas with stars */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#0a0618] via-[#0f172a] to-[#030712] border border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.45)] overflow-hidden">
        {/* Distant Nebulae Glow */}
        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-purple-600/30 blur-sm pointer-events-none" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cyan-500/25 blur-sm pointer-events-none" />
        
        {/* Deep space twinkling stars */}
        <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white rounded-full opacity-90 shadow-[0_0_2px_#fff]" />
        <div className="absolute top-3 right-2 w-1 h-1 bg-cyan-200 rounded-full opacity-80 animate-pulse" />
        <div className="absolute bottom-2 left-2.5 w-0.5 h-0.5 bg-pink-300 rounded-full opacity-80" />
        <div className="absolute bottom-3 right-2.5 w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-90" />
        <div className="absolute top-6 left-1 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
      </div>

      {/* Floating Orbital Space Ring */}
      <div 
        className="absolute inset-0 rounded-full border border-cyan-400/20 pointer-events-none scale-110"
        style={{ transform: 'rotate(-25deg) scaleY(0.7)' }}
      />

      {/* High-Tech Floating Robot Face SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-4/5 h-4/5 relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] transition-transform duration-300 group-hover:scale-105"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna / Beacon */}
        <line x1="50" y1="20" x2="50" y2="8" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="7" r="3.5" fill="#22d3ee" className="animate-pulse">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Head Shell Outer / Space Helmet */}
        <rect 
          x="22" 
          y="20" 
          width="56" 
          height="54" 
          rx="18" 
          fill="url(#robotHeadGrad)" 
          stroke="#38bdf8" 
          strokeWidth="2.5" 
        />

        {/* Side Ear Antennas / Audio Modules */}
        <rect x="15" y="38" width="7" height="18" rx="3.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="78" y="38" width="7" height="18" rx="3.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="18.5" cy="47" r="1.5" fill="#38bdf8" />
        <circle cx="81.5" cy="47" r="1.5" fill="#38bdf8" />

        {/* Visor Screen */}
        <rect 
          x="28" 
          y="30" 
          width="44" 
          height="26" 
          rx="9" 
          fill="#020617" 
          stroke="#06b6d4" 
          strokeWidth="1.5" 
        />

        {/* Glowing LED Visor Eyes */}
        <circle cx="41" cy="42" r="4" fill="#22d3ee" className="drop-shadow-[0_0_4px_#22d3ee]">
          <animate attributeName="r" values="3.8;4.4;3.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="59" cy="42" r="4" fill="#22d3ee" className="drop-shadow-[0_0_4px_#22d3ee]">
          <animate attributeName="r" values="3.8;4.4;3.8" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Eye pupils highlight */}
        <circle cx="42.5" cy="40.5" r="1.2" fill="#ffffff" />
        <circle cx="60.5" cy="40.5" r="1.2" fill="#ffffff" />

        {/* Cyber Mouth / Sound Grill */}
        <line x1="42" y1="62" x2="58" y2="62" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="37" cy="62" r="1.5" fill="#ec4899" />
        <circle cx="63" cy="62" r="1.5" fill="#ec4899" />

        {/* Cheek Blush LED Sensors */}
        <rect x="30" y="47" width="4" height="2" rx="1" fill="#ec4899" opacity="0.8" />
        <rect x="66" y="47" width="4" height="2" rx="1" fill="#ec4899" opacity="0.8" />

        <defs>
          <linearGradient id="robotHeadGrad" x1="22" y1="20" x2="78" y2="74" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="0.6" stopColor="#0f172a" />
            <stop offset="1" stopColor="#090d16" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Micro Thruster Particles */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-cyan-400/60 blur-xs rounded-full pointer-events-none animate-pulse" />
    </div>
  );
};
