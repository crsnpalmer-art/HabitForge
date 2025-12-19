import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { CategoryIcon, categoryColors, categoryNames } from './CategoryIcon';

type Category = 'mental' | 'physical' | 'spiritual' | 'financial';

interface AddHabitModalProps {
  selectedCategory: Category | null;
  onSave: (name: string, category: Category) => void;
  onClose: () => void;
}

export const AddHabitModal = ({ selectedCategory, onSave, onClose }: AddHabitModalProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>(selectedCategory || 'mental');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const categories: Category[] = ['mental', 'physical', 'spiritual', 'financial'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    onSave(name.trim(), category);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="mb-6">Add New Habit</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Habit Name"
              placeholder="e.g., Morning meditation, 30-min workout..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              error={error}
              fullWidth
              autoFocus
            />

            <div>
              <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const colors = categoryColors[cat];
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? `${colors.border} ${colors.bg} ring-2 ${colors.ring}`
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <CategoryIcon
                          category={cat}
                          size={20}
                          className={isSelected ? colors.text : 'text-slate-400'}
                        />
                        <span
                          className={`font-medium ${
                            isSelected ? colors.text : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {categoryNames[cat]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="secondary" onClick={onClose} fullWidth>
                Cancel
              </Button>
              <Button type="submit" variant="primary" fullWidth>
                Add Habit
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
