import React, { useState, useMemo } from 'react';
import { 
  Search, Eye, CheckCircle2, Clock, Truck, 
  XCircle, Filter, Package, Phone, Mail, MapPin, X 
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function OrderManagement({ orders = [], onUpdateStatus }) {
  const { formatPrice } = useCurrency();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== 'all' && o.orderStatus !== statusFilter) {
        return false;
      }

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const match = 
          o.orderId.toLowerCase().includes(q) ||
          (o.customer?.fullName && o.customer.fullName.toLowerCase().includes(q)) ||
          (o.customer?.phone && o.customer.phone.includes(q)) ||
          (o.customer?.email && o.customer.email.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });
  }, [orders, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Confirmed':
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-champagne-200/90 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, phone or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none focus:border-gold-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-champagne-200 rounded-xl outline-none text-xs"
          >
            <option value="all">All Statuses</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <span className="text-gray-400 text-xs ml-2">
            Showing <strong>{filteredOrders.length}</strong> of {orders.length} orders
          </span>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-champagne-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-champagne-50/70 border-b border-champagne-200 text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Products & Items</th>
                <th className="py-3 px-4">Total (₹)</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No orders matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const totalItems = order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
                  return (
                    <tr key={order.orderId} className="hover:bg-champagne-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-charcoal-900">
                        {order.orderId}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-charcoal-900">
                          {order.customer?.fullName || 'Valued Client'}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {order.customer?.phone}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate max-w-[160px]">
                          {order.customer?.email}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-charcoal-900 line-clamp-1 max-w-[200px]">
                          {order.items?.[0]?.product?.name || 'High Jewellery Piece'}
                        </div>
                        {order.items?.length > 1 && (
                          <div className="text-[10px] text-gold-700 font-semibold">
                            +{order.items.length - 1} more item(s) ({totalItems} total)
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-charcoal-950 font-serif text-sm">
                          {formatPrice(order.total)}
                        </div>
                        <div className="text-[10px] text-gray-500 capitalize">
                          {order.paymentStatus || 'Paid'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {order.date}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateStatus(order.orderId, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border outline-none cursor-pointer ${getStatusBadge(order.orderStatus)}`}
                        >
                          {statuses.map(st => (
                            <option key={st} value={st} className="bg-white text-charcoal-900 font-normal">
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg border border-champagne-200 text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 transition-colors inline-flex items-center gap-1"
                          title="View Complete Order Information"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline text-[11px] font-semibold">View</span>
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-champagne-200 overflow-hidden flex flex-col my-8">
              
              {/* Modal Header */}
              <div className="p-5 px-6 border-b border-champagne-200 bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lg text-charcoal-950">
                      Order {selectedOrder.orderId}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Placed on {selectedOrder.date} &bull; Payment: {selectedOrder.paymentStatus}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="p-1.5 rounded-full hover:bg-gray-200 text-charcoal-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 text-xs overflow-y-auto max-h-[75vh]">
                
                {/* Status Changer Bar */}
                <div className="p-4 bg-champagne-50/70 rounded-2xl border border-champagne-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-semibold text-charcoal-900">
                    Update Order Lifecycle Status:
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedOrder.orderStatus}
                      onChange={(e) => {
                        const newSt = e.target.value;
                        onUpdateStatus(selectedOrder.orderId, newSt);
                        setSelectedOrder(prev => ({ ...prev, orderStatus: newSt }));
                      }}
                      className="px-3 py-1.5 rounded-xl border border-gold-400 bg-white font-bold text-xs"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Customer Information & Shipping */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                  <div className="space-y-1.5">
                    <div className="font-serif font-bold text-sm text-charcoal-950 uppercase tracking-wider text-[11px] mb-2">
                      Client Profile
                    </div>
                    <div className="font-bold text-charcoal-900 text-sm">
                      {selectedOrder.customer?.fullName}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-gold-600" />
                      <span>{selectedOrder.customer?.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-gold-600" />
                      <span>{selectedOrder.customer?.email}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-serif font-bold text-sm text-charcoal-950 uppercase tracking-wider text-[11px] mb-2">
                      Delivery Address
                    </div>
                    <div className="text-charcoal-800 leading-relaxed">
                      {selectedOrder.customer?.address}
                    </div>
                    <div className="text-gray-600">
                      {selectedOrder.customer?.city}, {selectedOrder.customer?.state} - {selectedOrder.customer?.pincode}
                    </div>
                    {selectedOrder.customer?.notes && (
                      <div className="text-[11px] text-gold-800 bg-gold-50 p-2 rounded-lg border border-gold-200 mt-2">
                        <strong>Client Note:</strong> {selectedOrder.customer.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Itemized Products List */}
                <div className="space-y-3">
                  <div className="font-serif font-bold text-sm text-charcoal-950 border-b border-gray-100 pb-2">
                    Ordered Masterpieces ({selectedOrder.items?.length || 0})
                  </div>

                  <div className="divide-y divide-gray-100">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center gap-4">
                        <img
                          src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e'}
                          alt={item.product?.name || 'Jewel'}
                          className="w-16 h-16 rounded-xl object-cover border border-champagne-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-sm text-charcoal-950 truncate">
                            {item.product?.name}
                          </h4>
                          <div className="text-[11px] text-gray-500 space-x-2 mt-0.5">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>&bull;</span>
                            <span>Metal: <strong>{item.metal}</strong></span>
                            <span>&bull;</span>
                            <span>Qty: <strong>{item.quantity}</strong></span>
                          </div>
                          {item.engraving && (
                            <div className="text-[10px] text-gold-700 bg-gold-50 px-2 py-0.5 rounded mt-1 inline-block border border-gold-200">
                              Custom Engraving: "{item.engraving}"
                            </div>
                          )}
                        </div>
                        <div className="text-right font-bold text-charcoal-950 font-serif text-sm">
                          {formatPrice((item.product?.price || 0) * (item.quantity || 1))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-200 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Privilege Discount</span>
                      <span>-{formatPrice(selectedOrder.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Insured Courier & Tamper-Proof LED Box</span>
                    <span>{selectedOrder.shipping === 0 ? 'Complimentary' : formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-charcoal-950 border-t border-gray-200 pt-2 font-serif">
                    <span>Grand Total Paid / Due</span>
                    <span className="text-gold-700">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 border-t border-champagne-200 bg-[#FAF8F5] flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 bg-charcoal-950 text-gold-300 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-black transition-all"
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
