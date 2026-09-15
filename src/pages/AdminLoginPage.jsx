import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Gem, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { BRAND } from '../data/brand';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await login(username, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Return to Storefront Link */}
      <div className="absolute top-6 left-6 z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold-400 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Boutique</span>
        </a>
      </div>

      <div className="w-full max-w-md bg-[#1C1A18] rounded-3xl border border-gold-400/30 p-8 sm:p-10 shadow-2xl relative z-10 space-y-8 backdrop-blur-xl">
        
        {/* Brand Crest */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-300 to-gold-600 text-charcoal-950 flex items-center justify-center mx-auto shadow-luxury">
            <Gem className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wider uppercase">
              CHEEMA JEWELS
            </h1>
            <div className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-semibold mt-0.5">
              Staff &amp; Executive Command Centre
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block text-gray-300 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
              Staff ID / Admin ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Staff ID (e.g. adminop)"
                className="w-full pl-10 pr-4 py-3 bg-[#141312] border border-[#3A3731] rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-gold-400 transition-colors text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
              Staff Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#141312] border border-[#3A3731] rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-gold-400 transition-colors text-xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold uppercase tracking-widest text-xs shadow-luxury hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In as Staff</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-[#2C2925] text-center text-[11px] text-gray-500 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            <span>256-Bit Encrypted Session &bull; Authorized Personnel Only</span>
          </div>
          <div>Concierge Emergency Line: {BRAND.formattedPhone}</div>
        </div>

      </div>
    </div>
  );
}
