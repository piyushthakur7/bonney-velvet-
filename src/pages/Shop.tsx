/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, ShoppingBag } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CONCERNS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryFilter = searchParams.get('category');
  const concernFilter = searchParams.get('concern');
  const sortBy = searchParams.get('sort') || 'featured';

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (concernFilter) {
      result = result.filter(p => p.concern.includes(concernFilter as any));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [categoryFilter, concernFilter, sortBy]);

  const toggleFilter = (type: 'category' | 'concern', value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(type) === value) {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-brand py-32 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 space-y-4 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-light"
          >
            The Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-display font-black text-white tracking-tighter leading-[0.8]"
          >
            BONNY <br />
            <span className="italic font-serif font-light text-white/80">Essentials</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col space-y-16">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-zinc-100">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mr-4">Filter By:</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleFilter('category', cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      categoryFilter === cat 
                      ? 'bg-brand text-white' 
                      : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-zinc-200 mx-2 hidden sm:block"></div>
              <div className="flex flex-wrap gap-2">
                {CONCERNS.map(con => (
                  <button
                    key={con}
                    onClick={() => toggleFilter('concern', con)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      concernFilter === con 
                      ? 'bg-brand text-white' 
                      : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                    }`}
                  >
                    {con}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set('sort', e.target.value);
                  setSearchParams(newParams);
                }}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer text-brand"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group space-y-6"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-50 premium-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute top-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center premium-shadow">
                      <ShoppingBag size={20} className="text-brand" />
                    </div>
                  </div>
                </Link>
                
                <div className="space-y-3 px-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-brand/40 uppercase tracking-[0.3em]">{product.category}</p>
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="text-2xl font-display font-bold text-brand group-hover:text-brand/70 transition-colors">{product.name}</h3>
                      </Link>
                    </div>
                    <p className="text-xl font-display font-black text-brand">₹{product.price}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.concern.slice(0, 2).map(c => (
                      <span key={c} className="text-[8px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-100 px-2 py-1 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 space-y-6">
              <p className="text-zinc-400 font-light italic font-serif text-2xl">No formulations match your selection.</p>
              <button 
                onClick={() => setSearchParams({})}
                className="text-brand font-bold uppercase tracking-widest text-[10px] border-b border-brand pb-1"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
