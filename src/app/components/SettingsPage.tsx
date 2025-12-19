import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Input } from './Input';
import { User, Bell, Palette, Users, Database, LogOut, ChevronRight } from 'lucide-react';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';

interface SettingsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsPage = ({ onNavigate, onLogout, darkMode, onToggleDarkMode }: SettingsPageProps) => {
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex@example.com');
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    groupUpdates: false,
    streakAlerts: true,
  });

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        {
          label: 'Name',
          value: name,
          type: 'input' as const,
          onChange: setName,
        },
        {
          label: 'Email',
          value: email,
          type: 'input' as const,
          onChange: setEmail,
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        {
          label: 'Dark Mode',
          value: darkMode,
          type: 'toggle' as const,
          onChange: onToggleDarkMode,
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Daily Reminder',
          description: 'Get reminded to complete your habits',
          value: notifications.dailyReminder,
          type: 'toggle' as const,
          onChange: (value: boolean) =>
            setNotifications((prev) => ({ ...prev, dailyReminder: value })),
        },
        {
          label: 'Weekly Report',
          description: 'Receive your weekly progress summary',
          value: notifications.weeklyReport,
          type: 'toggle' as const,
          onChange: (value: boolean) =>
            setNotifications((prev) => ({ ...prev, weeklyReport: value })),
        },
        {
          label: 'Group Updates',
          description: 'Notifications from your groups',
          value: notifications.groupUpdates,
          type: 'toggle' as const,
          onChange: (value: boolean) =>
            setNotifications((prev) => ({ ...prev, groupUpdates: value })),
        },
        {
          label: 'Streak Alerts',
          description: 'Get notified when streaks are at risk',
          value: notifications.streakAlerts,
          type: 'toggle' as const,
          onChange: (value: boolean) =>
            setNotifications((prev) => ({ ...prev, streakAlerts: value })),
        },
      ],
    },
    {
      title: 'Groups',
      icon: Users,
      items: [
        {
          label: 'Manage Groups',
          type: 'action' as const,
          onClick: () => onNavigate('groups'),
        },
      ],
    },
    {
      title: 'Data',
      icon: Database,
      items: [
        {
          label: 'Export Data',
          type: 'action' as const,
          onClick: () => alert('Export feature coming soon'),
        },
        {
          label: 'Delete Account',
          type: 'action' as const,
          onClick: () => alert('Are you sure? This action cannot be undone.'),
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="settings"
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2">Settings</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Manage your account and preferences
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingsSections.map((section) => (
              <div
                key={section.title}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <section.icon size={20} className="text-slate-600 dark:text-slate-400" />
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {section.items.map((item, index) => (
                    <div key={index} className="px-6 py-4">
                      {item.type === 'input' && (
                        <Input
                          label={item.label}
                          value={item.value as string}
                          onChange={(e) => (item.onChange as (value: string) => void)(e.target.value)}
                          fullWidth
                        />
                      )}

                      {item.type === 'toggle' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.label}</p>
                            {item.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              (item.onChange as (value: boolean) => void)(!(item.value as boolean))
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value
                                ? 'bg-slate-900 dark:bg-white'
                                : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-900 transition-transform ${
                                item.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      )}

                      {item.type === 'action' && (
                        <button
                          onClick={item.onClick}
                          className={`w-full flex items-center justify-between py-2 hover:opacity-70 transition-opacity ${
                            item.danger ? 'text-red-600 dark:text-red-400' : ''
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Sign Out Button */}
            <div className="pt-4">
              <Button
                variant="danger"
                fullWidth
                onClick={onLogout}
                className="flex items-center justify-center space-x-2"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
