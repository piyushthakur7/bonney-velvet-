/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-brand tracking-tighter">BONNY VELVET</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Affordable luxury skincare specifically formulated for Indian skin. 
              Visible results, premium ingredients, minimal routine.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-brand transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-zinc-400 hover:text-brand transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-zinc-400 hover:text-brand transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-zinc-500 hover:text-brand text-sm transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Serums" className="text-zinc-500 hover:text-brand text-sm transition-colors">Serums</Link></li>
              <li><Link to="/shop?category=Sunscreens" className="text-zinc-500 hover:text-brand text-sm transition-colors">Sunscreens</Link></li>
              <li><Link to="/shop?category=Moisturizers" className="text-zinc-500 hover:text-brand text-sm transition-colors">Moisturizers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-zinc-500 hover:text-brand text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="text-zinc-500 hover:text-brand text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-zinc-500 hover:text-brand text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-zinc-500 hover:text-brand text-sm transition-colors">Refund Policy</Link></li>
              <li><Link to="/shipping-policy" className="text-zinc-500 hover:text-brand text-sm transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-zinc-500">
                <Mail size={18} className="text-brand shrink-0" />
                <span>bonnyvelvet33@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-zinc-500">
                <Phone size={18} className="text-brand shrink-0" />
                <span>8884770044</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-zinc-500">
                <MapPin size={18} className="text-brand shrink-0" />
                <span>Patel nagar near Rajeev nagar beside chanakya collage Hubballi Karnataka 580031</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 text-center">
          <p className="text-zinc-400 text-xs flex flex-col md:flex-row items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Bonny Velvet. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-200">|</span>
            <span>
              Made by <a href="https://www.webtutorssolution.com" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-bold transition-all">Web Tutors Solution</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
