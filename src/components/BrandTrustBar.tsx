import React from 'react';
import { motion } from 'motion/react';
import { 
  Rabbit, 
  Leaf, 
  ShieldCheck, 
  Award, 
  BadgeCheck, 
  Globe, 
  FlaskConicalOff, 
  DropletOff, 
  ZapOff, 
  Stethoscope,
  Sparkles
} from 'lucide-react';

export const PROMISES = [
  { id: 'sulfate', label: 'Sulphate Free', icon: FlaskConicalOff, desc: 'Zero harsh chemicals' },
  { id: 'paraben', label: 'Paraben Free', icon: ZapOff, desc: 'Safe preservation' },
  { id: 'cruelty', label: 'Cruelty Free', icon: Rabbit, desc: 'Never tested on animals' },
  { id: 'fda', label: 'FDA Approved', icon: BadgeCheck, desc: 'Certified safety' },
  { id: 'iso', label: 'ISO Certified', icon: Award, desc: 'Quality guaranteed' },
  { id: 'formaldehyde', label: 'Formaldehyde Free', icon: ShieldCheck, desc: 'Clean formulation' },
  { id: 'mineral', label: 'No Mineral Oil', icon: DropletOff, desc: 'Pure plant-based' },
  { id: 'usa', label: 'Formulated in USA', icon: Globe, desc: 'Premium standards' },
  { id: 'vegan', label: '100% Vegan', icon: Leaf, desc: 'Plant-derived only' },
  { id: 'dermat', label: 'Dermatologist Tested', icon: Stethoscope, desc: 'Clinically proven' },
];

interface BrandTrustBarProps {
  mode?: 'marquee' | 'grid' | 'list';
  speed?: number;
}

const BrandTrustBar: React.FC<BrandTrustBarProps> = ({ mode = 'marquee', speed = 25 }) => {
  if (mode === 'marquee') {
    return (
      <div className="bg-brand py-8 overflow-hidden whitespace-nowrap relative border-y border-white/10 group">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: speed, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex space-x-12 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {PROMISES.map((promise) => (
                <div key={`${i}-${promise.id}`} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/80 transition-colors group-hover:bg-white group-hover:text-brand">
                    <promise.icon size={20} />
                  </div>
                  <span className="text-white text-sm font-display font-black uppercase tracking-[0.3em]">
                    {promise.label}
                  </span>
                  <Sparkles className="text-white/20 mx-6" size={14} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    );
  }

  if (mode === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {PROMISES.map((promise) => (
          <motion.div 
            key={promise.id} 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center p-6 bg-brand-light rounded-[2rem] border border-brand/5 space-y-4 premium-shadow transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand premium-shadow">
              <promise.icon size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black text-brand uppercase tracking-widest">{promise.label}</h4>
              <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-tight">{promise.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {PROMISES.map((promise, i) => (
        <motion.div 
          key={promise.id} 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center space-x-6 p-6 rounded-[2.5rem] bg-white border border-zinc-100 hover:border-brand/20 transition-all group"
        >
          <div className="w-16 h-16 bg-brand-light rounded-[1.5rem] flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-500">
            <promise.icon size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-display font-black text-brand tracking-tight">{promise.label}</h3>
            <p className="text-zinc-500 font-light text-sm">{promise.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BrandTrustBar;
