import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { DNAHelix } from './DNAHelix';
import { ProgressRing } from './ProgressRing';
import { CategoryIcon, categoryColors, categoryNames } from './CategoryIcon';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';
type Category = 'mental' | 'physical' | 'spiritual' | 'financial';

interface ProgressPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ProgressPage = ({ onNavigate, onLogout, darkMode, onToggleDarkMode }: ProgressPageProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'weekly' | 'monthly'>('overview');

  // Mock data
  const categoryProgress = {
    mental: 75,
    physical: 60,
    spiritual: 85,
    financial: 50,
  };

  const weeklyData = [
    { day: 'Mon', mental: 80, physical: 60, spiritual: 90, financial: 40 },
    { day: 'Tue', mental: 70, physical: 70, spiritual: 80, financial: 50 },
    { day: 'Wed', mental: 85, physical: 55, spiritual: 85, financial: 45 },
    { day: 'Thu', mental: 75, physical: 65, spiritual: 90, financial: 55 },
    { day: 'Fri', mental: 80, physical: 70, spiritual: 85, financial: 60 },
    { day: 'Sat', mental: 90, physical: 80, spiritual: 95, financial: 70 },
    { day: 'Sun', mental: 85, physical: 75, spiritual: 90, financial: 65 },
  ];

  const monthlyData = [
    { week: 'Week 1', mental: 70, physical: 60, spiritual: 75, financial: 45 },
    { week: 'Week 2', mental: 75, physical: 65, spiritual: 80, financial: 50 },
    { week: 'Week 3', mental: 80, physical: 70, spiritual: 85, financial: 55 },
    { week: 'Week 4', mental: 75, physical: 60, spiritual: 85, financial: 50 },
  ];

  const stats = [
    { icon: TrendingUp, label: 'Current Streak', value: '7 days', color: 'text-indigo-600 dark:text-indigo-400' },
    { icon: Calendar, label: 'Total Days', value: '42 days', color: 'text-emerald-600 dark:text-emerald-400' },
    { icon: Award, label: 'Longest Streak', value: '14 days', color: 'text-purple-600 dark:text-purple-400' },
    { icon: Target, label: 'Completion Rate', value: '68%', color: 'text-teal-600 dark:text-teal-400' },
  ];

  const categories: Category[] = ['mental', 'physical', 'spiritual', 'financial'];

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'daily' as const, label: 'Daily' },
    { id: 'weekly' as const, label: 'Weekly' },
    { id: 'monthly' as const, label: 'Monthly' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="progress"
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2">Your Progress</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Visualize your growth across all dimensions
            </p>
          </div>

          {/* DNA Helix Hero */}
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 overflow-hidden">
            <div className="text-center mb-6">
              <h2 className="mb-2">Your DNA Helix</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Each strand represents your consistency in a core dimension
              </p>
            </div>
            <DNAHelix categories={categoryProgress} size="lg" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
              >
                <stat.icon size={24} className={`${stat.color} mb-3`} />
                <p className="text-2xl font-semibold mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Category Progress Rings */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
                <h3 className="mb-6">Category Completion</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {categories.map((category) => {
                    const colors = categoryColors[category];
                    const progress = categoryProgress[category];
                    return (
                      <div key={category} className="text-center">
                        <ProgressRing
                          progress={progress}
                          size={140}
                          strokeWidth={10}
                          color={colors.hex}
                        />
                        <div className="mt-4">
                          <div className="flex items-center justify-center space-x-2 mb-1">
                            <CategoryIcon category={category} size={16} className={colors.text} />
                            <h4 className={`font-semibold ${colors.text}`}>{categoryNames[category]}</h4>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {progress}% complete
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Insights */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl border border-indigo-200 dark:border-indigo-800 p-6">
                  <h4 className="font-semibold mb-2 text-indigo-900 dark:text-indigo-300">
                    Strongest Strand
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your <span className="font-semibold">Spiritual</span> habits are thriving at 85% completion. Keep it up!
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-3xl border border-emerald-200 dark:border-emerald-800 p-6">
                  <h4 className="font-semibold mb-2 text-emerald-900 dark:text-emerald-300">
                    Growth Opportunity
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Focus on your <span className="font-semibold">Financial</span> habits to strengthen this strand.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'weekly' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <h3 className="mb-6">Weekly Progress</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-800" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="mental" stroke={categoryColors.mental.hex} strokeWidth={2} />
                  <Line type="monotone" dataKey="physical" stroke={categoryColors.physical.hex} strokeWidth={2} />
                  <Line type="monotone" dataKey="spiritual" stroke={categoryColors.spiritual.hex} strokeWidth={2} />
                  <Line type="monotone" dataKey="financial" stroke={categoryColors.financial.hex} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'monthly' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <h3 className="mb-6">Monthly Progress</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-800" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="mental" stackId="1" stroke={categoryColors.mental.hex} fill={categoryColors.mental.hex} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="physical" stackId="1" stroke={categoryColors.physical.hex} fill={categoryColors.physical.hex} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="spiritual" stackId="1" stroke={categoryColors.spiritual.hex} fill={categoryColors.spiritual.hex} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="financial" stackId="1" stroke={categoryColors.financial.hex} fill={categoryColors.financial.hex} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'daily' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <h3 className="mb-6">Today's Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {categories.map((category) => {
                  const colors = categoryColors[category];
                  const progress = categoryProgress[category];
                  return (
                    <div key={category} className={`p-6 rounded-2xl border ${colors.border} ${colors.bg}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <CategoryIcon category={category} size={24} className={colors.text} />
                          <h4 className={`font-semibold ${colors.text}`}>{categoryNames[category]}</h4>
                        </div>
                        <span className={`text-2xl font-bold ${colors.text}`}>{progress}%</span>
                      </div>
                      <div className="h-3 bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.bg} border ${colors.border} transition-all duration-500`}
                          style={{ width: `${progress}%`, backgroundColor: colors.hex }}
                        />
                      </div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        3 of 4 habits completed
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
