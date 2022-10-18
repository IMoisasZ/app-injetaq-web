import React from 'react'
import styles from './message.module.css'

export default function Message({ msg }) {
	console.log(msg)
	return (
		<div className={styles.container}>
			<text className={styles[msg.typeMsg]}>{msg.msg}</text>
		</div>
	)
}
