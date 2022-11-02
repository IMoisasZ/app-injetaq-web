/** @format */

import Form from 'react-bootstrap/Form'
import styles from './MyTextArea.module.css'

export default function MyTextArea({
	nameTextArea,
	name,
	rows = 3,
	handleOnChange = null,
	value,
}) {
	return (
		<Form>
			<Form.Group className='mb-3' controlId={name}>
				<Form.Label className={styles.text_area_label}>
					{nameTextArea}
				</Form.Label>
				<Form.Control
					as='textarea'
					rows={rows}
					value={value}
					onChange={handleOnChange}
				/>
			</Form.Group>
		</Form>
	)
}
