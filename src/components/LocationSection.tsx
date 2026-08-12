import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { ADDRESS } from '../data/services';

export const LocationSection: React.FC = () => {
  const handleOpenDirections = () => {
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=-5.2286549,-37.3237885&destination_place_id=Seu+Galdino+barbearia',
      '_blank'
    );
  };

  return (
    <section className="py-24 px-4 md:px-6 max-w-5xl mx-auto space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight"
      >
        Localização
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass p-6 md:p-8 rounded-3xl card-shadow space-y-6 border border-border/40"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Nosso Endereço
              </p>
              <p className="font-bold text-foreground text-base md:text-lg">{ADDRESS}</p>
            </div>
          </div>

          <button
            onClick={handleOpenDirections}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl transition-all hover:bg-primary/90 active:scale-95 text-sm cursor-pointer whitespace-nowrap shadow-md"
          >
            <Navigation className="w-4 h-4" />
            Como Chegar
          </button>
        </div>

        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-border/50 shadow-inner">
          <iframe
            title="Mapa Barbearia Seu Galdino"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.88!2d-37.3237885!3d-5.2286549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTMnNDMuMiJTIDM3wrAxOScyNS42Ilc!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </section>
  );
};

