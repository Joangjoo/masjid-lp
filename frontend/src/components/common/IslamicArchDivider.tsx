import React from 'react';

interface IslamicArchDividerProps {
  color?: string;
  className?: string;
}

export const IslamicArchDivider: React.FC<IslamicArchDividerProps> = ({
  color = '#C49B5E',
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center my-6 ${className}`}>
      <div className="h-[1px] w-12 bg-[#C49B5E]/40"></div>
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-3 text-[#C49B5E]"
      >
        <path
          d="M20 2C12 2 10 12 2 16V22H38V16C30 12 28 2 20 2Z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="20" cy="8" r="1.5" fill={color} />
      </svg>
      <div className="h-[1px] w-12 bg-[#C49B5E]/40"></div>
    </div>
  );
};
