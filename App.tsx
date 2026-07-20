import { motion, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

interface OptionWheelProps {
  options: { id: string; name: string; price: number; duration: number; description: string }[];
  selectedIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

export default function OptionWheel({
  options,
  selectedIndex,
  onChange,
  className = '',
}: OptionWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Each item is spaced by 40 degrees in 3D
  const anglePerItem = 360 / Math.max(options.length, 8); 
  const radius = 100; // Radius of the 3D cylinder

  const handlePrev = () => {
    const nextIndex = (selectedIndex - 1 + options.length) % options.length;
    onChange(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % options.length;
    onChange(nextIndex);
  };

  // Wheel drag handler for a natural touchscreen feel
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    setScrollOffset(deltaY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(scrollOffset) > 20) {
      if (scrollOffset > 0) {
        // Dragged down -> rotate wheel down (brings previous index into view)
        handlePrev();
      } else {
        // Dragged up -> rotate wheel up (brings next index into view)
        handleNext();
      }
    }
    setScrollOffset(0);
  };

  // Mobile Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setScrollOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    setScrollOffset(deltaY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(scrollOffset) > 15) {
      if (scrollOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setScrollOffset(0);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        // ArrowUp selects the item visually above (next index)
        handleNext();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        // ArrowDown selects the item visually below (previous index)
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* 3D Wheel Frame */}
      <div className="relative w-full max-w-sm h-64 flex items-center justify-center select-none overflow-hidden">
        {/* Soft horizontal highlight bars for the selected active item */}
        <div className="absolute left-0 right-0 h-14 border-t border-b border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 pointer-events-none rounded-xl" />

        {/* 3D Cylindrical Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative w-full h-12 transition-transform duration-500 ease-out flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${-selectedIndex * anglePerItem + (scrollOffset / 5)}deg)`,
            }}
          >
            {options.map((option, idx) => {
              // Calculate the angular rotation of this item
              const itemAngle = idx * anglePerItem;
              
              // Find modular distance
              let diff = idx - selectedIndex;
              if (diff > options.length / 2) diff -= options.length;
              if (diff < -options.length / 2) diff += options.length;
              
              const isSelected = idx === selectedIndex;
              const opacity = Math.max(0.1, 1 - Math.abs(diff) * 0.35);

              return (
                <div
                  key={option.id}
                  onClick={() => onChange(idx)}
                  className={`absolute w-11/12 text-center py-2 px-4 transition-all duration-300 rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'text-amber-400 font-semibold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] scale-105'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: `rotateX(${itemAngle}deg) translateZ(${radius}px)`,
                    opacity: opacity,
                  }}
                >
                  <span className="text-base md:text-lg line-clamp-1">{option.name}</span>
                  <span className="text-xs text-neutral-400 font-mono mt-0.5">
                    {option.price} BYN
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Arrow Indicators */}
        <div className="absolute right-4 flex flex-col gap-10 z-10">
          <button
            onClick={handleNext}
            className="p-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-pointer"
            aria-label="Next service"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={handlePrev}
            className="p-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-pointer"
            aria-label="Previous service"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
