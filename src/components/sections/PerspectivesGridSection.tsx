import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { perspectiveTestimonials } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';
import { IslamicArchDivider } from '../common/IslamicArchDivider';

export const PerspectivesGridSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#09182F] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-25 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-14">
          <SectionHeading
            title="Dari Berbagai Sudut Pandang"
            light={true}
            centered={true}
          />
          <IslamicArchDivider color="#C49B5E" className="my-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perspectiveTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-[#13294B]/70 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#C49B5E]/50 hover:bg-[#13294B] transition-all duration-300 group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#C49B5E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C49B5E]" />
                  ))}
                </div>

                {/* Short Quote */}
                <p className="text-white/85 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-playfair text-base font-bold text-white mb-0.5">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#C49B5E] font-medium">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
