// components/Modal/Modal.jsx
import React, { useEffect } from 'react'
import styles from './Modal.module.css'

const Modal = ({
	isOpen = false,
	onClose,
	title,
	children,
	size = 'medium',
	closeOnOverlayClick = true,
}) => {
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget && closeOnOverlayClick) {
			onClose()
		}
	}

	const handleEscapeKey = (e) => {
		if (e.key === 'Escape') {
			onClose()
		}
	}

	useEffect(() => {
		// Só adiciona os event listeners se o modal estiver aberto
		if (isOpen) {
			document.addEventListener('keydown', handleEscapeKey)
			document.body.style.overflow = 'hidden'

			return () => {
				document.removeEventListener('keydown', handleEscapeKey)
				document.body.style.overflow = 'unset'
			}
		}
	}, [isOpen]) // Dependência do isOpen

	// Retorna null se não estiver aberto - isso evita que o useEffect execute desnecessariamente
	if (!isOpen) return null

	return (
		<div className={styles.modalOverlay} onClick={handleOverlayClick}>
			<div className={`${styles.modal} ${styles[size]}`}>
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>{title}</h2>
					<button className={styles.closeButton} onClick={onClose} aria-label='Fechar modal'>
						<i className='fas fa-times'></i>
					</button>
				</div>

				<div className={styles.modalContent}>{children}</div>
			</div>
		</div>
	)
}

export default Modal
