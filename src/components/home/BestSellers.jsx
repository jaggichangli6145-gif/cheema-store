import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../product/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function BestSellers({ onQuickView, onOpenDetail, onOpenCatalog }) {
  const { products } = useProducts();
  const bestsellersList = (products || []).filter(p => p.isBestseller || p.featured).slice(0, 8);

  return (
    <section id="bestsellers" className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-center md:text-left">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Beloved Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
              Bestsellers
            </h2>
            <p className="text-sm text-charcoal-600 mt-2 font-light max-w-xl">
              Our most celebrated designs, adored for unmatched elegance and timeless beauty.
            </p>
          </div>

          <button
            onClick={() => onOpenCatalog()}
            className="self-center md:self-end text-xs uppercase tracking-widest font-bold text-charcoal-900 hover:text-gold-700 transition-colors flex items-center gap-1.5 border-b border-charcoal-900 pb-1"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestsellersList.map((product) => (
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
