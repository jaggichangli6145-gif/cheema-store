import React from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, onQuickView, onOpenDetail }) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-champagne-200/80 overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-500 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-champagne-50/50 cursor-pointer">
        <img
          src={product.images[0]}
          alt={product.name}
          onClick={() => onOpenDetail(product)}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#171615] text-gold-300 text-[10px] font-bold tracking-widest uppercase shadow">
              NEW
            </span>
          )}
          {product.badge && !product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-white text-[10px] font-bold tracking-widest uppercase shadow">
              {product.badge}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist
              ? 'bg-red-50 text-red-500 shadow-md'
              : 'bg-white/80 text-charcoal-700 hover:bg-white hover:text-red-500 shadow-sm backdrop-blur-sm'
          }`}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500' : ''}`} />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md text-charcoal-900 hover:bg-charcoal-950 hover:text-gold-300 text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold text-gold-600 uppercase tracking-widest">
            {product.categoryLabel} &bull; {product.metal}
          </div>

          <h3 
            onClick={() => onOpenDetail(product)}
            className="text-base font-serif font-bold text-charcoal-950 mt-1 cursor-pointer hover:text-gold-600 transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-champagne-100 flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-bold text-charcoal-950 font-serif">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through -mt-0.5">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-charcoal-950 hover:bg-gold-500 text-gold-300 hover:text-black transition-all shadow-sm flex items-center gap-1.5"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
