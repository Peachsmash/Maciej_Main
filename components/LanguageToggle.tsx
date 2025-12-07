import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed z-50 p-2 rounded-full bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl hover:scale-110 transition-transform active:scale-95 group overflow-hidden w-9 h-9 flex items-center justify-center right-6 top-16 md:top-6 md:right-20"
      aria-label="Toggle Language"
    >
      <motion.div
        key={language}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {/* If current language is EN, show PL flag to switch to Polish. 
            If current is PL, show EN flag to switch to English. */}
        {language === 'en' ? (
          <svg 
            role="img" 
            aria-label="Polish Flag" 
            viewBox="0 0 32 20" 
            className="w-5 h-auto rounded-[2px] shadow-sm ring-1 ring-black/10"
          >
             <title>Polish Flag</title>
             <desc>Polish Flag</desc>
             <path fill="#ffffff" d="M0 0h32v10H0z"/>
             <path fill="#dc143c" d="M0 10h32v10H0z"/>
          </svg>
        ) : (
          <svg 
            role="img" 
            aria-label="UK Flag" 
            viewBox="0 0 60 30" 
            className="w-5 h-auto rounded-[2px] shadow-sm ring-1 ring-black/10"
          >
            <title>UK Flag</title>
            <desc>UK Flag</desc>
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
            </clipPath>
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </svg>
        )}
      </motion.div>
    </button>
  );
};