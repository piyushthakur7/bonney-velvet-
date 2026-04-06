import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { User, Package, MapPin, LogOut, ChevronRight, Settings, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setOrders(ordersData || []);
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-10 premium-shadow space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-brand text-white rounded-[2rem] flex items-center justify-center">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black text-brand tracking-tight leading-none italic">{profile?.full_name || 'Guest'}</h2>
                  <p className="text-zinc-400 text-sm font-light mt-2">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-100">
                <button className="w-full flex items-center justify-between p-4 hover:bg-brand-light rounded-2xl transition-all group">
                  <div className="flex items-center space-x-4 text-brand font-bold uppercase tracking-widest text-xs">
                    <Package size={18} />
                    <span>My Orders</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300 group-hover:text-brand transition-transform group-hover:translate-x-1" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-brand-light rounded-2xl transition-all group">
                  <div className="flex items-center space-x-4 text-brand font-bold uppercase tracking-widest text-xs">
                    <MapPin size={18} />
                    <span>Addresses</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300 group-hover:text-brand transition-transform group-hover:translate-x-1" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-brand-light rounded-2xl transition-all group">
                  <div className="flex items-center space-x-4 text-brand font-bold uppercase tracking-widest text-xs">
                    <Settings size={18} />
                    <span>Settings</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300 group-hover:text-brand transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => signOut()}
                  className="w-full flex items-center space-x-4 p-4 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-50 rounded-2xl transition-all"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>

            <div className="bg-brand rounded-[3rem] p-10 text-white space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-xl font-display font-black tracking-tight leading-none">Need Help?</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">Our support team is available 24/7 to help you with your orders.</p>
              <Link to="/contact" className="inline-block bg-white text-brand px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">Contact Us</Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-display font-black text-brand tracking-tighter italic">Order <span className="text-zinc-300">History</span></h2>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{orders.length} TOTAL ORDERS</span>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order, i) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[3rem] p-8 md:p-10 premium-shadow border border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-brand/20 transition-all"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-bold text-zinc-900">Order #{order.id.slice(0, 8)}</h4>
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            order.status === 'paid' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-12 px-6 border-l border-zinc-100 h-10 hidden md:flex">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">ITEMS</p>
                        <p className="font-bold text-zinc-900 leading-none">{order.total_items || 1}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">TOTAL</p>
                        <p className="font-bold text-zinc-900 leading-none">₹{order.amount}</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <button className="bg-brand text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all premium-shadow">
                        Track Order
                      </button>
                      <button className="bg-brand-light text-brand p-4 rounded-full group-hover:bg-brand group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[4rem] p-24 text-center space-y-10 premium-shadow border border-zinc-100 border-dashed">
                <div className="w-24 h-24 bg-zinc-50 text-zinc-200 rounded-full flex items-center justify-center mx-auto">
                  <Package size={48} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-black text-brand tracking-tight">No Orders Yet</h3>
                  <p className="text-zinc-500 font-light max-w-sm mx-auto leading-relaxed">You haven't placed any orders yet. Start shopping to find the perfect ritual for your skin.</p>
                </div>
                <Link to="/shop" className="inline-block bg-brand text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all premium-shadow">Shop Collection</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
