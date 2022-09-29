import React from 'react'
import Canvas from '../../components/canvas/Canvas'
import styles from './Header.module.css'
import Injetaq from '../../images/logo_injetaq.png'

export default function Header({ children }) {
	return (
		<header className={styles.container_header}>
			<div className={styles.div_canvas_name}>
				<Canvas />
				<h1>{children}</h1>
			</div>
			<div className={styles.div_img}>
				<img src={Injetaq} alt='Logo da Injetaq' />
			</div>
		</header>
	)
}
