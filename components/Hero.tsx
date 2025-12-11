import React from 'react';
import { motion } from 'framer-motion';
import { useRobot } from '../App';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const { setRobotState } = useRobot();

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-tech-silver dark:bg-tech-dark transition-colors duration-500">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[30%] -right-[10%] w-[700px] h-[700px] bg-brand-purple/5 dark:bg-brand-purple/10 rounded-full blur-[100px]"></div>
         <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-500/10 rounded-full blur-[100px]"></div>
         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
         <div className="absolute inset-0 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple dark:bg-brand-purple/20 dark:text-brand-light font-bold text-sm tracking-wider">
              TRANSFORMAÇÃO DIGITAL
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl font-display font-black text-brand-dark dark:text-white mb-6 leading-[1.1]"
          >
            ELEVE O NÍVEL DO <br />
            <span className="text-gradient">SEU NEGÓCIO</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl font-light leading-relaxed"
          >
            Não basta estar online. Você precisa de uma <strong className="text-brand-dark dark:text-white">presença digital magnética</strong> que converta visitantes em clientes fiéis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="https://wa.me/5561981535040" 
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setRobotState('excited')}
              onMouseLeave={() => setRobotState('idle')}
              className="group relative px-8 py-4 bg-brand-purple text-white font-bold rounded-lg shadow-lg shadow-brand-purple/30 overflow-hidden hover:shadow-brand-purple/50 transition-all transform hover:-translate-y-1"
              data-hover="true"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle size={20} /> Falar no WhatsApp
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-brand-accent to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <button 
              onClick={handleScrollToProjects}
              onMouseEnter={() => setRobotState('pointing')}
              onMouseLeave={() => setRobotState('idle')}
              className="px-8 py-4 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-white font-bold rounded-lg hover:border-brand-purple hover:text-brand-purple dark:hover:border-brand-light dark:hover:text-brand-light transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              data-hover="true"
            >
              Ver Portfolio <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;