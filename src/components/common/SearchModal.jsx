import React, { useState, useMemo } from 'react';
import { Search, X, Gem, ArrowRight, Star } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const { products: PRODUCTS } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { formatPrice } = useCurrency();

  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'rings', label: 'Rings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'bracelets', label: 'Bracelets' },
    { id: 'bangles', label: 'Bangles' },
    { id: 'pendants', label: 'Pendants' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'mens', label: "Men's" }
  ];

  const filteredProducts = useMemo(() => {
    if (!searchTerm && selectedCategory === 'all') return [];

    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const query = searchTerm.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery = 
        p.name.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query) ||
        p.collectionLabel.toLowerCase().includes(query) ||
        p.metal.toLowerCase().includes(query) ||
        p.gemstone.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 pt-16">
        <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-gold-400/30 overflow-hidden flex flex-col max-h-[85vh]">
          
          <div className="p-5 sm:p-6 border-b border-champagne-200 bg-white flex items-center gap-3">
            <Search className="w-6 h-6 text-gold-600 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search diamonds, royal gold necklaces, solitaires, tennis bracelets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-base sm:text-lg bg-transparent border-none outline-none text-charcoal-900 placeholder:text-gray-400 font-sans"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="text-gray-400 hover:text-charcoal-900 text-xs px-2 py-1 rounded bg-gray-100"
              >
                Clear
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-5 py-3 bg-champagne-50/70 border-b border-champagne-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-gray-500 font-medium whitespace-nowrap">Filter:</span>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-gold-500 text-white font-semibold shadow-sm'
                    : 'bg-white text-charcoal-700 hover:bg-gold-100 border border-champagne-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {searchTerm === '' && selectedCategory === 'all' ? (
              <div className="text-center py-10">
                <Gem className="w-12 h-12 mx-auto text-gold-400 mb-3 stroke-[1.2]" />
                <h3 className="text-lg font-serif font-bold text-charcoal-900">
                  Search CHEEMA High Jewellery
                </h3>
                <p className="text-xs text-charcoal-600 mt-1 max-w-md mx-auto">
                  Type any jewel name, metal (22K Gold, 18K White Gold, Platinum), or gemstone.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
                  <span className="text-gray-500 self-center">Popular:</span>
                  {['Solitaire Diamond Ring', 'Classic Gold Necklace', 'Tennis Bracelet', 'Bridal Diamond Set', 'Emerald Pendant'].map(pop => (
                    <button
                      key={pop}
                      onClick={() => setSearchTerm(pop)}
                      className="px-3 py-1 bg-white hover:bg-gold-100 text-charcoal-800 rounded-full border border-gold-300/60 transition-colors"
                    >
                      {pop}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-base font-serif text-charcoal-800">
                  No matching jewellery found for "{searchTerm}"
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Need a bespoke design? Call our Master Jeweller directly at <strong>7814249224</strong>.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xs font-semibold text-charcoal-500 uppercase tracking-widest mb-3">
                  Found {filteredProducts.length} Piece{filteredProducts.length > 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="group bg-white p-3 rounded-xl border border-champagne-200 hover:border-gold-400 hover:shadow-luxury transition-all cursor-pointer flex gap-3 items-center"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] uppercase tracking-wider text-gold-600 font-semibold">
                          {product.categoryLabel}
                        </div>
                        <h4 className="text-sm font-serif font-bold text-charcoal-950 truncate group-hover:text-gold-600 transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating} ({product.reviewCount})</span>
                        </div>
                        <div className="text-sm font-bold text-charcoal-900 mt-1">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-gold-50/90 border-t border-gold-200/80 text-center text-xs text-charcoal-700">
            <span>Looking for custom sizes or bridal suites? Call our concierge: </span>
            <a href="tel:7814249224" className="font-bold text-gold-800 underline ml-1">
              +91 78142 49224
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
