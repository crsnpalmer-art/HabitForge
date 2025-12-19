import { useState } from 'react';
import { Menu, X, Moon, Sun, User, LogOut, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
  currentPage?: Page;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  isAuthenticated?: boolean;
}

export const Header = ({ 
  onNavigate, 
  onLogout, 
  currentPage = 'habits',
  darkMode = false,
  onToggleDarkMode,
  isAuthenticated = true,
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: 'Habits', page: 'habits' as Page },
    { label: 'Progress', page: 'progress' as Page },
    { label: 'Leaderboard', page: 'leaderboard' as Page },
    { label: 'Groups', page: 'groups' as Page },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('habits')}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-slate-900 font-bold text-sm">HF</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">HabitForge</span>
          </button>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${currentPage === item.page 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* User Menu - Desktop */}
            {isAuthenticated && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          onNavigate('settings');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2"
                      >
                        <User size={16} />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout?.();
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 text-red-600 dark:text-red-400"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium text-left transition-all duration-200
                    ${currentPage === item.page 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2">
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg font-medium text-left text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    onLogout?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg font-medium text-left text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
