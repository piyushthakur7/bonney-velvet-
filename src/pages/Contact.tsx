/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Send, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-brand py-32 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1920&h=1080" 
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
            Get in Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.8]"
          >
            LET'S <br />
            <span className="italic font-serif font-light text-white/80">Connect.</span>
          </motion.h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Contact Info: 5 Columns */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-black text-brand tracking-tighter">CONTACT <span className="italic font-serif font-light">Details</span></h2>
              <p className="text-zinc-500 font-light text-lg leading-relaxed">
                Have a question about our products or your order? We're here to help you achieve your best glow.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Us", value: "bonnyvelvet33@gmail.com" },
                { icon: Phone, label: "Call Us", value: "8884770044" },
                { icon: MapPin, label: "Visit Us", value: "Patel nagar near Rajeev nagar beside chanakya collage Hubballi Karnataka 580031" }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand premium-shadow group-hover:bg-brand group-hover:text-white transition-all duration-500">
                    <item.icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</p>
                    <p className="text-xl font-display font-bold text-brand">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8 pt-8 border-t border-zinc-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Follow the Glow</p>
              <div className="flex space-x-6">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-brand hover:text-brand transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form: 7 Columns */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-50 p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] premium-shadow border border-zinc-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-light"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Your Message</label>
                  <textarea 
                    rows={6} 
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-[2rem] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-light resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full h-16 rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center space-x-4 ${
                    isSubmitted ? 'bg-green-600 text-white' : 'bg-brand text-white hover:scale-[1.02] premium-shadow'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <span>Message Sent</span>
                      <Send size={18} />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
