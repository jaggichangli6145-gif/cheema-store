import React, { useState, useMemo } from 'react';
import { 
  X, Filter, SlidersHorizontal, ArrowUpDown, RefreshCcw, 
  Search, Gem, Sparkles 
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../product/ProductCard';
import { useCurrency } from '../../context/CurrencyContext';

export default function ShopCatalogModal({ 
  isOpen, 
  onClose, 
  initialCategory, 
  onQuickView, 
  onOpenDetail 
}) {
  const { products: PRODUCTS } = useProducts();
  const { formatPrice } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedMetal, setSelectedMetal] = useState('all');
  const [selectedGemstone, setSelectedGemstone] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest', 'rating'
  const [maxPrice, setMaxPrice] = useState(700000);
  const [minRating, setMinRating] = useState(0);

  // Sync initial category if changed from parent
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'rings', label: 'Rings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'bracelets', label: 'Bracelets' },
    { id: 'bangles', label: 'Bangles' },
    { id: 'pendants', label: 'Pendants' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'mens', label: "Men's Jewellery" }
  ];

  const metals = ['all', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'];
  const gemstones = ['all', 'Diamond', 'Pearl', 'Emerald', 'Ruby'];
  const occasions = ['all', 'Bridal', 'Everyday', 'Evening'];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMetal('all');
    setSelectedGemstone('all');
    setSelectedOccasion('all');
    setMaxPrice(700000);
    setMinRating(0);
    setSortBy('featured');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        if (selectedCategory === 'diamond' && !p.gemstoneType.includes('Diamond')) return false;
        if (selectedCategory === 'gold' && !p.metal.includes('Gold')) return false;
        if (selectedCategory !== 'diamond' && selectedCategory !== 'gold') return false;
      }

      // Metal filter
      if (selectedMetal !== 'all' && !p.metal.toLowerCase().includes(selectedMetal.toLowerCase())) {
        return false;
      }

      // Gemstone filter
      if (selectedGemstone !== 'all' && !p.gemstone.toLowerCase().includes(selectedGemstone.toLowerCase())) {
        return false;
      }

      // Occasion filter
      if (selectedOccasion !== 'all' && p.occasion !== selectedOccasion) {
        return false;
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (p.rating < minRating) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q) ||
          p.gemstone.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    selectedCategory,
    selectedMetal,
    selectedGemstone,
    selectedOccasion,
    maxPrice,
    minRating,
    searchQuery,
    sortBy
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex flex-col bg-[#FBF9F5] z-10">
        
        {/* Top Sticky Filter Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-champagne-200 shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-950 tracking-wider">
                  CHEEMA Fine Jewellery Catalogue
                </h2>
                <div className="text-[11px] text-gold-600 font-semibold uppercase tracking-widest">
                  Showing {filteredAndSortedProducts.length} Authenticated Pieces
                </div>
              </div>
              <button
                onClick={onClose}
                className="md:hidden p-2 rounded-full hover:bg-gold-50 text-charcoal-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Search & Sort */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search catalogue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl border border-champagne-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-gold-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none font-medium text-charcoal-800"
                >
                  <option value="featured">Featured Selection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Best Rated (5★)</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="p-2 text-charcoal-600 hover:text-gold-700 hover:bg-gold-50 rounded-xl flex items-center gap-1"
                title="Reset All Filters"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={onClose}
                className="hidden md:block p-2 rounded-full hover:bg-gold-50 text-charcoal-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>

        {/* Main Content: Sidebar + Products Grid */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-champagne-200 shadow-soft space-y-5 text-xs">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="font-serif font-bold text-sm text-charcoal-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-gold-600" />
                  <span>Refine Catalogue</span>
                </span>
                <button onClick={resetFilters} className="text-[11px] text-gold-700 underline">
                  Clear
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-charcoal-800 mb-2 uppercase tracking-wider text-[11px]">
                  Category
                </label>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === c.id
                          ? 'bg-gold-500 text-white font-bold'
                          : 'text-charcoal-700 hover:bg-gold-50'
                      }`}
                    >
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-semibold text-charcoal-800 uppercase tracking-wider text-[11px]">
                    Max Price
                  </label>
                  <span className="font-bold text-gold-700">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="700000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              {/* Metal Alloy */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block font-semibold text-charcoal-800 mb-2 uppercase tracking-wider text-[11px]">
                  Metal Alloy
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {metals.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMetal(m)}
                      className={`px-2.5 py-1 rounded-lg border transition-all capitalize ${
                        selectedMetal === m
                          ? 'bg-gold-500 text-white font-semibold border-gold-500'
                          : 'bg-white text-charcoal-700 border-champagne-200 hover:bg-gold-50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gemstone */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block font-semibold text-charcoal-800 mb-2 uppercase tracking-wider text-[11px]">
                  Gemstone
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {gemstones.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGemstone(g)}
                      className={`px-2.5 py-1 rounded-lg border transition-all capitalize ${
                        selectedGemstone === g
                          ? 'bg-gold-500 text-white font-semibold border-gold-500'
                          : 'bg-white text-charcoal-700 border-champagne-200 hover:bg-gold-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block font-semibold text-charcoal-800 mb-2 uppercase tracking-wider text-[11px]">
                  Occasion
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {occasions.map((o) => (
                    <button
                      key={o}
                      onClick={() => setSelectedOccasion(o)}
                      className={`px-2.5 py-1 rounded-lg border transition-all capitalize ${
                        selectedOccasion === o
                          ? 'bg-gold-500 text-white font-semibold border-gold-500'
                          : 'bg-white text-charcoal-700 border-champagne-200 hover:bg-gold-50'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Product Grid: 9 Cols */}
          <div className="lg:col-span-9">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-champagne-200 shadow-soft">
                <Gem className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h3 className="text-xl font-serif font-bold text-charcoal-900">
                  No jewellery matches your active filters
                </h3>
                <p className="text-xs text-charcoal-600 mt-2 max-w-sm mx-auto">
                  Try clearing some filter criteria or search for another precious piece.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-charcoal-950 text-gold-300 rounded-full text-xs uppercase font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
