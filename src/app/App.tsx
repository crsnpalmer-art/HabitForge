import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { HabitsDashboard } from './components/HabitsDashboard';
import { ProgressPage } from './components/ProgressPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { GroupsPage } from './components/GroupsPage';
import { SettingsPage } from './components/SettingsPage';
import { ContactPage } from './components/ContactPage';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (!hasCompletedOnboarding) {
      setCurrentPage('onboarding');
    } else {
      setCurrentPage('habits');
    }
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
    setCurrentPage('onboarding');
  };

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentPage('habits');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setCurrentPage('landing');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-neutral-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
        {currentPage === 'landing' && (
          <LandingPage
            onLogin={() => setCurrentPage('login')}
            onSignUp={() => setCurrentPage('signup')}
            onContact={() => setCurrentPage('contact')}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
        
        {currentPage === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            onSignUp={() => setCurrentPage('signup')}
            onBack={() => setCurrentPage('landing')}
          />
        )}
        
        {currentPage === 'signup' && (
          <SignUpPage
            onSignUp={handleSignUp}
            onLogin={() => setCurrentPage('login')}
            onBack={() => setCurrentPage('landing')}
          />
        )}
        
        {currentPage === 'onboarding' && (
          <OnboardingFlow
            onComplete={handleCompleteOnboarding}
            onSkip={handleCompleteOnboarding}
          />
        )}
        
        {currentPage === 'habits' && (
          <HabitsDashboard
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
        
        {currentPage === 'progress' && (
          <ProgressPage
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
        
        {currentPage === 'leaderboard' && (
          <LeaderboardPage
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
        
        {currentPage === 'groups' && (
          <GroupsPage
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
        
        {currentPage === 'settings' && (
          <SettingsPage
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}
        
        {currentPage === 'contact' && (
          <ContactPage
            onBack={() => setCurrentPage(isAuthenticated ? 'habits' : 'landing')}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}
