import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import fachadaImg from '../assets/fachada.jpeg';

export const LocationSection: React.FC = () => {
  const handleOpenDirections = () => {
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=-5.2286549,-37.3237885&destination_place_id=Seu+Galdino+barbearia',
      '_blank'
    );
  };

  return (
    <section className="py-20 px-4 md:px-6 max-w-3xl mx-auto space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-center tracking-tight text-foreground"
      >
        Localização
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#151515] p-3 md:p-5 rounded-[2rem] border border-white/5 shadow-2xl space-y-4"
      >
        {/* Map iframe */}
        <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden relative">
          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.88!2d-37.3237885!3d-5.2286549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTMnNDMuMiJTIDM3wrAxOScyNS42Ilc!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleOpenDirections}
          className="w-full py-4 bg-primary text-black font-extrabold text-sm rounded-xl transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Ir até a Barbearia
        </button>

        {/* Storefront Image */}
        <div className="w-full h-32 md:h-48 rounded-xl overflow-hidden">
          <img 
            src={fachadaImg} 
            alt="Fachada Barbearia Seu Galdino" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Address */}
        <div className="text-center pt-2 pb-2">
          <p className="text-white font-bold text-base md:text-lg tracking-wide">Rua Ten. Matoso, 106</p>
          <p className="text-muted-foreground text-[11px] md:text-xs mt-1 font-medium">
            Conjunto Vida Nova • Próximo ao Mercadinho do Bairro
          </p>
        </div>
      </motion.div>
    </section>
  );
};

