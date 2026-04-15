/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Zap, ArrowLeft, ChevronRight, Minus, Plus, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

import { useData } from '../DataContext';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import BrandTrustBar from '../components/BrandTrustBar';

/// ── Hardcoded product details by ID ─────────────────────────────
type ProductSection = {
  title: string;
  type: 'list' | 'table' | 'text';
  content: any;
};

const PRODUCT_DATA: Record<string, ProductSection[]> = {
  // Sunscreen (ID 39 in live store, 13 in fallback)
  "39": [
    {
      title: "Info",
      type: "table",
      content: [
        { label: "Brand", value: "BONNY VELVET" },
        { label: "Item Form", value: "Cream" },
        { label: "Net Quantity", value: "50.0 Milliliters" },
        { label: "Skin Type", value: "All" },
        { label: "Sun Protection Factor", value: "50 SPF" },
        { label: "Item Weight", value: "50 Grams" }
      ]
    },
    {
      title: "About this item",
      type: "list",
      content: [
        "SPF 50 PA+++ Broad Spectrum Sunscreen — Protects against harmful UVA & UVB rays with advanced UV filters including Tinosorb-M.",
        "Vitamin C 5% Brightening Formula — Helps brighten skin, reduce dark spots, and enhance natural radiance.",
        "Niacinamide 1% Oil Control Care — Refines pores, controls excess oil, and evens skin tone.",
        "Aloe Vera & Vitamin E Soothing — Hydrates, calms, and comforts sun-exposed skin.",
        "Lightweight Face & Body Use — Non-greasy, fast-absorbing sunscreen suitable for all skin types."
      ]
    },
    {
      title: "Features & Specs",
      type: "table",
      content: [
        { label: "Active Ingredients", value: "Aloe Vera, Vitamin E, Niacinamide" },
        { label: "Water Resistance", value: "Water Resistant" },
        { label: "Material Features", value: "Cruelty Free, Non-Comedogenic, Vegan" },
        { label: "Material Type Free", value: "Alcohol Free, Paraben Free, Sulphate Free" }
      ]
    },
    {
      title: "Product details",
      type: "table",
      content: [
        { label: "Manufacturer", value: "BIUMARK DERMACEUTICALS PVT.LTD. Delhi-110092 INDIA" },
        { label: "Country of Origin", value: "India" },
        { label: "Dimensions", value: "50 × 40 × 155 Millimeters" }
      ]
    }
  ],
  "13": [ /* Same as 39 */ ],
  // Hair Mask (ID 30 in live store, 9 in fallback)
  "30": [
    {
      title: "Info",
      type: "table",
      content: [
        { label: "Brand", value: "BONNY VELVET" },
        { label: "Item Form", value: "Cream" },
        { label: "Material Feature", value: "Cruelty Free, Natural, Recyclable" },
        { label: "Hair Type", value: "All" },
        { label: "Product Benefits", value: "Breakage Control, Conditioning, Damage Control, Frizz Control, Nourishing, pH Balance" },
        { label: "Age Range (Description)", value: "Adult" },
        { label: "Net Quantity", value: "200.0 Grams" },
        { label: "Number of Items", value: "1" },
        { label: "Scent", value: "Fresh" },
        { label: "Material Type Free", value: "Mineral Oil Free, Palm Oil Free, Paraben Free" }
      ]
    },
    {
      title: "About this item",
      type: "list",
      content: [
        "Amino Advanced Bond Repair Care — Powered by Amino Bond Technology, this intensive formula helps repair weakened hair bonds, reduce breakage and improve overall hair strength.",
        "Deep Conditioning for Dry & Damaged Hair — Rich, creamy texture penetrates deeply to restore moisture, softness and manageability from root to tip.",
        "Enriched with Kerazyme MB & Argan Oil — Kerazyme MB helps support hair structure while Argan Oil nourishes and adds natural shine without heaviness.",
        "Restores Smoothness, Strength & Shine — Controls frizz, improves elasticity and leaves hair visibly smoother, silkier and healthier-looking.",
        "Sulfate Free Gentle Formula — Free from harsh sulfates, making it suitable for dry, chemically treated and frizzy hair types. Safe for regular use."
      ]
    },
    {
      title: "Features & Specs",
      type: "table",
      content: [
        { label: "Item Form", value: "Cream" },
        { label: "Hair Type", value: "All" },
        { label: "Product Benefits", value: "Breakage Control, Conditioning, Damage Control, Frizz Control, Nourishing, pH Balance" },
        { label: "Scent", value: "Fresh" },
        { label: "Additional Features", value: "Amino Bond Technology, Intensive Deep Care, Kerazyme MB Formula, Not Tested On Animals, Sulfate Free Formula" },
        { label: "Package Type Name", value: "Box" },
        { label: "Hair Conditioner Type", value: "Hair Conditioning Mask" },
        { label: "Brand", value: "BONNY VELVET" },
        { label: "Age Range Description", value: "Adult" },
        { label: "Manufacturer", value: "VARDA BIOLOGY PLOT NO. 88/A, SHIV INDUSTRIAL INFRA PARK, LAMDAPURA, savik, Gujarat, India-397775" },
        { label: "Item Type Name", value: "Hair Treatment Mask" },
        { label: "Country of Origin", value: "India" },
        { label: "Packer Contact Information", value: "bonny Velvet Plot-no 19, Shri Ravalnath Krupa, Patel Nagar, Near Rajeev Nagar Vidyanagar, Hubli, Karnataka-580031 Email us: bonnyvelvet33@gmail.com Visit our web site: www.bonnyvelvet.com Customer Care: 8884770044" }
      ]
    },
    {
      title: "Item details",
      type: "table",
      content: [
        { label: "Material Features", value: "Cruelty Free, Natural, Recyclable" },
        { label: "Material Type Free", value: "Mineral Oil Free, Palm Oil Free, Paraben Free" }
      ]
    },
    {
      title: "Materials & Care",
      type: "table",
      content: [
        { label: "Active Ingredients", value: "Amino Bond Technology Helps repair weakened hair bonds, strengthen strands and reduce breakage., Argan Oil Deeply nourishes dry hair, adds softness and boosts natural shine., Kerazyme MB Supports hair structure, improves elasticity and enhances overall hair health." }
      ]
    },
    {
      title: "Ingredients",
      type: "text",
      content: "Water (Aqua), Behentrimonium Methosulfate, Cetyl Alcohol, 1,3-Butylene Glycol, Cetearyl Alcohol, Xylitylglucoside, Anhydroxylitol, Maltitol, Xylitol, Pelvetia Canaliculata Extract, Cocamidopropyl Hydroxysultaine, Cocamidopropyl Betaine, Glycerin, Propanediol, Betaine, Panthenol, Brassicamidopropyl Dimethylamine, Polyester-11, Aloe Barbadensis Leaf Extract, Tocopheryl Acetate, Acetamide MEA, Sorbitol, Sodium Cocoyl Collagen Amino Acids, Cocoyl Sarcosine, Argania Spinosa Kernel Oil, Caprylyl/Capryl Glucoside, PRODEW® 500 (Sodium PCA, Sodium Lactate, Arginine, Aspartic Acid, PCA, Glycine, Alanine, Serine, Valine, Proline, Threonine, Isoleucine, Histidine, Phenylalanine, Water), Fision® KeraVeg18 (Aqua, Wheat Amino Acids, Soy Amino Acids, Arginine HCI, Serine, Threonine, Benzyl Alcohol, Potassium Sorbate, Sodium Benzoate), Caprylic/Capric Triglycerides, Phenoxyethanol, Fragrance"
    },
    {
      title: "Measurements",
      type: "table",
      content: [
        { label: "Unit Count", value: "200.0 Grams" },
        { label: "Number of Items", value: "1" },
        { label: "Item Dimensions", value: "8 x 8 x 6.5 Centimeters" },
        { label: "Item Weight", value: "200 Grams" }
      ]
    },
    {
      title: "Product details",
      type: "table",
      content: [
        { label: "Product Dimensions", value: "8 x 8 x 6.5 cm; 200 g" },
        { label: "Date First Available", value: "22 February 2026" },
        { label: "Manufacturer", value: "VARDA BIOLOGY PLOT NO. 88/A, SHIV INDUSTRIAL INFRA PARK, LAMDAPURA, savik, Gujarat, India-397775" },
        { label: "ASIN", value: "B0GPSDN75P" },
        { label: "Item part number", value: "hairmask06" },
        { label: "Country of Origin", value: "India" },
        { label: "Packer", value: "bonny Velvet Plot-no 19, Shri Ravalnath Krupa, Patel Nagar, Near Rajeev Nagar Vidyanagar, Hubli, Karnataka-580031 Email us: bonnyvelvet33@gmail.com Visit our web site: www.bonnyvelvet.com Customer Care: 8884770044" },
        { label: "Item Weight", value: "200 g" },
        { label: "Item Dimensions LxWxH", value: "8 x 8 x 6.5 Centimeters" },
        { label: "Net Quantity", value: "200.0 Grams" },
        { label: "Generic Name", value: "Hair Treatment Mask" }
      ]
    }
  ],
  "9": [ /* Copy of 30 below in actual implementation */ ]
};

