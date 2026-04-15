/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Shield, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandTrustBar from '../components/BrandTrustBar';


const About = () => {
  return (
    <div className="pb-24">
      {/* Hero Section - Minimal & Bold */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-light"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-display font-black text-white tracking-tighter leading-[0.8]"
          >
            BONNY <br />
            <span className="italic font-serif font-light text-white/80">Velvet</span>
          </motion.h1>
        </div>
      </section>

      {/* Editorial Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-display font-black text-brand leading-[0.9] tracking-tighter">
                REDEFINING <br />
                <span className="italic font-serif font-light text-zinc-400">Affordable Luxury</span>
              </h2>
              <div className="w-24 h-1 bg-brand"></div>
            </div>
            
            <div className="space-y-6 text-zinc-500 font-light text-lg leading-relaxed">
              <p>
                Born in the heart of urban India, Bonny Velvet was created for a generation that refuses to compromise. We believe that premium skincare shouldn't be a gatekept luxury, but a daily ritual accessible to everyone who values their glow.
              </p>
              <p>
                Our formulations combine time-tested botanical wisdom with cutting-edge dermatological science. Every drop of Bonny Velvet is a commitment to quality, transparency, and visible results.
              </p>
              <p className="font-serif italic text-brand text-2xl">
                "We believe that premium skincare shouldn't be a privilege, but a daily ritual."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-4xl font-display font-black text-brand">100%</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Vegan & Cruelty Free</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-black text-brand">50k+</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] rounded-[4rem] overflow-hidden premium-shadow">
              <img 
                src="https://images.unsplash.com/photo-1615397323625-f5e95738805f?auto=format&fit=crop&q=80&w=800&h=1200" 
                alt="Bonny Velvet Philosophy" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-light rounded-[3rem] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Values Grid - Modern & Clean */}
      <section className="bg-zinc-50 py-32 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-display font-black text-brand tracking-tighter">OUR CORE <span className="italic font-serif font-light">Values</span></h2>
            <p className="text-zinc-400 font-light uppercase tracking-[0.2em] text-xs">The pillars of our brand identity</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {[
              { icon: Sparkles, title: "Purity", desc: "Clean ingredients, zero compromises on safety." },
              { icon: Heart, title: "Empathy", desc: "Skincare that understands your unique needs." },
              { icon: Shield, title: "Trust", desc: "Dermatologically tested and science-backed." },
              { icon: Zap, title: "Results", desc: "Visible transformation you can see and feel." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] space-y-4 sm:space-y-6 premium-shadow border border-zinc-100 text-center"
              >
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand mx-auto">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-black text-brand">{value.title}</h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-display font-black text-brand leading-[0.9] tracking-tighter">
                CERTIFIED <br />
                <span className="italic font-serif font-light text-zinc-400">Excellence</span>
              </h2>
              <div className="w-24 h-1 bg-brand"></div>
            </div>
            <p className="text-zinc-500 font-light text-lg leading-relaxed">
              Our commitment to your skin's health is backed by international standards and rigorous testing. We believe in complete transparency, ensuring that every product you use is safe, ethical, and effective.
            </p>
            <div className="pt-8 block">
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-brand text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                <span>View Certifications</span>
                <Sparkles size={14} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <BrandTrustBar mode="list" />
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-brand rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 text-center space-y-8 md:space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-[0.9]">
              READY TO START YOUR <br />
              <span className="italic font-serif font-light text-brand-light">Glow Journey?</span>
            </h2>
            <p className="text-brand-light/70 font-light text-xl max-w-2xl mx-auto">
              Join thousands of others who have discovered the Bonny Velvet difference.
            </p>
          </div>
          <div className="relative z-10">
            <Link 
              to="/shop" 
              className="inline-flex items-center space-x-4 bg-white text-brand px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all premium-shadow"
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
