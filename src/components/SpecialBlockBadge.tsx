import React from 'react';
import { SpecialBlockType } from '../types/game';
import { SPECIAL_BLOCK_CONFIG } from '../data/locations';

interface Props {
  type: SpecialBlockType;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
}

export const SpecialBlockBadge: React.FC<Props> = ({
  type,
  size = 'md',
  showDescription = false
}) => {
  const config = SPECIAL_BLOCK_CONFIG[type] || SPECIAL_BLOCK_CONFIG['Normal'];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs md:text-sm px-2.5 py-1',
    lg: 'text-sm md:text-base px-3 py-1.5 font-semibold'
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs font-medium tracking-wide ${config.bgClass} ${sizeClasses[size]}`}
      >
        <span>{config.badge}</span>
        <span>{config.name}</span>
      </span>
      {showDescription && (
        <span className="text-xs text-slate-500 italic mt-0.5 max-w-xs">{config.description}</span>
      )}
    </div>
  );
};
