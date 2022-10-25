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
}) {
	return (
		<div className={styles.container}>
			<Form.Check
				type='switch'
				id={name}
				label={labelCheckBox}
				onChange={handleOnchange}
				value={value}
				checked={checked}
			/>
		</div>
	)
}
