/** @format */

import React from 'react'
import Button from 'react-bootstrap/Button'
import styles from './Button.module.css'

export default function MyButton({
	variant = 'primary',
	type,
	nameButton,
	handleOnClick,
	width = '4em',
	height = '4em',
	backgroundColor,
	color,
	display = 'block',
	margin,
	disabled,
}) {
	return (
		<div className={styles.container} style={{ margin }}>
			<Button
				variant={variant}
				type={type}
				onClick={handleOnClick}
				className={styles.button}
				style={{ width, height, backgroundColor, color, display }}
				disabled={disabled}
			>
				{nameButton}
			</Button>
		</div>
	)
}
