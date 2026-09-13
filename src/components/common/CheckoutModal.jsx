import React, { useState } from 'react';
import { 
  X, CheckCircle, ShieldCheck, Truck, CreditCard, 
  Banknote, Phone, ArrowLeft, Gem, Sparkles 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { BRAND } from '../../data/brand';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    subtotal, 
    discountAmount, 
    estimatedShipping, 
    total, 
    placeOrder, 
    lastOrder 
  } = useCart();

  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
    notes: ''
  });

  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
        alert('Please fill all required shipping details.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const order = placeOrder(formData);
      setCompletedOrder(order);
      setStep(3);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md transition-opacity"
        onClick={step === 3 ? handleClose : undefined}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-gold-400/30 overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-champagne-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-gold-600" />
              <h3 className="text-lg font-serif font-bold text-charcoal-950 tracking-wider">
                {step === 3 ? "Order Confirmed" : "Secure Luxury Checkout"}
              </h3>
            </div>
            <button 
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper (for Step 1 & 2) */}
          {step < 3 && (
            <div className="px-6 py-3 bg-champagne-50/70 border-b border-champagne-200 flex justify-center items-center gap-6 text-xs font-semibold">
              <span className={`flex items-center gap-1.5 ${step === 1 ? 'text-gold-700 font-bold' : 'text-charcoal-600'}`}>
                <span className="w-5 h-5 rounded-full bg-gold-400 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Delivery Address</span>
              </span>
              <span className="text-gray-300">&bull;&bull;&bull;</span>
              <span className={`flex items-center gap-1.5 ${step === 2 ? 'text-gold-700 font-bold' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-gold-400 text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
                <span>Payment & Verification</span>
              </span>
            </div>
          )}

          {/* Form / Content */}
          <div className="p-6 overflow-y-auto max-h-[75vh]">
            
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="text-sm font-serif font-bold text-charcoal-900 border-b border-gray-200 pb-2">
                  Shipping & Recipient Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      value={formData.fullName} 
                      onChange={handleChange}
                      placeholder="e.g. Jasmeet Singh Cheema"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">Contact Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="e.g. 7814249224"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">Email Address for Invoicing *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">Street Address / Suite / Villa *</label>
                  <input 
                    type="text" 
                    name="address" 
                    required 
                    value={formData.address} 
                    onChange={handleChange}
                    placeholder="House/Apt No., Building, Area"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">City *</label>
                    <input 
                      type="text" 
                      name="city" 
                      required 
                      value={formData.city} 
                      onChange={handleChange}
                      placeholder="Chandigarh"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">State *</label>
                    <input 
                      type="text" 
                      name="state" 
                      required 
                      value={formData.state} 
                      onChange={handleChange}
                      placeholder="Punjab"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">Postal PIN *</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      required 
                      value={formData.pincode} 
                      onChange={handleChange}
                      placeholder="160001"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">Special Delivery Instructions / Engraving Note</label>
                  <textarea 
                    name="notes" 
                    rows="2" 
                    value={formData.notes} 
                    onChange={handleChange}
                    placeholder="E.g. Call before delivery, gift wrap with personalized card..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-champagne-200 bg-white focus:border-gold-500 outline-none"
                  />
                </div>

                {/* Mini Order Summary */}
                <div className="p-4 bg-white rounded-xl border border-champagne-200 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cart.length})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Privilege Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-charcoal-900 pt-1 border-t border-gray-100">
                    <span>Order Total</span>
                    <span className="text-gold-700">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#171615] text-gold-300 hover:bg-gold-500 hover:text-black rounded-xl font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="text-sm font-serif font-bold text-charcoal-900 border-b border-gray-200 pb-2 flex justify-between items-center">
                  <span>Select Payment Method</span>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-xs text-gold-600 hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'upi', title: 'Instant UPI / QR Code (GPay, PhonePe, Paytm)', desc: 'Zero transaction fee, immediate confirmation' },
                    { id: 'card', title: 'Credit / Debit Card (Visa, Mastercard, Amex)', desc: 'Secured via 256-Bit SSL with 3D Secure OTP' },
                    { id: 'netbanking', title: 'VIP Net Banking (HDFC, ICICI, SBI, Axis)', desc: 'Direct bank transfer for high-value purchases' },
                    { id: 'whatsapp', title: `Assisted Order via Phone / WhatsApp (${BRAND.phone})`, desc: 'Our Jewellery Director will call to verify and assist with payment' }
                  ].map((method) => (
                    <label 
                      key={method.id} 
                      className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === method.id 
                          ? 'border-gold-500 bg-gold-50/50 shadow-sm' 
                          : 'border-champagne-200 bg-white hover:border-gold-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value={method.id} 
                          checked={formData.paymentMethod === method.id}
                          onChange={handleChange}
                          className="text-gold-500 focus:ring-gold-400"
                        />
                        <div>
                          <div className="text-xs font-bold text-charcoal-900">{method.title}</div>
                          <div className="text-[11px] text-gray-500">{method.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-4 bg-gold-100/40 rounded-xl border border-gold-300/60 text-xs text-charcoal-800 space-y-1.5">
                  <div className="font-semibold flex items-center gap-1.5 text-gold-900">
                    <ShieldCheck className="w-4 h-4 text-gold-700" />
                    <span>CHEEMA Guarantee of Authenticity</span>
                  </div>
                  <p className="text-[11px] text-charcoal-600 leading-relaxed">
                    Your shipment includes an individual GIA/BIS certificate, tamper-evident security seal, and full transit insurance.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 hover:from-gold-400 hover:to-gold-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-luxury"
                  >
                    Confirm & Place Order ({formatPrice(total)})
                  </button>
                </div>
              </form>
            )}

            {step === 3 && completedOrder && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10 stroke-[2]" />
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal-950">
                    Thank You for Your Patronage
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Your bespoke jewellery order has been reserved with Cheema Haute Joaillerie.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gold-300/80 shadow-soft text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Order Reference:</span>
                    <strong className="font-mono text-gold-700 font-bold">{completedOrder.orderId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Total Amount:</span>
                    <strong className="text-charcoal-900 font-bold">{formatPrice(completedOrder.total)}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Delivering To:</span>
                    <span className="text-right text-charcoal-800 font-medium">
                      {completedOrder.customer.fullName}, {completedOrder.customer.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Delivery:</span>
                    <span className="text-charcoal-800 font-medium">3-5 Business Days (Insured)</span>
                  </div>
                </div>

                <div className="p-3 bg-gold-50 rounded-xl border border-gold-200 text-xs text-charcoal-800 max-w-md mx-auto">
                  <span>Questions about your order? Reach our Personal Concierge at </span>
                  <a href={`tel:${BRAND.phone}`} className="font-bold text-gold-800 underline">
                    {BRAND.formattedPhone}
                  </a>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 rounded-full bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black transition-all text-xs uppercase font-semibold tracking-wider"
                >
                  Return to Boutique
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
