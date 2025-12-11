import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, ShoppingBag, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRobot } from '../App';

const Services: React.FC = () => {
  const { setRobotState } = useRobot();

  const services = [
    {
      title: "E-commerce",
      subtitle: "Loja Virtual Completa",
      price: "R$ 1.497",
      icon: <ShoppingBag size={32} />,
      features: ["Catálogo Ilimitado", "Integração Pagamentos", "Cálculo de Frete", "Painel de Pedidos"],
      highlight: false
    },
    {
      title: "Site Profissional",
      subtitle: "Institucional & Autoridade",
      price: "R$ 697",
      icon: <Monitor size={32} />,
      features: ["Até 5 Páginas", "Design Premium", "Otimizado para Google (SEO)", "Botão WhatsApp Fixo"],
      highlight: true
    },
    {
      title: "Sistema Personalizado",
      subtitle: "Automação & Gestão",
      price: "Sob Consulta",
      icon: <Database size={32} />,
      features: ["Painel Administrativo", "Gestão de Clientes", "Automação com IA", "Solução Sob Medida"],
      highlight: false
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-dark dark:bg-black relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-10 dark:opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            INVESTIMENTO PARA O SEU <span className="text-brand-light">CRESCIMENTO</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Escolha a solução ideal para o momento atual da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              onMouseEnter={() => setRobotState('excited')}
              onMouseLeave={() => setRobotState('idle')}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl p-8 transition-all duration-300 group ${
                service.highlight 
                  ? 'border-2 border-brand-purple shadow-2xl shadow-brand-purple/20 scale-105 z-10' 
                  : 'border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2'
              }`}
              data-hover="true"
            >
              {service.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-purple text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  MAIS POPULAR
                </div>
              )}

              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                service.highlight 
                ? 'bg-brand-purple text-white' 
                : 'bg-gray-50 dark:bg-gray-800 text-brand-dark dark:text-brand-light group-hover:bg-brand-purple group-hover:text-white'
              }`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">{service.subtitle}</p>
              
              <div className="text-4xl font-black text-brand-dark dark:text-white mb-8 tracking-tight">
                {service.price}
              </div>
              
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                    <CheckCircle2 size={18} className={`mr-3 flex-shrink-0 transition-colors ${service.highlight ? 'text-green-500' : 'text-gray-400 dark:text-gray-600 group-hover:text-green-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/5561981535040?text=Olá, tenho interesse no plano ${service.title}`}
                target="_blank"
                rel="noreferrer"
                className={`
                  w-full py-4 rounded-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95
                  ${service.highlight 
                    ? 'bg-brand-purple text-white hover:bg-brand-dark shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 hover:-translate-y-1' 
                    : 'bg-gray-50 dark:bg-gray-800 text-brand-dark dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:border-brand-purple dark:hover:border-brand-light hover:text-brand-purple dark:hover:text-brand-light hover:shadow-lg hover:-translate-y-1'
                  }
                `}
              >
                Começar Agora <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;