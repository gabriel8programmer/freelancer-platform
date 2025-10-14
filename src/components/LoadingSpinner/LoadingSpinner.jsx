// components/LoadingSpinner/LoadingSpinner.jsx
import React from 'react'
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = ({ size = 'medium', text = 'Carregando...' }) => {
  return (
    <div className={[styles.loadingSpinner, styles[size]]}>
      <div className={styles.spinner}></div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  )
}

export default LoadingSpinner