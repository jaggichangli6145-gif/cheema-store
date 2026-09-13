import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle2, Save, ArrowUpDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function InventoryManagement({ products = [], onUpdateStock }) {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [stockChanges, setStockChanges] = useState({});
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'low', 'out'

  const lowStockCount = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length;
  const outOfStockCount = products.filter(p => (p.stock || 0) === 0).length;

  const handleStockInputChange = (productId, value) => {
    setStockChanges(prev => ({ ...prev, [productId]: value }));
  };

  const saveSingleStock = async (productId) => {
    const newStock = stockChanges[productId];
    if (newStock !== undefined && newStock !== '') {
      await onUpdateStock(productId, Number(newStock));
      setStockChanges(prev => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    }
  };

  const filteredProducts = products.filter(p => {
    const stock = p.stock ?? 0;
    if (filterMode === 'low' && (stock === 0 || stock > 5)) return false;
    if (filterMode === 'out' && stock > 0) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Alert Warning Bar */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 text-amber-900 font-medium">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Inventory Warning:</strong> {lowStockCount} items low on stock, {outOfStockCount} items completely sold out.
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterMode(filterMode === 'low' ? 'all' : 'low')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                filterMode === 'low' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 border border-amber-300'
              }`}
            >
              Show Low Stock
            </button>
            <button
              onClick={() => setFilterMode(filterMode === 'out' ? 'all' : 'out')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                filterMode === 'out' ? 'bg-red-600 text-white' : 'bg-white text-red-800 border border-red-300'
              }`}
            >
              Show Out of Stock
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-champagne-200/90 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search catalogue by product name, SKU or metal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
          />
        </div>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${filterMode === 'all' ? 'bg-charcoal-900 text-gold-300' : 'bg-gray-100 text-gray-700'}`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${filterMode === 'low' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterMode('out')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${filterMode === 'out' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-champagne-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-champagne-50/70 border-b border-champagne-200 text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3 px-4">Jewel</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (₹)</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4 text-right">Quick Stock Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const currentStock = p.stock ?? 0;
                const draftStock = stockChanges[p.id] !== undefined ? stockChanges[p.id] : currentStock;
                const isModified = stockChanges[p.id] !== undefined && Number(stockChanges[p.id]) !== currentStock;

                return (
                  <tr key={p.id} className="hover:bg-champagne-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e'}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover border border-champagne-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-serif font-bold text-sm text-charcoal-950 truncate max-w-[200px]">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-gray-400">{p.metal}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-charcoal-700">
                      {p.sku || 'N/A'}
                    </td>

                    <td className="py-3 px-4 capitalize text-charcoal-800">
                      {p.categoryLabel || p.category}
                    </td>

                    <td className="py-3 px-4 font-serif font-bold text-charcoal-950">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-4 font-bold text-sm">
                      {currentStock}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        currentStock > 5
                          ? 'bg-green-50 text-green-800 border-green-300'
                          : currentStock > 0
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}>
                        {currentStock > 5 ? 'In Stock' : currentStock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={draftStock}
                          onChange={(e) => handleStockInputChange(p.id, e.target.value)}
                          className="w-16 px-2 py-1 text-center bg-gray-50 border border-champagne-200 rounded-lg font-bold text-xs outline-none focus:border-gold-500"
                        />
                        {isModified && (
                          <button
                            onClick={() => saveSingleStock(p.id)}
                            className="px-3 py-1 rounded-lg bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs flex items-center gap-1 shadow animate-fade-in"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
