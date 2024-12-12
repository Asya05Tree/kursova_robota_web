// CurrencyContext.js
import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('UAH');
  
  const currencySymbols = {
    UAH: 'грн',
    USD: '$'
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'UAH' ? 'USD' : 'UAH');
  };

  const convertPrice = (price) => {
    const exchangeRate = 0.024;
    const numericPrice = currency === 'UAH' 
      ? price 
      : (price * exchangeRate).toFixed(2);

    return `${currency === 'UAH' ? numericPrice : currencySymbols.USD + numericPrice}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      toggleCurrency, 
      convertPrice, 
      currencySymbol: currencySymbols[currency]
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};