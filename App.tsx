import React, { useState, useContext, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Robot from './components/Robot';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import { RobotState, RobotContextType, Theme, ThemeContextType } from './types';

// Context for the Robot
const RobotContext = React.createContext<RobotContextType | undefined>(undefined);
// Context for Theme
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const useRobot = () => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobot must be used within a RobotProvider');
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [theme, setTheme] = useState<Theme>('light');
  const targetRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Apply theme class to HTML element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Prevent right click for "app" feel
  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    // document.addEventListener('contextmenu', handleContext);
    return () => {
        // document.removeEventListener('contextmenu', handleContext);
    } 
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RobotContext.Provider value={{ state: robotState, setRobotState, targetRef }}>
        <div className="font-sans antialiased text-gray-900 dark:text-white selection:bg-neon-purple selection:text-white bg-white dark:bg-gray-950 transition-colors duration-300">
          <AnimatePresence>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          {!loading && (
            <div className="relative">
              <CustomCursor />
              <Navbar />
              <Robot />
              
              <main>
                <Hero />
                <About />
                <Projects />
                <Services />
                <Contact />
              </main>
              
            </div>
          )}
        </div>
      </RobotContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;