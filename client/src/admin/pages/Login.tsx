import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, Loader2, Plane, ShieldCheck, Globe, Zap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password');
      }

      login(data.token, data.user);
      toast.success('Welcome back, Admin!');
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Side: Brand Content */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 text-white p-16 flex-col justify-between relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Plane size={24} className="rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight">Sky-trip</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-5xl font-extrabold leading-tight">
              Manage the Future of <span className="text-primary">Travel.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Our advanced admin dashboard gives you complete control over premium travel experiences, bookings, and customer insights.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 grid grid-cols-2 gap-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <ShieldCheck size={18} /> Secure Access
            </div>
            <p className="text-xs text-slate-500">Enterprise-grade security using JWT & Bcrypt.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Globe size={18} /> Global Cloud
            </div>
            <p className="text-xs text-slate-500">Fast content delivery with Cloudinary integration.</p>
          </div>
        </motion.div>

        <div className="relative z-10 text-xs text-slate-500 flex items-center gap-4">
          <span>© 2024 Sky-trip Admin Portal</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>v1.0.4 Stable</span>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Sign In</h2>
            <p className="text-text-secondary text-sm">Enter your administrative credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-text-primary ml-1">Password</label>
                  <Link to="/admin/forgot-password" size="sm" className="text-xs text-primary font-bold hover:underline">Forgot?</Link>
                </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors cursor-pointer p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 group mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Help Text */}
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
             <div className="p-2 bg-white rounded-lg shadow-sm">
                <Zap size={18} className="text-amber-500" />
             </div>
             <div>
                <h4 className="text-xs font-bold text-text-primary mb-1">Quick Note</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed">
                   Only authorized administrators can access this portal. If you've lost your access, please contact the system owner.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

