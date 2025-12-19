import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CategorySection } from './CategorySection';
import { AddHabitModal } from './AddHabitModal';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';
type Category = 'mental' | 'physical' | 'spiritual' | 'financial';

interface Habit {
  id: string;
  name: string;
  category: Category;
  streak: number;
  completed: boolean;
}

interface HabitsDashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const HabitsDashboard = ({ onNavigate, onLogout, darkMode, onToggleDarkMode }: HabitsDashboardProps) => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Morning meditation', category: 'spiritual', streak: 7, completed: true },
    { id: '2', name: 'Read 20 pages', category: 'mental', streak: 3, completed: false },
    { id: '3', name: '30-min workout', category: 'physical', streak: 5, completed: true },
    { id: '4', name: 'Track expenses', category: 'financial', streak: 2, completed: false },
    { id: '5', name: 'Journaling', category: 'mental', streak: 4, completed: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: Category[] = ['mental', 'physical', 'spiritual', 'financial'];

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? { 
              ...habit, 
              completed: !habit.completed,
              streak: !habit.completed ? habit.streak + 1 : habit.streak 
            }
          : habit
      )
    );
  };

  const handleAddHabit = (category: Category) => {
    setSelectedCategory(category);
    setShowAddModal(true);
  };

  const handleSaveHabit = (name: string, category: Category) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      category,
      streak: 0,
      completed: false,
    };
    setHabits((prev) => [...prev, newHabit]);
    setShowAddModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="habits"
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2">Today's Habits</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Your habits are rewriting your code. Stay consistent.
            </p>
          </div>

          {/* Category Sections */}
          <div className="space-y-6">
            {categories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                habits={habits.filter((h) => h.category === category)}
                onToggleHabit={handleToggleHabit}
                onAddHabit={handleAddHabit}
                onDeleteHabit={handleDeleteHabit}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setShowAddModal(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-110 transition-transform"
      >
        <Plus size={24} />
      </button>

      <Footer onNavigate={onNavigate} />

      {/* Add Habit Modal */}
      {showAddModal && (
        <AddHabitModal
          selectedCategory={selectedCategory}
          onSave={handleSaveHabit}
          onClose={() => {
            setShowAddModal(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};
