import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section id="categories" className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2">
            Curated Elegance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
            Shop By Category
          </h2>
          <p className="text-sm text-charcoal-600 mt-3 font-light">
            Explore our iconic creations, from dazzling diamond solitaires to royal heritage gold jewellery.
          </p>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-champagne-200/80 shadow-soft hover:shadow-luxury transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-champagne-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Card Bottom Details */}
              <div className="p-4 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-charcoal-950 group-hover:text-gold-600 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {cat.count} Designs
                  </div>
                </div>

                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700 group-hover:text-gold-900 group-hover:translate-x-1 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
