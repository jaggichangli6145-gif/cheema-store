import express from 'express';
import { readDb } from '../data/db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected: Get aggregated customer analytics & directory
router.get('/admin/all', authenticateAdmin, (req, res) => {
  const db = readDb();
  const orders = db?.orders || [];

  const customerMap = {};

  orders.forEach(order => {
    const key = order.customer.phone || order.customer.email;
    if (!key) return;

    if (!customerMap[key]) {
      customerMap[key] = {
        fullName: order.customer.fullName,
        phone: order.customer.phone,
        email: order.customer.email,
        city: order.customer.city,
        state: order.customer.state,
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: order.date,
        orders: []
      };
    }

    customerMap[key].totalOrders += 1;
    customerMap[key].totalSpent += (order.total || 0);
    customerMap[key].orders.push({
      orderId: order.orderId,
      date: order.date,
      total: order.total,
      status: order.orderStatus,
      itemsCount: order.items?.length || 0
    });
  });

  const customers = Object.values(customerMap);
  customers.sort((a, b) => b.totalSpent - a.totalSpent);

  res.json({ success: true, customers });
});

export default router;
