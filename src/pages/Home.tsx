import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useData } from '../DataContext';
import { useCart } from '../CartContext';
import { Product } from '../types';
import VideoShowcase from '../components/VideoShowcase';
import { ShoppingBag, Star, Check } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Summer Picks': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200&h=200',
  'Sunscreens': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200&h=200',
  'Serums': 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=200&h=200',
  'Masks': 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=200&h=200',
};

const BUBBLE_CATEGORIES = ['Summer Picks', 'Sunscreens', 'Serums', 'Masks'];

const Home = () => {
  const { products, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('Summer Picks');

  // We mock the "Summer Picks" by taking the first 4 products, else filter by category
  const filteredProducts = activeCategory === 'Summer Picks' 
    ? products.slice(0, 4) 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-black border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="pb-32 bg-white mt-[84px]"> {/* Add margin to account for fixed navbar + top banner */}
      {/* Hero Banner Section */}
      <section className="bg-zinc-100 w-full px-4 py-8 relative overflow-hidden flex items-center justify-center min-h-[280px]">
        <div className="relative z-10 text-center flex flex-col items-center">
          <h3 className="text-zinc-900 font-black tracking-widest text-sm mb-1 uppercase drop-shadow-sm">Play On</h3>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-950 uppercase tracking-tighter mb-2" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
            Summer Sale
          </h1>
          <p className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 drop-shadow-md">
            Biggest sale of the season
          </p>

        </div>
        
      </section>

      {/* Category Bubbles Container */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar px-4 py-6 gap-6 sm:gap-10 sm:justify-center">
            {BUBBLE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className="flex flex-col items-center gap-3 shrink-0 group focus:outline-none"
                >
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center transition-all ${isActive ? 'bg-[#fef08a] p-1 shadow-md scale-105' : 'bg-orange-50 p-1 group-hover:scale-105 group-hover:bg-[#fef08a]'}`}>
                    <img 
                      src={CATEGORY_IMAGES[cat] || CATEGORY_IMAGES['Summer Picks']} 
                      alt={cat}
                      className="w-full h-full object-cover rounded-full mix-blend-multiply"
                    />
                  </div>
                  <span className={`text-sm sm:text-base font-bold transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : 'text-zinc-600 border-b-2 border-transparent pb-1 group-hover:text-black'}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-900 mb-8 sm:mb-12">
          {activeCategory}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-zinc-500 font-medium">
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Bishal Das",
              location: "West Bengal",
              image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200",
              text: "The Velvet website is a fantastic resource, offering a sleek collection, serums, creams, and useful tools. It's regularly updated with great content. However the most awesome thing is that the prices are all budget friendly for the quality. And no doubt about the service they provide instant reply and solutions 😊"
            },
            {
              name: "Adhiraj",
              location: "Nagpur",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
              text: "Hands Down the best store in India for all skincare related stuff! Super high class products along with wide selection of stock is just the cherry on top! The packaging is top notch and the product always reaches without a single scratch! Thank you Velvet for being my one-stop shop for all things skin!"
            },
            {
              name: "Aditya Kaushik",
              location: "Delhi",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
              text: "One of the most diverse collections I have seen anywhere on the web, I got two newly launched glow serums which were promptly delivered. Have also been using Velvet moisturizers for a while now. Top tier stuff undoubtedly for a fraction of the price at which other luxury places sell. Pricing is too affordable!!"
            }
          ].map((review, i) => (
            <motion.div 
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-brand/10 bg-brand-light p-8 lg:p-12 flex flex-col items-center text-center space-y-6"
            >
              <div className="space-y-2">
                <h4 className="font-bold text-brand uppercase tracking-widest text-sm">{review.name}</h4>
                <p className="text-sm text-zinc-500 font-serif italic">{review.location}</p>
              </div>
              
              <p className="text-zinc-600 font-light leading-relaxed text-base flex-1">
                {review.text}
              </p>
              
              <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center mt-6">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marketplace & Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 text-center space-y-8 md:space-y-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-sm font-bold text-brand uppercase tracking-[0.4em]">Available Worldwide</h3>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter">FIND US ON</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-8">
              <span className="text-3xl md:text-5xl font-black italic text-white/20 hover:text-[#FF9900] transition-colors cursor-pointer">amazon</span>
              <span className="text-3xl md:text-5xl font-black text-white/20 hover:text-[#2874F0] transition-colors cursor-pointer">Flipkart</span>
              <span className="text-3xl md:text-5xl font-black text-white/20 hover:text-brand transition-colors cursor-pointer">Nykaa</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// --- Sub-Components for the specifically designed Product Card ---

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].value : undefined
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow flex flex-col relative h-full">
      {/* Top Image Section */}
      <div className="bg-zinc-50 w-full aspect-[4/5] relative overflow-hidden group">
        {/* Badges positioned absolute */}
        {product.badge && (
          <div className="absolute top-3 left-0 pl-3 z-10">
             <span className={`text-[8px] sm:text-[10px] font-black uppercase inline-block px-2 py-1 bg-white rounded-sm ${
               product.badge.includes('CELEBRITY') ? 'text-[#a17a3f]' : 'text-[#8b5a8b]'
             } premium-shadow`}>
                {product.badge}
             </span>
          </div>
        )}
        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Bottom Content Section */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 bg-white">
        <h3 className="font-bold text-zinc-900 text-sm sm:text-xl leading-snug mb-1 sm:mb-2 line-clamp-3 sm:line-clamp-2 min-h-[3rem] sm:min-h-0">
          {product.name}
        </h3>
        <p className="hidden sm:block text-zinc-500 text-sm mb-5 font-medium line-clamp-2">
          {product.shortDescription || (product.description && product.description.replace(/<[^>]*>?/gm, ''))}
        </p>

        {/* Variants Selector */}
        {product.variants && (
          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
            {product.variants.map((v) => (
              <button
                key={v.value}
                onClick={() => setSelectedVariant(v.value)}
                className={`px-2 py-1 sm:px-4 sm:py-1.5 rounded-sm text-[10px] sm:text-sm font-bold border transition-colors ${
                  selectedVariant === v.value 
                    ? 'bg-[#f6a182] border-[#f6a182] text-white' 
                    : 'bg-white border-zinc-200 text-zinc-700 hover:border-[#f6a182]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Footer (Action) */}
        <div className="flex items-center justify-end pt-4 sm:pt-6 border-t border-zinc-100 mt-auto gap-4 w-full">
           <button 
             onClick={handleAddToCart}
             className={`flex-1 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center space-x-1.5 font-black uppercase tracking-widest text-[8px] sm:text-[10px] transition-all ${
               isAdded ? 'bg-green-600 text-white' : 'bg-brand text-white hover:bg-brand/90 hover:scale-[1.02]'
             }`}
           >
             {isAdded ? (
               <>
                 <Check size={12} className="sm:w-3.5 sm:h-3.5" />
                 <span>Added</span>
               </>
             ) : (
               <>
                 <ShoppingBag size={12} className="sm:w-3.5 sm:h-3.5" />
                 <span>Add</span>
               </>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

