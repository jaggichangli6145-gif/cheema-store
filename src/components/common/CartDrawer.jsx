import React, { useState } from 'react';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  Sparkles, Tag, ShieldCheck, MessageCircle 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { BRAND } from '../../data/brand';

export default function CartDrawer({ onSelectProduct }) {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    discountAmount, 
    estimatedShipping, 
    total, 
    promoCode, 
    promoMessage, 
    applyPromoCode, 
    removePromoCode,
    setIsCheckoutOpen 
  } = useCart();
  
  const { formatPrice } = useCurrency();
  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-gold-400/30">
          
          {/* Header */}
          <div className="p-5 border-b border-champagne-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-600" />
              <h2 className="text-lg font-serif font-bold text-charcoal-950 tracking-wider">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Shipping Notification */}
          <div className="bg-gold-50/80 px-5 py-2.5 border-b border-gold-200/60 flex items-center gap-2 text-xs text-charcoal-800">
            <Sparkles className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <span>
              {subtotal > 50000 
                ? "✨ Complimentary Insured Express Shipping Unlocked!"
                : "Insured transit & tamper-evident signature box included"}
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal-900">
                  Your bag is empty
                </h3>
                <p className="text-xs text-charcoal-600 mt-2 max-w-xs">
                  Discover our timeless solitaires, royal necklaces, and signature bridal suites.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black transition-all text-xs uppercase font-semibold tracking-wider"
                >
                  Explore Jewellery
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.cartItemId}
                  className="p-3.5 bg-white rounded-xl border border-champagne-200 shadow-soft flex gap-3.5 items-center"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct(item.product);
                        setIsCartOpen(false);
                      }
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(item.product);
                          setIsCartOpen(false);
                        }
                      }}
                      className="text-sm font-serif font-bold text-charcoal-900 truncate cursor-pointer hover:text-gold-600"
                    >
                      {item.product.name}
                    </h4>

                    <div className="text-[11px] text-charcoal-500 mt-0.5 space-x-2">
                      <span>Size: <strong>{item.size}</strong></span>
                      <span>&bull;</span>
                      <span>Metal: <strong>{item.metal}</strong></span>
                    </div>

                    {item.engraving && (
                      <div className="text-[10px] text-gold-700 bg-gold-50 px-2 py-0.5 rounded mt-1 inline-block border border-gold-200">
                        Engraving: "{item.engraving}"
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="text-sm font-bold text-charcoal-950">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>

                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 text-charcoal-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 text-charcoal-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
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

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-champagne-200 bg-white space-y-3.5 shadow-lg">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. CHEEMA10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-champagne-200 rounded-lg outline-none focus:border-gold-500 uppercase font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 hover:text-black text-white rounded-lg text-xs font-semibold tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <div className={`text-xs flex justify-between items-center ${
                  promoMessage.type === 'success' ? 'text-green-700 font-medium' : 'text-red-600'
                }`}>
                  <span>{promoMessage.text}</span>
                  {promoCode && (
                    <button 
                      onClick={removePromoCode}
                      className="text-xs text-red-500 underline ml-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-600 border-t border-dashed border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-charcoal-900">
                    {estimatedShipping === 0 ? "Complimentary" : formatPrice(estimatedShipping)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-charcoal-950 border-t border-gray-200 pt-2">
                  <span>Total Due</span>
                  <span className="text-gold-700 font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#171615] text-gold-300 hover:bg-gold-500 hover:text-black transition-all font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20CHEEMA%20JEWELS,%20I%20would%20like%20to%20place%20an%20order%20for%20my%20bag%20worth%20${total}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-green-300 bg-green-50 text-green-900 hover:bg-green-100 transition-colors font-semibold text-xs tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span>Order via WhatsApp ({BRAND.phone})</span>
                </a>
              </div>

              <div className="text-[10px] text-center text-gray-500 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Bank-grade 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
