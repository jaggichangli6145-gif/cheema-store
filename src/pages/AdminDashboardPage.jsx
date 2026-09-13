import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useProducts } from '../context/ProductContext';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManagement from '../components/admin/ProductManagement';
import ProductFormModal from '../components/admin/ProductFormModal';
import OrderManagement from '../components/admin/OrderManagement';
import CustomerManagement from '../components/admin/CustomerManagement';
import InventoryManagement from '../components/admin/InventoryManagement';
import PriceManagement from '../components/admin/PriceManagement';
import AdminSettings from '../components/admin/AdminSettings';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const { authFetch } = useAdminAuth();
  const { refreshProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Quick modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [prodRes, ordRes, custRes, setRes] = await Promise.all([
        authFetch('/api/products/admin/all'),
        authFetch('/api/orders/admin/all'),
        authFetch('/api/customers/admin/all'),
        fetch('/api/settings')
      ]);

      if (prodRes.ok) {
        const pData = await prodRes.json();
        if (pData.success) setProducts(pData.products || []);
      }

      if (ordRes.ok) {
        const oData = await ordRes.json();
        if (oData.success) setOrders(oData.orders || []);
      }

      if (custRes.ok) {
        const cData = await custRes.json();
        if (cData.success) setCustomers(cData.customers || []);
      }

      if (setRes.ok) {
        const sData = await setRes.json();
        if (sData.success) setSettings(sData.settings || {});
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('Error loading administrative data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers
  const handleSaveProduct = async (payload, id) => {
    try {
      const url = id ? `/api/products/admin/${id}` : '/api/products/admin';
      const method = id ? 'PUT' : 'POST';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(id ? 'Product updated successfully.' : 'Product added successfully.');
        loadData();
        refreshProducts(); // synchronize with customer storefront!
      } else {
        showToast(data.message || 'Failed to save product.', 'error');
      }
    } catch (err) {
      showToast('Server communication error.', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await authFetch(`/api/products/admin/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Product deleted successfully.');
        loadData();
        refreshProducts();
      } else {
        showToast(data.message || 'Failed to delete product.', 'error');
      }
    } catch (err) {
      showToast('Server communication error.', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const res = await authFetch(`/api/orders/admin/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Order status updated to ${status}.`);
        loadData();
      } else {
        showToast(data.message || 'Failed to update order status.', 'error');
      }
    } catch (err) {
      showToast('Server communication error.', 'error');
    }
  };

  const handleUpdateStock = async (id, stock) => {
    try {
      const res = await authFetch(`/api/products/admin/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Stock quantity updated successfully.');
        loadData();
        refreshProducts();
      } else {
        showToast(data.message || 'Failed to update stock.', 'error');
      }
    } catch (err) {
      showToast('Server communication error.', 'error');
    }
  };

  const handleUpdatePrice = async (id, price, originalPrice) => {
    try {
      const res = await authFetch(`/api/products/admin/${id}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, originalPrice })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Product price updated successfully.');
        loadData();
        refreshProducts(); // Updates storefront immediately!
      } else {
        showToast(data.message || 'Failed to update price.', 'error');
      }
    } catch (err) {
      showToast('Server communication error.', 'error');
    }
  };

  const handleSaveSettings = async (newSettings) => {
    try {
      const res = await authFetch('/api/settings/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettings(data.settings);
        showToast('Store settings updated successfully.');
      } else {
        showToast(data.message || 'Failed to update settings.', 'error');
      }
    } catch (err) {
      showToast('Server communication error.', 'error');
    }
  };

  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Pending').length;
  const lowStockCount = products.filter(p => (p.stock || 0) <= 5).length;

  return (
    <AdminLayout
      activeTab={activeTab === 'add-product' ? 'products' : activeTab}
      setActiveTab={(tab) => {
        if (tab === 'add-product') {
          setIsAddModalOpen(true);
        } else {
          setActiveTab(tab);
        }
      }}
      pendingOrdersCount={pendingOrdersCount}
      lowStockCount={lowStockCount}
    >
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in border ${
          toast.type === 'success' ? 'bg-green-900 text-green-200 border-green-700' : 'bg-red-900 text-red-200 border-red-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Tabs Content */}
      {isLoading ? (
        <div className="py-20 flex justify-center items-center text-gold-600">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-500" />
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && (
            <AdminDashboard
              orders={orders}
              products={products}
              onNavigateTab={(tab) => {
                if (tab === 'add-product') setIsAddModalOpen(true);
                else setActiveTab(tab);
              }}
              onViewOrder={(ord) => {
                setSelectedOrderForModal(ord);
                setActiveTab('orders');
              }}
              onEditProduct={(p) => {
                setSelectedProductForEdit(p);
                setActiveTab('products');
              }}
            />
          )}

          {activeTab === 'orders' && (
            <OrderManagement
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === 'products' && (
            <ProductManagement
              products={products}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerManagement
              customers={customers}
              orders={orders}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryManagement
              products={products}
              onUpdateStock={handleUpdateStock}
            />
          )}

          {activeTab === 'pricing' && (
            <PriceManagement
              products={products}
              onUpdatePrice={handleUpdatePrice}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              settings={settings}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </>
      )}

      {/* Standalone Add Product Modal */}
      <ProductFormModal
        isOpen={isAddModalOpen}
        product={null}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </AdminLayout>
  );
}
