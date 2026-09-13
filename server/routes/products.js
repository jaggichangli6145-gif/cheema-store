import express from 'express';
import { readDb, writeDb } from '../data/db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all active products for customer website
router.get('/', (req, res) => {
  const db = readDb();
  if (!db || !db.products) {
    return res.json({ success: true, products: [] });
  }
  // Return all active products
  const active = db.products.filter(p => p.status !== 'draft');
  res.json({ success: true, products: active });
});

// Protected: Get all products for Admin (including drafts and inventory metrics)
router.get('/admin/all', authenticateAdmin, (req, res) => {
  const db = readDb();
  res.json({ success: true, products: db?.products || [] });
});

// Protected: Add a new product
router.post('/admin', authenticateAdmin, (req, res) => {
  const db = readDb();
  if (!db) return res.status(500).json({ success: false, message: 'DB read failure.' });

  const productData = req.body;
  if (!productData.name || !productData.price || !productData.category) {
    return res.status(400).json({ success: false, message: 'Name, Category, and Price are required.' });
  }

  const id = `cj-prod-${Date.now()}`;
  const sku = productData.sku || `CJ-${productData.category.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`;

  const newProduct = {
    id,
    name: productData.name,
    category: productData.category,
    categoryLabel: productData.categoryLabel || productData.category.toUpperCase(),
    collection: productData.collection || 'signature',
    collectionLabel: productData.collectionLabel || 'Signature Collection',
    price: Number(productData.price),
    originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
    rating: productData.rating || 5.0,
    reviewCount: productData.reviewCount || 0,
    isBestseller: Boolean(productData.featured),
    isNew: Boolean(productData.newArrival),
    badge: productData.featured ? 'Featured' : productData.newArrival ? 'NEW' : '',
    images: Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'],
    description: productData.description || '',
    metal: productData.metal || '18K Yellow Gold',
    metalPurity: productData.metalPurity || '18K (750 BIS)',
    weight: productData.weight || '5.00 grams',
    gemstone: productData.gemstone || 'Natural Diamond',
    diamondCarat: productData.diamondCarat || 'N/A',
    clarity: productData.clarity || 'VVS1',
    diamondColor: productData.diamondColor || 'D',
    cut: productData.cut || 'Round Brilliant',
    occasion: productData.occasion || 'Bridal',
    sizes: Array.isArray(productData.sizes) && productData.sizes.length > 0 
      ? productData.sizes 
      : ['Standard', 'Custom Size'],
    stock: Number(productData.stock ?? 10),
    sku,
    status: productData.status || 'active',
    featured: Boolean(productData.featured),
    newArrival: Boolean(productData.newArrival),
    certificate: productData.certificate || 'GIA / BIS Hallmarked Certified',
    deliveryDays: productData.deliveryDays || '3-5 Business Days',
    createdAt: new Date().toISOString()
  };

  db.products.unshift(newProduct);
  writeDb(db);

  res.status(201).json({ success: true, message: 'Product added successfully.', product: newProduct });
});

// Protected: Update an existing product
router.put('/admin/:id', authenticateAdmin, (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  const updated = {
    ...db.products[index],
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : db.products[index].price,
    originalPrice: req.body.originalPrice !== undefined ? (req.body.originalPrice ? Number(req.body.originalPrice) : null) : db.products[index].originalPrice,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : db.products[index].stock,
    isBestseller: req.body.featured !== undefined ? Boolean(req.body.featured) : db.products[index].isBestseller,
    isNew: req.body.newArrival !== undefined ? Boolean(req.body.newArrival) : db.products[index].isNew,
    updatedAt: new Date().toISOString()
  };

  db.products[index] = updated;
  writeDb(db);

  res.json({ success: true, message: 'Product updated successfully.', product: updated });
});

// Protected: Quick Price and Discount edit
router.patch('/admin/:id/price', authenticateAdmin, (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const { price, originalPrice } = req.body;

  const product = db.products.find(p => p.id === id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

  if (price !== undefined) product.price = Number(price);
  if (originalPrice !== undefined) product.originalPrice = originalPrice ? Number(originalPrice) : null;
  product.updatedAt = new Date().toISOString();

  writeDb(db);
  res.json({ success: true, message: 'Price updated successfully.', product });
});

// Protected: Quick Stock quantity edit
router.patch('/admin/:id/stock', authenticateAdmin, (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const { stock } = req.body;

  const product = db.products.find(p => p.id === id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

  product.stock = Math.max(0, Number(stock));
  product.updatedAt = new Date().toISOString();

  writeDb(db);
  res.json({ success: true, message: 'Stock updated successfully.', product });
});

// Protected: Delete product
router.delete('/admin/:id', authenticateAdmin, (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== id);

  if (db.products.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Product deleted successfully.' });
});

export default router;
