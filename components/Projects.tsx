import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, ArrowRight, Loader2 } from 'lucide-react';
import { Project } from '../types';
import { useRobot } from '../App';

// ==========================================
// ÁREA DE CONFIGURAÇÃO DE IMAGENS
// Cole aqui os links das suas fotos pessoais
// ==========================================
const IMAGENS_PROJETOS = {
  // Projeto 1: Advocracia
  // Dica: Você pode hospedar a imagem no GitHub ou Imgur e colar o link aqui
  advocracia: "https://www.direitoprofissional.com/wp-content/uploads/2019/07/288957-fernanda-entregar-ate-dia-2904-futuro-da-advocacia-saiba-o-que-esperar-e-como-se-preparar.jpg",
  
  // Projeto 2: Estética
  estetica: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { setRobotState } = useRobot();
  const [progress, setProgress] = useState(0);

  // Animation for the "Coming Soon" progress bar
  useEffect(() => {
    if (project.status === 'coming-soon') {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 0 : prev + 1));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [project.status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group w-full h-full"
      onMouseEnter={() => setRobotState('pointing')}
      onMouseLeave={() => setRobotState('idle')}
    >
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-brand-purple/40 dark:hover:border-brand-purple/40 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
        
        {/* Image Section - Compact Height */}
        <div className="w-full h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-100 dark:border-gray-800">
            {project.status === 'live' ? (
                 <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                     <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors z-10"></div>
                     <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                     />
                 </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full px-6">
                    <div className="w-full max-w-[180px] mb-2">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-widest">
                            <span>Compilando</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-brand-purple"
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear", duration: 0.05 }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-brand-purple text-[10px] font-bold animate-pulse">
                        <Loader2 size={12} className="animate-spin" />
                        <span>EM DESENVOLVIMENTO</span>
                    </div>
                </div>
            )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${project.status === 'live' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                    {project.status === 'live' ? 'NO AR' : 'EM BREVE'}
                </span>
            </div>
            
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {project.title}
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                {project.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mb-5">
                {['UX/UI', 'Mobile', 'Vendas'].map((tag) => (
                    <span key={tag} className="text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto">
                {project.status === 'live' ? (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-brand-dark dark:text-white text-xs font-bold rounded-lg hover:bg-brand-dark hover:text-white transition-all group-hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-transparent btn-border-pulse"
                        data-hover="true"
                    >
                        <ExternalLink size={14} /> Visitar Projeto
                    </a>
                ) : (
                    <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 text-xs font-bold rounded-lg cursor-not-allowed">
                        Aguarde Lançamento
                    </button>
                )}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Advocracia",
      description: "Landing page de alta autoridade para advogados. Design sóbrio e elegante que transmite confiança imediata.",
      link: "https://advocracia.vercel.app/",
      repo: "weskley-gomezs/advocracia",
      status: 'live',
      image: IMAGENS_PROJETOS.advocracia
    },
    {
      title: "Estética Premium",
      description: "Site para clínica de estética focado em agendamento. Visual clean com fotos inspiradoras.",
      link: "https://weskley-gomezs.github.io/estetica/",
      repo: "weskley-gomezs/estetica",
      status: 'live',
      image: IMAGENS_PROJETOS.estetica
    },
    {
      title: "Dashboard SaaS",
      description: "Sistema de gestão completo para pequenas empresas. Controle financeiro e cadastro de clientes.",
      link: "#",
      repo: "#",
      status: 'coming-soon'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50/50 dark:bg-gray-950/50 relative transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-3xl md:text-4xl font-display font-black text-brand-dark dark:text-white mb-1"
                >
                    TRABALHOS <span className="text-brand-purple">RECENTES.</span>
                </motion.h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                    Projetos reais, resultados reais.
                </p>
            </div>
        </div>
        
        {/* Grid Layout - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;