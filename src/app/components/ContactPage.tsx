import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { Input } from './Input';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
  darkMode: boolean;
}

export const ContactPage = ({ onBack, darkMode }: ContactPageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* DNA Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dna-pattern-contact" x="0" y="0" width="200" height="400" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 Q 100 100 50 200 T 50 400 M 150 0 Q 100 100 150 200 T 150 400"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#dna-pattern-contact)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
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
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="mb-3">Message Sent!</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center">
                    <Mail size={32} className="text-white dark:text-slate-900" />
                  </div>
                </div>
                <h1 className="mb-2">Get in Touch</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  label="Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={errors.name}
                  fullWidth
                />

                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={errors.email}
                  fullWidth
                />

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            </>
          )}
        </div>

        {!submitted && (
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
            We typically respond within 24 hours
          </p>
        )}
      </motion.div>
    </div>
  );
};
