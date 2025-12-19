import { useState } from 'react';
import { motion } from 'motion/react';
import { GripVertical, MoreVertical, Trash2, Edit2, Flame } from 'lucide-react';
import { CategoryIcon, categoryColors } from './CategoryIcon';

type Category = 'mental' | 'physical' | 'spiritual' | 'financial';

interface HabitCardProps {
  id: string;
  name: string;
  category: Category;
  streak: number;
  completed: boolean;
  onToggle: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const HabitCard = ({
  id,
  name,
  category,
  streak,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: HabitCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const colors = categoryColors[category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border ${colors.border} p-4 transition-all duration-200 hover:shadow-lg`}
    >
      <div className="flex items-center space-x-4">
        {/* Drag Handle */}
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical size={20} />
        </button>

        {/* Checkbox */}
        <button
          onClick={() => onToggle(id)}
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 transition-all duration-200 ${
            completed
              ? `${colors.bg} ${colors.border} ring-2 ${colors.ring}`
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
          }`}
        >
          {completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={colors.text}
              />
            </motion.svg>
          )}
        </button>

        {/* Habit Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${completed ? 'line-through text-slate-400 dark:text-slate-600' : ''}`}>
            {name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <CategoryIcon category={category} size={14} className={colors.text} />
            <span className={`text-xs ${colors.text}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        </div>

        {/* Streak Badge */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg ${colors.bg}`}
          >
            <Flame size={14} className={colors.text} />
            <span className={`text-sm font-semibold ${colors.text}`}>{streak}</span>
          </motion.div>
        )}

        {/* More Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-10"
            >
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 text-red-600 dark:text-red-400"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
