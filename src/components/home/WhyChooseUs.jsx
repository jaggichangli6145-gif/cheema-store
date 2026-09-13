import React from 'react';
import { Award, Gem, ShieldCheck, RefreshCw } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Award,
      title: "Authentic Jewellery",
      description: "100% certified and authentic jewellery. Every diamond is accompanied by a GIA/IGI laboratory certificate and all precious gold is BIS 916 hallmarked."
    },
    {
      icon: Gem,
      title: "Premium Craftsmanship",
      description: "Every piece is carefully crafted by skilled artisans with generations of heritage, blending time-honored hand-chiseled art with modern CAD precision."
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      description: "Safe and secure online shopping experience with 256-bit encrypted transactions, dedicated white-glove courier, and full transit insurance."
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Simple and customer-friendly return policy with 30-day hassle-free exchange and guaranteed lifetime buyback value across all authentic pieces."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-y border-champagne-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2">
            The CHEEMA Promise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-sm text-charcoal-600 mt-2 font-light">
            Rooted in trust, perfection, and three decades of high jewellery excellence.
          </p>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-[#FBF9F5] border border-champagne-200/70 hover:border-gold-400 hover:shadow-luxury transition-all duration-500 flex flex-col text-center items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-gold-300 flex items-center justify-center text-gold-600 mb-6 shadow-soft group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8 stroke-[1.4]" />
                </div>

                <h3 className="text-xl font-serif font-bold text-charcoal-950 mb-3 group-hover:text-gold-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
