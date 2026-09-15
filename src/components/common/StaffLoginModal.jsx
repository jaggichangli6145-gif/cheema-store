import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Gem, Lock, User, ArrowRight, AlertCircle, X } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { BRAND } from '../../data/brand';

export default function StaffLoginModal({ isOpen, onClose }) {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await login(username, password);
    setIsLoading(false);

    if (res.success) {
      onClose();
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid Staff ID or Password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1C1A18] rounded-3xl border border-gold-400/40 p-7 sm:p-9 shadow-2xl space-y-6 text-white">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-300 to-gold-600 text-charcoal-950 flex items-center justify-center mx-auto shadow-luxury">
            <Gem className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wider uppercase">
              CHEEMA JEWELS
            </h2>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-semibold mt-0.5">
              Staff &amp; Management Portal
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
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
                className="w-full pl-10 pr-4 py-3 bg-[#131211] border border-[#3A3731] rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-gold-400 transition-colors text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
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
                className="w-full pl-10 pr-4 py-3 bg-[#131211] border border-[#3A3731] rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-gold-400 transition-colors text-xs"
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
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Sign In as Staff</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-3 border-t border-[#2C2925] text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
          <span>Staff Access Only &bull; Cheema Haute Joaillerie</span>
        </div>

      </div>
    </div>
  );
}
