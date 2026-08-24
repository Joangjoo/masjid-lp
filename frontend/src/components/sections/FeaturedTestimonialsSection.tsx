import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { featuredTestimonials as fallbackTestimonials } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';
import { IslamicArchDivider } from '../common/IslamicArchDivider';
import { apiService } from '../../services/api';

export const FeaturedTestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>(fallbackTestimonials);

  useEffect(() => {
    apiService.getTestimonials()
      .then((data) => {
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <SectionHeading
            title="Kisah yang Menginspirasi"
            centered={true}
          />
          <IslamicArchDivider className="my-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              {/* Giant Decorative Quote Icon in top-right */}
              <div className="absolute top-4 right-6 text-[#F3ECE0] font-serif text-8xl leading-none select-none pointer-events-none group-hover:text-[#EADECA] transition-colors">
                “
              </div>

              {/* Quote Body */}
              <p className="text-[#1E1E24]/85 text-base md:text-lg italic leading-relaxed mb-8 relative z-10 font-normal">
                "{item.quote}"
              </p>

              {/* Profile Meta */}
              <div className="relative z-10 pt-4 border-t border-gray-100">
                <h4 className="font-playfair text-lg font-bold text-[#13294B]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#7A7A7A] font-medium">
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
