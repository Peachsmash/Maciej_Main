import React, { useState, useEffect } from 'react';
import { PaintBucket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';

interface ThemeToggleProps {
  currentTheme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, toggleTheme }) => {
  const [isSpilling, setIsSpilling] = useState(false);
  
  // The color we are spilling INTO. If current is light, we spill dark color.
  const spillColor = currentTheme === 'light' ? '#0f172a' : '#ffffff'; 

  const handleToggle = () => {
    if (isSpilling) return;
    setIsSpilling(true);
    
    // Duration matches the animation duration below
    setTimeout(() => {
      toggleTheme();
      setIsSpilling(false);
    }, 600); // Trigger theme switch midway or near end of fill
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl hover:scale-110 transition-transform active:scale-95 group w-9 h-9 flex items-center justify-center"
        aria-label="Toggle Theme"
      >
        <div className="transform scale-x-[-1] flex items-center justify-center">
          <PaintBucket 
            size={20} 
            className={`transition-transform duration-500 ${isSpilling ? 'rotate-[-45deg]' : 'group-hover:rotate-12'}`}
          />
        </div>
      </button>

      {/* The Paint Spill Layer */}
      <AnimatePresence>
        {isSpilling && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              backgroundColor: spillColor,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 45, // Just below the button (z-50) but above everything else
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};