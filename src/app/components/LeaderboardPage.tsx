import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Crown } from 'lucide-react';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';

interface LeaderboardPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  change: number; // positive = up, negative = down, 0 = same
  streak: number;
}

export const LeaderboardPage = ({ onNavigate, onLogout, darkMode, onToggleDarkMode }: LeaderboardPageProps) => {
  const [activeTab, setActiveTab] = useState<'global' | 'groups'>('global');
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'allTime'>('weekly');

  // Mock data
  const globalLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Carson Palmer', avatar: 'CP', score: 2847, change: 2, streak: 28 },
    { rank: 2, name: 'Stevie Daniels', avatar: 'SD', score: 2654, change: -1, streak: 21 },
    { rank: 3, name: 'Armon Palmer', avatar: 'AP', score: 2541, change: 1, streak: 19 },
    { rank: 4, name: 'Kaelyn Perkins', avatar: 'KP', score: 2398, change: 0, streak: 15 },
    { rank: 5, name: 'You', avatar: 'YO', score: 2287, change: 3, streak: 14 },
    { rank: 6, name: 'Domani Jackson', avatar: 'DJ', score: 2156, change: -2, streak: 12 },
    { rank: 7, name: 'Riley Martinez', avatar: 'RM', score: 2043, change: 1, streak: 11 },
    { rank: 8, name: 'Jordan Blake', avatar: 'JB', score: 1987, change: 0, streak: 10 },
  ];

  const groupLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'You', avatar: 'YO', score: 2287, change: 1, streak: 14 },
    { rank: 2, name: 'Carson Palmer', avatar: 'CP', score: 2154, change: -1, streak: 13 },
    { rank: 3, name: 'Stevie Daniels', avatar: 'SD', score: 2098, change: 0, streak: 12 },
    { rank: 4, name: 'Armon Palmer', avatar: 'AP', score: 1876, change: 2, streak: 9 },
  ];

  const currentLeaderboard = activeTab === 'global' ? globalLeaderboard : groupLeaderboard;

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown size={20} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={20} className="text-slate-400" />;
    if (rank === 3) return <Medal size={20} className="text-amber-600" />;
    return <span className="text-slate-600 dark:text-slate-400 font-semibold">#{rank}</span>;
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0)
      return (
        <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">+{change}</span>
        </div>
      );
    if (change < 0)
      return (
        <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
          <TrendingDown size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      );
    return (
      <div className="flex items-center space-x-1 text-slate-400">
        <Minus size={16} />
        <span className="text-sm font-medium">-</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="leaderboard"
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Trophy size={32} className="text-white" />
              </div>
            </div>
            <h1 className="mb-2">Leaderboard</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Compete, stay accountable, rise to the top
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('global')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'global'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                Global
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'groups'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                My Groups
              </button>
            </div>
          </div>

          {/* Time Period Filter */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex space-x-2">
              {(['daily', 'weekly', 'monthly', 'allTime'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    timePeriod === period
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <div className="col-span-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                Rank
              </div>
              <div className="col-span-5 sm:col-span-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                User
              </div>
              <div className="hidden sm:block col-span-2 text-sm font-medium text-slate-600 dark:text-slate-400 text-center">
                Streak
              </div>
              <div className="col-span-3 sm:col-span-2 text-sm font-medium text-slate-600 dark:text-slate-400 text-right">
                Score
              </div>
              <div className="col-span-3 sm:col-span-3 text-sm font-medium text-slate-600 dark:text-slate-400 text-right">
                Change
              </div>
            </div>

            {/* Entries */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {currentLeaderboard.map((entry) => {
                const isCurrentUser = entry.name === 'You';
                return (
                  <div
                    key={entry.rank}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 transition-colors ${
                      isCurrentUser
                        ? 'bg-indigo-50 dark:bg-indigo-950/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center">
                      {getRankBadge(entry.rank)}
                    </div>

                    {/* User */}
                    <div className="col-span-5 sm:col-span-4 flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                        isCurrentUser
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {entry.avatar}
                      </div>
                      <span className={`font-medium ${isCurrentUser ? 'font-semibold' : ''}`}>
                        {entry.name}
                      </span>
                    </div>

                    {/* Streak */}
                    <div className="hidden sm:flex col-span-2 items-center justify-center">
                      <div className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-950/30">
                        <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">
                          🔥 {entry.streak}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
                      <span className="font-semibold">{entry.score.toLocaleString()}</span>
                    </div>

                    {/* Change */}
                    <div className="col-span-3 sm:col-span-3 flex items-center justify-end">
                      {getChangeIndicator(entry.change)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-semibold mb-2">How Scoring Works</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Points are earned for completing habits, maintaining streaks, and consistency across all four categories. The leaderboard updates daily at midnight.
            </p>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};