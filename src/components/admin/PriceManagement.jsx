import React, { useState } from 'react';
import { Search, DollarSign, Save, Edit, X, Check, Gem } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function PriceManagement({ products = [], onUpdatePrice }) {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null); // { id, price, originalPrice }
  const [savingId, setSavingId] = useState(null);

  const filteredProducts = products.filter(p => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.sku && p.sku.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleStartEdit = (p) => {
    setEditingItem({
      id: p.id,
      price: p.price,
      originalPrice: p.originalPrice || ''
    });
  };

  const handleSavePrice = async () => {
    if (!editingItem) return;
    setSavingId(editingItem.id);
    await onUpdatePrice(editingItem.id, editingItem.price, editingItem.originalPrice);
    setSavingId(null);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-white p-5 rounded-2xl border border-champagne-200/90 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-serif font-bold text-charcoal-950">
            Real-Time Price & Discount Configuration
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Modify selling and retail prices in Indian Rupee (₹). Changes automatically synchronize with the customer boutique.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search jewels to reprice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
          />
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-2xl border border-champagne-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-champagne-50/70 border-b border-champagne-200 text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3 px-4">Jewellery Item</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Selling Price (₹)</th>
                <th className="py-3 px-4">Retail / Compare Price (₹)</th>
                <th className="py-3 px-4">Active Discount</th>
                <th className="py-3 px-4 text-right">Price Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const isCurrentEditing = editingItem && editingItem.id === p.id;
                const hasDiscount = p.originalPrice && p.originalPrice > p.price;
                const discountPercent = hasDiscount 
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) 
                  : 0;

                return (
                  <tr key={p.id} className="hover:bg-champagne-50/40 transition-colors">
                    <td className="py-3.5 px-4">
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
                          <div className="text-[10px] text-gray-500">{p.metal}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-charcoal-700">
                      {p.sku || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 capitalize text-charcoal-800">
                      {p.categoryLabel || p.category}
                    </td>

                    <td className="py-3.5 px-4">
                      {isCurrentEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-gray-500">₹</span>
                          <input
                            type="number"
                            min="1"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                            className="w-28 px-2 py-1 bg-gray-50 border border-gold-400 rounded-lg font-bold text-xs outline-none"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="font-serif font-bold text-sm text-charcoal-950">
                          {formatPrice(p.price)}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isCurrentEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-gray-400">₹</span>
                          <input
                            type="number"
                            min="1"
                            value={editingItem.originalPrice}
                            placeholder="Optional"
                            onChange={(e) => setEditingItem({ ...editingItem, originalPrice: e.target.value })}
                            className="w-28 px-2 py-1 bg-gray-50 border border-champagne-200 rounded-lg text-xs outline-none"
                          />
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          {p.originalPrice ? formatPrice(p.originalPrice) : 'None'}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {hasDiscount ? (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[10px]">
                          {discountPercent}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[11px]">&mdash;</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isCurrentEditing ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={handleSavePrice}
                            disabled={savingId === p.id}
                            className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-xs flex items-center gap-1 shadow"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="px-3 py-1.5 rounded-lg border border-champagne-200 text-gold-700 hover:bg-gold-50 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Price</span>
                        </button>
                      )}
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
