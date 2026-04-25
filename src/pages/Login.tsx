import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light/30 px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 premium-shadow space-y-8"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="text-3xl font-display font-black text-brand tracking-tighter inline-block">
            BONNY<span className="italic font-serif font-light">Velvet</span>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-brand tracking-tight">Welcome Back</h1>
            <p className="text-zinc-400 font-light text-sm uppercase tracking-widest">Sign in to your account</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-2xl flex items-center space-x-3 text-sm font-medium border border-red-100"
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Password</label>
              <button type="button" className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white font-bold py-6 rounded-full hover:bg-brand/90 transition-all flex items-center justify-center space-x-4 premium-shadow group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span className="uppercase tracking-[0.2em] text-[10px] font-black">Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-zinc-400 text-sm font-light">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
