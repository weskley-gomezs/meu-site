import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useRobot, useTheme } from '../App';

const Robot: React.FC = () => {
  const { state: robotState, setRobotState } = useRobot();
  const { theme } = useTheme();
  
  // Physics for smooth 3D-like movement
  const springConfig = { damping: 15, stiffness: 150 };
  const lookX = useSpring(0, springConfig);
  const lookY = useSpring(0, springConfig);

  // Global Mouse Listener for Link Hovering
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // 1. Calculate Eye Movement
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2); // -1 to 1
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2); // -1 to 1
      
      lookX.set(x * 15); 
      lookY.set(y * 15);

      // 2. Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a') || target.closest('button') || target.getAttribute('role') === 'button';

      if (isClickable) {
        // Only override if not already in a specific state set by components
        if (robotState === 'idle') {
           setRobotState('pointing');
        }
      } else {
         if (robotState === 'pointing') {
           setRobotState('idle');
         }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [lookX, lookY, robotState, setRobotState]);

  // Determine Robot Colors based on Theme
  const isDark = theme === 'dark';
  
  // HEAD Styles
  const headGradient = isDark 
    ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-gray-600'
    : 'bg-gradient-to-br from-white via-gray-100 to-gray-300 border-white/80';
    
  // BODY Styles
  const bodyGradient = isDark
    ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-700'
    : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 border-white/50';

  // HAND Styles
  const handGradient = isDark
    ? 'bg-gradient-to-br from-gray-600 to-gray-800 border-gray-500'
    : 'bg-gradient-to-br from-white to-gray-300 border-gray-200';

  return (
    <div className="fixed right-8 bottom-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-50 pointer-events-none select-none hidden md:block perspective-500">
      <motion.div 
        className="relative w-40 h-40"
        animate={{ 
          y: [0, -15, 0],
          rotateZ: [0, 1, -1, 0]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* === HEAD === */}
        <motion.div 
          className="relative z-20 w-28 h-24 mx-auto"
          style={{ 
            rotateX: useSpring(lookY, { stiffness: 50, damping: 20 }), 
            rotateY: useSpring(lookX, { stiffness: 50, damping: 20 }) 
          }}
        >
          {/* Antenna */}
          <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
            <motion.div 
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-purple shadow-[0_0_10px_#7c3aed]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            ></motion.div>
          </div>

          {/* Head Shape */}
          <div className={`w-full h-full rounded-[2.5rem] ${headGradient} border shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden relative transition-colors duration-500`}>
            
            {/* Glossy High-key Reflection */}
            <div className="absolute top-2 left-4 w-12 h-6 bg-white rounded-full rotate-[-15deg] blur-[1px] opacity-90 mix-blend-overlay"></div>

            {/* Face/Visor Area (Dark Glass) */}
            <div className="w-24 h-14 bg-gray-900 rounded-2xl flex items-center justify-center gap-4 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] border border-gray-700">
              {/* EYES */}
              <motion.div 
                className="flex gap-4"
                style={{ x: lookX, y: lookY }}
              >
                {/* Left Eye */}
                <motion.div 
                  className={`w-5 h-7 rounded-full bg-brand-accent shadow-[0_0_15px_#8b5cf6]`}
                  animate={robotState === 'excited' ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
                  transition={{ duration: 0.2 }}
                >
                   <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1 opacity-90"></div>
                </motion.div>
                
                {/* Right Eye */}
                <motion.div 
                  className={`w-5 h-7 rounded-full bg-brand-accent shadow-[0_0_15px_#8b5cf6]`}
                   animate={robotState === 'excited' ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
                   transition={{ duration: 0.2, delay: 0.05 }}
                >
                   <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1 opacity-90"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* === BODY === */}
        <div className="relative z-10 w-20 h-16 mx-auto -mt-4">
           {/* Body Shape */}
           <div className={`w-full h-full rounded-[2rem] ${bodyGradient} border shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center transition-colors duration-500`}>
              
              {/* Chest Light */}
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-inner ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                <motion.div 
                  className="w-4 h-4 rounded-full bg-brand-purple shadow-[0_0_10px_#7c3aed]"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
           </div>
        </div>

        {/* === HANDS === */}
        {/* Left Hand */}
        <motion.div 
          className={`absolute top-28 left-0 w-8 h-8 rounded-full ${handGradient} border shadow-md transition-colors duration-500`}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Right Hand (Interactable) */}
        <motion.div 
          className={`absolute top-28 right-0 w-8 h-8 rounded-full ${handGradient} border shadow-md flex items-center justify-center transition-colors duration-500`}
          animate={robotState === 'pointing' ? { y: -50, x: 10, rotate: -20 } : { y: [0, 5, 0], x: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
           {/* Glow when hand is raised */}
           {robotState === 'pointing' && (
             <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1.2, opacity: 0.5 }} 
                className="absolute inset-0 bg-brand-purple rounded-full blur-md"
             />
           )}
        </motion.div>

        {/* Shadow under robot */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/10 blur-md rounded-[100%]"></div>
      </motion.div>
    </div>
  );
};

export default Robot;