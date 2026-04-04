import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user }, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
    } else if (user) {
      // Create profile in DB
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, full_name: fullName, email }]);
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
      
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light/30 px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-10 md:p-16 premium-shadow space-y-8"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="text-3xl font-display font-black text-brand tracking-tighter inline-block">
            BONNY<span className="italic font-serif font-light">Velvet</span>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-brand tracking-tight">Create Account</h1>
            <p className="text-zinc-400 font-light text-sm uppercase tracking-widest">Start your glow journey</p>
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

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                placeholder="Enter your password"
              />
            </div>
            <p className="text-[9px] text-zinc-400 px-1">Must be at least 6 characters.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white font-bold py-6 rounded-full hover:bg-brand/90 transition-all flex items-center justify-center space-x-4 premium-shadow group disabled:opacity-50 mt-6"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span className="uppercase tracking-[0.2em] text-[10px] font-black">Begin Journey</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-zinc-400 text-sm font-light">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
