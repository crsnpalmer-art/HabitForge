import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus } from 'lucide-react';
import { CategoryIcon, categoryColors, categoryNames } from './CategoryIcon';
import { ProgressRing } from './ProgressRing';
import { HabitCard } from './HabitCard';

type Category = 'mental' | 'physical' | 'spiritual' | 'financial';

interface Habit {
  id: string;
  name: string;
  category: Category;
  streak: number;
  completed: boolean;
}

interface CategorySectionProps {
  category: Category;
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onAddHabit: (category: Category) => void;
  onEditHabit?: (id: string) => void;
  onDeleteHabit?: (id: string) => void;
}

export const CategorySection = ({
  category,
  habits,
  onToggleHabit,
  onAddHabit,
  onEditHabit,
  onDeleteHabit,
}: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const colors = categoryColors[category];
  
  const completedCount = habits.filter((h) => h.completed).length;
  const totalCount = habits.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border-2 ${colors.border} bg-white dark:bg-slate-900 overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-6 py-5 flex items-center justify-between ${colors.bg} hover:opacity-80 transition-opacity`}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}>
            <CategoryIcon category={category} size={24} className={colors.text} />
          </div>
          <div className="text-left">
            <h2 className={`text-xl font-semibold ${colors.text}`}>
              {categoryNames[category]}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedCount} of {totalCount} completed today
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ProgressRing
            progress={progress}
            size={60}
            strokeWidth={6}
            color={colors.hex}
            showPercentage={false}
          >
            <span className={`text-xs font-semibold ${colors.text}`}>
              {completedCount}/{totalCount}
            </span>
          </ProgressRing>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={24} className={colors.text} />
          </motion.div>
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-3">
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-4`}>
                    <CategoryIcon category={category} size={32} className={colors.text} />
                  </div>
                  <h3 className="font-medium mb-2 text-slate-700 dark:text-slate-300">
                    No habits yet
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                    Add your first {category} habit to start building
                  </p>
                  <button
                    onClick={() => onAddHabit(category)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity`}
                  >
                    <Plus size={18} />
                    <span>Add Habit</span>
                  </button>
                </div>
              ) : (
                <>
                  {habits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      {...habit}
                      onToggle={onToggleHabit}
                      onEdit={onEditHabit}
                      onDelete={onDeleteHabit}
                    />
                  ))}
                  <button
                    onClick={() => onAddHabit(category)}
                    className={`w-full py-4 rounded-2xl border-2 border-dashed ${colors.border} ${colors.text} hover:${colors.bg} transition-all duration-200 flex items-center justify-center space-x-2`}
                  >
                    <Plus size={20} />
                    <span className="font-medium">Add Habit</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
