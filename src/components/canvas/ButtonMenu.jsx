import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonMenu({ icon, nameIcon, path, handleOnClick }) {
	const styles = {
		div: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			margin: '0 1em',
			paddin: 0,
		},
		btn: {
			margin: 0,
			padding: '0.2em',
			background: 'transparent',
			border: 'none',
			fontSize: '2.5em',
			borderRadius: '0.2em',
			color: '#D2691E',
			backgroundColor: '#363636',
		},
		text: {
			// textAlign: 'center',
			margin: 0,
			fontWeight: 'bold',
		},
		link: {
			margin: 0,
			textDecoration: 'none',
			color: '#000',
		},
	}

	return (
		<Link to={path} style={styles.link}>
			<div style={styles.div}>
				<button onClick={handleOnClick} style={styles.btn}>
					{icon}
				</button>
				<p style={styles.text}>{nameIcon}</p>
			</div>
		</Link>
	)
}
