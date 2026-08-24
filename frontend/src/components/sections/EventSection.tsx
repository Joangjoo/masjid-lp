import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { featuredEvent as fallbackEvent } from '../../data/landingData';
import { Button } from '../common/Button';
import { apiService } from '../../services/api';

interface EventSectionProps {
  onNavigateToEvent?: () => void;
}

export const EventSection: React.FC<EventSectionProps> = ({ onNavigateToEvent }) => {
  const [event, setEvent] = useState<any>(fallbackEvent);

  useEffect(() => {
    apiService.getEvents()
      .then((data) => {
        if (data && data.length > 0) {
          const feat = data.find((e: any) => e.is_featured || e.isFeatured) || data[0];
          setEvent({
            dateTag: feat.date_badge || feat.dateBadge || '15 Maret',
            title: feat.title,
            description: feat.description,
            speaker: feat.speaker || 'Ustadz Fulan, M.Ag',
            ctaText: feat.link_text || feat.linkText || 'Daftar Sekarang',
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="event" className="py-20 md:py-28 bg-[#2E4A62] text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Featured Event Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white text-[#1E1E24] rounded-2xl p-8 md:p-10 shadow-[0_20px_40px_-10px_rgba(19,41,75,0.16)] border border-white/20 relative"
          >
            <div className="inline-flex items-center gap-2 bg-[#C49B5E]/15 text-[#C49B5E] font-bold text-xs md:text-sm px-4 py-1.5 rounded-full mb-6">
              <Calendar className="w-4 h-4" />
              <span>{event.dateTag}</span>
            </div>

            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#13294B] mb-4 leading-snug">
              {event.title}
            </h3>

            <p className="text-[#7A7A7A] text-base md:text-lg mb-6 leading-relaxed">
              {event.description}
            </p>

            <div className="flex items-center gap-2 text-[#13294B] font-medium text-sm md:text-base mb-8">
              <User className="w-5 h-5 text-[#C49B5E]" />
              <span>Pembicara: <strong className="text-[#13294B]">{event.speaker}</strong></span>
            </div>

            <Button
              variant="primary"
              className="w-full sm:w-auto px-8 py-3.5"
              onClick={() => {
                const el = document.getElementById('daftar-event');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {event.ctaText}
            </Button>
          </motion.div>

          {/* Right Column: Section Header & Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-[#C49B5E] font-semibold text-sm tracking-widest uppercase mb-3">
              KEGIATAN KAMI
            </span>
            
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Mari Berkegiatan di Masjid Kami
            </h2>

            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              Masjid Baiturahim senantiasa menghadirkan berbagai agenda keagamaan, sosial, dan edukasi untuk mempererat ukhuwah islamiyah dan memakmurkan masjid bersama masyarakat.
            </p>

            <Button
              variant="secondary"
              className="px-8 py-3.5 flex items-center gap-2"
              onClick={() => {
                if (onNavigateToEvent) {
                  onNavigateToEvent();
                } else {
                  window.location.hash = '#event';
                }
              }}
            >
              <span>Lihat Semua Event</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
