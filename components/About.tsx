import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Layout, ShieldCheck } from 'lucide-react';
import { useRobot } from '../App';

const About: React.FC = () => {
  const { setRobotState } = useRobot();
  
  const cards = [
    { icon: <TrendingUp />, title: "Vendas & Conversão", text: "Design estratégico focado em transformar cliques em lucro." },
    { icon: <Layout />, title: "Design Premium", text: "Visual moderno que transmite autoridade imediata." },
    { icon: <Zap />, title: "Velocidade Extrema", text: "Sites otimizados que carregam instantaneamente." },
    { icon: <ShieldCheck />, title: "Segurança Total", text: "Sistemas robustos e protegidos para sua tranquilidade." },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-brand-dark">
            Por que escolher a <span className="text-brand-purple">WG.</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed" 
             onMouseEnter={() => setRobotState('thinking')} 
             onMouseLeave={() => setRobotState('idle')}>
            “Eu não entrego apenas código. Entrego uma ferramenta de negócios completa. Minha missão é ajudar empresários a dominarem seu mercado com tecnologia de ponta e design impecável.”
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-xl hover:border-brand-purple/30 transition-all duration-300 group hover:-translate-y-1"
              onMouseEnter={() => setRobotState('excited')}
              onMouseLeave={() => setRobotState('idle')}
              data-hover="true"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-purple/5 flex items-center justify-center mb-6 group-hover:bg-brand-purple text-brand-purple group-hover:text-white transition-colors duration-300">
                {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-500 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;