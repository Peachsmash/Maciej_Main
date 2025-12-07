import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { About } from './components/About';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { Theme } from './types';

// Component to handle scroll/touch navigation between pages
const ScrollHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset navigation lock and scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Small timeout to prevent immediate re-triggering from inertia
    const timer = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isNavigating) return;

      // Ignore horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const isTop = window.scrollY <= 5;
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
      const threshold = 10; // Minimum scroll intensity to trigger

      if (Math.abs(e.deltaY) < threshold) return;

      if (location.pathname === '/') {
        // HOME PAGE (1st)
        // Scroll Down -> Works
        if (e.deltaY > 0 && isBottom) {
          setIsNavigating(true);
          navigate('/works');
        }
      } else if (location.pathname === '/works') {
        // WORKS PAGE (2nd)
        if (e.deltaY < 0 && isTop) {
           // Scroll Up -> Home
           setIsNavigating(true);
           navigate('/');
        } else if (e.deltaY > 0 && isBottom) {
           // Scroll Down -> About
           setIsNavigating(true);
           navigate('/about');
        }
      } else if (location.pathname === '/about') {
        // ABOUT PAGE (3rd)
        // Scroll Up -> Works
        if (e.deltaY < 0 && isTop) {
          setIsNavigating(true);
          navigate('/works');
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isNavigating || touchStart === null) return;
      
      const touchEnd = e.touches[0].clientY;
      const deltaY = touchStart - touchEnd; // Positive = swipe up (scroll down)
      
      // Increased buffer for mobile logic
      const isTop = window.scrollY <= 10; 
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      
      // Higher threshold for touch to prevent accidental swipes
      if (Math.abs(deltaY) < 60) return; 

      if (location.pathname === '/') {
        // Home -> Works (Down)
        if (deltaY > 0 && isBottom) {
          setIsNavigating(true);
          navigate('/works');
        }
      } else if (location.pathname === '/works') {
        // Works -> Home (Up)
        if (deltaY < 0 && isTop) {
          setIsNavigating(true);
          navigate('/');
        } 
        // Works -> About (Down)
        else if (deltaY > 0 && isBottom) {
          setIsNavigating(true);
          navigate('/about');
        }
      } else if (location.pathname === '/about') {
        // About -> Works (Up)
        if (deltaY < 0 && isTop) {
          setIsNavigating(true);
          navigate('/works');
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [location.pathname, isNavigating, navigate, touchStart]);

  return null;
};

// Wrapper component to use useLocation hook for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

// Footer component to use hook
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400 opacity-50 pointer-events-none z-0">
       <p>© {new Date().getFullYear()} {t.footer}</p>
    </footer>
  );
};

function AppContent() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <HashRouter>
      <ScrollHandler />
      <main className="min-h-screen relative font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
        <Navbar />
        <LanguageToggle />
        <ThemeToggle currentTheme={theme} toggleTheme={toggleTheme} />
        
        <AnimatedRoutes />
        
        <Footer />
      </main>
    </HashRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;