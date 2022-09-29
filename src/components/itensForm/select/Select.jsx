import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import styles from './Select.module.css'

export default function MySelect({
	name,
	nameLabel,
	defaultValue,
	handleOnChange,
	children,
	width,
}) {
	return (
		<Form.Group as={Col} controlId={name} className={styles.container}>
			<Form.Label className={styles.select_label} style={{ width }}>
				{nameLabel}
			</Form.Label>
			<Form.Select
				defaultValue={defaultValue}
				onChange={handleOnChange}
				style={{ width }}
			>
				<option>{defaultValue}</option>
				{children}
			</Form.Select>
		</Form.Group>
	)
}
