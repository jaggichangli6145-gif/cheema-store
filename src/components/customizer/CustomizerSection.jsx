import React from 'react';
import { Sparkles, ArrowRight, Wand2, Gem, Layers, Edit3 } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function CustomizerSection({ onStartCustomizing }) {
  const options = [
    {
      icon: Gem,
      title: "Custom Rings",
      description: "Select your solitaire cut, carat weight, prong basket, and band metal."
    },
    {
      icon: Layers,
      title: "Custom Necklaces",
      description: "Tailor chain styles, pendant settings, diamond clusters, and gemstone accents."
    },
    {
      icon: Edit3,
      title: "Complimentary Engraving",
      description: "Laser inscribe names, initials, wedding dates, or poetic sentiments inside bands."
    },
    {
      icon: Sparkles,
      title: "Custom Diamond Jewellery",
      description: "From certified tennis bracelets to bespoke chandelier earrings tailored to your vision."
    }
  ];

  return (
    <section id="customizer" className="py-24 bg-[#171615] text-white relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=85"
          alt="Bespoke Jewellery Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171615] via-[#171615]/90 to-[#171615]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-[0.25em] uppercase">
            <Wand2 className="w-3.5 h-3.5 text-gold-400" />
            <span>Bespoke Atelier</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Create Something Truly Yours
          </h2>

          <p className="text-base text-[#D4CEC3] font-light leading-relaxed max-w-2xl mx-auto">
            Collaborate directly with our master goldsmiths and gemologists to bring your dream jewellery to life. Choose your diamond, metal, and personal engraving.
          </p>

          <div className="pt-2">
            <button
              onClick={onStartCustomizing}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-[0.2em] shadow-luxury hover:scale-105 transition-all inline-flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Customizing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={i}
                onClick={onStartCustomizing}
                className="group p-6 rounded-2xl bg-[#211F1D]/80 border border-[#3A3731] hover:border-gold-400/70 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black transition-all">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#33302B] flex items-center text-xs font-semibold text-gold-400 group-hover:text-gold-300">
                  <span>Configure Now &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
