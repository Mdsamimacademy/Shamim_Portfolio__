import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Mail, Lock, UserPlus, LogIn, X, AlertTriangle, HelpCircle } from 'lucide-react';
import { getAdminUser, registerAdminUser, hashPassword } from '../lib/db';
import { AdminUser } from '../types';

interface AdminLoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onClose, onLoginSuccess }: AdminLoginProps) {
  const [isAdminRegistered, setIsAdminRegistered] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if an admin exists
    getAdminUser()
      .then(user => {
        setIsAdminRegistered(!!user);
      })
      .catch(e => {
        console.error(e);
        setIsAdminRegistered(false); // fallback to allowing registration if db fails/doesn't exist
      });
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please key in your credentials!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const hashedPassword = await hashPassword(password);

      if (!isAdminRegistered) {
        // Handle Registration
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          setLoading(false);
          return;
        }

        const newAdmin: AdminUser = {
          email,
          passwordHash: hashedPassword,
          registeredAt: new Date().toISOString()
        };

        await registerAdminUser(newAdmin);
        localStorage.setItem("samim_portfolio_admin_session", email);
        onLoginSuccess();
      } else {
        // Handle Login
        const storedAdmin = await getAdminUser();
        if (storedAdmin && storedAdmin.email.toLowerCase() === email.toLowerCase() && storedAdmin.passwordHash === hashedPassword) {
          localStorage.setItem("samim_portfolio_admin_session", email);
          onLoginSuccess();
        } else {
          setError("Invalid email address or passcode!");
        }
      }

    } catch (e) {
      console.error(e);
      setError("Verification failed. Please review database connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="admin-auth-panel"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-950 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          id="close-admin-auth"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Shield Indicator logo */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="text-lg font-display font-black text-white uppercase tracking-tight">
            {isAdminRegistered === null ? (
              "Checking Credentials Status..."
            ) : !isAdminRegistered ? (
              "First-Time Admin Registration"
            ) : (
              "Admin Portal Authentication"
            )}
          </h4>
          <p className="text-slate-400 text-2xs sm:text-xs">
            {isAdminRegistered === false ? (
              "No administrator recorded. Please setup credentials to proceed."
            ) : (
              "Restricted dashboard. Please sign in to modify portfolio contents."
            )}
          </p>
        </div>

        {isAdminRegistered !== null && (
          <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
            
            {/* Email field */}
            <div className="space-y-1">
              <label htmlFor="auth-email" className="text-3xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Admin Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="auth-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-white"
                />
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label htmlFor="auth-password" className="text-3xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Admin Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="auth-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-white"
                />
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password Confirmation (Registration only) */}
            {!isAdminRegistered && (
              <div className="space-y-1">
                <label htmlFor="auth-confirm" className="text-3xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    id="auth-confirm"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-white/5 hover:border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-white"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>
            )}

            {/* Error notifications */}
            {error && (
              <div className="flex gap-2 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-2xs font-semibold rounded-xl leading-relaxed">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Trigger Actions */}
            <div className="pt-2">
              <button
                type="submit"
                id="auth-submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white hover:bg-slate-200 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  "Authorizing..."
                ) : !isAdminRegistered ? (
                  <>
                    <UserPlus className="w-4 h-4 text-cyan-500" />
                    Register Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 text-indigo-500" />
                    Secure Access
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </motion.div>
    </div>
  );
}