// Copy structure for fallback IDs
PRODUCT_DATA["13"] = PRODUCT_DATA["39"];
PRODUCT_DATA["9"] = PRODUCT_DATA["30"];
reduces breakage), Argan Oil (nourishes & boosts shine), Kerazyme MB (supports structure & elasticity)" }
    ]
  }
};
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useData();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0].value : undefined
  );

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

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
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
              className="aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-zinc-50 premium-shadow"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain p-12"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </motion.div>
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {galleryImages.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-50 cursor-pointer hover:ring-2 hover:ring-brand transition-all min-w-[80px] sm:min-w-0 ${
                      selectedImage === i ? 'ring-2 ring-brand opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info: 5 Columns */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-brand leading-[0.9] tracking-tighter">
                {product.name.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="italic font-serif font-light">{word} </span> : word + ' '}
                  </React.Fragment>
                ))}
              </h1>

              <div className="flex items-end space-x-4">
                <span className="text-3xl sm:text-4xl font-display font-black text-brand">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-zinc-300 line-through font-light mb-1">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="text-zinc-500 font-light text-base sm:text-lg leading-relaxed">
                {product.shortDescription || (product.description && product.description.replace(/<[^>]*>?/gm, ''))}
              </p>

              {/* Hardcoded Highlights by Product ID */}
              {PRODUCT_DATA[id!]?.highlights && (
                <div className="space-y-4 pt-8">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand/40">About this item</h3>
                   <ul className="space-y-3">
                     {PRODUCT_DATA[id!].highlights.map((point, idx) => (
                       <li key={idx} className="flex items-start text-sm text-zinc-600 font-light leading-snug">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand/20 mt-1.5 mr-3 shrink-0" />
                         <span>{point}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>

            {/* Our Purity Standard */}
            <div className="space-y-6 pt-12 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand/40">Our Purity Standard</h3>
                <Sparkles size={14} className="text-brand/20" />
              </div>
              <BrandTrustBar mode="grid" />
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-6 pt-12 border-t border-zinc-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand/40">Select Size</h3>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => setSelectedVariant(v.value)}
                      className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                        selectedVariant === v.value 
                          ? 'bg-brand border-brand text-white premium-shadow' 
                          : 'bg-white border-zinc-100 text-zinc-400 hover:border-brand/30'
                      }`}
                    >
                      {v.label}
                    </b            {/* Actions */}
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
                        <span>Add to Bag</span>
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

            {/* Redesigned Technical Specifications Accordions */}
            {PRODUCT_DATA[id!] && (
              <div className="space-y-0 pt-12 border-t border-zinc-100 divide-y divide-zinc-200">
                {PRODUCT_DATA[id!].map((section, idx) => (
                  <SpecAccordion key={idx} title={section.title} type={section.type} content={section.content} />
                ))}
              </div>
            )}
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
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {products.filter(p => p.id !== id).slice(0, 4).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group flex flex-col h-full space-y-4">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-50 premium-shadow">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="flex flex-col flex-1 space-y-2 px-1">
                <h4 className="font-display font-bold text-sm sm:text-lg text-brand group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] leading-tight">{p.name}</h4>
                <p className="text-xs sm:text-base text-zinc-400 font-display font-black mt-auto">₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const SpecAccordion = ({ title, type, content }: { title: string; type: string; content: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden border-b border-zinc-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 group hover:bg-zinc-50/50 transition-colors px-2"
      >
        <span className="text-base font-medium text-[#111]">{title}</span>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            className="absolute w-4 h-[2px] bg-black"
          />
          <motion.div
            animate={{ rotate: isOpen ? 0 : 90 }}
            className="absolute w-4 h-[2px] bg-black"
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pb-8 px-2 text-[#333]">
              {type === 'table' && (
                <div className="space-y-4">
                  {content.map((item: any, idx: number) => (
                    <div key={idx} className="flex">
                      <span className="w-1/3 text-sm font-bold text-zinc-900">{item.label}</span>
                      <span className="w-2/3 text-sm font-light leading-relaxed">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {type === 'list' && (
                <ul className="space-y-3">
                  {content.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start text-sm font-light leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand/40 mt-1.5 mr-3 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {type === 'text' && (
                <p className="text-sm font-light leading-relaxed text-zinc-600 whitespace-pre-wrap">
                  {content}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;

