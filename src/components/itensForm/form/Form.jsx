/** @format */

import React from 'react'
import Form from 'react-bootstrap/Form'
import styles from './Form.module.css'

export default function MyForm({
	children,
	margin,
	handleOnSubmit,
	display,
	width,
	justifyContent,
	alignItems,
	padding,
}) {
	return (
		<Form
			style={{ margin, display, width, justifyContent, alignItems, padding }}
			className={styles.form}
			onSubmit={handleOnSubmit}
		>
			{children}
		</Form>
	)
}
