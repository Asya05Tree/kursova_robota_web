import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useCart } from '../../../contexts/CartContext';
import { useUser } from '../../../contexts/UserContext';
import productsData from '../../../data/products.json';
import styles from './BrandProductPage.module.css';

function BrandProductPage() {
    const { language } = useLanguage();
    const { currency, convertPrice } = useCurrency();
    const { isDarkMode } = useTheme();
    const { cartItems, addToCart, removeFromCart, toggleFavorite, favoriteItems } = useCart();
    const navigate = useNavigate();
    const { user } = useUser();

    // Extract unique brands from products
    const uniqueBrands = [...new Set(productsData.products.map(product => product.brand))];

    const [selectedBrands, setSelectedBrands] = useState(uniqueBrands);
    const [filteredProducts, setFilteredProducts] = useState(productsData.products);

    useEffect(() => {
        const savedBrands = JSON.parse(localStorage.getItem('selectedBrands'));
        if (savedBrands && savedBrands.length > 0) {
            setSelectedBrands(savedBrands);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedBrands', JSON.stringify(selectedBrands));
    }, [selectedBrands]);

    useEffect(() => {
        const filtered = productsData.products.filter(product =>
            selectedBrands.includes(product.brand)
        );
        setFilteredProducts(filtered);
    }, [selectedBrands]);

    const toggleBrandSelection = (brand) => {
        setSelectedBrands((prev) => {
            if (prev.includes(brand)) {
                const updated = prev.filter((b) => b !== brand);
                return updated.length === 0 ? uniqueBrands : updated;
            }
            return [...prev, brand];
        });
    };

    const handleProductClick = (product) => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        navigate(`/product/${product.id}`);
    };

    return (
        <div className={`${styles['brand-product-container']} ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}`}>
            <div className={styles['brands-filter']}>
                {uniqueBrands.map((brand) => (
                    <label
                        key={brand}
                        className={`${styles['brand-checkbox']} ${selectedBrands.includes(brand) ? styles['active'] : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrandSelection(brand)}
                        />
                        <span>{brand}</span>
                    </label>
                ))}

            </div>

            <div className={styles['product-list']}>
                {filteredProducts.map((product) => {
                    const isInCart = cartItems.find(item => item.id === product.id);
                    const isFavorite = favoriteItems.find(item => item.id === product.id);

                    return (
                        <div key={product.id} className={`${styles['product-item']} ${isInCart ? styles['in-cart'] : ''}`}>
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

export default BrandProductPage;