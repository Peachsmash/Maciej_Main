import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

// Hardcoded images mapped by ID since translation file only has text
const projectImages: Record<number, string> = {
  1: "https://picsum.photos/800/600?random=1",
  2: "https://picsum.photos/800/600?random=2",
  3: "https://picsum.photos/800/600?random=3",
  4: "https://picsum.photos/800/600?random=4",
  5: "https://picsum.photos/800/600?random=5",
  6: "https://picsum.photos/800/600?random=6",
};

export const Works: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="mb-12 md:mb-16 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">{t.works.title}</h2>
        <div className="h-1 w-20 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto md:mx-0"></div>
        <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl text-sm md:text-base mx-auto md:mx-0">
          {t.works.p}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-24 md:pb-20">
        {t.works.projects.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/3] mb-4 relative shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={projectImages[project.id]} 
                alt={project.title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-medium">{project.title}</h3>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">{project.category}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};