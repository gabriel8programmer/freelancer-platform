// components/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className={styles.loadingSpinner}>
          <i className="fas fa-spinner"></i>
        </span>
      )}
      {startIcon && !loading && (
        <span className={styles.startIcon}>
          {startIcon}
        </span>
      )}
      <span className={styles.content}>
        {children}
      </span>
      {endIcon && !loading && (
        <span className={styles.endIcon}>
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default Button;