import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Phone, Mail } from 'lucide-react';
import { useRobot } from '../App';

const Contact: React.FC = () => {
  const { setRobotState } = useRobot();

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/5561981535040', icon: <Phone /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/weskley-gomes-250825308/', icon: <Linkedin /> },
    { name: 'Instagram', url: 'https://www.instagram.com/weskley_gomezs/', icon: <Instagram /> },
    { name: 'GitHub', url: 'https://github.com/weskley-gomezs', icon: <Github /> },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-brand-dark to-black relative text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            PRONTO PARA <span className="text-brand-accent">ESCALAR?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Não deixe seu negócio estagnado. Entre em contato agora e vamos desenhar a estratégia digital ideal para você.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6 mb-16">
            <a 
               href="tel:+5561981535040"
               className="text-3xl md:text-5xl font-display font-bold text-white hover:text-brand-accent transition-colors"
               onMouseEnter={() => setRobotState('pointing')}
               onMouseLeave={() => setRobotState('idle')}
               data-hover="true"
            >
              (61) 98153-5040
            </a>
            <span className="text-gray-500 uppercase tracking-widest text-sm">Disponível no WhatsApp</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white hover:text-brand-purple transition-all icon-pulse-loop"
                onMouseEnter={() => setRobotState('excited')}
                onMouseLeave={() => setRobotState('idle')}
                data-hover="true"
                title={link.name}
              >
                {React.cloneElement(link.icon as React.ReactElement, { size: 24 })}
              </motion.a>
            ))}
          </div>

          <footer className="mt-20 pt-8 border-t border-white/10 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Weskley Gomes. Todos os direitos reservados.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Disponível para novos projetos
            </p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;