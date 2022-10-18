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
}) {
	return (
		<div className={styles.container}>
			<Button
				variant={variant}
				type={type}
				onClick={handleOnClick}
				className={styles.button}
				style={{ width, height, backgroundColor, color }}
			>
				{nameButton}
			</Button>
		</div>
	)
}
