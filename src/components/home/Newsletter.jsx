import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#191817] text-white relative overflow-hidden border-t border-[#2F2C27]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto text-gold-400">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
          Stay in the Glow
        </h2>

        <p className="text-sm sm:text-base text-[#D4CEC3] font-light max-w-xl mx-auto leading-relaxed">
          Sign up for new collections, exclusive offers and jewellery inspiration. Enjoy a complimentary 10% welcome privilege on your first high jewellery purchase.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-gold-900/30 border border-gold-500/50 max-w-md mx-auto flex items-center justify-center gap-2 text-gold-300 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>Welcome to the House of CHEEMA. Your private privilege code is <strong>CHEEMA10</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-[#262421] border border-[#3E3A33] text-xs text-white placeholder:text-gray-400 outline-none focus:border-gold-400 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-widest hover:from-gold-400 hover:to-gold-300 transition-all shadow-luxury flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-[11px] text-[#8C867E]">
          We respect your privacy. Unsubscribe at any time. Direct customer care: {BRAND.formattedPhone}.
        </div>

      </div>
    </section>
  );
}
