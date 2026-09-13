import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { BRAND } from '../../data/brand';

export default function CustomizerModal({ isOpen, onClose }) {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const [pieceType, setPieceType] = useState('ring');
  const [metal, setMetal] = useState('18K Yellow Gold');
  const [cut, setCut] = useState('Round Brilliant');
  const [carat, setCarat] = useState('1.50 Carat');
  const [size, setSize] = useState('US 7 / 14');
  const [engraving, setEngraving] = useState('');

  if (!isOpen) return null;

  // Dynamic price model based on selections
  const basePrices = {
    ring: 120000,
    necklace: 160000,
    pendant: 95000,
    bracelet: 210000
  };

  const metalMultipliers = {
    '18K Yellow Gold': 1.0,
    '18K White Gold': 1.05,
    '18K Rose Gold': 1.05,
    '950 Platinum': 1.25
  };

  const caratAddons = {
    '1.00 Carat': 45000,
    '1.50 Carat': 75000,
    '2.00 Carat': 130000,
    '2.50 Carat': 195000,
    '3.00 Carat': 280000
  };

  const calculatedPrice = Math.round(
    (basePrices[pieceType] * (metalMultipliers[metal] || 1)) + (caratAddons[carat] || 0)
  );

  const handleAddBespokeToCart = () => {
    const bespokeProduct = {
      id: `bespoke-${Date.now()}`,
      name: `Bespoke ${pieceType.toUpperCase()} - ${cut} (${carat})`,
      category: pieceType === 'ring' ? 'rings' : pieceType === 'necklace' ? 'necklaces' : pieceType === 'pendant' ? 'pendants' : 'bracelets',
      categoryLabel: 'Bespoke Haute Joaillerie',
      collectionLabel: 'Custom Studio',
      price: calculatedPrice,
      rating: 5.0,
      reviewCount: 1,
      badge: 'Bespoke',
      images: [
        pieceType === 'ring'
          ? "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
          : pieceType === 'necklace'
          ? "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
          : pieceType === 'pendant'
          ? "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
          : "https://images.unsplash.com/photo-1611591475824-348dfbd09789?auto=format&fit=crop&w=1000&q=80"
      ],
      description: `Custom designed ${pieceType} in ${metal} featuring a hand-selected ${cut} diamond (${carat}). Includes custom engraving: "${engraving || 'N/A'}" and individual GIA certificate.`,
      metal: metal,
      metalPurity: metal.includes('Platinum') ? 'Pt 950' : '18K (750 BIS)',
      weight: 'Custom Crafted',
      gemstone: `Natural Certified Diamond (${cut})`,
      diamondCarat: carat,
      clarity: 'VVS1',
      diamondColor: 'D/E Colorless',
      cut: cut,
      occasion: 'Special Commission',
      sizes: [size],
      inStock: true,
      certificate: 'GIA Bespoke Dossier & Laser Inscribed',
      deliveryDays: '7-10 Business Days (Atelier Crafted)'
    };

    addToCart(bespokeProduct, {
      size,
      metal,
      engraving
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-3xl shadow-2xl border border-gold-400/40 overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="p-5 px-6 border-b border-champagne-200 bg-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-600" />
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal-950 tracking-wider">
                  CHEEMA Custom Jewellery Studio
                </h3>
                <div className="text-[10px] uppercase tracking-widest text-gold-600">
                  Bespoke Haute Joaillerie Configurator
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visualizer Left: 5 Cols */}
            <div className="lg:col-span-5 space-y-5">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-gold-300 shadow-soft relative flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={
                    pieceType === 'ring'
                      ? "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
                      : pieceType === 'necklace'
                      ? "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                      : pieceType === 'pendant'
                      ? "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                      : "https://images.unsplash.com/photo-1611591475824-348dfbd09789?auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Custom Preview"
                  className="w-full h-full object-cover rounded-xl"
                />

                {engraving && (
                  <div className="absolute bottom-4 inset-x-4 bg-charcoal-950/80 backdrop-blur-sm text-gold-300 text-xs py-1.5 px-3 rounded-lg border border-gold-400/40">
                    Engraving: <em>"{engraving}"</em>
                  </div>
                )}
              </div>

              {/* Price Card */}
              <div className="p-5 bg-white rounded-2xl border border-champagne-200 shadow-soft space-y-2">
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  Estimated Commission Total
                </div>
                <div className="text-3xl font-serif font-bold text-charcoal-950 text-gold-700">
                  {formatPrice(calculatedPrice)}
                </div>
                <div className="text-[11px] text-gray-500 leading-relaxed">
                  Includes conflict-free certified diamond, custom CAD render, bespoke casting & white-glove delivery.
                </div>
              </div>

              <div className="p-3 bg-gold-50 rounded-xl border border-gold-200 flex items-center justify-between text-xs text-charcoal-800">
                <span className="font-medium">Direct Jeweller Line:</span>
                <a href={`tel:${BRAND.phone}`} className="font-bold text-gold-800 underline">
                  {BRAND.formattedPhone}
                </a>
              </div>
            </div>

            {/* Customizer Options Right: 7 Cols */}
            <div className="lg:col-span-7 space-y-6 text-xs">
              
              {/* Step 1: Piece Type */}
              <div>
                <label className="block font-semibold text-charcoal-900 mb-2 uppercase tracking-wider">
                  1. Select Piece Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'ring', label: 'Ring' },
                    { id: 'necklace', label: 'Necklace' },
                    { id: 'pendant', label: 'Pendant' },
                    { id: 'bracelet', label: 'Bracelet' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPieceType(p.id)}
                      className={`py-2 px-3 rounded-xl border font-semibold text-center transition-all ${
                        pieceType === p.id
                          ? 'border-gold-500 bg-gold-50 text-gold-900 shadow-sm'
                          : 'border-champagne-200 bg-white text-charcoal-700 hover:bg-gray-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Metal Selection */}
              <div>
                <label className="block font-semibold text-charcoal-900 mb-2 uppercase tracking-wider">
                  2. Precious Metal Alloy
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['18K Yellow Gold', '18K White Gold', '18K Rose Gold', '950 Platinum'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetal(m)}
                      className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                        metal === m
                          ? 'border-gold-500 bg-gold-50 text-gold-900 shadow-sm font-semibold'
                          : 'border-champagne-200 bg-white text-charcoal-700 hover:bg-gray-50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Diamond Cut */}
              <div>
                <label className="block font-semibold text-charcoal-900 mb-2 uppercase tracking-wider">
                  3. Diamond Cut & Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Round Brilliant', 'Princess Cut', 'Emerald Cut', 'Oval Shape', 'Pear Cut', 'Cushion Cut'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCut(c)}
                      className={`py-2 px-2.5 rounded-xl border text-center font-medium transition-all ${
                        cut === c
                          ? 'border-gold-500 bg-gold-50 text-gold-900 shadow-sm font-semibold'
                          : 'border-champagne-200 bg-white text-charcoal-700 hover:bg-gray-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Carat Weight */}
              <div>
                <label className="block font-semibold text-charcoal-900 mb-2 uppercase tracking-wider">
                  4. Diamond Carat Weight
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['1.00 Carat', '1.50 Carat', '2.00 Carat', '2.50 Carat', '3.00 Carat'].map((wt) => (
                    <button
                      key={wt}
                      onClick={() => setCarat(wt)}
                      className={`py-2 px-2 rounded-xl border text-center font-medium transition-all ${
                        carat === wt
                          ? 'border-gold-500 bg-gold-50 text-gold-900 shadow-sm font-bold'
                          : 'border-champagne-200 bg-white text-charcoal-700 hover:bg-gray-50'
                      }`}
                    >
                      {wt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Size & Engraving */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-900 mb-1.5 uppercase tracking-wider">
                    Size / Length
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  >
                    <option value="US 5 / 10">US 5 / 10 (15.7 mm)</option>
                    <option value="US 6 / 12">US 6 / 12 (16.5 mm)</option>
                    <option value="US 7 / 14">US 7 / 14 (17.3 mm - Standard)</option>
                    <option value="US 8 / 16">US 8 / 16 (18.1 mm)</option>
                    <option value="US 9 / 18">US 9 / 18 (18.9 mm)</option>
                    <option value="16 Inch Collar">16 Inch Collar</option>
                    <option value="18 Inch Classic">18 Inch Classic</option>
                    <option value="7.0 Inch Wrist">7.0 Inch Wrist</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-900 mb-1.5 uppercase tracking-wider">
                    Laser Engraving (Free)
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="e.g. Always & Forever"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Commission CTA */}
              <div className="pt-3">
                <button
                  onClick={handleAddBespokeToCart}
                  className="w-full py-3.5 bg-[#171615] text-gold-300 hover:bg-gold-500 hover:text-black rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-luxury flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Bespoke Creation to Shopping Bag</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
