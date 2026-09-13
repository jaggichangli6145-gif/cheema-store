import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function InstagramGallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      likes: "1.4k",
      comments: "86"
    },
    {
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      likes: "2.1k",
      comments: "142"
    },
    {
      url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      likes: "980",
      comments: "54"
    },
    {
      url: "https://images.unsplash.com/photo-1611591475824-348dfbd09789?auto=format&fit=crop&w=800&q=80",
      likes: "3.2k",
      comments: "210"
    },
    {
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      likes: "1.8k",
      comments: "98"
    },
    {
      url: "https://images.unsplash.com/photo-1543290900-7545b7f14bfa?auto=format&fit=crop&w=800&q=80",
      likes: "4.5k",
      comments: "380"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>Social Lookbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
            Follow Our Sparkle
          </h2>
          <a
            href={`https://instagram.com/${BRAND.instagram.replace('@','')}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-gold-700 hover:text-gold-900 transition-colors mt-2 inline-block"
          >
            {BRAND.instagram}
          </a>
        </div>

        {/* 6-Image Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((item, index) => (
            <a
              key={index}
              href={`https://instagram.com/${BRAND.instagram.replace('@','')}`}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-champagne-50 border border-champagne-200/60 shadow-soft block"
            >
              <img
                src={item.url}
                alt="Instagram jewellery snapshot"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-charcoal-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                <Instagram className="w-6 h-6 text-gold-300" />
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    {item.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
