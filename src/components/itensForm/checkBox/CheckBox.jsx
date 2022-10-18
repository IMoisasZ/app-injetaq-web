import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from '../../container/Col'

export default function CheckBox({
	name,
	labelCheckBox = 'name of checkbox',
	handleOnchange = null,
	value,
	checked,
}) {
	return (
		<Col style={{ width: '1em' }}>
			<Form.Check
				style={{ width: '1em' }}
				type='switch'
				id={name}
				label={labelCheckBox}
				onChange={handleOnchange}
				value={value}
				checked={checked}
			/>
		</Col>
	)
}
