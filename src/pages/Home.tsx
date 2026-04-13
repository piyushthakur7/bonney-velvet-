import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useData } from '../DataContext';
import { Product } from '../types';

const CATEGORY_IMAGES: Record<string, string> = {
  'Summer Picks': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200&h=200',
  'Sunscreens': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200&h=200',
  'Serums': 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=200&h=200',
  'Masks': 'https://images.unsplash.com/photo-1615397323625-f5e95738805f?auto=format&fit=crop&q=80&w=200&h=200',
};

// BUBBLE_CATEGORIES removed, we will use dynamic categories from WooCommerce

const Home = () => {
  const { products, categories, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('');

  // Default to the first category once loaded
  React.useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const filteredProducts = activeCategory 
    ? products.filter(p => p.category === activeCategory)
    : products;

  // Helper to get an image for a category
  // If it's in our predefined map, use it. Otherwise, use the image of the first product in that category.
  const getCategoryImage = (catName: string) => {
    if (CATEGORY_IMAGES[catName]) return CATEGORY_IMAGES[catName];
    const categoryProducts = products.filter(p => p.category === catName);
    if (categoryProducts.length > 0) return categoryProducts[0].image;
    return 'https://images.unsplash.com/photo-1615397323625-f5e95738805f?auto=format&fit=crop&q=80&w=200&h=200'; // Default fallback
  };

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
      <section className="bg-[#a6cbeb] w-full px-4 py-8 relative overflow-hidden flex items-center justify-center min-h-[280px]">
        <div className="relative z-10 text-center flex flex-col items-center">
          <h3 className="text-blue-900 font-black tracking-widest text-sm mb-1 uppercase drop-shadow-sm">Play On</h3>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 uppercase tracking-tighter mb-2" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
            Summer Sale
          </h1>
          <p className="text-white font-bold text-sm tracking-widest uppercase mb-4 drop-shadow-md">
            Biggest sale of the season
          </p>
          <div className="bg-[#fce882] px-6 py-2 rounded-lg ext-blue-950 font-black text-xl mb-2 premium-shadow transform -rotate-2">
            BUY 2 GET 4 FREE
          </div>
          <div className="bg-white/90 text-blue-950 px-4 py-1 rounded font-bold text-sm shadow-sm inline-block">
            Code: B2G4
          </div>
        </div>
        
        {/* Decorative product images floating in banner (Mocking the vibe) */}
        <motion.img 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300"
          className="absolute -bottom-10 -left-10 w-48 h-48 object-cover mix-blend-multiply opacity-80 rotate-12 rounded-full"
          alt=""
        />
        <motion.img 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300&h=300"
          className="absolute -top-10 -right-10 w-56 h-56 object-cover mix-blend-multiply opacity-80 -rotate-12 rounded-full"
          alt=""
        />
      </section>

      {/* Category Bubbles Container */}
      <section className="bg-white border-b border-zinc-100 sticky top-[110px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar px-4 py-6 gap-6 sm:gap-10 sm:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className="flex flex-col items-center gap-3 shrink-0 group focus:outline-none"
                >
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center transition-all ${isActive ? 'bg-[#fef08a] p-1 shadow-md scale-105' : 'bg-orange-50 p-1 group-hover:scale-105 group-hover:bg-[#fef08a]'}`}>
                    <img 
                      src={getCategoryImage(cat)} 
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
    </div>
  );
};

export default Home;

// --- Sub-Components for the specifically designed Product Card ---

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].value : null
  );

  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow flex flex-col relative h-full">
      {/* Top Image Section */}
      <div className="bg-[#a5c8eb] w-full pt-12 pb-6 px-4 flex items-center justify-center relative min-h-[220px]">
        {/* Badges positioned absolute */}
        {product.badge && (
          <div className="absolute top-4 left-0 pl-4">
             <span className={`text-[10px] sm:text-xs font-black uppercase inline-block px-3 py-1 bg-white rounded-sm ${
               product.badge.includes('CELEBRITY') ? 'text-[#a17a3f]' : 'text-[#8b5a8b]'
             } premium-shadow`}>
                {product.badge}
             </span>
          </div>
        )}
        <motion.img 
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image} 
          alt={product.name}
          className="w-3/4 max-w-[200px] h-auto object-contain filter drop-shadow-2xl mix-blend-multiply" 
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Bottom Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
        <h3 className="font-bold text-zinc-900 text-lg sm:text-xl leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-zinc-500 text-sm mb-5 font-medium line-clamp-2">
          {product.description}
        </p>

        {/* Variants Selector */}
        {product.variants && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {product.variants.map((v) => (
              <button
                key={v.value}
                onClick={() => setSelectedVariant(v.value)}
                className={`px-4 py-1.5 rounded-sm text-sm font-bold border transition-colors ${
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

        {/* Footer (Rating & Action) */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
           <div className="flex items-center space-x-1.5 text-[#f5a623] cursor-pointer hover:opacity-80">
             <span className="font-bold text-sm tracking-wide text-zinc-900">4.8</span>
             <Star size={14} fill="currentColor" />
             <span className="text-zinc-500 text-xs font-semibold ml-1 underline underline-offset-2">See Reviews</span>
           </div>
        </div>
      </div>
    </div>
  );
};

