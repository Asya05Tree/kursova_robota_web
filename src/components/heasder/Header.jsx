import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import headerStyles from './Header.module.css';
import ToggleSwitch from './ThemeSwitch/ToggleSwitch';

import lightLogo from '../../assets/Images/logoLight.png';
import darkLogo from '../../assets/Images/logoDark.png';

function Header({ setShowLoginModal }) {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { currency, toggleCurrency } = useCurrency();
  const { user, logout } = useUser();
  const { selectedItemsCount, favoriteItemsCount } = useCart();

  const currentLogo = isDarkMode ? darkLogo : lightLogo;

  const handleLoginLogout = () => {
    if (user) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <header
      className={`
        ${headerStyles.header} 
        ${isDarkMode ? headerStyles['dark-theme'] : headerStyles['light-theme']}
      `}
    >
      <div className={headerStyles.logo}>
        <img src={currentLogo} alt="Pet Store Logo" />
        <h1 style={{
          color: isDarkMode ? 'var(--header-text-dark)' : 'var(--header-text-light)'
        }}>
          4DomesticPawStore
        </h1>
      </div>
      <nav className={headerStyles['nav-links']}>
        <Link to="/" className={headerStyles['nav-link']} onClick={() => navigate('/')}>
          {language === 'uk' ? 'Головна' : 'Home'}
        </Link>
        <Link to="/brands" className={headerStyles['nav-link']} onClick={() => navigate('/brands')}>
          {language === 'uk' ? 'Бренди' : 'Brands'}
        </Link>
        <Link to="/dog-blog" className={headerStyles['nav-link']} onClick={() => navigate('/dog-blog')}>
          {language === 'uk' ? 'Блог собачника' : 'Dog Blog'}
        </Link>
        <Link to="/cat-blog" className={headerStyles['nav-link']} onClick={() => navigate('/cat-blog')}>
          {language === 'uk' ? 'Блог кошатника' : ' Cat Blog'}
        </Link>
        <Link to="/about" className={headerStyles['nav-link']} onClick={() => navigate('/about')}>
          {language === 'uk' ? 'Про нас' : 'About'}
        </Link>

        <div className={headerStyles['favorites-container']}>
          {favoriteItemsCount > 0 && (
            <span className={headerStyles['favorites-count']}>
              {favoriteItemsCount}
            </span>
          )}
          <HeartOutlined
            className={headerStyles['favorites-icon']}
            onClick={() => navigate('/favorites')}
          />
        </div>
        <div className={headerStyles['cart-container']}>
          {selectedItemsCount > 0 && (
            <span className={headerStyles['cart-count']}>
              {selectedItemsCount}
            </span>
          )}
          <ShoppingCartOutlined
            className={headerStyles['cart-icon']}
            onClick={() => navigate('/cart')}
          />
        </div>

        <button className={headerStyles['nav-link']} onClick={toggleLanguage}>
          {language === 'uk' ? 'EN' : 'UA'}
        </button>
        <button className={headerStyles['nav-link']} onClick={toggleCurrency}>
          {currency === 'UAH' ? 'USD' : 'UAH'}
        </button>
        <ToggleSwitch
          isChecked={isDarkMode}
          onToggle={toggleTheme}
        />
        <button className={headerStyles['nav-link']} onClick={handleLoginLogout}>
          {user
            ? (language === 'uk' ? 'Вийти' : 'Logout')
            : (language === 'uk' ? 'Увійти' : 'Login')
          }
        </button>
      </nav>
    </header>
  );
}
export default Header;