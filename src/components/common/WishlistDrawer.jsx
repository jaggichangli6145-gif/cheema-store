import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistDrawer({ onSelectProduct }) {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-gold-400/30">
          
          <div className="p-5 border-b border-champagne-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-serif font-bold text-charcoal-950 tracking-wider">
                My Wishlist ({wishlist.length})
              </h2>
            </div>
            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-400 mb-4">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal-900">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-charcoal-600 mt-2 max-w-xs">
                  Save pieces you love by tapping the heart icon on any jewellery card.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black transition-all text-xs uppercase font-semibold tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div 
                  key={product.id}
                  className="p-3.5 bg-white rounded-xl border border-champagne-200 shadow-soft flex gap-3.5 items-center"
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct(product);
                        setIsWishlistOpen(false);
                      }
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-gold-600 font-semibold">
                      {product.categoryLabel}
                    </div>
                    <h4 
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(product);
                          setIsWishlistOpen(false);
                        }
                      }}
                      className="text-sm font-serif font-bold text-charcoal-900 truncate cursor-pointer hover:text-gold-600"
                    >
                      {product.name}
                    </h4>
                    <div className="text-sm font-bold text-charcoal-950 mt-1">
                      {formatPrice(product.price)}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
