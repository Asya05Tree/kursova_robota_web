import React from 'react';
import { 
  HeartOutlined, 
  HeartTwoTone, 
  DeleteOutlined 
} from '@ant-design/icons';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useUser } from '../../contexts/UserContext';
import styles from './Cart.module.css';

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    toggleFavorite, 
    favoriteItems 
  } = useCart();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { currency, convertPrice } = useCurrency();
  const { user } = useUser();

  const calculateItemTotal = (product) => {
    return product.price * product.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handleQuantityChange = (product, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity > 0 && quantity <= product.stockQuantity) {
      updateQuantity(product, quantity);
    }
  };

  return (
    <div className={`
      ${styles['cart-container']} 
      ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
    `}>
      <h1>{language === 'uk' ? 'Кошик' : 'Cart'}</h1>
      
      {cartItems.length === 0 ? (
        <div className={styles['empty-state']}>
          <p>
            {language === 'uk' 
              ? 'Ваш кошик порожній' 
              : 'Your cart is empty'}
          </p>
        </div>
      ) : (
        <>
          <div className={styles['cart-list']}>
            {cartItems.map((product) => {
              const isFavorite = favoriteItems.find(item => item.id === product.id);

              return (
                <div 
                  key={product.id} 
                  className={`
                    ${styles['cart-item']} 
                    ${isDarkMode ? styles['dark-item'] : styles['light-item']}
                  `}
                >
                  <div className={styles['product-details']}>
                    <div className={styles['product-header']}>
                      <h3>{product.name[language]}</h3>
                      <div className={styles['product-actions-right']}>
                        <div 
                          className={`
                            ${styles['icon-container']} 
                            ${isFavorite ? styles['favorite-active'] : ''}
                          `}
                          onClick={() => toggleFavorite(product)}
                        >
                          {isFavorite ? <HeartTwoTone /> : <HeartOutlined />}
                        </div>
                        <div 
                          className={styles['icon-container']}
                          onClick={() => removeFromCart(product)}
                        >
                          <DeleteOutlined />
                        </div>
                      </div>
                    </div>
                    
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
                    
                    <div className={styles['cart-quantity']}>
                      <button 
                        className={`
                          ${styles['quantity-btn']} 
                          ${isDarkMode ? styles['dark-btn-secondary'] : styles['light-btn-secondary']}
                        `}
                        onClick={() => updateQuantity(product, (product.quantity || 1) - 1)}
                        disabled={product.quantity <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max={product.stockQuantity} 
                        value={product.quantity || 1}
                        className={styles['quantity-input']}
                        onChange={(e) => handleQuantityChange(product, e.target.value)}
                      />
                      <button 
                        className={`
                          ${styles['quantity-btn']} 
                          ${isDarkMode ? styles['dark-btn-secondary'] : styles['light-btn-secondary']}
                        `}
                        onClick={() => updateQuantity(product, (product.quantity || 1) + 1)}
                        disabled={product.quantity >= product.stockQuantity}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className={styles['product-stock']}>
                      {language === 'uk' ? 'На складі' : 'In Stock'}: {product.stockQuantity}
                    </div>
                    
                    <div className={styles['item-total']}>
                      {language === 'uk' ? 'Сума:' : 'Item Total:'} {' '}
                      {convertPrice(calculateItemTotal(product))} {currency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles['cart-total']}>
            <p>
              {language === 'uk' ? 'Загальна сума:' : 'Total:'} 
              {' '}
              {convertPrice(calculateTotal())} {currency}
            </p>
            {user && (
              <button 
                onClick={clearCart}
                className={`
                  ${styles['checkout-btn']} 
                  ${isDarkMode ? styles['dark-btn'] : styles['light-btn']}
                `}
              >
                {language === 'uk' ? 'Оформити замовлення' : 'Checkout'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;