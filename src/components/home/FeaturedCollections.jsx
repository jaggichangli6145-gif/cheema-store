import React from 'react';
import { COLLECTIONS } from '../../data/collections';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedCollections({ onSelectCollection }) {
  return (
    <section id="collections" className="py-20 bg-white border-y border-champagne-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exquisite Craftsmanship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
            Our Signature Collections
          </h2>
          <p className="text-sm text-charcoal-600 mt-3 font-light">
            Distinctive design narratives rendered in precious metals and extraordinary gemstones.
          </p>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* 6 Signature Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col)}
              className="group relative h-[420px] rounded-3xl overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-500 cursor-pointer flex flex-col justify-end p-8 border border-champagne-200"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 space-y-2.5">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/50 text-gold-300 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                  {col.tag}
                </span>

                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                  {col.name}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-light line-clamp-2">
                  {col.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
