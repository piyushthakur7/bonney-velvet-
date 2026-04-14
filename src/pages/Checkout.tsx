/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, MapPin, Phone, User, Mail, Lock, Package } from 'lucide-react';
import { useCart } from '../CartContext';
import { loadRazorpayScript, openRazorpayCheckout, createRazorpayOrder, verifyRazorpayPayment } from '../services/razorpay';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthContext';
import { supabase } from '../lib/supabase';
import { createWooCommerceOrder } from '../services/woocommerce';
import { syncOrderToShiprocket } from '../services/shiprocket';


const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart, subtotal, shippingFee } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showMockModal, setShowMockModal] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');
  const [mockOptions, setMockOptions] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    createAccount: false,
    password: '',
  });


  if (cart.length === 0 && !success) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-8">
        <h1 className="text-2xl font-bold text-brand">Your cart is empty</h1>
        <Link to="/shop" className="inline-block bg-brand text-white font-bold px-8 py-4 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Load Razorpay Script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // 2. Create Order on Backend
      const orderData = await createRazorpayOrder(total, `receipt_${Date.now()}`);
      if (!orderData || !orderData.id) {
        throw new Error('Failed to create secure order');
      }

      // 3. Prepare Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Bonny Velvet',
        description: 'Order Payment',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100&h=100',
        order_id: orderData.id,
        handler: (res: any) => finalizeOrder(res),
        prefill: {
          name: formData.name || user?.user_metadata?.full_name,
          email: formData.email || user?.email,
          contact: formData.phone,
        },
        theme: {
          color: '#400c2c',
        },
      };

      if (orderData.mock || orderData.id?.startsWith('order_mock_')) {
        setMockOptions(options);
        setShowMockModal(true);
        setLoading(false);
      } else {
        openRazorpayCheckout(options);
      }
    } catch (err: any) {
      console.error('Checkout Error:', err);
      setLoading(false);
      alert(err.message);
    }
  };

  const finalizeOrder = async (response: any) => {
    try {
      setLoading(true);
      // 4. Verify Payment on Backend
      const verification = await verifyRazorpayPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      if (verification.status === 'success') {
        setCreatedOrderId(response.razorpay_order_id);
        // 5. Save Order to Supabase
        const { error: dbError } = await supabase.from('orders').insert([{
          user_id: user?.id,
          amount: total,
          status: 'paid',
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          shipping_details: formData,
          total_items: cart.length
        }]);

        if (dbError) throw dbError;

        // 5.5 Create Account if requested
        if (formData.createAccount && !user) {
          try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: formData.email,
              password: formData.password,
              options: {
                data: {
                  full_name: formData.name,
                },
              },
            });

            if (signUpError) throw signUpError;

            if (signUpData.user) {
              await supabase.from('profiles').insert([
                { id: signUpData.user.id, email: formData.email, full_name: formData.name }
              ]);
            }
          } catch (authError) {
            console.error('Account Creation Error:', authError);
          }
        }

        // 6. Sync Order to WooCommerce (Optional but recommended)
        try {
          await createWooCommerceOrder(cart, formData, total, response.razorpay_payment_id);
        } catch (wcError) {
          console.error('WooCommerce Sync Error:', wcError);
        }

        // 7. Sync Order to Shiprocket for Fulfillment
        try {
          await syncOrderToShiprocket(cart, formData, total);
        } catch (srError) {
          console.error('Shiprocket Sync Error:', srError);
        }

        setSuccess(true);
        clearCart();
      } else {
        alert('Payment verification failed');
      }
    } catch (err: any) {
      console.error('Finalization Error:', err);
      alert('Error finalizing order: ' + err.message);
    } finally {
      setLoading(false);
      setShowMockModal(false);
    }
  };


  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-light/20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] text-center space-y-8 premium-shadow"
        >
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-black text-brand tracking-tight">Thank You!</h1>
            <p className="text-zinc-500 font-light leading-relaxed">
              Your order <span className="text-brand font-bold">#{createdOrderId.slice(0, 8)}</span> has been placed successfully. 
            </p>
            <div className="bg-zinc-50 p-6 rounded-3xl space-y-3">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Order Status</p>
              <div className="flex items-center justify-center space-x-2 text-green-600 font-bold">
                <Package size={16} />
                <span>Payment Verified & Confirmed</span>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-4">
              Track your ritual in <Link to="/account" className="text-brand underline">My Orders</Link>
            </p>
          </div>
          <Link 
            to="/shop" 
            className="block w-full bg-brand text-white font-bold py-5 rounded-full hover:bg-brand/90 transition-all uppercase tracking-widest text-xs"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  const MockPaymentModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white max-w-sm w-full rounded-[3rem] p-10 text-center space-y-8 premium-shadow"
      >
        <div className="w-20 h-20 bg-brand-light rounded-3xl mx-auto flex items-center justify-center text-brand">
          <CreditCard size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-black text-brand italic">Razorpay <span className="text-zinc-300">Simulated</span></h3>
          <p className="text-sm text-zinc-500 font-light px-4">This is a simulated interface because your Razorpay keys are in "Mock Mode".</p>
        </div>
        
        <div className="bg-zinc-50 p-6 rounded-3xl text-left space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount</span>
            <span className="font-bold text-brand">₹{total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Order ID</span>
            <span className="font-bold text-zinc-600 text-[10px] truncate max-w-[120px]">{mockOptions?.order_id}</span>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => finalizeOrder({
              razorpay_order_id: mockOptions.order_id,
              razorpay_payment_id: `pay_mock_${Math.random().toString(36).substring(7)}`,
              razorpay_signature: 'mock_signature'
            })}
            className="w-full bg-brand text-white font-bold py-5 rounded-full hover:bg-brand/90 transition-all uppercase tracking-widest text-[10px] premium-shadow"
          >
            Simulate Successful Payment
          </button>
          <button 
            onClick={() => {
              setShowMockModal(false);
              setLoading(false);
            }}
            className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            Cancel Payment
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center mb-12">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-brand transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-display font-black text-brand tracking-tight ml-4 italic">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Form */}
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-12">
            <section className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand text-white rounded-2xl flex items-center justify-center">
                  <User size={20} />
                </div>
                <h3 className="text-xl font-bold text-brand uppercase tracking-wider">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {!user && (
                <div className="space-y-6 pt-4">
                  <label className="flex items-center space-x-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        name="createAccount"
                        checked={formData.createAccount}
                        onChange={handleInputChange}
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-zinc-200 transition-all checked:bg-brand checked:border-brand"
                      />
                      <CheckCircle2 
                        size={16} 
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" 
                      />
                    </div>
                    <span className="text-sm font-bold text-brand uppercase tracking-widest">Create an account?</span>
                  </label>

                  <AnimatePresence>
                    {formData.createAccount && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pb-2">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Create Password</label>
                          <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                            <input
                              required
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                              placeholder="Min. 6 characters"
                              minLength={6}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </section>

            <section className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand text-white rounded-2xl flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <h3 className="text-xl font-bold text-brand uppercase tracking-wider">Shipping Details</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Street Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="Apt, Suite, Area..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">City</label>
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">State</label>
                    <input
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Pincode</label>
                    <input
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all font-medium text-brand"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 space-y-8 md:space-y-10 sticky top-24">
            <h3 className="text-xl font-bold text-brand uppercase tracking-wider italic">Order Summary</h3>
            
            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-16 h-20 bg-white rounded-2xl overflow-hidden shrink-0 border border-zinc-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="font-bold text-zinc-900 truncate text-sm">{item.name}</h4>
                    <p className="text-xs text-zinc-400 mt-1">Qty: {item.quantity}</p>
                    <p className="text-zinc-900 font-bold mt-2 text-sm">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-zinc-200">
              <div className="flex justify-between text-zinc-500 text-sm">
                <span className="uppercase tracking-widest font-bold text-[10px]">Subtotal</span>
                <span className="text-brand font-black">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-sm">
                <span className="uppercase tracking-widest font-bold text-[10px]">Shipping</span>
                <span className="text-brand font-black">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="pt-6 border-t border-zinc-200 flex justify-between items-baseline">
                <span className="text-brand font-display font-black text-xl uppercase italic">Total</span>
                <span className="text-3xl font-display font-black text-brand tracking-tighter">₹{total}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-white font-bold py-6 rounded-full hover:bg-brand/90 transition-all flex items-center justify-center space-x-4 premium-shadow group disabled:opacity-50"
            >
              <CreditCard size={20} className={loading ? 'animate-pulse' : ''} />
              <span className="uppercase tracking-[0.2em] text-[10px] font-black">
                {loading ? 'Processing...' : 'Secure Checkout'}
              </span>
            </button>

            <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest font-bold">
              Payments secured by Razorpay
            </p>
          </div>
        </div>
      </div>
      {showMockModal && <MockPaymentModal />}
    </div>
  );
};

export default Checkout;
