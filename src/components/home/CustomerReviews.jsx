import React, { useState } from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-champagne-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold mb-2">
            Patron Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight">
            Loved By Our Customers
          </h2>
          <p className="text-sm text-charcoal-600 mt-2 font-light">
            Real stories from our patrons celebrating love, milestones, and timeless luxury.
          </p>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Carousel View */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-champagne-200/90 shadow-soft relative flex flex-col md:flex-row items-center gap-8">
            
            <div className="absolute top-6 right-8 text-gold-200">
              <Quote className="w-16 h-16 opacity-30" />
            </div>

            {/* Avatar & Patron Info */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left flex-shrink-0 space-y-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gold-400 shadow-luxury">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="font-serif font-bold text-lg text-charcoal-950">
                  {current.name}
                </div>
                <div className="text-xs text-gray-500">
                  {current.location}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-green-700 font-semibold mt-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Patron</span>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              {/* Stars */}
              <div className="flex justify-center md:justify-start gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <h4 className="text-lg sm:text-xl font-serif font-bold text-charcoal-950">
                "{current.title}"
              </h4>

              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light italic">
                "{current.review}"
              </p>

              <div className="pt-2 text-[11px] text-gold-700 font-semibold uppercase tracking-wider">
                Purchased: {current.item} &bull; {current.date}
              </div>
            </div>

          </div>

          {/* Nav Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white border border-champagne-200 text-charcoal-700 hover:bg-gold-500 hover:text-white transition-all shadow-sm"
              title="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? 'w-8 bg-gold-500' : 'w-2 bg-champagne-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white border border-champagne-200 text-charcoal-700 hover:bg-gold-500 hover:text-white transition-all shadow-sm"
              title="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
