import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactInfoCards } from '../../data/landingData';

export const ContactInfoCardsSection: React.FC = () => {
  const getInfoIcon = (iconName: string) => {
    const iconClasses = "w-6 h-6 text-[#C49B5E] group-hover:text-white transition-colors duration-300";
    switch (iconName) {
      case 'map-pin':
        return <MapPin className={iconClasses} />;
      case 'phone':
        return <Phone className={iconClasses} />;
      case 'mail':
        return <Mail className={iconClasses} />;
      case 'clock':
        return <Clock className={iconClasses} />;
      default:
        return <MapPin className={iconClasses} />;
    }
  };

  return (
    <section className="pb-24 pt-4 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfoCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#F3F0EC]/80 rounded-2xl p-6 border border-[#13294B]/5 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#C49B5E]/15 flex items-center justify-center mb-4 group-hover:bg-[#C49B5E] group-hover:text-white transition-colors duration-300">
                {getInfoIcon(card.icon)}
              </div>

              <h4 className="text-xs font-bold text-[#13294B] uppercase tracking-wider mb-2">
                {card.title}
              </h4>

              <p className="text-sm font-semibold text-[#13294B] mb-1">
                {card.value}
              </p>

              {card.subvalue && (
                <span className="text-xs text-[#7A7A7A] font-medium">
                  {card.subvalue}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
