import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)', name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)', name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)', name: 'Euro' },
  GBP: { symbol: '£', rate: 0.0094, label: 'GBP (£)', name: 'British Pound' }
};

export const CurrencyProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState('INR');

  const formatPrice = (priceInINR) => {
    if (priceInINR == null) return '';
    const config = CURRENCIES[currentCurrency] || CURRENCIES.INR;
    const converted = priceInINR * config.rate;

    if (currentCurrency === 'INR') {
      return '₹' + Math.round(converted).toLocaleString('en-IN');
    } else {
      return config.symbol + Math.round(converted).toLocaleString('en-US');
    }
  };

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      setCurrentCurrency,
      currencies: CURRENCIES,
      formatPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
