import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, MessageCircle, ArrowRight } from 'lucide-react';
import { serviceItems } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const iconClasses = "w-8 h-8 text-[#C49B5E] group-hover:text-white transition-colors duration-300";
    switch (iconName) {
      case 'clock':
        return <Clock className={iconClasses} />;
      case 'book':
        return <BookOpen className={iconClasses} />;
      case 'chat':
        return <MessageCircle className={iconClasses} />;
      default:
        return <Clock className={iconClasses} />;
    }
  };

  return (
    <section id="layanan" className="py-20 md:py-28 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeading
          subtitle="LAYANAN KAMI"
          title="Fasilitas Terbaik untuk Jamaah"
          description="Memberikan kemudahan dan ketenangan bagi seluruh jamaah dalam beribadah dan menuntut ilmu keagamaan."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full flex flex-col justify-between group cursor-pointer hover:border-[#C49B5E]/30">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#C49B5E]/10 flex items-center justify-center mb-6 group-hover:bg-[#C49B5E] group-hover:text-white transition-colors duration-300">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#13294B] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#7A7A7A] text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <a
                  href={service.linkHref}
                  className="inline-flex items-center gap-2 font-semibold text-[#C49B5E] hover:text-[#b2894d] transition-colors duration-200 text-sm md:text-base group/link"
                >
                  <span>{service.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-200" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
