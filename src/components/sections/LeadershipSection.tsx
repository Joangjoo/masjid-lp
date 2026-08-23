import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';

export const LeadershipSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeading
          title="Dibimbing oleh Para Ahli"
          subtitle="Pengurus yang berkomitmen untuk umat"
          centered={true}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full flex flex-col items-center text-center p-8 border border-gray-100">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-[#C49B5E] shadow-md">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#13294B] mb-1">
                  {member.name}
                </h3>

                <span className="text-xs font-bold tracking-wider text-[#C49B5E] uppercase mb-4">
                  {member.role}
                </span>

                <p className="text-[#7A7A7A] text-sm md:text-base leading-relaxed">
                  {member.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
