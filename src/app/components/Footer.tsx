type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-slate-900 font-bold text-xs">HF</span>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} HabitForge. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            {onNavigate && (
              <button
                onClick={() => onNavigate('contact')}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
              >
                Contact
              </button>
            )}
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
