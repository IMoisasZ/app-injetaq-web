/** @format */

import React from 'react'
import styles from './message.module.css'

export default function Message({ msg, margin, width }) {
	return (
		<div className={styles.container}>
			<text
				style={{ margin, width, textAlign: 'center' }}
				className={styles[msg.typeMsg]}
			>
				{msg.msg}
			</text>
		</div>
	)
}
