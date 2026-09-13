import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cheema_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('cheema_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (product, options = {}) => {
    const size = options.size || (product.sizes && product.sizes[0]) || 'Standard';
    const metal = options.metal || product.metal || 'Default';
    const engraving = options.engraving || '';
    const quantity = options.quantity || 1;

    const cartItemId = `${product.id}-${size}-${metal}-${engraving ? 'eng' : 'no'}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          cartItemId,
          product,
          size,
          metal,
          engraving,
          quantity,
          addedAt: Date.now()
        }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setPromoCode('');
    setPromoMessage(null);
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CHEEMA10' || clean === 'LUXORA10') {
      setDiscountPercent(10);
      setPromoCode(clean);
      setPromoMessage({ type: 'success', text: '10% Royal Privilege discount applied!' });
      return true;
    } else if (clean === 'ROYALVIP') {
      setDiscountPercent(15);
      setPromoCode(clean);
      setPromoMessage({ type: 'success', text: '15% VIP High-Jewellery discount applied!' });
      return true;
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promotional code. Try CHEEMA10' });
      return false;
    }
  };

  const removePromoCode = () => {
    setDiscountPercent(0);
    setPromoCode('');
    setPromoMessage(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const estimatedShipping = subtotal > 0 ? (subtotal > 50000 ? 0 : 1500) : 0;
  const total = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? estimatedShipping : 0));
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = async (customerDetails) => {
    const localOrderId = 'CJ-' + Math.floor(100000 + Math.random() * 900000);
    const orderPayload = {
      orderId: localOrderId,
      items: [...cart],
      customer: customerDetails,
      subtotal,
      discountAmount,
      shipping: estimatedShipping,
      total,
      paymentMethod: customerDetails.paymentMethod || 'card',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    try {
      // POST order to backend so it automatically registers in Admin Orders!
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order) {
          setLastOrder(data.order);
          clearCart();
          return data.order;
        }
      }
    } catch (err) {
      console.warn('Backend order recording fallback:', err);
    }

    setLastOrder(orderPayload);
    clearCart();
    return orderPayload;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      promoCode,
      promoMessage,
      discountPercent,
      applyPromoCode,
      removePromoCode,
      subtotal,
      discountAmount,
      estimatedShipping,
      total,
      totalItemsCount,
      placeOrder,
      lastOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
