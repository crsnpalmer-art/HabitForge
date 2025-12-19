import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  iconColor?: string;
}

export const EmptyState = ({ icon: Icon, title, description, action, iconColor = 'text-slate-400' }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={40} className={iconColor} />
      </div>
      <h3 className="font-medium mb-2 text-slate-700 dark:text-slate-300">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-500 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:scale-105 transition-transform"
        >
          <span>{action.label}</span>
        </button>
      )}
    </motion.div>
  );
};
