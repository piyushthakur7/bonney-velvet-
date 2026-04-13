import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const BottomFloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#a6cbeb] border-t border-blue-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-safe"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 relative">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-2 top-2 p-1 text-blue-900/50 hover:text-blue-900 bg-white/30 rounded-full transition-colors z-10"
              aria-label="Close banner"
            >
              <X size={16} />
            </button>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-blue-950 font-bold text-sm sm:text-base leading-tight pr-6">
                  Lalduhawmi is leading the leaderboard!
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                  <p className="text-blue-900/80 text-xs sm:text-sm font-medium">
                    Think you can beat her? Shop now to win!
                  </p>
                </div>
              </div>
              <div className="hidden sm:block shrink-0">
                 <img 
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&h=100&w=150" 
                    alt="Laptop prize" 
                    className="h-12 w-auto mix-blend-multiply rounded opacity-90"
                 />
              </div>
            </div>
            {/* Mobile full block link overlay */}
            <Link to="/shop" className="absolute inset-0 z-0">
              <span className="sr-only">Go to shop</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomFloatingBanner;
