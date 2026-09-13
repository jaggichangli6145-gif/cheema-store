import React, { useState, useMemo } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../product/ProductCard';
import { Sparkles } from 'lucide-react';

export default function NewArrivals({ onQuickView, onOpenDetail }) {
  const { products } = useProducts();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets'];

  const filteredItems = useMemo(() => {
    let items = (products || []).filter(p => p.isNew || p.newArrival);
    if (items.length === 0) items = (products || []).slice(0, 4);

    if (activeFilter === 'All') {
      return items.slice(0, 4);
    }
    const cat = activeFilter.toLowerCase();
    const matches = (products || []).filter(p => p.category === cat);
    return matches.slice(0, 4);
  }, [products, activeFilter]);

  return (
    <section id="new-arrivals" className="py-20 bg-white border-b border-champagne-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latest Haute Joaillerie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-sm text-charcoal-600 mt-2 font-light">
            Freshly unveiled silhouettes crafted in our atelier for this festive and wedding season.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeFilter === filter
                  ? 'bg-charcoal-950 text-gold-300 shadow-md scale-105'
                  : 'bg-[#F8F5EE] text-charcoal-700 hover:bg-gold-100 hover:text-charcoal-950'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
