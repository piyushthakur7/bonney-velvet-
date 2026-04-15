/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, Search, X } from 'lucide-react';
import { useData } from '../DataContext';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Shop = () => {
  const { products, categories, loading, error } = useData();
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const CONCERNS = ['Acne', 'Dryness', 'Glow', 'Repair', 'Anti-Aging'];


  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryFilter = searchParams.get('category');
  const concernFilter = searchParams.get('concern');

  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (concernFilter) {
      result = result.filter(p => p.concern?.includes(concernFilter as any));
    }



    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const nameMatch = p.name?.toLowerCase().includes(query);
        const descMatch = p.description?.toLowerCase().includes(query);
        const catMatch = p.category?.toLowerCase().includes(query);
        const concernMatch = p.concern?.some(c => c.toLowerCase().includes(query));
        return nameMatch || descMatch || catMatch || concernMatch;
      });
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [categoryFilter, concernFilter, searchQuery, sortBy, products]);

  const toggleFilter = (type: 'category' | 'concern', value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(type) === value) {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    setSearchParams(newParams);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0].value : undefined;
    addToCart(product, defaultVariant);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="pb-24">
      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center bg-brand-light">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <>
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
              <div className="flex flex-col space-y-8 py-8 border-y border-zinc-100">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] shrink-0">By Category:</span>
                    <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                      {categories.length > 0 ? (
                        categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => toggleFilter('category', cat)}
                            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                              categoryFilter === cat 
                              ? 'bg-brand text-white' 
                              : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                            }`}
                          >
                            {cat}
                          </button>
                        ))
                      ) : (
                        <span className="text-[10px] font-bold text-zinc-300 italic uppercase tracking-widest">No Category found</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] shrink-0">By Concern:</span>
                    <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                      {CONCERNS.map(con => (
                        <button
                          key={con}
                          onClick={() => toggleFilter('concern', con)}
                          className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
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
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-zinc-50 sm:border-t-0 sm:pt-0">
                  <div className="relative flex-1 w-full lg:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search formulations..."
                      value={searchQuery}
                      onChange={(e) => {
                        const newParams = new URLSearchParams(searchParams);
                        if (e.target.value) {
                          newParams.set('q', e.target.value);
                        } else {
                          newParams.delete('q');
                        }
                        setSearchParams(newParams);
                      }}
                      className="w-full pl-12 pr-10 py-3 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand/10 transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          const newParams = new URLSearchParams(searchParams);
                          newParams.delete('q');
                          setSearchParams(newParams);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <div className="h-8 w-px bg-zinc-100 mx-2 hidden lg:block"></div>
                  <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Sort By:</span>
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
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-16">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group flex flex-col h-full space-y-5"
                  >
                    <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-50 premium-shadow">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <button 
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="absolute top-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center premium-shadow transition-colors ${
                          addedId === product.id ? 'bg-green-600 text-white' : 'bg-white text-brand'
                        }`}>
                          <AnimatePresence mode="wait">
                            {addedId === product.id ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                              >
                                <Check size={20} />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="cart"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                              >
                                <ShoppingBag size={20} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    </Link>
                    
                    <div className="flex flex-col flex-1 space-y-4 px-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1 flex-1">
                          <p className="text-[8px] sm:text-[10px] font-black text-brand/40 uppercase tracking-[0.3em]">{product.category}</p>
                          <Link to={`/product/${product.id}`} className="block">
                            <h3 className="text-sm sm:text-xl font-display font-bold text-brand group-hover:text-brand/70 transition-colors line-clamp-2 min-h-[3rem]">{product.name}</h3>
                          </Link>
                        </div>
                        <p className="text-sm sm:text-lg font-display font-black text-brand shrink-0">₹{product.price}</p>
                      </div>
                      

                        
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto gap-4">
                        <div className="flex flex-wrap gap-2">
                          {product.concern?.slice(0, 1).map(c => (
                            <span key={c} className="text-[8px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-100 px-2 py-1 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={(e) => handleQuickAdd(e, product)}
                          className={`flex-1 h-12 rounded-xl flex items-center justify-center space-x-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                            addedId === product.id ? 'bg-green-600 text-white' : 'bg-brand text-white hover:bg-brand/90 hover:scale-[1.02]'
                          }`}
                        >
                          {addedId === product.id ? (
                            <>
                              <Check size={14} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={14} />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-32 space-y-6">
                  <p className="text-zinc-400 font-light italic font-serif text-2xl">
                    {error ? error : (products.length === 0 ? "No products found in the store." : "No formulations match your selection.")}
                  </p>
                  {products.length > 0 && (
                    <button 
                      onClick={() => setSearchParams({})}
                      className="text-brand font-bold uppercase tracking-widest text-[10px] border-b border-brand pb-1"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
