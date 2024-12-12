import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './components/contexts/ThemeContext';
import { UserProvider } from './components/contexts/UserContext';
import { LanguageProvider } from './components/contexts/LanguageContext';
import { CurrencyProvider } from './components/contexts/CurrencyContext';
import { CartProvider } from './components/contexts/CartContext';

import Header from './components/heasder/Header';

import ProductList from './components/main/pages/ProductList/ProductList';
import ProductDetail from './components/main/pages/productDetail/ProductDetail';
import LoginRegistrationModal from './components/heasder/modal/LoginRegistrationModal';

import AboutPage from './components/main/pages/About/AboutPage';
import BrandProductPage from './components/main/pages/brand/BrandProductPage';
import { DogBlogPage, CatBlogPage } from './components/main/pages/dogCatBlogPage/BlogPage';
import Favorites from './components/heasder/Favorites/Favorites';
import Cart from './components/heasder/Cart/Cart';

import Footer from './components/footer/Footer';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const updateTheme = useCallback((newTheme) => {
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', newTheme);
    document.body.classList.toggle('light-theme', !newTheme);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedTheme);
    updateTheme(savedTheme);
  }, []);

  return (
    <ThemeProvider initialTheme={isDarkMode}>
      <UserProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <CartProvider>
              <BrowserRouter>
                <div className="App">
                  <Header
                    setShowLoginModal={setShowLoginModal}
                    setIsDarkMode={updateTheme}
                    isDarkMode={isDarkMode}
                  />
                  <main style={{
                    backgroundColor: isDarkMode ? '#383838' : '#ffe8d7',
                  }}>
                    <Routes>
                      <Route
                        path="/"
                        element={<ProductList onProductSelect={setSelectedProduct} />}
                      />
                      <Route
                        path="/product/:id"
                        element={<ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />}
                      />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/brands" element={<BrandProductPage />} />
                      <Route path="/dog-blog" element={<DogBlogPage />} />
                      <Route path="/cat-blog" element={<CatBlogPage />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/cart" element={<Cart />} />
                    </Routes>
                  </main>
                  <Footer />
                  {showLoginModal && (
                    <LoginRegistrationModal
                      isOpen={showLoginModal}
                      onClose={() => setShowLoginModal(false)}
                    />
                  )}
                </div>
              </BrowserRouter>
            </CartProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>

  );
}

export default App;