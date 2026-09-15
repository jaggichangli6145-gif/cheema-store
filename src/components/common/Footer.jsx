import React from 'react';
import { 
  Phone, Mail, MapPin, MessageCircle, ShieldCheck, 
  Award, RefreshCw, Truck, ArrowUp, Instagram, Facebook, Youtube 
} from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function Footer({ onOpenCatalog, onOpenContact, onSelectCategory, onOpenStaffLogin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-[#C9C3BA] pt-16 pb-8 border-t border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#2B2824]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-serif text-base">BIS 916 & GIA Certified</div>
              <div className="text-xs text-[#9B958C]">100% Genuine Hallmarked</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-serif text-base">Insured Express Delivery</div>
              <div className="text-xs text-[#9B958C]">Complimentary Transit Protection</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-serif text-base">Lifetime Exchange</div>
              <div className="text-xs text-[#9B958C]">Guaranteed Buyback Policy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-serif text-base">Personal Concierge</div>
              <div className="text-xs text-gold-400 font-semibold">{BRAND.formattedPhone}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="text-2xl font-serif font-bold text-white tracking-[0.18em]">
                {BRAND.name}
              </div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-medium mt-0.5">
                Haute Joaillerie &bull; Est. 1994
              </div>
            </div>
            
            <p className="text-sm text-[#A39E96] leading-relaxed max-w-sm">
              Discover timeless brilliance and handcrafted royal jewellery created by master artisans with certified natural diamonds and hallmarked pure gold.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <a 
                href={`tel:${BRAND.phone}`} 
                className="flex items-center gap-2.5 text-white hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span className="font-semibold text-sm">{BRAND.formattedPhone}</span>
                <span className="text-[11px] text-gold-500 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">Direct VIP</span>
              </a>

              <a 
                href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20CHEEMA%20JEWELS`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Video & Order Inquiry</span>
              </a>

              <div className="flex items-center gap-2.5 text-[#A39E96]">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>{BRAND.email}</span>
              </div>

              <div className="flex items-center gap-2.5 text-[#A39E96]">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{BRAND.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm uppercase font-semibold text-white tracking-widest font-serif border-b border-[#2C2925] pb-2">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenContact} className="hover:text-gold-400 transition-colors">
                  Contact Us ({BRAND.phone})
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-gold-400 transition-colors">
                  Book VIP Consultation
                </button>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">Easy 30-Day Returns</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">Ring Size Guide</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold-400 transition-colors">Diamond Certificate Verification</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm uppercase font-semibold text-white tracking-widest font-serif border-b border-[#2C2925] pb-2">
              Jewellery
            </h4>
            <ul className="space-y-2 text-xs">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants', 'Bridal Jewellery'].map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.toLowerCase().replace(' jewellery', ''));
                    }} 
                    className="hover:text-gold-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm uppercase font-semibold text-white tracking-widest font-serif border-b border-[#2C2925] pb-2">
              House &amp; Heritage
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why-us" className="hover:text-gold-400 transition-colors">Our Story &amp; Heritage</a></li>
              <li><a href="#why-us" className="hover:text-gold-400 transition-colors">Artisanal Craftsmanship</a></li>
              <li><a href="#why-us" className="hover:text-gold-400 transition-colors">Store Locator</a></li>
              <li><a href="#why-us" className="hover:text-gold-400 transition-colors">Privacy &amp; Terms</a></li>
              <li className="pt-1">
                <button 
                  onClick={onOpenStaffLogin}
                  className="text-gold-400 hover:text-white font-semibold flex items-center gap-1.5 transition-colors group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                  <span>Staff Login &amp; Portal &rarr;</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#23201D] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A857D]">
        <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.</span>
          <span>&bull;</span>
          <span className="text-gold-500">Concierge: {BRAND.phone}</span>
          <span>&bull;</span>
          <button 
            onClick={onOpenStaffLogin} 
            className="text-gray-400 hover:text-gold-400 transition-colors text-[11px]"
          >
            Staff Access
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-[11px] uppercase tracking-wider text-gray-400">Follow Our Sparkle:</span>
          <a 
            href={`https://instagram.com/${BRAND.instagram.replace('@','')}`} 
            target="_blank" 
            rel="noreferrer" 
            className="w-8 h-8 rounded-full border border-[#3E3A33] flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-colors"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a 
            href="#" 
            className="w-8 h-8 rounded-full border border-[#3E3A33] flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-colors"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a 
            href="#" 
            className="w-8 h-8 rounded-full border border-[#3E3A33] flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-colors"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          {['VISA', 'Mastercard', 'AMEX', 'UPI', 'Apple Pay', 'PayPal'].map(badge => (
            <span 
              key={badge} 
              className="px-2 py-0.5 rounded bg-[#1C1A18] border border-[#33302C] text-[10px] text-gray-300 font-medium"
            >
              {badge}
            </span>
          ))}
          <button 
            onClick={scrollToTop} 
            className="ml-3 p-1.5 rounded-full bg-[#23201D] hover:bg-gold-500 hover:text-black text-gold-400 transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
