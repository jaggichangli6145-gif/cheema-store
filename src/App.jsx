import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

// Admin Pages & Protection
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

// Common Customer Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SearchModal from './components/common/SearchModal';
import CartDrawer from './components/common/CartDrawer';
import WishlistDrawer from './components/common/WishlistDrawer';
import CheckoutModal from './components/common/CheckoutModal';
import ContactModal from './components/common/ContactModal';
import StaffLoginModal from './components/common/StaffLoginModal';
import { ShieldCheck, LayoutDashboard, LogOut } from 'lucide-react';
import { useAdminAuth } from './context/AdminAuthContext';

// Home Sections
import Hero from './components/home/Hero';
import CategoryGrid from './components/home/CategoryGrid';
import FeaturedCollections from './components/home/FeaturedCollections';
import BestSellers from './components/home/BestSellers';
import NewArrivals from './components/home/NewArrivals';
import LuxuryBanner from './components/home/LuxuryBanner';
import BridalSection from './components/home/BridalSection';
import WhyChooseUs from './components/home/WhyChooseUs';
import CustomizerSection from './components/home/CustomizerSection';
import CustomerReviews from './components/home/CustomerReviews';
import InstagramGallery from './components/home/InstagramGallery';
import Newsletter from './components/home/Newsletter';

// Product & Shop Modals
import QuickViewModal from './components/product/QuickViewModal';
import ProductDetailModal from './components/product/ProductDetailModal';
import ShopCatalogModal from './components/shop/ShopCatalogModal';
import CustomizerModal from './components/customizer/CustomizerModal';

function CustomerStorefront() {
  const { isAuthenticated, adminUser, logout } = useAdminAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);

  // Active product modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);

  const handleOpenCatalogWithCategory = (catId) => {
    setCatalogCategory(catId || 'all');
    setIsCatalogOpen(true);
  };

  const handleSelectCollection = (collection) => {
    setCatalogCategory(collection.categoryFilter || 'all');
    setIsCatalogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-charcoal-900 flex flex-col font-sans selection:bg-gold-200">
      
      {/* Sticky Header with Navigation & Brand "CHEEMA JEWELS" */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCatalog={() => handleOpenCatalogWithCategory('all')}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectCategory={handleOpenCatalogWithCategory}
        onOpenStaffLogin={() => setIsStaffLoginOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onShopClick={() => handleOpenCatalogWithCategory('all')}
          onExploreClick={() => {
            const el = document.getElementById('collections');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomClick={() => setIsCustomizerOpen(true)}
        />

        {/* 2. Shop By Category (10 Categories) */}
        <CategoryGrid
          onSelectCategory={handleOpenCatalogWithCategory}
        />

        {/* 3. Featured Signature Collections (6 Collections) */}
        <FeaturedCollections
          onSelectCollection={handleSelectCollection}
        />

        {/* 4. Best Sellers (8 Products Grid) */}
        <BestSellers
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onOpenDetail={(prod) => setDetailProduct(prod)}
          onOpenCatalog={() => handleOpenCatalogWithCategory('all')}
        />

        {/* 5. New Arrivals (Tabs + Cards) */}
        <NewArrivals
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onOpenDetail={(prod) => setDetailProduct(prod)}
        />

        {/* 6. Luxury Full-Width Editorial Banner */}
        <LuxuryBanner
          onDiscoverClick={() => handleOpenCatalogWithCategory('all')}
          onContactClick={() => setIsContactOpen(true)}
        />

        {/* 7. Bridal Jewellery ("For Your Forever Moment") */}
        <BridalSection
          onSelectCategory={handleOpenCatalogWithCategory}
          onContactClick={() => setIsContactOpen(true)}
        />

        {/* 8. Why Choose Us (4 Benefits with Icons) */}
        <WhyChooseUs />

        {/* 9. Jewellery Customization Studio ("Create Something Truly Yours") */}
        <CustomizerSection
          onStartCustomizing={() => setIsCustomizerOpen(true)}
        />

        {/* 10. Customer Reviews ("Loved By Our Customers" Carousel) */}
        <CustomerReviews />

        {/* 11. Instagram / Social Lookbook ("Follow Our Sparkle" 6-tile grid) */}
        <InstagramGallery />

        {/* 12. Newsletter Subscription ("Stay in the Glow") */}
        <Newsletter />
      </main>

      {/* Luxury Footer */}
      <Footer
        onOpenCatalog={() => handleOpenCatalogWithCategory('all')}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectCategory={handleOpenCatalogWithCategory}
        onOpenStaffLogin={() => setIsStaffLoginOpen(true)}
      />

      {/* Floating Staff Portal Indicator (When logged in) */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-40 bg-[#171615] text-white py-2.5 px-4 rounded-2xl border border-gold-400/60 shadow-2xl flex items-center gap-3.5 animate-fade-in backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs">
              <span className="text-gray-400">Staff: </span>
              <strong className="text-gold-300 font-semibold">{adminUser?.username || 'adminop'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-[#33302B] pl-3">
            <a
              href="/admin"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-bold text-xs hover:opacity-95 transition-all shadow flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Staff Dashboard</span>
            </a>
            <button
              onClick={logout}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
              title="Staff Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Global Interactive Modals & Drawers */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setDetailProduct(prod)}
      />

      <CartDrawer
        onSelectProduct={(prod) => setDetailProduct(prod)}
      />

      <WishlistDrawer
        onSelectProduct={(prod) => setDetailProduct(prod)}
      />

      <CheckoutModal />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenDetail={(prod) => {
          setQuickViewProduct(null);
          setDetailProduct(prod);
        }}
      />

      <ProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onSelectProduct={(prod) => setDetailProduct(prod)}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />

      <ShopCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        initialCategory={catalogCategory}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onOpenDetail={(prod) => setDetailProduct(prod)}
      />

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <ProductProvider>
          <WishlistProvider>
            <CartProvider>
              <AdminAuthProvider>
                <Routes>
                  {/* Admin Authentication */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />

                  {/* Protected Admin Control Centre */}
                  <Route 
                    path="/admin/*" 
                    element={
                      <AdminProtectedRoute>
                        <AdminDashboardPage />
                      </AdminProtectedRoute>
                    } 
                  />

                  {/* Customer Storefront */}
                  <Route path="/*" element={<CustomerStorefront />} />
                </Routes>
              </AdminAuthProvider>
            </CartProvider>
          </WishlistProvider>
        </ProductProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}
