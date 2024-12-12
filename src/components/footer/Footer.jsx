import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import footerStyles from './Footer.module.css';
import FragileFantasy from '../../assets/Music/FragileFantasy.mp3';

function Footer() {
  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <footer className={`${footerStyles.footer} ${isDarkMode ? footerStyles['dark-theme'] : footerStyles['light-theme']}`}>
      <div className={footerStyles['music-player']}>
        <audio ref={audioRef} autoPlay loop>
          <source src={FragileFantasy} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <p>&copy; 2024 - Зоомагазин "4DomesticPawStore". Всі права не захищені.</p>
    </footer>
  );
}

export default Footer;