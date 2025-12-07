import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.works, path: '/works' },
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-40 flex justify-center items-center pointer-events-none"
    >
      <div className="pointer-events-auto bg-nav/80 backdrop-blur-md shadow-lg rounded-full px-2 py-2 border border-black/5 dark:border-white/10">
        <ul className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 block relative ${
                    isActive 
                      ? 'text-black dark:text-white bg-white dark:bg-white/10 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};