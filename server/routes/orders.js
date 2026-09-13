import express from 'express';
import { readDb, writeDb } from '../data/db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Place Order from customer checkout
router.post('/', (req, res) => {
  const db = readDb();
  const { customer, items, subtotal, discountAmount, shipping, total, paymentMethod } = req.body;

  if (!customer || !items || !items.length) {
    return res.status(400).json({ success: false, message: 'Order must include customer details and items.' });
  }

  const orderId = 'CJ-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    orderId,
    customer,
    items,
    subtotal: Number(subtotal) || 0,
    discountAmount: Number(discountAmount) || 0,
    shipping: Number(shipping) || 0,
    total: Number(total) || 0,
    orderStatus: 'Pending',
    paymentStatus: paymentMethod === 'whatsapp' ? 'Pending Verification' : 'Paid',
    paymentMethod: paymentMethod || 'card',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    createdAt: new Date().toISOString()
  };

  // Decrement stock for ordered items
  items.forEach(item => {
    const prod = db.products.find(p => p.id === item.product?.id || p.id === item.cartItemId?.split('-')[0]);
    if (prod && typeof prod.stock === 'number') {
      prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
    }
  });

  db.orders.unshift(newOrder);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Order created successfully.',
    order: newOrder
  });
});

// Protected: Get all orders for Admin
router.get('/admin/all', authenticateAdmin, (req, res) => {
  const db = readDb();
  res.json({ success: true, orders: db?.orders || [] });
});

// Protected: Get single order details
router.get('/admin/:id', authenticateAdmin, (req, res) => {
  const db = readDb();
  const order = db.orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
  res.json({ success: true, order });
});

// Protected: Update order status
router.patch('/admin/:id/status', authenticateAdmin, (req, res) => {
  const db = readDb();
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  const order = db.orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

  order.orderStatus = status;
  if (status === 'Delivered') {
    order.paymentStatus = 'Paid';
  }
  order.updatedAt = new Date().toISOString();

  writeDb(db);
  res.json({ success: true, message: `Order status updated to ${status}.`, order });
});

export default router;
