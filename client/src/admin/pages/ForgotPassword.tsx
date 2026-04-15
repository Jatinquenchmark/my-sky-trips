import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        toast.success('Reset link sent to your email');
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (err: any) {
      toast.error('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-strong border border-slate-100 text-center"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">Email Sent!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We've sent a password reset link to <span className="font-bold text-slate-700">{email}</span>. Please check your inbox and spam folder.
          </p>
          <Link 
            to="/admin/login" 
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-strong border border-slate-100"
      >
        <Link 
          to="/admin/login" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back
        </Link>
        
        <div className="mb-10">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Forgot Password?</h2>
          <p className="text-slate-500 text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skytrip.com"
                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-primary text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
