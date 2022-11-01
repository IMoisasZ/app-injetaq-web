/** @format */

import Form from 'react-bootstrap/Form'
import styles from './MyTextArea.module.css'

export default function MyTextArea({
	nameTextArea,
	name,
	rows = 3,
	handleOnChange,
	value,
}) {
	return (
		<Form>
			<Form.Group className='mb-3' controlId={name} onChange={handleOnChange}>
				<Form.Label className={styles.text_area_label}>
					{nameTextArea}
				</Form.Label>
				<Form.Control as='textarea' rows={rows} value={value} />
			</Form.Group>
		</Form>
	)
}
