/** @format */

import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import styles from './Input.module.css'

export default function MyInput({
	nameLabel,
	placeHolder,
	type,
	name,
	handleOnchange,
	handleOnBlur,
	handleOnClick,
	width = '100%',
	margin,
	display,
	justifyContent,
	alignItems,
	flexDirection,
	readOnly = false,
	value,
}) {
	return (
		<Form.Group
			as={Col}
			controlId={name}
			style={{
				display,
				justifyContent,
				alignItems,
				flexDirection,
				width,
				margin,
			}}
			className={styles.container}
		>
			<Form.Label className={styles.input_label} style={{ width }}>
				{nameLabel}
			</Form.Label>
			<Form.Control
				style={{ width }}
				type={type}
				placeholder={placeHolder}
				name={name}
				onChange={handleOnchange}
				onBlur={handleOnBlur}
				onClick={handleOnClick}
				readOnly={readOnly}
				value={value}
			/>
		</Form.Group>
	)
}
