/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User as UserIcon, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'motion/react';


const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [scrolled, setScrolled] = React.useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { user } = useAuth();

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className={`transition-all duration-500 w-full ${
        scrolled || isOpen ? 'bg-white/95 backdrop-blur-xl py-1 premium-shadow' : 'bg-white py-2'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          
          {/* Left: Mobile Menu Toggle & Search */}
          <div className="flex items-center space-x-4 flex-1">
            <button
              className="p-2 text-zinc-900 -ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center space-x-6">
               {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-all hover:text-brand ${
                    location.pathname === link.path ? 'text-brand' : 'text-zinc-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/">
              <img src="/images/bonny-photoroom-EvQTANVJTagNJjqF.avif" alt="Bonny Velvet" className="h-24 md:h-28 w-auto" />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-1">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-900 hover:text-brand transition-colors"
            >
              <Search size={22} strokeWidth={2.5} />
            </button>
            
            {user ? (
              <Link to="/account" className="p-2 text-zinc-900 hover:text-brand transition-colors relative flex items-center">
                <Search size={20} className="opacity-0" /> {/* Spacer */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[22px] h-[22px] absolute inset-0 m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                <div className="absolute -top-1 -right-2 text-[#ff9900]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="p-2 text-zinc-900 hover:text-brand transition-colors relative flex items-center">
                <Search size={20} className="opacity-0" /> {/* Spacer */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[22px] h-[22px] absolute inset-0 m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                <div className="absolute -top-0.5 -right-1 text-[#ff9900]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
              </Link>
            )}

            <Link to="/cart" className="relative p-2 text-zinc-900 hover:text-brand transition-colors">
              <ShoppingBag size={22} strokeWidth={2.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-zinc-600 hover:text-brand hover:bg-zinc-50 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-zinc-50 mt-4 px-3">
                {user ? (
                  <Link 
                    to="/account" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-brand font-bold py-2"
                  >
                    <UserIcon size={18} />
                    <span>My Account</span>
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-zinc-500 font-bold py-2"
                  >
                    <UserIcon size={18} />
                    <span>Login / Signup</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl flex flex-col pt-32 px-4"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-3 bg-zinc-100 rounded-full text-zinc-600 hover:text-brand transition-all hover:scale-110"
            >
              <X size={24} />
            </button>

            <div className="max-w-4xl mx-auto w-full space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Search Products</span>
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search formulations..."
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-6 text-2xl md:text-5xl font-display font-medium text-brand placeholder:text-zinc-200 focus:outline-none focus:border-brand/30 transition-all uppercase tracking-tight"
                  />
                  <button 
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-brand bg-brand-light rounded-2xl hover:bg-brand hover:text-white transition-all disabled:opacity-0 disabled:translate-x-4"
                  >
                    <ArrowRight size={32} />
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Quick Links</h4>
                  <div className="flex flex-col space-y-3">
                    <Link onClick={() => setIsSearchOpen(false)} to="/shop?category=Sunscreens" className="text-sm font-bold text-zinc-600 hover:text-brand">Sunscreens</Link>
                    <Link onClick={() => setIsSearchOpen(false)} to="/shop?category=Serums" className="text-sm font-bold text-zinc-600 hover:text-brand">Serums</Link>
                    <Link onClick={() => setIsSearchOpen(false)} to="/shop?category=Moisturizers" className="text-sm font-bold text-zinc-600 hover:text-brand">Moisturizers</Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">By Concern</h4>
                  <div className="flex flex-col space-y-3">
                    <Link onClick={() => setIsSearchOpen(false)} to="/shop?concern=Acne" className="text-sm font-bold text-zinc-600 hover:text-brand">Acne & Blemishes</Link>
                    <Link onClick={() => setIsSearchOpen(false)} to="/shop?concern=Dryness" className="text-sm font-bold text-zinc-600 hover:text-brand">Dryness</Link>
                    <Link onClick={() => setIsSearchOpen(false)} to="/shop?concern=Glow" className="text-sm font-bold text-zinc-600 hover:text-brand">Glow & Radiance</Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </nav>
    </div>
  );
};

export default Navbar;
