import React from 'react';
import { 
  ShoppingCart, Clock, CheckCircle2, XCircle, Package, 
  AlertTriangle, DollarSign, TrendingUp, ArrowRight, Eye, 
  Sparkles, Layers 
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function AdminDashboard({ 
  orders = [], 
  products = [], 
  onNavigateTab, 
  onViewOrder,
  onEditProduct 
}) {
  const { formatPrice } = useCurrency();

  // Metrics calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
  const completedOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
  const cancelledOrders = orders.filter(o => o.orderStatus === 'Cancelled').length;
  const totalRevenue = orders
    .filter(o => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 5);
  const outOfStockProducts = products.filter(p => (p.stock || 0) === 0);

  const recentOrders = orders.slice(0, 5);
  const recentProducts = products.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Confirmed':
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#171615] via-[#24211D] to-[#171615] rounded-3xl p-6 sm:p-8 text-white border border-gold-400/30 shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            CHEEMA JEWELS Command Centre
          </h2>
          <p className="text-xs text-gray-300 mt-1 font-light">
            Real-time sales, order lifecycle status, and high-jewellery inventory management.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigateTab('add-product')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider shadow hover:opacity-95 transition-all"
          >
            + Add New Jewel
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2.5 rounded-xl border border-gold-400/40 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Manage Orders
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="p-6 bg-white rounded-2xl border border-champagne-200/90 shadow-soft flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross Sales</div>
            <div className="text-2xl font-serif font-bold text-charcoal-950 mt-1 text-gold-700">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[11px] text-green-700 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{totalOrders} Total Orders</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 border border-gold-200 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="p-6 bg-white rounded-2xl border border-champagne-200/90 shadow-soft flex items-center justify-between cursor-pointer hover:border-gold-400 transition-all"
        >
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Orders</div>
            <div className="text-2xl font-serif font-bold text-charcoal-950 mt-1">
              {pendingOrders}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Awaiting fulfillment</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="p-6 bg-white rounded-2xl border border-champagne-200/90 shadow-soft flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivered Orders</div>
            <div className="text-2xl font-serif font-bold text-charcoal-950 mt-1">
              {completedOrders}
            </div>
            <div className="text-[11px] text-green-700 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{cancelledOrders} Cancelled</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 border border-green-200 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products & Low Stock */}
        <div 
          onClick={() => onNavigateTab('inventory')}
          className="p-6 bg-white rounded-2xl border border-champagne-200/90 shadow-soft flex items-center justify-between cursor-pointer hover:border-gold-400 transition-all"
        >
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Products</div>
            <div className="text-2xl font-serif font-bold text-charcoal-950 mt-1">
              {totalProducts}
            </div>
            <div className="text-[11px] text-amber-600 font-bold mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>{lowStockProducts.length} Low Stock / {outOfStockProducts.length} Out</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 border border-gold-200 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Low Stock Alert Warning Banner */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-900">Inventory Alert: </span>
              <span className="text-amber-800">
                {lowStockProducts.length} jewellery items are currently running low on stock (≤ 5 units).
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white font-semibold text-xs whitespace-nowrap hover:bg-amber-700 transition-colors"
          >
            Review Inventory &rarr;
          </button>
        </div>
      )}

      {/* Split Section: Recent Orders & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders: 7 Cols */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-champagne-200/90 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-charcoal-950">
                Recent Orders
              </h3>
              <div className="text-xs text-gray-500">Latest customer purchases</div>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-champagne-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-charcoal-900">
                      {order.orderId}
                    </td>
                    <td className="py-3 px-3 font-medium text-charcoal-800">
                      {order.customer?.fullName || 'Client'}
                    </td>
                    <td className="py-3 px-3 font-bold text-charcoal-950">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="p-1.5 rounded-lg hover:bg-gold-100 text-gold-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Products: 5 Cols */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-champagne-200/90 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-charcoal-950">
                Catalogue Highlights
              </h3>
              <div className="text-xs text-gray-500">Recently listed masterpieces</div>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => onEditProduct(p)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-champagne-50/70 cursor-pointer transition-colors border border-transparent hover:border-champagne-200"
              >
                <img
                  src={p.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e'}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-semibold text-gold-600 truncate">
                    {p.categoryLabel || p.category}
                  </div>
                  <h4 className="text-xs font-serif font-bold text-charcoal-900 truncate">
                    {p.name}
                  </h4>
                  <div className="text-xs font-bold text-charcoal-950">
                    {formatPrice(p.price)}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    (p.stock || 0) > 5 ? 'bg-green-100 text-green-800' : (p.stock || 0) > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {p.stock ?? 0} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
