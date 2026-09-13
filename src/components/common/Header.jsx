import React, { useState, useEffect } from 'react';
import { 
  Search, Heart, ShoppingBag, Menu, X, Phone, Sparkles, 
  ChevronDown, MessageCircle, Gem 
} from 'lucide-react';
import { BRAND } from '../../data/brand';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency, CURRENCIES } from '../../context/CurrencyContext';

export default function Header({ 
  onOpenSearch, 
  onOpenCatalog, 
  onOpenCustomizer, 
  onOpenContact, 
  onSelectCategory 
}) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { currentCurrency, setCurrentCurrency } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Jewellery', onClick: () => onOpenCatalog() },
    { label: 'Collections', onClick: () => {
      const el = document.getElementById('collections');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'New Arrivals', onClick: () => {
      const el = document.getElementById('new-arrivals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'Bridal', onClick: () => {
      const el = document.getElementById('bridal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'Custom Studio', onClick: () => onOpenCustomizer() },
    { label: 'About Us', onClick: () => {
      const el = document.getElementById('why-us');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'Contact', onClick: () => onOpenContact() }
  ];

  return (
    <>
      <div className="bg-[#171615] text-[#E6DFD5] text-xs py-2 px-4 border-b border-[#33302B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span className="tracking-wide">
              Complimentary Insured White-Glove Delivery & Luxury LED Box
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium tracking-wider">
            <a 
              href={`tel:${BRAND.phone}`} 
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
              title="Call VIP Concierge"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>Concierge: <strong className="text-white">{BRAND.formattedPhone}</strong></span>
            </a>

            <span className="text-[#4E4A44]">|</span>

            <a 
              href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20CHEEMA%20JEWELS`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-green-400 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-green-400" />
              <span className="hidden md:inline">WhatsApp Assistance</span>
            </a>

            <span className="text-[#4E4A44]">|</span>

            <div className="relative">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[#E6DFD5] hover:text-gold-400 transition-colors uppercase font-semibold"
              >
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-[#1F1E1D] border border-[#3D3A34] rounded shadow-xl py-1 z-50 text-left"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {Object.keys(CURRENCIES).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrentCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs flex justify-between items-center hover:bg-gold-500/20 hover:text-gold-300 transition-colors ${
                        currentCurrency === curr ? 'text-gold-400 font-bold bg-gold-900/30' : 'text-[#DDD]'
                      }`}
                    >
                      <span>{CURRENCIES[curr].label}</span>
                      <span className="text-[10px] text-gray-400">{CURRENCIES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-soft border-b border-gold-400/20 py-3' 
          : 'bg-[#FBF9F5] border-b border-champagne-200/60 py-4 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-charcoal-900 hover:text-gold-600 transition-colors focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group flex flex-col items-center lg:items-start text-center"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-gold-400/80 flex items-center justify-center bg-gradient-to-br from-gold-100 to-gold-300 text-charcoal-900 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Gem className="w-4 h-4 text-charcoal-900" />
                </div>
                <div className="tracking-[0.22em] text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 uppercase group-hover:text-gold-600 transition-colors">
                  CHEEMA
                </div>
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-gold-600 font-medium -mt-1 ml-9">
                JEWELS &bull; HAUTE JOAILLERIE
              </div>
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.onClick}
                className="text-xs uppercase font-medium tracking-[0.16em] text-charcoal-800 hover:text-gold-600 transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href={`tel:${BRAND.phone}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-400/60 bg-gold-50/70 text-xs font-semibold text-charcoal-900 hover:bg-gold-400 hover:text-white transition-all shadow-sm"
              title="Speak directly with our Master Jeweller"
            >
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              <span>7814249224</span>
            </a>

            <button 
              onClick={onOpenSearch}
              className="p-2 text-charcoal-900 hover:text-gold-600 transition-colors rounded-full hover:bg-gold-50/80"
              title="Search Jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-charcoal-900 hover:text-gold-600 transition-colors relative rounded-full hover:bg-gold-50/80"
              title="Your Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-gold-500 text-white text-[10px] font-bold flex items-center justify-center animate-fade-in shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-charcoal-900 hover:text-gold-600 transition-colors relative rounded-full hover:bg-gold-50/80"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#171615] text-gold-300 text-[10px] font-bold flex items-center justify-center animate-fade-in shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)} 
          />

          <div className="relative ml-auto w-full max-w-xs bg-[#FBF9F5] h-full shadow-2xl flex flex-col z-10 border-l border-gold-300/40">
            <div className="p-5 border-b border-champagne-200 flex items-center justify-between">
              <div>
                <div className="text-xl font-serif font-bold text-charcoal-950 tracking-wider">
                  CHEEMA JEWELS
                </div>
                <div className="text-[10px] text-gold-600 tracking-widest uppercase">
                  Haute Joaillerie
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gold-100 text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    link.onClick();
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-charcoal-900 hover:bg-gold-100/70 hover:text-gold-700 transition-colors uppercase tracking-wider flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  <span className="text-gold-500 text-xs">&rarr;</span>
                </button>
              ))}

              <div className="pt-4 border-t border-champagne-200">
                <div className="text-xs font-semibold text-charcoal-500 uppercase tracking-widest mb-3">
                  Direct Concierge
                </div>
                <a 
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-3 p-3 bg-gold-50 border border-gold-300 rounded-lg text-charcoal-900 font-medium text-sm mb-2"
                >
                  <Phone className="w-4 h-4 text-gold-600" />
                  <div>
                    <div className="text-[11px] text-gray-500">Call Direct</div>
                    <div className="font-bold text-sm">{BRAND.formattedPhone}</div>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20CHEEMA%20JEWELS`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-900 font-medium text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-[11px] text-green-700">WhatsApp Chat</div>
                    <div className="font-bold text-xs">Instant Response</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-champagne-200 bg-champagne-50/50 text-xs text-charcoal-600 text-center">
              <div>100% Certified Diamonds & BIS 916 Gold</div>
              <div className="mt-1 text-[11px] text-gold-700">Free Insured Worldwide Shipping</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
