import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function QuickViewModal({ product, isOpen, onClose, onOpenDetail }) {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : 'Standard'
  );

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-gold-400/30 overflow-hidden">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-700 shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            <div className="p-6 bg-white flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-champagne-200">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-champagne-50/50 mb-3">
                <img 
                  src={product.images[selectedImage] || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-gold-500 scale-105' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                  {product.categoryLabel} &bull; {product.collectionLabel}
                </div>

                <h3 className="text-2xl font-serif font-bold text-charcoal-950">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-amber-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-charcoal-800">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>

                <div className="text-2xl font-serif font-bold text-charcoal-950 pt-1">
                  {formatPrice(product.price)}
                  {product.originalPrice && (
                    <span className="text-sm font-normal text-gray-400 line-through ml-2 font-sans">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-champagne-50/70 p-3 rounded-xl border border-champagne-200">
                  <div>
                    <span className="text-gray-500">Purity: </span>
                    <strong className="text-charcoal-900">{product.metalPurity}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight: </span>
                    <strong className="text-charcoal-900">{product.weight}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500">Stone: </span>
                    <strong className="text-charcoal-900">{product.gemstone}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500">Cert: </span>
                    <strong className="text-charcoal-900">{product.certificate.split('&')[0]}</strong>
                  </div>
                </div>

                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                      Select Size / Length:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                            selectedSize === s
                              ? 'bg-gold-500 text-white shadow-sm'
                              : 'bg-white border border-champagne-200 text-charcoal-800 hover:bg-gold-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 space-y-2.5">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, { size: selectedSize });
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black transition-all font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-all ${
                      inWishlist 
                        ? 'border-red-300 bg-red-50 text-red-500' 
                        : 'border-champagne-200 bg-white text-charcoal-700 hover:bg-gold-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenDetail(product);
                  }}
                  className="w-full text-center text-xs font-semibold text-gold-700 hover:text-gold-900 transition-colors flex items-center justify-center gap-1 py-1"
                >
                  <span>View Full Product Specifications & Sizing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
