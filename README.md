# CHEEMA JEWELS — Haute Joaillerie E-Commerce Platform & Admin Dashboard

A luxury fine jewellery e-commerce web application with interactive shopping bag, live search, multi-facet catalog filters, bespoke customizer studio, verified patron testimonials, direct WhatsApp concierge, and a comprehensive secure Admin Command Centre.

---

## 💎 Project Overview
- **Brand**: CHEEMA JEWELS (Haute Joaillerie • Est. 1994)
- **VIP Concierge Contact**: +91 78142 49224 (`7814249224`)
- **Direct WhatsApp Orders**: `+91 78142 49224`

---

## 🚀 Features
- **Luxury Storefront**: High-fashion Hero, 10 Category Showcases, 6 Signature Collections, Bestsellers, New Arrivals, Bridal Boutique, Bespoke Customizer Studio, and Slide-over Cart.
- **Secure Admin Panel (`/admin`)**:
  - Protected with bcrypt password hashing & JWT 24-hour signed tokens.
  - **Overview**: Real-time sales, order breakdown, and catalog statistics.
  - **Product Management**: Create, edit, and safely delete jewellery items.
  - **Order Management**: Live order tracking and status lifecycle management.
  - **Customer Directory**: Aggregated patron profiles, lifetime spend, and purchase history.
  - **Inventory Control**: Live stock levels and low-stock alerts.
  - **Price Management**: Instant price & promotional discount updates.
  - **Settings**: Store contact details, shipping fee thresholds, and announcement banner.

---

## 🔐 Default Admin Access
- **Portal**: `/admin/login`
- **Admin ID**: `adminop`
- **Password**: `cheema51`

---

## 🛠️ Quick Start & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
# Terminal 1: Backend API Server
node server/index.js

# Terminal 2: Frontend Vite Server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm start
```

---

## 📦 Deployment
Deploy with one click on **Render**, **Railway**, **Vercel**, or an **Ubuntu VPS (Nginx + PM2)**.
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT=10000` (or `5001`)
  - `JWT_SECRET=cheema_jewels_super_secret_jwt_key_2026_luxury_secure_916`
  - `ADMIN_USERNAME=adminop`
