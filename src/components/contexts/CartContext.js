import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error loading from localStorage: ${error}`);
    return null;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = loadFromLocalStorage('cartItems');
    return saved || [];
  });

  const [favoriteItems, setFavoriteItems] = useState(() => {
    const saved = loadFromLocalStorage('favoriteItems');
    return saved || [];
  });

  useEffect(() => {
    saveToLocalStorage('cartItems', cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveToLocalStorage('favoriteItems', favoriteItems);
  }, [favoriteItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        saveToLocalStorage('cartItems', updatedItems);
        return updatedItems;
      }
      const updatedItems = [...prevItems, { ...product, quantity: 1, isSelected: true }];
      saveToLocalStorage('cartItems', updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (product) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== product.id);
      saveToLocalStorage('cartItems', updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= product.stockQuantity) {
      setCartItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
        saveToLocalStorage('cartItems', updatedItems);
        return updatedItems;
      });
    }
  };

  const toggleFavorite = (product) => {
    setFavoriteItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.filter(item => item.id !== product.id);
      } else {
        updatedItems = [...prevItems, product];
      }
      saveToLocalStorage('favoriteItems', updatedItems);
      return updatedItems;
    });
  };

  const toggleItemSelection = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
      saveToLocalStorage('cartItems', updatedItems);
      return updatedItems;
    });
  };

  const selectAllItems = (isSelected) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => ({ ...item, isSelected }));
      saveToLocalStorage('cartItems', updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      favoriteItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleItemSelection,
      selectAllItems,
      toggleFavorite,
      clearCart,
      selectedItemsCount: cartItems.filter(item => item.isSelected).length,
      favoriteItemsCount: favoriteItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);