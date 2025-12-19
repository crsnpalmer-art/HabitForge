import { motion } from 'motion/react';
import { Button } from './Button';
import { Footer } from './Footer';
import { CategoryIcon, categoryColors, categoryNames } from './CategoryIcon';
import { Moon, Sun, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
  onContact: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const LandingPage = ({ onLogin, onSignUp, onContact, darkMode, onToggleDarkMode }: LandingPageProps) => {
  const categories = ['mental', 'physical', 'spiritual', 'financial'] as const;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-slate-900 font-bold text-sm">HF</span>
              </div>
              <span className="font-semibold text-lg">HabitForge</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Button variant="ghost" onClick={onLogin}>
                Log In
              </Button>
              <Button variant="primary" onClick={onSignUp}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-16">
        <section className="relative overflow-hidden">
          {/* DNA Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="dna-pattern" x="0" y="0" width="200" height="400" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 Q 100 100 50 200 T 50 400 M 150 0 Q 100 100 150 200 T 150 400"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="1000" height="1000" fill="url(#dna-pattern)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.h1
                className="mb-6 text-slate-900 dark:text-slate-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Habits Forge Who You Become
              </motion.h1>
              
              <motion.p
                className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Build the DNA of your future self, one habit at a time.
              </motion.p>

              <motion.p
                className="text-lg text-slate-500 dark:text-slate-500 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Track daily habits across Mental, Physical, Spiritual, and Financial dimensions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="primary" size="lg" onClick={onSignUp} className="group">
                  Start Building Today
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform inline" />
                </Button>
                <Button variant="secondary" size="lg" onClick={onLogin}>
                  Log In
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="mb-4 text-slate-900 dark:text-slate-50">
                Four Foundational Strands
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Every great transformation is built on these pillars. Track your progress across all dimensions of growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const colors = categoryColors[category];
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4 }}
                    className={`p-8 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                      <CategoryIcon category={category} size={24} className={colors.text} />
                    </div>
                    <h3 className={`mb-2 ${colors.text}`}>{categoryNames[category]}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {category === 'mental' && 'Sharpen your mind, expand your knowledge, cultivate focus.'}
                      {category === 'physical' && 'Strengthen your body, boost energy, build resilience.'}
                      {category === 'spiritual' && 'Nurture inner peace, find purpose, connect deeper.'}
                      {category === 'financial' && 'Build wealth, master money, secure your future.'}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-slate-900 dark:text-slate-50">
                Your habits are rewriting your code
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                Join thousands building their future self, one consistent action at a time.
              </p>
              <Button variant="primary" size="lg" onClick={onSignUp} className="group">
                Start Your Journey
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform inline" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer onNavigate={(page) => page === 'contact' && onContact()} />
    </div>
  );
};
