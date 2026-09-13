import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Phone, Award } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function Hero({ onShopClick, onExploreClick, onCustomClick }) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#141312] text-white">
      {/* Background Editorial Image with Luxury Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85"
          alt="CHEEMA Luxury Fine Jewellery"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0D] via-[#141312]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-[#141312]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl space-y-7">
          
          {/* Subtle Royal Accent Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/40 text-gold-300 text-xs font-semibold tracking-[0.25em] uppercase shadow-sm">
            <Gem className="w-3.5 h-3.5 text-gold-400" />
            <span>CHEEMA HAUTE JOAILLERIE &bull; EST. 1994</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-[1.08]">
            Timeless Jewellery. <br />
            <span className="font-semibold italic gold-gradient-text">
              Made to Shine.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#D6D0C5] font-light leading-relaxed max-w-xl">
            Discover exquisite jewellery designed to celebrate your most beautiful moments. Certified conflict-free natural diamonds, 22K hallmarked gold, and bespoke heirlooms.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onShopClick}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-[0.2em] shadow-luxury hover:scale-105 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Shop Jewellery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full border border-gold-400/50 bg-white/5 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <span>Explore Collection</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#33302B] text-xs text-[#B8B2A7]">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>100% Certified Diamonds</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Government BIS 916 Pure Gold</span>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Concierge: <strong className="text-white">{BRAND.phone}</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Side Editorial Badge */}
      <div className="hidden xl:block absolute right-16 bottom-20 z-10">
        <div className="glass-card p-5 rounded-2xl max-w-xs text-charcoal-900 border border-gold-400/40 shadow-2xl bg-white/90">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-gold-700 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span>Featured Masterpiece</span>
          </div>
          <div className="text-sm font-serif font-bold text-charcoal-950 mt-1">
            Solitaire Diamond Cathedral Ring
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            1.50 Carat D-Flawless Natural Diamond &bull; 18K White Gold
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-900">₹1,85,000</span>
            <button
              onClick={onShopClick}
              className="text-[11px] font-semibold text-gold-700 hover:text-gold-900 underline"
            >
              Discover &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
