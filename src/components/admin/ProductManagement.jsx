import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Edit, Trash2, ArrowUpDown 
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import ProductFormModal from './ProductFormModal';

export default function ProductManagement({ 
  products = [], 
  onSaveProduct, 
  onDeleteProduct 
}) {
  const { formatPrice } = useCurrency();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Delete confirmation dialog
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);

  const categories = ['all', 'rings', 'necklaces', 'earrings', 'bracelets', 'bangles', 'pendants', 'bridal', 'mens'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const match = 
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Stock Status
      const stock = p.stock ?? 0;
      if (selectedStockStatus === 'in-stock' && stock <= 5) return false;
      if (selectedStockStatus === 'low-stock' && (stock === 0 || stock > 5)) return false;
      if (selectedStockStatus === 'out-of-stock' && stock > 0) return false;

      // Badge / Tag
      if (selectedBadge === 'featured' && !p.featured && !p.isBestseller) return false;
      if (selectedBadge === 'new' && !p.newArrival && !p.isNew) return false;

      return true;
    });
  }, [products, searchTerm, selectedCategory, selectedStockStatus, selectedBadge]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteConfirmProduct) {
      await onDeleteProduct(deleteConfirmProduct.id);
      setDeleteConfirmProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-champagne-200/90 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by product name, SKU or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-charcoal-950 hover:bg-gold-500 hover:text-black text-gold-300 font-semibold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters Row */}
      <div className="bg-white p-4 rounded-2xl border border-champagne-200/90 shadow-soft flex flex-wrap items-center gap-3 text-xs">
        <span className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Filters:</span>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 bg-gray-50 border border-champagne-200 rounded-lg text-xs capitalize outline-none"
        >
          <option value="all">All Categories</option>
          {categories.filter(c => c !== 'all').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedStockStatus}
          onChange={(e) => setSelectedStockStatus(e.target.value)}
          className="px-3 py-1.5 bg-gray-50 border border-champagne-200 rounded-lg text-xs outline-none"
        >
          <option value="all">All Stock Levels</option>
          <option value="in-stock">In Stock (&gt; 5)</option>
          <option value="low-stock">Low Stock (1 - 5)</option>
          <option value="out-of-stock">Out of Stock (0)</option>
        </select>

        <select
          value={selectedBadge}
          onChange={(e) => setSelectedBadge(e.target.value)}
          className="px-3 py-1.5 bg-gray-50 border border-champagne-200 rounded-lg text-xs outline-none"
        >
          <option value="all">All Badges</option>
          <option value="featured">Featured / Bestsellers</option>
          <option value="new">New Arrivals</option>
        </select>

        <span className="text-gray-400 text-xs ml-auto">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} products
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-champagne-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-champagne-50/70 border-b border-champagne-200 text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3 px-4">Jewel</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (₹)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No matching products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const stock = p.stock ?? 0;
                  return (
                    <tr key={p.id} className="hover:bg-champagne-50/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e'}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-champagne-200 flex-shrink-0"
                          />
                          <div>
                            <div className="font-serif font-bold text-sm text-charcoal-950 hover:text-gold-600 transition-colors">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-gray-500">{p.metal}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-charcoal-700">
                        {p.sku || 'N/A'}
                      </td>

                      <td className="py-3 px-4 capitalize text-charcoal-800">
                        {p.categoryLabel || p.category}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-charcoal-950">
                          {formatPrice(p.price)}
                        </div>
                        {p.originalPrice && (
                          <div className="text-[10px] text-gray-400 line-through">
                            {formatPrice(p.originalPrice)}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          stock > 5 
                            ? 'bg-green-50 text-green-800 border-green-200' 
                            : stock > 0 
                            ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse' 
                            : 'bg-red-50 text-red-800 border-red-300'
                        }`}>
                          {stock > 5 ? `${stock} in stock` : stock > 0 ? `Only ${stock} left` : 'Out of stock'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(p.featured || p.isBestseller) && (
                            <span className="px-2 py-0.5 rounded bg-gold-100 text-gold-800 text-[10px] font-bold">
                              Featured
                            </span>
                          )}
                          {(p.newArrival || p.isNew) && (
                            <span className="px-2 py-0.5 rounded bg-charcoal-900 text-gold-300 text-[10px] font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg border border-champagne-200 text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmProduct(p)}
                          className="p-1.5 rounded-lg border border-champagne-200 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={modalOpen}
        product={editingProduct}
        onClose={() => setModalOpen(false)}
        onSave={onSaveProduct}
      />

      {/* Delete Confirmation Modal Dialog */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setDeleteConfirmProduct(null)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-champagne-200 text-center space-y-4">
              
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-charcoal-950">
                  Delete Product Confirmation
                </h3>
                <p className="text-xs text-gray-600 mt-2">
                  Are you sure you want to delete <strong>"{deleteConfirmProduct.name}"</strong>?
                  This product will be permanently removed from the catalogue and customer website.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setDeleteConfirmProduct(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-charcoal-700 hover:bg-gray-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow"
                >
                  Yes, Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
