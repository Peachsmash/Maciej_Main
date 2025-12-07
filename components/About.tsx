import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center py-24 md:py-32 px-4"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 w-48 h-48 md:w-64 md:h-64 bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-3xl -z-10" />
        
        <h2 className="text-3xl md:text-6xl font-bold mb-8 md:mb-12">{t.about.title}</h2>
        
        <div className="space-y-6 md:space-y-8 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-12">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>

        <div className="mb-12">
            <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-6">{t.about.stack}</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Design Systems', 'Figma', 'Next.js'].map(skill => (
                    <span key={skill} className="px-4 py-2 md:px-5 md:py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs md:text-sm font-medium shadow-sm">
                        {skill}
                    </span>
                ))}
            </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10">
           <a href="mailto:hello@example.com" className="text-xl md:text-2xl font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
             {t.about.contact} &rarr;
           </a>
        </div>
      </div>
    </motion.section>
  );
};