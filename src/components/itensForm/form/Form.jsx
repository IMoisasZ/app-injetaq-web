import React from 'react'
import Form from 'react-bootstrap/Form'
import styles from './Form.module.css'

export default function MyForm({ children, margin }) {
	return (
		<Form style={{ margin }} className={styles.form}>
			{children}
		</Form>
	)
}
