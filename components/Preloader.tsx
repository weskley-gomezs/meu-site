import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-8">
        <motion.div 
          className="text-6xl font-display font-black text-brand-dark"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          WG<span className="text-brand-purple">.</span>
        </motion.div>
        
        <motion.div
           className="absolute -inset-4 border-2 border-brand-purple/20 rounded-full"
           animate={{ rotate: 360 }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
           className="absolute -inset-2 border border-brand-light/40 rounded-full"
           animate={{ rotate: -360 }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-light to-brand-purple"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 font-mono text-brand-purple text-sm font-bold">
        CARREGANDO EXPERIÊNCIA... {progress}%
      </div>
    </motion.div>
  );
};

export default Preloader;