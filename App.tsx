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
import { RobotState, RobotContextType } from './types';

// Context for the Robot
const RobotContext = React.createContext<RobotContextType | undefined>(undefined);

export const useRobot = () => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobot must be used within a RobotProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Prevent right click for "app" feel
  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    // document.addEventListener('contextmenu', handleContext);
    return () => {
        // document.removeEventListener('contextmenu', handleContext);
    } 
  }, []);

  return (
    <RobotContext.Provider value={{ state: robotState, setRobotState, targetRef }}>
      <div className="font-sans antialiased text-white selection:bg-neon-purple selection:text-white">
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
  );
};

export default App;