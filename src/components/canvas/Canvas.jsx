import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { GiHamburgerMenu } from 'react-icons/gi'
import styles from './Canvas.module.css'

export default function OffCanvasExample({ sideCanvas = 'top', ...props }) {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<Button onClick={handleShow} className={styles.btn}>
				<GiHamburgerMenu />
			</Button>
			<Offcanvas
				show={show}
				onHide={handleClose}
				{...props}
				placement={sideCanvas}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className={styles.menu}>Icons</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
