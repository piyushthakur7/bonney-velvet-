/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Zap, ArrowLeft, ChevronRight, Minus, Plus, ArrowRight, Sparkles } from 'lucide-react';

import { useData } from '../DataContext';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import BrandTrustBar from '../components/BrandTrustBar';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useData();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full"
        />
      </div>
    );
  }


  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-2xl font-bold text-zinc-900">Product not found</h1>
        <Link to="/shop" className="inline-block text-brand font-bold underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleExpressCheckout = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="pb-24">
      {/* Breadcrumbs & Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-brand transition-colors"
          >
            <ArrowLeft size={14} className="mr-2" />
            Back
          </button>
          <nav className="hidden sm:flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <Link to="/" className="hover:text-brand">Home</Link>
            <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-brand">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-brand">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Gallery: 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-50 premium-shadow"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[
                product.image,
                'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=600',
                'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600&h=600',
                'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=600'
              ].map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-zinc-50 cursor-pointer hover:ring-2 hover:ring-brand transition-all opacity-60 hover:opacity-100">
                  <img 
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info: 5 Columns */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center text-amber-500">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  <span className="ml-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">128 Reviews</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-black text-brand leading-[0.9] tracking-tighter">
                {product.name.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="italic font-serif font-light">{word} </span> : word + ' '}
                  </React.Fragment>
                ))}
              </h1>

              <div className="flex items-end space-x-4">
                <span className="text-4xl font-display font-black text-brand">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-zinc-300 line-through font-light mb-1">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="text-zinc-500 font-light text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Our Purity Standard */}
            <div className="space-y-6 pt-12 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand/40">Our Purity Standard</h3>
                <Sparkles size={14} className="text-brand/20" />
              </div>
              <BrandTrustBar mode="grid" />
            </div>


            {/* Actions */}
            <div className="space-y-6 pt-6 border-t border-zinc-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-zinc-50 rounded-full px-6 py-3 border border-zinc-100">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-zinc-400 hover:text-brand transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-display font-black text-brand text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-zinc-400 hover:text-brand transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 relative h-16 rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all overflow-hidden ${
                    isAdded ? 'bg-green-600 text-white' : 'bg-brand text-white hover:scale-[1.02]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.span 
                        key="added"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center justify-center"
                      >
                        Added to Bag
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="add"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center justify-center space-x-3"
                      >
                        <ShoppingBag size={18} />
                        <span>Add to Cart</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              
              <button 
                onClick={handleExpressCheckout}
                className="w-full py-6 border border-brand text-brand font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-brand hover:text-white transition-all"
              >
                Express Checkout
              </button>
            </div>

            {/* Tabs */}
            <div className="space-y-6">
              <div className="flex space-x-8 border-b border-zinc-100">
                {['description', 'ingredients', 'usage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                      activeTab === tab ? 'text-brand' : 'text-zinc-400'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-zinc-500 font-light leading-relaxed text-sm"
                  >
                    {activeTab === 'description' && product.description}
                    {activeTab === 'ingredients' && (
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map(ing => (
                          <span key={ing} className="px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">{ing}</span>
                        ))}
                      </div>
                    )}
                    {activeTab === 'usage' && product.howToUse}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-48 space-y-16">
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-display font-black text-brand tracking-tighter">YOU MAY ALSO <span className="italic font-serif font-light">Like</span></h2>
          <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand hover:underline flex items-center">
            View All <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.id !== id).slice(0, 4).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group space-y-6">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-50 premium-shadow">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="space-y-2 px-2">
                <h4 className="font-display font-bold text-xl text-brand group-hover:text-brand transition-colors">{p.name}</h4>
                <p className="text-zinc-400 font-display font-black">₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
