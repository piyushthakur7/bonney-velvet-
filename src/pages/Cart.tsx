/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, shippingFee, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300 mx-auto">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-brand">Your cart is empty</h1>
          <p className="text-zinc-500">Looks like you haven't added any velvet glow to your cart yet.</p>
        </div>
        <Link to="/shop" className="inline-block bg-brand text-white font-bold px-8 py-4 rounded-full hover:bg-brand/90 transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand tracking-tight mb-12">Your Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex space-x-6 pb-8 border-b border-zinc-100">
              <div className="w-24 h-32 bg-zinc-100 rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-zinc-900">{item.name}</h3>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">{item.category}</p>
                  </div>
                  <p className="font-bold text-brand">₹{item.price * item.quantity}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-zinc-200 rounded-full px-3 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-zinc-400 hover:text-brand"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-zinc-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-zinc-400 hover:text-brand"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] space-y-6">
            <h3 className="text-lg font-bold text-brand uppercase tracking-wider">Order Summary</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="text-zinc-900 font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="text-zinc-900 font-medium">
                  {shippingFee === 0 ? <span className="text-green-600 font-bold uppercase text-[10px]">Free</span> : `₹${shippingFee}`}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[10px] text-zinc-400 italic">Add ₹{499 - subtotal} more for free shipping!</p>
              )}
              <div className="pt-4 border-t border-zinc-200 flex justify-between text-lg font-bold text-brand">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="w-full bg-brand text-white font-bold py-4 rounded-full hover:bg-brand/90 transition-all flex items-center justify-center group">
              Checkout
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            
            <div className="flex items-center justify-center space-x-4 opacity-50 grayscale pt-4">
              <span className="text-[10px] font-bold">Razorpay</span>
              <span className="text-[10px] font-bold">COD Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
