import bcrypt from 'bcryptjs';
import { writeDb, readDb } from './db.js';
import { PRODUCTS } from '../../src/data/products.js';

export const initDb = () => {
  const existing = readDb();
  if (existing && existing.admin && existing.products && existing.products.length > 0) {
    console.log('Database already initialized. Skipping seed.');
    return existing;
  }

  console.log('Initializing database with secure hashed credentials and initial inventory...');

  // Hash initial admin password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('cheema51', salt);

  // Map products with inventory fields
  const products = PRODUCTS.map((p, idx) => ({
    ...p,
    sku: `CJ-${p.category.toUpperCase().slice(0, 3)}-${String(idx + 1).padStart(3, '0')}`,
    stock: idx === 2 ? 3 : idx === 5 ? 2 : idx === 7 ? 0 : 15, // A couple low/out of stock for realistic testing
    status: 'active',
    featured: p.isBestseller || false,
    newArrival: p.isNew || false,
    createdAt: new Date(Date.now() - (idx * 86400000)).toISOString()
  }));

  const initialOrders = [
    {
      orderId: 'CJ-924182',
      customer: {
        fullName: 'Gurpreet Kaur Dhillon',
        phone: '7814249224',
        email: 'gurpreet.dhillon@example.com',
        address: 'Villa 14, Sector 9-B',
        city: 'Chandigarh',
        state: 'Punjab',
        pincode: '160009',
        notes: 'Please gift wrap in signature burgundy velvet box'
      },
      items: [
        {
          cartItemId: 'prod-1-US 7 / 14-18K White Gold-no',
          product: products[0],
          size: 'US 7 / 14',
          metal: '18K White Gold',
          engraving: 'Forever G&V',
          quantity: 1
        }
      ],
      subtotal: 185000,
      discountAmount: 18500,
      shipping: 0,
      total: 166500,
      orderStatus: 'Confirmed',
      paymentStatus: 'Paid (UPI)',
      paymentMethod: 'upi',
      date: 'September 12, 2026',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      orderId: 'CJ-781940',
      customer: {
        fullName: 'Vikramjit Singh Cheema',
        phone: '9876543210',
        email: 'vikram.cheema@example.com',
        address: 'Mall Road, Civil Lines',
        city: 'Amritsar',
        state: 'Punjab',
        pincode: '143001',
        notes: 'Call before delivery for security gate clearance'
      },
      items: [
        {
          cartItemId: 'prod-2-18 inch Classic-22K Yellow Gold-no',
          product: products[1],
          size: '18 inch Classic',
          metal: '22K Yellow Gold',
          engraving: '',
          quantity: 1
        }
      ],
      subtotal: 245000,
      discountAmount: 0,
      shipping: 0,
      total: 245000,
      orderStatus: 'Processing',
      paymentStatus: 'Paid (Net Banking)',
      paymentMethod: 'netbanking',
      date: 'September 11, 2026',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      orderId: 'CJ-652391',
      customer: {
        fullName: 'Simranjit Gill',
        phone: '9812345678',
        email: 'simran.gill@example.com',
        address: '42 Golf Links, Central',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110003',
        notes: 'Wedding bridal suite'
      },
      items: [
        {
          cartItemId: 'prod-7-Complete 3-Piece Suite-18K White Gold-no',
          product: products[6],
          size: 'Complete 3-Piece Suite',
          metal: '18K White Gold',
          engraving: '',
          quantity: 1
        }
      ],
      subtotal: 680000,
      discountAmount: 68000,
      shipping: 0,
      total: 612000,
      orderStatus: 'Pending',
      paymentStatus: 'Pending Verification',
      paymentMethod: 'whatsapp',
      date: 'September 13, 2026',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      orderId: 'CJ-512903',
      customer: {
        fullName: 'Aria Montgomery',
        phone: '9888123456',
        email: 'aria.m@example.com',
        address: 'B-402, Sea Green Heights, Worli',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400018',
        notes: ''
      },
      items: [
        {
          cartItemId: 'prod-4-7.0 inch Standard-18K White Gold-no',
          product: products[3],
          size: '7.0 inch Standard',
          metal: '18K White Gold',
          engraving: '',
          quantity: 1
        }
      ],
      subtotal: 320000,
      discountAmount: 32000,
      shipping: 0,
      total: 288000,
      orderStatus: 'Delivered',
      paymentStatus: 'Paid (Card)',
      paymentMethod: 'card',
      date: 'September 5, 2026',
      createdAt: new Date(Date.now() - 691200000).toISOString()
    }
  ];

  const settings = {
    storeName: 'CHEEMA JEWELS',
    contactNumber: '+91 78142 49224',
    rawPhone: '7814249224',
    email: 'concierge@cheemajewels.com',
    address: 'Cheema Haute Joaillerie, Luxury Boulevard, Suite 108',
    freeShippingThreshold: 50000,
    flatShippingFee: 1500,
    taxRatePercent: 3,
    announcementText: 'Complimentary Insured White-Glove Delivery & Luxury LED Box | VIP Concierge: +91 78142 49224',
    currency: 'INR'
  };

  const initialData = {
    admin: {
      username: 'adminop',
      passwordHash: passwordHash,
      role: 'Super Administrator',
      lastLogin: null
    },
    products,
    orders: initialOrders,
    settings
  };

  writeDb(initialData);
  console.log('Database initialized successfully with hashed admin credentials!');
  return initialData;
};
