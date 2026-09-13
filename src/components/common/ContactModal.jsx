import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Clock, Send, Check } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-gold-400/30 overflow-hidden flex flex-col">
          
          <div className="p-5 border-b border-champagne-200 bg-white flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-charcoal-950 tracking-wider">
                CHEEMA Concierge & Atelier
              </h3>
              <div className="text-[10px] uppercase tracking-widest text-gold-600">
                Personalized Fine Jewellery Consultation
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gold-50 text-charcoal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div className="space-y-4 text-xs text-charcoal-700">
              <div className="p-4 bg-gold-50/80 rounded-xl border border-gold-200">
                <div className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-1">
                  Direct Phone Support
                </div>
                <a 
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-2 text-base font-bold text-charcoal-950 hover:text-gold-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-600" />
                  <span>{BRAND.formattedPhone}</span>
                </a>
                <div className="text-[11px] text-gray-500 mt-1">Available 7 days a week</div>
              </div>

              <div className="p-4 bg-green-50/80 rounded-xl border border-green-200">
                <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">
                  WhatsApp Direct Inquiry
                </div>
                <a 
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20CHEEMA%20JEWELS`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-green-950 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span>Chat on WhatsApp (+91 78142 49224)</span>
                </a>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-gold-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-charcoal-900">Email Inquiry</div>
                    <div className="text-gray-500">{BRAND.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-gold-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-charcoal-900">Concierge Hours</div>
                    <div className="text-gray-500">{BRAND.supportHours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-charcoal-900">Haute Joaillerie Atelier</div>
                    <div className="text-gray-500">{BRAND.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-5 rounded-xl border border-champagne-200 shadow-soft">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-charcoal-950">Inquiry Sent</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Our Senior Gemologist will call you at <strong>{form.phone || BRAND.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); onClose(); }}
                    className="mt-4 px-4 py-1.5 bg-charcoal-950 text-gold-300 rounded-lg text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h4 className="text-sm font-serif font-bold text-charcoal-900">Request VIP Call Back</h4>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-0.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-champagne-200 bg-gray-50 outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-0.5">Your Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 7814249224"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-champagne-200 bg-gray-50 outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-0.5">Inquiry Details</label>
                    <textarea
                      rows="3"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about the ring, necklace or bridal set you have in mind..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-champagne-200 bg-gray-50 outline-none focus:border-gold-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-charcoal-950 text-gold-300 hover:bg-gold-500 hover:text-black transition-all rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
