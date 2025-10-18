// components/LinkButton/LinkButton.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

const LinkButton = ({
	to,
	children,
	variant = 'primary',
	size = 'medium',
	startIcon,
	endIcon,
	className = '',
	...props
}) => {
	const buttonClasses = [styles.linkButton, styles[variant], styles[size], className]
		.filter(Boolean)
		.join(' ')

	return (
		<Link to={to} className={buttonClasses} {...props}>
			{startIcon && <span className={styles.startIcon}>{startIcon}</span>}
			<span className={styles.content}>{children}</span>
			{endIcon && <span className={styles.endIcon}>{endIcon}</span>}
		</Link>
	)
}

export default LinkButton
