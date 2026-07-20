import React from 'react';

interface LightRaysProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export default function LightRays({
  className = '',
  intensity = 'medium',
  color = 'rgba(245, 158, 11, 0.04)', // amber-500 with low opacity
}: LightRaysProps) {
  const getRayCount = () => {
    switch (intensity) {
      case 'low':
        return 3;
      case 'high':
        return 8;
      case 'medium':
      default:
        return 5;
    }
  };

  const rays = Array.from({ length: getRayCount() });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* Central glow base */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-500/5 to-transparent blur-[120px] rounded-full" />

      {/* Volumetric Rays */}
      <div className="absolute inset-0 filter blur-[15px] opacity-70">
        {rays.map((_, index) => {
          // Semi-randomized values for authentic organic movement
          const startAngle = -45 + (index * 90) / (rays.length - 1 || 1);
          const duration = 12 + index * 3;
          const delay = -index * 2;
          const width = 100 + index * 50;

          return (
            <div
              key={index}
              className="absolute top-[-10%] left-1/2 origin-top"
              style={{
                width: `${width}px`,
                height: '150%',
                background: `linear-gradient(180deg, ${color} 0%, rgba(0, 0, 0, 0) 80%)`,
                transform: `translateX(-50%) rotate(${startAngle}deg)`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                animation: `sway-${index % 3} ${duration}s ease-in-out infinite alternate`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes sway-0 {
          0% { transform: translateX(-50%) rotate(-30deg) scaleX(0.9); }
          100% { transform: translateX(-50%) rotate(10deg) scaleX(1.1); }
        }
        @keyframes sway-1 {
          0% { transform: translateX(-50%) rotate(-10deg) scaleY(1); }
          100% { transform: translateX(-50%) rotate(30deg) scaleY(1.2); }
        }
        @keyframes sway-2 {
          0% { transform: translateX(-50%) rotate(-20deg) scale(0.95); }
          100% { transform: translateX(-50%) rotate(20deg) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
