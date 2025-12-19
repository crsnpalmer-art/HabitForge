import { motion } from 'motion/react';
import { categoryColors } from './CategoryIcon';

interface DNAHelixProps {
  categories: {
    mental: number;
    physical: number;
    spiritual: number;
    financial: number;
  };
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const DNAHelix = ({ categories, size = 'md', animate = true }: DNAHelixProps) => {
  const dimensions = {
    sm: { width: 200, height: 300 },
    md: { width: 300, height: 400 },
    lg: { width: 400, height: 500 },
  };

  const { width, height } = dimensions[size];
  const centerX = width / 2;
  const amplitude = width / 4;
  const frequency = 0.02;
  const points = 100;

  // Generate helix paths for each category
  const generateHelixPath = (offset: number, progress: number) => {
    let path = '';
    const visiblePoints = Math.floor(points * (progress / 100));
    
    for (let i = 0; i <= visiblePoints; i++) {
      const y = (i / points) * height;
      const x = centerX + amplitude * Math.sin(frequency * i * Math.PI + offset);
      path += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
    }
    
    return path;
  };

  const helixData = [
    { category: 'mental', offset: 0, color: categoryColors.mental.hex },
    { category: 'physical', offset: Math.PI / 2, color: categoryColors.physical.hex },
    { category: 'spiritual', offset: Math.PI, color: categoryColors.spiritual.hex },
    { category: 'financial', offset: (3 * Math.PI) / 2, color: categoryColors.financial.hex },
  ];

  return (
    <div className="flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          {helixData.map((helix) => (
            <linearGradient key={helix.category} id={`gradient-${helix.category}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={helix.color} stopOpacity="0.2" />
              <stop offset="50%" stopColor={helix.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={helix.color} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>

        {helixData.map((helix) => {
          const progress = categories[helix.category as keyof typeof categories];
          const path = generateHelixPath(helix.offset, progress);

          return (
            <motion.path
              key={helix.category}
              d={path}
              fill="none"
              stroke={`url(#gradient-${helix.category})`}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: animate ? 1 : 1, 
                opacity: 1 
              }}
              transition={{ 
                pathLength: { duration: 2, ease: 'easeInOut' },
                opacity: { duration: 0.5 }
              }}
            />
          );
        })}

        {/* Connection nodes */}
        {helixData.map((helix) => {
          const progress = categories[helix.category as keyof typeof categories];
          const visiblePoints = Math.floor(points * (progress / 100));
          const nodes = [];

          for (let i = 0; i <= visiblePoints; i += 15) {
            const y = (i / points) * height;
            const x = centerX + amplitude * Math.sin(frequency * i * Math.PI + helix.offset);
            nodes.push({ x, y, i });
          }

          return nodes.map((node) => (
            <motion.circle
              key={`${helix.category}-${node.i}`}
              cx={node.x}
              cy={node.y}
              r="4"
              fill={helix.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ 
                delay: animate ? (node.i / points) * 1.5 : 0,
                duration: 0.3 
              }}
            />
          ));
        })}
      </svg>
    </div>
  );
};
