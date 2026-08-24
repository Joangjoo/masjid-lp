import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { weeklyEvents as fallbackEvents } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';
import { apiService } from '../../services/api';

export const WeeklyEventsGrid: React.FC = () => {
  const [events, setEvents] = useState<any[]>(fallbackEvents);

  useEffect(() => {
    apiService.getEvents()
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-24 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeading
          title="Jadwal Kegiatan Minggu Ini"
          centered={false}
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {events.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#F3F0EC] rounded-2xl overflow-hidden border border-[#13294B]/5 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              {/* Image Container with Top-Left Floating Date Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={item.image_url || item.imageUrl || 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=600&auto=format&fit=crop'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#8C6428] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow">
                  {item.date_badge || item.dateBadge || 'Event'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-[#13294B] mb-2">
                    {item.title}
                  </h3>
                  {item.time && (
                    <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] mb-6 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#7A7A7A]" />
                      <span>{item.time}</span>
                    </div>
                  )}
                </div>

                <a
                  href={item.link_href || item.linkHref || '#'}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A7A7A] hover:text-[#13294B] transition-colors group/link"
                >
                  <span>{item.link_text || item.linkText || 'Detail & Daftar'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
