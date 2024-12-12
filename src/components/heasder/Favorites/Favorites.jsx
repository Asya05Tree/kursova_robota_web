import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import styles from './Favorites.module.css';

function Favorites() {
  const { favoriteItems, toggleFavorite, addToCart } = useCart();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { currency, convertPrice } = useCurrency();

  return (
    <div className={`
      ${styles['favorites-container']} 
      ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
    `}>
      <h1>{language === 'uk' ? 'Вподобайки' : 'Favorites'}</h1>
      
      {favoriteItems.length === 0 ? (
        <div className={styles['empty-state']}>
          <p>
            {language === 'uk' 
              ? 'Ви ще не додали улюблені товари' 
              : 'You have not added any favorite items yet'}
          </p>
        </div>
      ) : (
        <div className={styles['favorites-list']}>
          {favoriteItems.map((product) => (
            <div 
              key={product.id} 
              className={`
                ${styles['favorite-item']} 
                ${isDarkMode ? styles['dark-item'] : styles['light-item']}
              `}
            >
              <div className={styles['product-details']}>
                <h3>{product.name[language]}</h3>
                <div className={styles['product-pricing']}>
                  {product.discount > 0 ? (
                    <>
                      <span className={styles['original-price']}>
                        {convertPrice(product.originalPrice)} {currency}
                      </span>
                      <span className={styles['discounted-price']}>
                        {convertPrice(product.price)} {currency}
                      </span>
                    </>
                  ) : (
                    <span>{convertPrice(product.price)} {currency}</span>
                  )}
                </div>
                <div className={styles['product-actions']}>
                  <button 
                    onClick={() => addToCart(product)}
                    className={`
                      ${styles['add-to-cart-btn']} 
                      ${isDarkMode ? styles['dark-btn'] : styles['light-btn']}
                    `}
                  >
                    {language === 'uk' ? 'Додати до кошика' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={() => toggleFavorite(product)}
                    className={`
                      ${styles['remove-favorite-btn']} 
                      ${isDarkMode ? styles['dark-btn-secondary'] : styles['light-btn-secondary']}
                    `}
                  >
                    {language === 'uk' ? 'Видалити' : 'Remove'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;