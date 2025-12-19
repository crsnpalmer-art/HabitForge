import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { Input } from './Input';
import { ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onSignUp: () => void;
  onBack: () => void;
}

export const LoginPage = ({ onLogin, onSignUp, onBack }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* DNA Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dna-pattern-login" x="0" y="0" width="200" height="400" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 Q 100 100 50 200 T 50 400 M 150 0 Q 100 100 150 200 T 150 400"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#dna-pattern-login)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center">
              <span className="text-white dark:text-slate-900 font-bold text-xl">HF</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Continue building your future self
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              fullWidth
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
            />

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={onSignUp}
                className="text-slate-900 dark:text-slate-50 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
          Your habits are rewriting your code
        </p>
      </motion.div>
    </div>
  );
};
