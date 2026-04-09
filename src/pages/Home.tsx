/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Zap, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import BrandTrustBar from '../components/BrandTrustBar';
import VideoShowcase from '../components/VideoShowcase';


const concernImages: Record<string, string> = {
  'Acne': 'https://images.unsplash.com/photo-1615397323625-f5e95738805f?auto=format&fit=crop&q=80&w=600&h=800',
  'Dryness': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=800',
  'Glow': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=800',
  'Repair': 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&h=800',
  'Anti-Aging': 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600&h=800',
};

const Home = () => {
  const { products, loading } = useData();
  const CONCERNS = ['Acne', 'Dryness', 'Glow', 'Repair', 'Anti-Aging'];

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

  return (
    <div className="pb-24">
      {/* Hero Section: Editorial Split Layout */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden bg-brand-light">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 lg:py-0 space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-brand"></span>
              <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase">
                The New Standard of Glow
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-brand leading-[0.9] tracking-tighter text-balance">
              VELVET <br />
              <span className="italic font-serif font-light">Skin</span> <br />
              REDEFINED.
            </h1>
            <p className="text-base md:text-xl text-zinc-600 max-w-md leading-relaxed font-light">
              Scientifically formulated for the modern Indian lifestyle. High-performance actives meet aesthetic luxury.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Link to="/shop" className="group relative px-10 py-5 bg-brand text-white font-bold rounded-full overflow-hidden transition-all hover:pr-14 text-center">
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
            </Link>
            <Link to="/about" className="px-10 py-5 border border-brand/20 text-brand font-bold rounded-full hover:bg-brand/5 transition-all text-center">
              Our Philosophy
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 relative min-h-[50vh] lg:min-h-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img 
              src="/images/hero_editorial.png" 
              alt="Skincare Editorial" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand/10 mix-blend-multiply"></div>
          </motion.div>
          
          {/* Floating Badge */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-12 -left-12 hidden lg:flex w-48 h-48 bg-white rounded-full items-center justify-center p-8 premium-shadow z-20"
          >
            <div className="text-center">
              <p className="text-[10px] font-black text-brand tracking-[0.2em] uppercase leading-tight">
                100% Vegan • Dermat Tested • Made in India
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee/Trust Bar */}
      <BrandTrustBar mode="marquee" speed={20} />


      {/* Shop by Concern: Grid with Overlays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand tracking-tighter leading-none">
              SOLUTIONS FOR <br />
              <span className="italic font-serif font-light">Every Skin.</span>
            </h2>
            <p className="text-zinc-500 font-light text-lg">
              We don't believe in one-size-fits-all. Our targeted treatments are designed to address your specific concerns with surgical precision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CONCERNS.map((concern, i) => (
            <motion.div
              key={concern}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/shop?concern=${concern}`}
                className="group relative block aspect-[3/4] rounded-[2rem] overflow-hidden bg-zinc-100"
              >
                <img 
                  src={concernImages[concern] || "https://images.unsplash.com/photo-1615397323625-f5e95738805f?auto=format&fit=crop&q=80&w=600&h=800"} 
                  alt={concern}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <span className="text-white font-display font-bold text-2xl tracking-tighter">{concern}</span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform">
                    <ArrowRight size={20} className="text-brand" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products: Large Cards */}
      <section className="bg-brand-light py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand tracking-tighter">THE ESSENTIALS</h2>
            <p className="text-zinc-500 font-light italic font-serif text-xl">Our most-loved formulations for a velvet glow.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.length > 0 ? (
              products.slice(0, 2).map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden premium-shadow group"
                >
                  <div className="md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="md:w-1/2 p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-black text-brand/40 uppercase tracking-[0.3em]">{product.category}</span>
                      <h3 className="text-3xl font-display font-bold text-brand leading-tight">{product.name}</h3>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed line-clamp-3">{product.description}</p>
                    </div>
                    <div className="pt-8 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-2xl font-display font-black text-brand">₹{product.price}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Free Shipping</p>
                      </div>
                      <Link to={`/product/${product.id}`} className="w-14 h-14 bg-brand text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <ArrowUpRight size={24} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="lg:col-span-2 text-center py-20 bg-white/50 rounded-[3rem] border border-zinc-100">
                <p className="text-zinc-400 font-light italic font-serif text-2xl">No products currently available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brand Philosophy: Split Image/Text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand tracking-tighter leading-[0.9]">
              LUXURY IS <br />
              <span className="italic font-serif font-light">Transparency.</span>
            </h2>
            <div className="space-y-6 text-zinc-600 font-light text-lg leading-relaxed">
              <p>
                We believe that premium skincare shouldn't be a mystery. Every ingredient in our formulations is chosen for its proven efficacy on Indian skin.
              </p>
              <p>
                No fillers, no fluff. Just high-concentration actives that deliver the results you can actually see in the mirror.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <p className="text-4xl font-display font-black text-brand">100%</p>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Vegan Formulations</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-display font-black text-brand">0%</p>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Harmful Chemicals</p>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Philosophy" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-light rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-brand/10 rounded-full -z-10"></div>
          </div>
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
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-6 border border-brand/20 p-1 bg-white">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover rounded-full" />
                </div>
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
        <div className="bg-zinc-900 rounded-[4rem] p-16 md:p-24 text-center space-y-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-sm font-bold text-brand uppercase tracking-[0.4em]">Available Worldwide</h3>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter">FIND US ON</h2>
            <div className="flex flex-wrap justify-center items-center gap-16 pt-8">
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
