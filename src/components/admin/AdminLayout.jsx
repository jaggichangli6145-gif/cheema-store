import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Package, PlusCircle, 
  Users, Layers, DollarSign, Settings, LogOut, Menu, 
  X, Gem, ExternalLink, Shield 
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { BRAND } from '../../data/brand';

export default function AdminLayout({ activeTab, setActiveTab, pendingOrdersCount = 0, lowStockCount = 0, children }) {
  const { adminUser, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'add-product', label: 'Add Product', icon: PlusCircle },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Layers, badge: lowStockCount > 0 ? `${lowStockCount} Alert` : null, badgeColor: 'bg-amber-500' },
    { id: 'pricing', label: 'Price Management', icon: DollarSign },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-charcoal-900 flex font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#171615] text-[#D8D2C7] flex flex-col justify-between border-r border-[#2C2925] transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#2C2925] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 text-charcoal-950 flex items-center justify-center font-bold shadow-luxury">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white tracking-widest leading-none">
                  CHEEMA
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-gold-400 font-semibold mt-0.5">
                  Admin Portal
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 text-xs">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-bold shadow-luxury'
                      : 'text-[#C9C3BA] hover:bg-[#252320] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal-950' : 'text-gold-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow ${
                      item.badgeColor || 'bg-gold-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2C2925] space-y-3">
          <div className="px-3 py-2 bg-[#22201D] rounded-xl border border-[#33302B] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-xs">
                {adminUser?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="truncate">
                <div className="font-semibold text-white truncate text-[11px]">{adminUser?.username || 'adminop'}</div>
                <div className="text-[9px] text-gold-400 uppercase tracking-wider">{adminUser?.role || 'Administrator'}</div>
              </div>
            </div>
            <Shield className="w-3.5 h-3.5 text-gold-400" />
          </div>

          <button
            onClick={logout}
            className="w-full py-2.5 px-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar */}
        <header className="bg-white border-b border-champagne-200/80 px-4 sm:px-8 py-4 flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-charcoal-700 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-serif font-bold text-xl sm:text-2xl text-charcoal-950 tracking-wide capitalize">
              {menuItems.find(m => m.id === activeTab)?.label || 'Overview'}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gold-50 border border-gold-300 text-xs font-semibold text-charcoal-900 hover:bg-gold-400 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
              title="Open customer storefront in a new tab"
            >
              <span>Live Boutique</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          {children}
        </main>

      </div>

    </div>
  );
}
