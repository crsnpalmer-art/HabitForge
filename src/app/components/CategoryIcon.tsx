import { Brain, Heart, Flame, TrendingUp } from 'lucide-react';

type Category = 'mental' | 'physical' | 'spiritual' | 'financial';

interface CategoryIconProps {
  category: Category;
  size?: number;
  className?: string;
}

export const CategoryIcon = ({ category, size = 24, className = '' }: CategoryIconProps) => {
  const icons = {
    mental: Brain,
    physical: Heart,
    spiritual: Flame,
    financial: TrendingUp,
  };
  
  const Icon = icons[category];
  
  return <Icon size={size} className={className} />;
};

export const categoryColors = {
  mental: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    ring: 'ring-indigo-500',
    hex: '#6366F1',
  },
  physical: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
    ring: 'ring-emerald-500',
    hex: '#10B981',
  },
  spiritual: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    ring: 'ring-purple-500',
    hex: '#8B5CF6',
  },
  financial: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-200 dark:border-teal-800',
    ring: 'ring-teal-500',
    hex: '#0D9488',
  },
};

export const categoryNames = {
  mental: 'Mental',
  physical: 'Physical',
  spiritual: 'Spiritual',
  financial: 'Financial',
};
