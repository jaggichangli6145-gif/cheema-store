import React, { useState } from 'react';
import { 
  X, Heart, ShoppingBag, Star, ShieldCheck, Truck, 
  RefreshCw, Phone, Check, ArrowRight, Award, Sparkles 
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PRODUCTS } from '../../data/products';
import { BRAND } from '../../data/brand';

export default function ProductDetailModal({ product, isOpen, onClose, onSelectProduct }) {
  const { formatPrice } = useCurrency();
  const { addToCart, setIsCheckoutOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : 'Standard'
  );
  const [selectedMetal, setSelectedMetal] = useState(product?.metal || '18K Yellow Gold');
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState('specs');

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, {
      size: selectedSize,
      metal: selectedMetal,
      engraving: engravingText,
      quantity
    });
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-5xl bg-[#FBF9F5] rounded-3xl shadow-2xl border border-gold-400/30 overflow-hidden flex flex-col">
          
          <div className="p-4 px-6 border-b border-champagne-200 bg-white flex justify-between items-center">
            <div className="text-xs tracking-wider uppercase text-gray-500">
              {BRAND.name} &bull; <span className="text-gold-600 font-semibold">{product.categoryLabel}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-[85vh] space-y-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-champagne-200 shadow-soft relative group">
                  <img 
                    src={product.images[activeImage] || product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-bold uppercase tracking-wider shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-white transition-all ${
                          activeImage === idx ? 'border-gold-500 scale-105 shadow-md' : 'border-champagne-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Angle" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                    {product.collectionLabel}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 mt-1">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-2 text-xs text-amber-600 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-bold text-charcoal-900">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-3xl font-serif font-bold text-charcoal-950">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      Regular Price: {formatPrice(product.originalPrice)}
                    </div>
                  )}
                  <div className="text-[11px] text-green-700 font-medium mt-1">
                    Includes all applicable taxes & insured express courier
                  </div>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {product.description}
                </p>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1.5">
                    Metal Selection:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['18K Yellow Gold', '18K White Gold', '18K Rose Gold', '950 Platinum'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMetal(m)}
                        className={`p-2 rounded-lg border text-left font-medium transition-all ${
                          selectedMetal === m
                            ? 'border-gold-500 bg-gold-50 text-gold-900 shadow-sm'
                            : 'border-champagne-200 bg-white text-charcoal-700 hover:bg-gray-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-charcoal-900">
                        Size / Dimensions:
                      </label>
                      <span className="text-[11px] text-gold-700 underline cursor-pointer">
                        Size Guide
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedSize === s
                              ? 'bg-gold-500 text-white font-bold shadow-sm'
                              : 'bg-white border border-champagne-200 text-charcoal-800 hover:bg-gold-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">
                    Complimentary Laser Engraving (Optional):
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="e.g. Forever Yours, J&M, 14.02.26"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-champagne-200 rounded-lg outline-none focus:border-gold-500"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex items-center border border-gray-200 rounded-xl bg-white px-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 py-1 text-charcoal-600 hover:text-charcoal-950 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-charcoal-950">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 py-1 text-charcoal-600 hover:text-charcoal-950 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, {
                          size: selectedSize,
                          metal: selectedMetal,
                          engraving: engravingText,
                          quantity
                        });
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
                      title={inWishlist ? "In Wishlist" : "Add to Wishlist"}
                    >
                      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500' : ''}`} />
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 hover:from-gold-400 hover:to-gold-300 transition-all font-bold text-xs uppercase tracking-widest shadow-luxury flex items-center justify-center gap-2"
                  >
                    <span>Buy Now &bull; Instant Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="p-3 bg-gold-50 rounded-xl border border-gold-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-charcoal-800">
                      <Phone className="w-4 h-4 text-gold-600" />
                      <span>Speak with Master Jeweller:</span>
                    </div>
                    <a 
                      href={`tel:${BRAND.phone}`} 
                      className="font-bold text-gold-800 hover:underline"
                    >
                      {BRAND.formattedPhone}
                    </a>
                  </div>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl border border-champagne-200 overflow-hidden shadow-soft">
              <div className="flex border-b border-champagne-200 bg-champagne-50/60">
                {[
                  { id: 'specs', label: 'Detailed Specifications' },
                  { id: 'shipping', label: 'Delivery & Returns' },
                  { id: 'authenticity', label: 'Certificate & Hallmarking' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors text-center ${
                      activeTab === tab.id
                        ? 'bg-white text-gold-700 border-b-2 border-gold-500 font-bold shadow-sm'
                        : 'text-charcoal-600 hover:text-charcoal-950'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Metal Type</span>
                      <div className="font-bold text-charcoal-900">{product.metal}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Purity Hallmark</span>
                      <div className="font-bold text-charcoal-900">{product.metalPurity}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Gross Weight</span>
                      <div className="font-bold text-charcoal-900">{product.weight}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Gemstone</span>
                      <div className="font-bold text-charcoal-900">{product.gemstone}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Diamond Carat</span>
                      <div className="font-bold text-charcoal-900">{product.diamondCarat}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Clarity & Color</span>
                      <div className="font-bold text-charcoal-900">{product.clarity} / {product.diamondColor}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Cut Quality</span>
                      <div className="font-bold text-charcoal-900">{product.cut}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Occasion</span>
                      <div className="font-bold text-charcoal-900">{product.occasion}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 uppercase tracking-wider text-[10px]">Authenticity Certificate</span>
                      <div className="font-bold text-gold-700">{product.certificate}</div>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-4 text-xs text-charcoal-700 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-charcoal-900 block font-serif text-sm">
                          White-Glove Insured Delivery ({product.deliveryDays})
                        </strong>
                        Every piece travels in a tamper-evident armoured parcel with 100% loss/theft insurance until signed by you.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-charcoal-900 block font-serif text-sm">
                          30-Day Hassle-Free Exchange & Return
                        </strong>
                        Enjoy 30 days to try your piece. Full refund or exchange with complimentary door-step return pickup.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'authenticity' && (
                  <div className="space-y-3 text-xs text-charcoal-700">
                    <div className="flex items-center gap-2 text-gold-800 font-bold font-serif text-base">
                      <Award className="w-5 h-5 text-gold-600" />
                      <span>Certified by Leading Gemological Laboratories</span>
                    </div>
                    <p className="leading-relaxed">
                      All CHEEMA diamonds and precious metals are strictly inspected and authenticated. Each diamond 0.50 ct and above carries a micro-laser inscription on its girdle matching its official GIA/IGI certificate. Pure gold is hallmarked under government BIS standards.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {relatedProducts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-charcoal-950">
                  You May Also Admire
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProduct(rel)}
                      className="group bg-white p-3 rounded-xl border border-champagne-200 hover:border-gold-400 hover:shadow-luxury cursor-pointer transition-all flex gap-3 items-center"
                    >
                      <img 
                        src={rel.images[0]} 
                        alt={rel.name}
                        className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-gold-600 font-semibold truncate">
                          {rel.categoryLabel}
                        </div>
                        <h4 className="text-xs font-serif font-bold text-charcoal-900 truncate group-hover:text-gold-600">
                          {rel.name}
                        </h4>
                        <div className="text-xs font-bold text-charcoal-950 mt-0.5">
                          {formatPrice(rel.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
