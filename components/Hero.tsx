import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden pt-20"
    >
      <div className="z-10 flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-tight flex flex-col items-center gap-6 md:gap-8 w-full">
          <span>{t.hero.greeting}</span>
          
          <span className="font-sans bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent select-none">
            {t.hero.title}
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 md:mt-20 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto px-4"
        >
          {t.hero.p}
        </motion.p>
      </div>
      
      {/* Decorative background blur elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};