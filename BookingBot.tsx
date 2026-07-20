import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';
import React, { useRef } from 'react';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface DockProps {
  items: DockItem[];
  className?: string;
  activeSection?: string;
  onItemClick?: (href: string) => void;
}

export default function Dock({ items, className = '', activeSection = '', onItemClick }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 pb-3 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-black/50 ${className}`}
    >
      {items.map((item) => (
        <DockIcon
          key={item.label}
          mouseX={mouseX}
          item={item}
          isActive={activeSection === item.href.replace('#', '')}
          onClick={() => {
            if (onItemClick) {
              onItemClick(item.href);
            } else {
              const el = document.getElementById(item.href.replace('#', ''));
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        />
      ))}
    </motion.div>
  );
}

interface DockIconProps {
  key?: string | React.Key;
  mouseX: MotionValue<number>;
  item: DockItem;
  isActive: boolean;
  onClick: () => void;
}

function DockIcon({ mouseX, item, isActive, onClick }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width dynamically: closer to mouse = larger width
  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={onClick}
      className={`group relative flex aspect-square items-center justify-center rounded-full border transition-colors cursor-pointer ${
        isActive
          ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:bg-neutral-800/80 hover:border-neutral-700 hover:text-white'
      }`}
    >
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded bg-neutral-950 px-2 py-1 text-xs font-medium text-neutral-200 border border-neutral-800 transition-all group-hover:scale-100 shadow-md whitespace-nowrap z-50">
        {item.label}
      </span>

      {/* Icon Wrapper */}
      <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110">
        {item.icon}
      </div>

      {/* Active Indicator Dot */}
      {isActive && (
        <motion.div
          layoutId="activeDot"
          className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-amber-400"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
}
