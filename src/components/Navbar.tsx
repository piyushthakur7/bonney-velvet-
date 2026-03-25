/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl py-4 premium-shadow' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Desktop Links Left */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-brand ${
                  location.pathname === link.path ? 'text-brand' : 'text-zinc-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <Link to="/" className="text-3xl font-display font-black text-brand tracking-tighter">
              BONNY<span className="italic font-serif font-light">Velvet</span>
            </Link>
          </div>

          {/* Desktop Links Right */}
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-brand ${
                    location.pathname === link.path ? 'text-brand' : 'text-zinc-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-zinc-400 hover:text-brand transition-colors">
                <Search size={18} />
              </button>
              <Link to="/cart" className="relative p-2 text-zinc-400 hover:text-brand transition-colors">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden p-2 text-zinc-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
