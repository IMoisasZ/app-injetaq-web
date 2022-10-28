/** @format */

import React from 'react'
import Form from 'react-bootstrap/Form'
import styles from './CheckBox.module.css'

export default function CheckBox({
	name,
	labelCheckBox = 'name of checkbox',
	handleOnchange = null,
	value,
	checked,
	type = 'switch',
}) {
	return (
		<div className={styles.container}>
			<Form.Check
				type={type}
				id={name}
				label={labelCheckBox}
				onChange={handleOnchange}
				value={value}
				checked={checked}
				name={name}
				inline
			/>
		</div>
	)
}
