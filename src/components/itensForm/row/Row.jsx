import React from 'react'
import Row from 'react-bootstrap/Row'
import styles from './Row.module.css'

export default function MyRow({ children }) {
	return <Row className={styles.row}>{children}</Row>
}
