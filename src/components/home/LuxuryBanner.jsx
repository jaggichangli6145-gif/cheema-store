import React from 'react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function LuxuryBanner({ onDiscoverClick, onContactClick }) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#141312] text-white">
      {/* Background Image with Gold Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85"
          alt="CHEEMA Haute Joaillerie Banner"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141312] via-[#141312]/80 to-[#141312]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-[0.3em] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHEEMA SIGNATURE ATELIER</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
          Elegance That Lasts Forever
        </h2>

        <p className="text-base sm:text-xl text-[#D0C9BE] font-light max-w-2xl mx-auto leading-relaxed">
          Crafted with precision. Designed for unforgettable moments. Each creation is backed by lifetime buyback and genuine BIS certification.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDiscoverClick}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-[0.2em] shadow-luxury hover:scale-105 transition-all flex items-center gap-3"
          >
            <span>Discover More</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${BRAND.phone}`}
            className="px-7 py-4 rounded-full border border-gold-400/40 bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Call Concierge: {BRAND.formattedPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
