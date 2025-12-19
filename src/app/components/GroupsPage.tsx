import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Input } from './Input';
import { Users, Plus, Search, Copy, Check } from 'lucide-react';
import { DNAHelix } from './DNAHelix';

type Page = 'landing' | 'login' | 'signup' | 'onboarding' | 'habits' | 'progress' | 'leaderboard' | 'groups' | 'settings' | 'contact';

interface GroupsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

interface Group {
  id: string;
  name: string;
  description: string;
  code: string;
  memberCount: number;
  avgProgress: {
    mental: number;
    physical: number;
    spiritual: number;
    financial: number;
  };
}

export const GroupsPage = ({ onNavigate, onLogout, darkMode, onToggleDarkMode }: GroupsPageProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock data
  const myGroups: Group[] = [
    {
      id: '1',
      name: 'Morning Warriors',
      description: 'Early risers committed to crushing their AM routines',
      code: 'MW2024',
      memberCount: 12,
      avgProgress: { mental: 78, physical: 82, spiritual: 75, financial: 68 },
    },
    {
      id: '2',
      name: 'Tech Founders Circle',
      description: 'Building companies and ourselves simultaneously',
      code: 'TFC789',
      memberCount: 8,
      avgProgress: { mental: 85, physical: 65, spiritual: 70, financial: 90 },
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="groups"
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2">Groups</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Stay accountable with friends, teammates, or fellow builders
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="primary"
              className="flex items-center justify-center space-x-2"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              <span>Create Group</span>
            </Button>
            <Button
              variant="secondary"
              className="flex items-center justify-center space-x-2"
              onClick={() => setShowJoinModal(true)}
            >
              <Search size={20} />
              <span>Join Group</span>
            </Button>
          </div>

          {/* My Groups */}
          {myGroups.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-slate-400" />
              </div>
              <h3 className="mb-2">No Groups Yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Create or join a group to compete on leaderboards and stay accountable with others.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  Create Group
                </Button>
                <Button variant="secondary" onClick={() => setShowJoinModal(true)}>
                  Join Group
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {myGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                      {/* Group Info */}
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="mb-1">{group.name}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{group.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 mb-4">
                          <div className="flex items-center space-x-2">
                            <Users size={16} className="text-slate-400" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {group.memberCount} members
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center space-x-2">
                              <code className="text-sm font-mono font-semibold">{group.code}</code>
                              <button
                                onClick={() => handleCopyCode(group.code)}
                                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              >
                                {copiedCode === group.code ? (
                                  <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedGroup(group)}
                        >
                          View Details
                        </Button>
                      </div>

                      {/* DNA Helix Preview */}
                      <div className="flex-shrink-0">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 text-center">
                          Group DNA
                        </p>
                        <DNAHelix categories={group.avgProgress} size="sm" animate={false} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8">
            <h2 className="mb-6">Create Group</h2>
            <form className="space-y-6">
              <Input label="Group Name" placeholder="e.g., Morning Warriors" fullWidth />
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                  placeholder="What's this group about?"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)} fullWidth>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCreateModal(false);
                  }}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowJoinModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8">
            <h2 className="mb-6">Join Group</h2>
            <form className="space-y-6">
              <Input label="Group Code" placeholder="Enter group code" fullWidth />
              <div className="flex space-x-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowJoinModal(false)} fullWidth>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    setShowJoinModal(false);
                  }}
                >
                  Join
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
