import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('[data-hover="true"]') !== null
      );
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-brand-purple pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-light pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: "spring", mass: 0.5, damping: 20, stiffness: 200 }}
      />
    </>
  );
};

export default CustomCursor;