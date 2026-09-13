import React from 'react';
import { BRIDAL_ITEMS } from '../../data/bridal';
import { Sparkles, ArrowRight, HeartHandshake, Phone } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function BridalSection({ onSelectCategory, onContactClick }) {
  return (
    <section id="bridal" className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-gold-600" />
            <span>The Wedding Troussau</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-charcoal-950 tracking-tight">
            For Your Forever Moment
          </h2>
          <p className="text-base text-charcoal-600 mt-3 font-light leading-relaxed">
            Step into matrimony adorned in regal majesty. Handcrafted bridal chokers, matching solitaire bands, and heirloom sets tailored for your vows.
          </p>
          <div className="w-20 h-[2px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* 6 Bridal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRIDAL_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.category)}
              className="group bg-white rounded-3xl overflow-hidden border border-champagne-200/90 shadow-soft hover:shadow-luxury transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-champagne-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-3 left-4 text-xs font-semibold text-gold-300">
                  {item.priceRange}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-charcoal-950 group-hover:text-gold-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1 font-light">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-champagne-100 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold-700 group-hover:text-gold-900 flex items-center gap-1.5">
                    <span>Explore Designs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bridal Concierge Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-white border border-gold-300/70 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-serif font-bold text-charcoal-950">
              Planning a Grand Wedding or Custom Bridal Suite?
            </h4>
            <p className="text-xs text-charcoal-600">
              Book a private virtual appointment with our Senior Bridal Stylist or visit our showroom.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-6 py-3 bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Book Bridal Consultation
            </button>
            <a
              href={`tel:${BRAND.phone}`}
              className="w-full sm:w-auto px-6 py-3 border border-gold-400 bg-gold-50 text-charcoal-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold-600" />
              <span>{BRAND.formattedPhone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
