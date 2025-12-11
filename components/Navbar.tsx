import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Auto-detect active section
      const sections = ['home', 'about', 'projects', 'services', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Início', id: 'home' },
    { name: 'Sobre', id: 'about' },
    { name: 'Projetos', id: 'projects' },
    { name: 'Planos', id: 'services' },
    { name: 'Contato', id: 'contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div className={`
          pointer-events-auto
          flex items-center justify-between
          px-6 py-3 md:px-8 md:py-4
          bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl
          border border-white/50 dark:border-white/10
          shadow-lg shadow-black/5 dark:shadow-black/20
          rounded-full
          transition-all duration-300
          ${isScrolled ? 'w-[95%] md:w-auto gap-4 md:gap-8 scale-100' : 'w-[95%] md:w-auto gap-4 md:gap-12 scale-105'}
        `}>
          
          {/* Logo */}
          <div 
            className="text-2xl font-display font-black tracking-tighter cursor-pointer group flex-shrink-0"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-brand-dark dark:text-white group-hover:text-brand-purple transition-colors">W</span>
            <span className="text-brand-purple">G</span>
            <span className="text-brand-accent">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                data-hover="true"
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-4 py-2 rounded-full font-sans font-medium text-sm tracking-wide transition-all duration-300
                  ${activeSection === item.id 
                    ? 'text-brand-purple bg-brand-purple/10 dark:bg-brand-purple/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-brand-purple dark:hover:text-brand-light hover:bg-gray-100 dark:hover:bg-white/5'}
                `}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
             {/* Theme Toggle */}
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors pointer-events-auto"
              data-hover="true"
             >
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-brand-dark text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-brand-purple transition-colors shadow-lg shadow-brand-purple/20"
                  data-hover="true"
              >
                FALE COMIGO
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-brand-dark dark:text-white p-1 bg-gray-100 dark:bg-white/10 rounded-full"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-[40] flex flex-col items-center justify-center space-y-8"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-3xl font-display font-bold text-gray-800 dark:text-gray-100 hover:text-brand-purple transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button 
                onClick={() => scrollToSection('contact')}
                className="mt-8 bg-brand-purple text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl"
            >
              FALE COMIGO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;