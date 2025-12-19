import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { Input } from './Input';
import { CategoryIcon, categoryColors, categoryNames } from './CategoryIcon';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingFlow = ({ onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [habitName, setHabitName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'mental' | 'physical' | 'spiritual' | 'financial'>('mental');
  const [groupCode, setGroupCode] = useState('');

  const categories = ['mental', 'physical', 'spiritual', 'financial'] as const;
  
  const steps = [
    {
      title: 'Welcome to HabitForge',
      description: 'Your journey to becoming your best self starts here. Let\'s get you set up.',
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-500 rounded-3xl flex items-center justify-center">
            <span className="text-white font-bold text-5xl">HF</span>
          </div>
        </motion.div>
      ),
    },
    {
      title: 'Four Foundational Strands',
      description: 'Every habit you build falls into one of these categories, forming the DNA of your future self.',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const colors = categoryColors[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border ${colors.border} ${colors.bg}`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-3`}>
                  <CategoryIcon category={category} size={24} className={colors.text} />
                </div>
                <h3 className={`text-lg font-semibold mb-1 ${colors.text}`}>
                  {categoryNames[category]}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {category === 'mental' && 'Mind & focus'}
                  {category === 'physical' && 'Body & health'}
                  {category === 'spiritual' && 'Soul & purpose'}
                  {category === 'financial' && 'Wealth & growth'}
                </p>
              </motion.div>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Add Your First Habit',
      description: 'What\'s one habit you want to build? Start with something meaningful.',
      content: (
        <div className="space-y-6">
          <Input
            type="text"
            label="Habit Name"
            placeholder="e.g., Morning meditation, 30-min workout, Read 20 pages..."
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            fullWidth
          />
          
          <div>
            <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const colors = categoryColors[category];
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? `${colors.border} ${colors.bg} ring-2 ${colors.ring}`
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CategoryIcon category={category} size={20} className={isSelected ? colors.text : 'text-slate-400'} />
                      <span className={`font-medium ${isSelected ? colors.text : 'text-slate-600 dark:text-slate-400'}`}>
                        {categoryNames[category]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Join a Group (Optional)',
      description: 'Connect with friends or teammates to stay accountable and compete on the leaderboard.',
      content: (
        <div className="space-y-6">
          <Input
            type="text"
            label="Group Code"
            placeholder="Enter group code (optional)"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            fullWidth
          />
          <p className="text-sm text-slate-500 dark:text-slate-500">
            You can always join or create groups later from your dashboard.
          </p>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (isFirstStep) {
      onSkip();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* DNA Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dna-pattern-onboarding" x="0" y="0" width="200" height="400" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 Q 100 100 50 200 T 50 400 M 150 0 Q 100 100 150 200 T 150 400"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#dna-pattern-onboarding)" />
        </svg>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={onSkip}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              Skip
            </button>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-900 dark:bg-white"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-3">{currentStepData.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                {currentStepData.description}
              </p>
              
              <div className="mb-10">{currentStepData.content}</div>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="flex items-center"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  {isFirstStep ? 'Skip' : 'Back'}
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleNext}
                  className="flex items-center"
                >
                  {isLastStep ? 'Get Started' : 'Continue'}
                  <ChevronRight size={20} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
