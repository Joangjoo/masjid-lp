import React from 'react';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {subtitle && (
        <span className="text-[#C49B5E] font-semibold text-sm tracking-widest uppercase mb-2">
          {subtitle}
        </span>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl lg:text-[38px] font-bold leading-tight ${light ? 'text-white' : 'text-[#13294B]'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base md:text-lg ${light ? 'text-white/80' : 'text-[#7A7A7A]'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
