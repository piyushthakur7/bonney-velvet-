import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../CartContext';

const Toast = () => {
  const { toast, hideToast } = useCart();

  return (
    <AnimatePresence>
      {toast?.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] min-w-[320px] max-w-md w-full px-4"
        >
          <div className="bg-zinc-900 text-white p-4 rounded-2xl premium-shadow flex items-center justify-between gap-4 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shrink-0">
                <ShoppingBag size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-black uppercase tracking-widest text-brand">Success</p>
                <p className="text-sm font-medium text-zinc-100 line-clamp-1">{toast.message}</p>
              </div>
            </div>
            <button 
              onClick={hideToast}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
