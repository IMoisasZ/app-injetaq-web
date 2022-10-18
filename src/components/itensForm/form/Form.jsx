import React from 'react'
import Form from 'react-bootstrap/Form'
import styles from './Form.module.css'

export default function MyForm({ children, margin, handleOnSubmit }) {
	return (
		<Form style={{ margin }} className={styles.form} onSubmit={handleOnSubmit}>
			{children}
		</Form>
	)
}
