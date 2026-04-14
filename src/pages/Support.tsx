/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send, ArrowRight, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is Bonny Velvet?',
    answer: 'Bonny Velvet is a premium skincare brand.',
  },
  {
    question: 'How to use products?',
    answer: 'Apply a small amount to clean skin daily.',
  },
  {
    question: 'Are your products cruelty-free?',
    answer: 'Yes, all our products are cruelty-free.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy.',
  },
  {
    question: 'Where to buy products?',
    answer: 'You can purchase products directly from our website.',
  },
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; index: number }> = ({ question, answer, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="border-b border-zinc-100 last:border-b-0"
  >
    <button
      onClick={onClick}
      id={`faq-item-${index}`}
      className="w-full flex items-center justify-between py-7 text-left group"
    >
      <div className="flex items-center space-x-4">
        <span className="text-[10px] font-black text-brand/30 tracking-widest">0{index + 1}</span>
        <span className="text-lg md:text-xl font-display font-bold text-zinc-800 group-hover:text-brand transition-colors">
          {question}
        </span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? 'bg-brand text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-brand/10 group-hover:text-brand'
        }`}
      >
        <ChevronDown size={16} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pb-7 pl-10 pr-8">
            <p className="text-zinc-500 font-light text-base md:text-lg leading-relaxed">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
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
      {/* Hero Section */}
      <section className="bg-brand py-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full border border-white/5"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full border border-white/5"></div>

        <div className="relative z-10 space-y-6 px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-light inline-block"
          >
            Help Center
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.85]"
          >
            WE'RE HERE <br />
            <span className="italic font-serif font-light text-white/80">to Help.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 font-light text-lg max-w-md mx-auto"
          >
            Find answers to common questions or reach out to our team directly.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* FAQ Heading */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-brand">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-brand tracking-tighter leading-[0.9]">
                FREQUENTLY <br />
                <span className="italic font-serif font-light">Asked</span>
              </h2>
              <p className="text-zinc-500 font-light text-lg leading-relaxed">
                Quick answers to the questions we hear most. Can't find what you're looking for? Send us a message below.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-50 p-8 md:p-12 rounded-[3rem] premium-shadow border border-zinc-100">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Contact Heading */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-brand">
                <MessageCircle size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-brand tracking-tighter leading-[0.9]">
                GET IN <br />
                <span className="italic font-serif font-light">Touch</span>
              </h2>
              <p className="text-zinc-500 font-light text-lg leading-relaxed">
                Have a question about our products or your order? We're here to help you achieve your best glow.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-50 p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] premium-shadow border border-zinc-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/3 rounded-full -ml-24 -mb-24 blur-3xl"></div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8" id="support-contact-form">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Your Name</label>
                  <input
                    type="text"
                    id="support-name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-light"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">
                    Email Address<span className="text-brand">*</span>
                  </label>
                  <input
                    type="email"
                    id="support-email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-light"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">
                    Message<span className="text-brand">*</span>
                  </label>
                  <textarea
                    rows={6}
                    id="support-message"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-[2rem] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-light resize-none"
                    placeholder="Your message here"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  id="support-submit"
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
                      <span>Submit</span>
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

export default Support;
