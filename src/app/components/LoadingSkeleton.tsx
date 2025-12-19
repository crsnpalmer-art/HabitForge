import { motion } from 'motion/react';

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className = '' }: LoadingSkeletonProps) => {
  return (
    <motion.div
      className={`bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export const HabitCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-5 w-3/4" />
          <LoadingSkeleton className="h-4 w-1/4" />
        </div>
        <LoadingSkeleton className="w-16 h-6 rounded-lg" />
      </div>
    </div>
  );
};

export const CategorySectionSkeleton = () => {
  return (
    <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="px-6 py-5 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LoadingSkeleton className="w-12 h-12 rounded-xl" />
            <div className="space-y-2">
              <LoadingSkeleton className="h-6 w-32" />
              <LoadingSkeleton className="h-4 w-40" />
            </div>
          </div>
          <LoadingSkeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>
      <div className="p-6 space-y-3">
        <HabitCardSkeleton />
        <HabitCardSkeleton />
      </div>
    </div>
  );
};
