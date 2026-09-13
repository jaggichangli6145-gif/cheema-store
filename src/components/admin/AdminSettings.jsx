import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function AdminSettings({ settings, onSaveSettings }) {
  const [formData, setFormData] = useState({
    storeName: 'CHEEMA JEWELS',
    contactNumber: '+91 78142 49224',
    rawPhone: '7814249224',
    email: 'concierge@cheemajewels.com',
    address: 'Cheema Haute Joaillerie, Luxury Boulevard, Suite 108',
    freeShippingThreshold: 50000,
    flatShippingFee: 1500,
    announcementText: 'Complimentary Insured White-Glove Delivery & Luxury LED Box | VIP Concierge: +91 78142 49224'
  });

  const [savedMessage, setSavedMessage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData(prev => ({ ...prev, ...settings }));
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSaveSettings(formData);
    setIsSaving(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 4000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      {savedMessage && (
        <div className="p-4 rounded-2xl bg-green-50 border border-green-300 text-green-800 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>Store settings have been updated and synchronized with the customer website.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-champagne-200/90 shadow-soft p-6 sm:p-8 space-y-6 text-xs">
        
        {/* Store Brand Information */}
        <div className="space-y-4">
          <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
            1. Brand Identity & Contact Configuration
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal-800 mb-1">Official Store Name *</label>
              <input
                type="text"
                name="storeName"
                required
                value={formData.storeName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 font-serif font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-800 mb-1">
                Concierge Contact Phone (+91 78142 49224) *
              </label>
              <input
                type="text"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal-800 mb-1">Support / Concierge Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-800 mb-1">Direct Dial Raw Phone (for tel: & WhatsApp)</label>
              <input
                type="text"
                name="rawPhone"
                required
                value={formData.rawPhone}
                onChange={handleChange}
                placeholder="7814249224"
                className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-800 mb-1">Atelier Physical Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-charcoal-800 mb-1">Top Announcement Bar Ticker</label>
            <input
              type="text"
              name="announcementText"
              value={formData.announcementText}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* Shipping & Delivery Rules */}
        <div className="space-y-4">
          <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
            2. Shipping & Checkout Parameters
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal-800 mb-1">
                Complimentary Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={formData.freeShippingThreshold}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
              />
              <div className="text-[10px] text-gray-500 mt-1">Orders above this amount receive free insured delivery.</div>
            </div>

            <div>
              <label className="block font-semibold text-charcoal-800 mb-1">
                Standard Insured Courier Fee (₹)
              </label>
              <input
                type="number"
                name="flatShippingFee"
                value={formData.flatShippingFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-champagne-200 rounded-xl outline-none focus:border-gold-500"
              />
              <div className="text-[10px] text-gray-500 mt-1">Applied on orders below the complimentary threshold.</div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Settings...' : 'Update Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
