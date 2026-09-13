import React, { useState, useMemo } from 'react';
import { Search, Users, Phone, Mail, ShoppingBag, Eye, X, Gem } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function CustomerManagement({ customers = [], orders = [] }) {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase().trim();
      return (
        c.fullName.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.city && c.city.toLowerCase().includes(q))
      );
    });
  }, [customers, searchTerm]);

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(o => 
      (o.customer?.phone && o.customer.phone === selectedCustomer.phone) ||
      (o.customer?.email && o.customer.email === selectedCustomer.email)
    );
  }, [selectedCustomer, orders]);

  return (
    <div className="space-y-6">
      
      {/* Header Search */}
      <div className="bg-white p-5 rounded-2xl border border-champagne-200/90 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by patron name, phone, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
          />
        </div>

        <div className="text-xs text-gray-500">
          Total Registered Patrons: <strong>{customers.length}</strong>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-champagne-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-champagne-50/70 border-b border-champagne-200 text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Lifetime Spent (₹)</th>
                <th className="py-3 px-4 text-right">Order History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No customer records found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-champagne-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-charcoal-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gold-100 text-gold-800 flex items-center justify-center font-bold text-xs">
                          {c.fullName?.[0]?.toUpperCase() || 'P'}
                        </div>
                        <span>{c.fullName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-charcoal-700">
                      {c.phone || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      {c.email || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 text-charcoal-800">
                      {c.city ? `${c.city}, ${c.state || ''}` : 'India'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200 text-[11px]">
                        {c.totalOrders} Order{c.totalOrders > 1 ? 's' : ''}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-charcoal-950 font-serif text-sm">
                      {formatPrice(c.totalSpent)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 rounded-lg border border-champagne-200 text-gold-700 hover:bg-gold-50 font-semibold text-[11px] transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>History</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Order History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCustomer(null)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-champagne-200 overflow-hidden flex flex-col my-8">
              
              <div className="p-5 px-6 border-b border-champagne-200 bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-charcoal-950">
                    Patron History: {selectedCustomer.fullName}
                  </h3>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {selectedCustomer.phone} &bull; {selectedCustomer.email}
                  </div>
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="p-1.5 rounded-full hover:bg-gray-200 text-charcoal-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-3 p-3 bg-champagne-50/60 rounded-xl border border-champagne-200">
                  <div>
                    <span className="text-gray-500">Total Lifetime Value:</span>
                    <div className="font-serif font-bold text-base text-gold-700">
                      {formatPrice(selectedCustomer.totalSpent)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Completed Orders:</span>
                    <div className="font-bold text-charcoal-900 text-base">
                      {selectedCustomer.totalOrders}
                    </div>
                  </div>
                </div>

                <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
                  Order Records
                </div>

                <div className="space-y-3">
                  {customerOrders.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      No order details found for this customer.
                    </div>
                  ) : (
                    customerOrders.map((o) => (
                      <div key={o.orderId} className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-charcoal-900">{o.orderId}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            {o.orderStatus}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-[11px]">
                          <span>Date: {o.date}</span>
                          <span className="font-bold text-charcoal-950 font-serif">{formatPrice(o.total)}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          Items: {o.items?.map(i => i.product?.name).join(', ')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 px-6 border-t border-champagne-200 bg-[#FAF8F5] flex justify-end">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-5 py-2 bg-charcoal-950 text-gold-300 rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
