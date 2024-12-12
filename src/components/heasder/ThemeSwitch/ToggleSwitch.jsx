// ToggleSwitch.jsx
import React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ isChecked, onToggle, leftLabel, rightLabel }) => {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.toggleLabel}>{leftLabel}</span>
      <label className={styles.themeSwitch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className={styles.input}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;