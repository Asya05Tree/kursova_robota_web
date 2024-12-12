import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './LoginModal.module.css';

const LoginRegistrationModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { user, login, register } = useUser();
    const { language } = useLanguage();
    const { isDarkMode } = useTheme();

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email) && email.length <= 20;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9._]{6,20}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = () => {
        if (!validateEmail(email)) {
            setError(language === 'uk' ? 'Неправильний формат пошти' : 'Invalid email format');
            return;
        }
        if (!validatePassword(password)) {
            setError(language === 'uk' ? 'Неправильний формат паролю' : 'Invalid password format');
            return;
        }

        try {
            login(email, password);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRegistration = () => {
        if (!validateEmail(email)) {
            setError(language === 'uk' ? 'Неправильний формат пошти' : 'Invalid email format');
            return;
        }
        if (email !== confirmEmail) {
            setError(language === 'uk' ? 'Пошти не збігаються' : 'Emails do not match');
            return;
        }
        if (!validatePassword(password)) {
            setError(language === 'uk' ? 'Неправильний формат паролю' : 'Invalid password format');
            return;
        }
        if (password !== confirmPassword) {
            setError(language === 'uk' ? 'Паролі не збігаються' : 'Passwords do not match');
            return;
        }

        try {
            register(email, password);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className={`
        ${styles.modalOverlay} 
        ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
      `}
        >
            <div
                className={`
          ${styles.modalContent} 
          ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
        `}
            >
                <div
                    className={`
            ${styles.modalTabs} 
            ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
          `}
                >
                    <button
                        className={`
                            ${styles.tabButton} 
                            ${activeTab === 'login' ? styles.activeTab : ''}
                            ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                          `}
                        onClick={() => setActiveTab('login')}
                    >
                        {language === 'uk' ? 'Увійти' : 'Login'}
                    </button>
                    <button
                        className={`
                            ${styles.tabButton} 
                            ${activeTab === 'register' ? styles.activeTab : ''}
                            ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                          `}
                        onClick={() => setActiveTab('register')}
                    >
                        {language === 'uk' ? 'Реєстрація' : 'Register'}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className={`
                        ${styles.closeButton} 
                        ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                      `}
                >
                    ✕
                </button>

                {activeTab === 'login' ? (
                    <div
                        className={`
                        ${styles.formContainer} 
                        ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                      `}>
                        <input
                            type="email"
                            placeholder={language === 'uk' ? 'Електронна пошта' : 'Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`
                                ${styles.input} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        />
                        <input
                            type="password"
                            placeholder={language === 'uk' ? 'Пароль' : 'Password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`
                                ${styles.input} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        />
                        <button
                            onClick={handleLogin}
                            className={`
                                ${styles.submitButton} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        >
                            {language === 'uk' ? 'Увійти' : 'Login'}
                        </button>
                    </div>
                ) : (
                    <div
                        className={`
                        ${styles.formContainer} 
                        ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                      `}>
                        <input
                            type="email"
                            placeholder={language === 'uk' ? 'Електронна пошта' : 'Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`
                                ${styles.input} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        />
                        <input
                            type="email"
                            placeholder={language === 'uk' ? 'Підтвердіть пошту' : 'Confirm Email'}
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className={`
                                ${styles.input} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        />
                        <input
                            type="password"
                            placeholder={language === 'uk' ? 'Пароль' : 'Password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`
                                ${styles.input} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        />
                        <input
                            type="password"
                            placeholder={language === 'uk' ? 'Підтвердіть пароль' : 'Confirm Password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`
                                ${styles.input} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        />
                        <div className={`
                            ${styles.privacyText} 
                            ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                          `}>
                            <span>{language === 'uk' ? 'Я погоджуюсь на обробку' : 'I agree to the processing of'}</span>
                            <a href="#"
                                className={`
                                ${styles.privacyLink} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}>
                                {language === 'uk' ? 'персональних даних' : 'personal data'}
                            </a>
                        </div>
                        <button
                            onClick={handleRegistration}
                            className={`
                                ${styles.submitButton} 
                                ${isDarkMode ? styles['dark-theme'] : styles['light-theme']}
                              `}
                        >
                            {language === 'uk' ? 'Зареєструватися' : 'Register'}
                        </button>
                    </div>
                )}

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegistrationModal;