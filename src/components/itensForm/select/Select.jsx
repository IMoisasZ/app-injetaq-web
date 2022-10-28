/** @format */

import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import styles from './Select.module.css'

export default function MySelect({
	name,
	nameLabel,
	handleOnChange,
	children,
	width,
	value,
	margin,
}) {
	return (
		<Form.Group as={Col} controlId={name} className={styles.container}>
			<Form.Label className={styles.select_label} style={{ width, margin }}>
				{nameLabel}
			</Form.Label>
			<Form.Select onChange={handleOnChange} style={{ width }} value={value}>
				{children}
			</Form.Select>
		</Form.Group>
	)
}
