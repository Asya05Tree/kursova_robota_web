import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, HeartOutlined, HeartTwoTone, ShoppingTwoTone, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useCart } from '../../../contexts/CartContext';
import { useUser } from '../../../contexts/UserContext';
import productsData from '../../../data/products.json';
import styles from './ProductList.module.css';
import catImage from './images/cat.jpg';
import dogImage from './images/dog.jpg';


function ProductList({ onProductSelect }) {
  const { language } = useLanguage();
  const { currency, convertPrice } = useCurrency();
  const { isDarkMode } = useTheme();
  const { cartItems, addToCart, removeFromCart, toggleFavorite, favoriteItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate()

  const [selectedAnimalType, setSelectedAnimalType] = useState('cat');
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const ageGroups = ['teen', 'adult', 'young', 'none'];
  const categories = ['food', 'toys', 'hygiene', 'accessories', 'sleeping'];

  const calculatePriceRange = (animalType) => {
    const animalProducts = productsData.products.filter(p => p.animalType === animalType);
    return {
      min: Math.min(...animalProducts.map(p => p.price)),
      max: Math.max(...animalProducts.map(p => p.price)),
    };
  };

  const [priceRange, setPriceRange] = useState(() => {
    const initial = calculatePriceRange('cat');
    return {
      ...initial,
      currentMin: initial.min,
      currentMax: initial.max
    };
  });

  useEffect(() => {
    const newRange = calculatePriceRange(selectedAnimalType);
    setPriceRange(prev => ({
      ...newRange,
      currentMin: newRange.min,
      currentMax: newRange.max
    }));
  }, [selectedAnimalType]);

  const [filteredProducts, setFilteredProducts] = useState(productsData.products);

  useEffect(() => {
    const filtered = productsData.products.filter(product => {
      const matchAnimalType = product.animalType === selectedAnimalType;
      const matchAgeGroup = selectedAgeGroups.length === 0 ||
        selectedAgeGroups.includes(product.ageGroup) ||
        (product.ageGroup === 'any' && selectedAgeGroups.includes('none'));
      const matchCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchPrice = product.price >= priceRange.currentMin &&
        product.price <= priceRange.currentMax;
      return matchAnimalType && matchAgeGroup && matchCategory && matchPrice;
    });
    setFilteredProducts(filtered);
  }, [selectedAnimalType, selectedAgeGroups, selectedCategories, priceRange]);

  const isNewProduct = (arrivalDate) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return new Date(arrivalDate) > threeDaysAgo;
  };

  const ageGroupTranslations = {
    'teen': language === 'uk' ? 'Підліток' : 'Teen',
    'adult': language === 'uk' ? 'Дорослий' : 'Adult',
    'young': language === 'uk' ? 'Дитина' : 'Young',
    'none': language === 'uk' ? 'Без вікового обмеження' : 'No Age Restriction'
  };

  const handleProductClick = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={`${styles['product-list-container']} ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}`}>
      <div className={styles['animal-carousel']}>
        <div className={`${styles['carousel-item']} ${selectedAnimalType === 'cat' ? styles['active'] : ''}`}>
          <img src={catImage} alt="Cat" className={styles['carousel-image']} />
          <div className={styles['carousel-hover-text']}>
            {language === 'uk' ? 'Ви будете бачити товари для котів' : 'You will see cat products'}
          </div>
          <div
            className={`${styles['carousel-control']} ${styles.prev}`}
            onClick={() => setSelectedAnimalType('dog')}
          >
            <LeftOutlined />
          </div>
        </div>
        <div className={`${styles['carousel-item']} ${selectedAnimalType === 'dog' ? styles['active'] : ''}`}>
          <img src={dogImage} alt="Dog" className={styles['carousel-image']} />
          <div className={styles['carousel-hover-text']}>
            {language === 'uk' ? 'Ви будете бачити товари для собак' : 'You will see dog products'}
          </div>
          <div
            className={`${styles['carousel-control']} ${styles.next}`}
            onClick={() => setSelectedAnimalType('cat')}
          >
            <RightOutlined />
          </div>
        </div>
      </div>

      <div className={styles['filters-container']}>
        <div className={styles['filter-section']}>
          <h3>{language === 'uk' ? 'Вік' : 'Age'}</h3>
          <div className={styles['filter-options']}>
            {ageGroups.map(age => (
              <label key={age} className={styles['filter-checkbox']}>
                <input
                  type="checkbox"
                  checked={selectedAgeGroups.length === 0 || selectedAgeGroups.includes(age)}
                  onChange={() => {
                    setSelectedAgeGroups(prev => {
                      if (prev.includes(age)) {
                        const newSelection = prev.filter(a => a !== age);
                        return newSelection.length === 0 ? ageGroups : newSelection;
                      }
                      return [...prev, age];
                    });
                  }}
                />
                <span>{ageGroupTranslations[age]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles['filter-section']}>
          <h3>{language === 'uk' ? 'Категорія' : 'Category'}</h3>
          <div className={styles['filter-options']}>
            {categories.map(category => (
              <label key={category} className={styles['filter-checkbox']}>
                <input
                  type="checkbox"
                  checked={selectedCategories.length === 0 || selectedCategories.includes(category)}
                  onChange={() => {
                    setSelectedCategories(prev => {
                      if (prev.includes(category)) {
                        const newSelection = prev.filter(c => c !== category);
                        return newSelection.length === 0 ? categories : newSelection;
                      }
                      return [...prev, category];
                    });
                  }}
                />
                <span>
                  {language === 'uk'
                    ? category === 'food' ? 'Їжа'
                      : category === 'toys' ? 'Іграшки'
                        : category === 'hygiene' ? 'Гігієна'
                          : category === 'accessories' ? 'Аксесуари'
                            : 'Спальне місце'
                    : category.charAt(0).toUpperCase() + category.slice(1)
                  }
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles['filter-section']}>
          <h3>{language === 'uk' ? 'Ціна' : 'Price'}</h3>
          <div className={styles['price-range']}>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={priceRange.currentMin}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange(prev => ({
                  ...prev,
                  currentMin: Math.min(value, prev.currentMax)
                }));
              }}
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={priceRange.currentMax}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange(prev => ({
                  ...prev,
                  currentMax: Math.max(value, prev.currentMin)
                }));
              }}
            />
            <div className={styles['price-labels']}>
              <span>{convertPrice(priceRange.currentMin)} {currency}</span>
              <span>{convertPrice(priceRange.currentMax)} {currency}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['product-list']}>
        {filteredProducts.map((product) => {
          const isInCart = cartItems.find(item => item.id === product.id);
          const isFavorite = favoriteItems.find(item => item.id === product.id);
          return (
            <div key={product.id} className={`${styles['product-item']} ${isInCart ? styles['in-cart'] : ''}`}>
              {isNewProduct(product.arrivalDate) && (
                <div className={styles['new-badge']}>
                  {language === 'uk' ? 'Новинка' : 'New'}
                </div>
              )}
              <div className={styles['product-icons']}>
                <div className={`${styles['icon-container']} ${isFavorite ? styles['favorite-active'] : ''}`}
                  onClick={() => toggleFavorite(product)}>
                  {isFavorite ? <HeartTwoTone /> : <HeartOutlined />}
                </div>
                <div className={`${styles['icon-container']} ${isInCart ? styles['cart-active'] : ''}`}
                  onClick={() => isInCart ? removeFromCart(product.id) : addToCart(product)}>
                  {isInCart ? <ShoppingTwoTone /> : <ShoppingOutlined />}
                </div>
              </div>
              <div className={styles['product-content']} onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}>
                <h3>{product.name[language]}</h3>
                <div className={styles['product-meta']}>
                  <span>{product.brand}</span>
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
                <p>{product.description[language]}</p>
                <div className={styles['product-stock']}>
                  {language === 'uk' ? 'На складі' : 'In Stock'}: {product.stockQuantity}
                </div>
              </div>
              {user && (
                <button
                  className={`${styles['buy-button']} ${isDarkMode ? styles['dark-buy-button'] : styles['light-buy-button']}`}
                  onClick={() => addToCart(product)}
                >
                  {language === 'uk' ? 'Купити' : 'Buy'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;