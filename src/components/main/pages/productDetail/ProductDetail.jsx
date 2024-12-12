import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useTheme } from '../../../contexts/ThemeContext';
import { useUser } from '../../../contexts/UserContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';

function ProductDetail({ product }) {
  const { isDarkMode } = useTheme();
  const { user } = useUser();
  const { language } = useLanguage();
  const { currency, convertPrice } = useCurrency();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(product);

  useEffect(() => {
    if (!selectedProduct) {
      const savedProduct = localStorage.getItem('selectedProduct');
      if (savedProduct) {
        setSelectedProduct(JSON.parse(savedProduct));
      } else {
        navigate('/');
      }
    } else {
      const savedComments = localStorage.getItem(`comments-${selectedProduct.id}`);
      if (savedComments) {
        const loadedComments = JSON.parse(savedComments);
        setComments(loadedComments);
      }
    }
  }, [selectedProduct, navigate]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      const newCommentObj = {
        id: Date.now(),
        userEmail: user.email,
        text: newComment
      };
      setComments([newCommentObj, ...comments]);
      localStorage.setItem(`comments-${selectedProduct.id}`, JSON.stringify([newCommentObj, ...comments]));
      setNewComment('');
    }
  };

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <div className={`${styles['product-detail']} ${isDarkMode ? styles['dark'] : styles['light']}`}>
      <h2>{selectedProduct?.name[language]}</h2>
      <p>{language === 'uk' ? 'Бренд' : 'Brand'}: {selectedProduct?.brand}</p>
      <p>{language === 'uk' ? 'Ціна' : 'Price'}: {convertPrice(selectedProduct?.price)} {currency}</p>
      <p>{selectedProduct?.description[language]}</p>

      <div className={styles['back-button']}>
        <button className={styles['back-button-link']} onClick={handleBackButton}>
          {language === 'uk' ? 'Повернутись' : 'Back'}
        </button>
      </div>

      {user && (
        <form onSubmit={handleSubmitComment} className={styles['comment-form']}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={language === 'uk' ? 'Додати коментар...' : 'Add a comment...'}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {language === 'uk' ? 'Надіслати' : 'Submit'}
          </button>
        </form>
      )}

<div className={styles['comments-section']}>
        <h3>{language === 'uk' ? 'Коментарі' : 'Comments'}</h3>
        <div className={styles['comments-container']}>
          <TransitionGroup>
            {comments.map((comment) => (
              <CSSTransition
                key={comment.id}
                timeout={300}
                classNames={{
                  enter: styles['comment-enter'],
                  enterActive: styles['comment-enter-active'],
                  exit: styles['comment-exit'],
                  exitActive: styles['comment-exit-active'],
                }}
              >
                <div className={styles.comment}>
                  <strong>{comment.userEmail}:</strong> {comment.text}
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;