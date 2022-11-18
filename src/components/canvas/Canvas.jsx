/** @format */

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonMenu from './ButtonMenu'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsFillPeopleFill, BsFillFileEarmarkBinaryFill } from 'react-icons/bs'
import { FaWpforms } from 'react-icons/fa'
import { MdOutlineSettingsOverscan, MdHomeRepairService } from 'react-icons/md'
import { FaUser, FaDharmachakra, FaPeopleCarry } from 'react-icons/fa'
import { ImBoxAdd } from 'react-icons/im'
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
				<Offcanvas.Body className={styles.menu}>
					<ButtonMenu
						icon={<BsFillPeopleFill />}
						nameIcon='Cliente'
						path='/client'
					/>
					<ButtonMenu icon={<FaWpforms />} nameIcon='DI' path='/di' />

					<ButtonMenu
						icon={<MdOutlineSettingsOverscan />}
						nameIcon='Setor'
						path='/sector'
					/>
					<ButtonMenu
						icon={<MdHomeRepairService />}
						nameIcon='Operação'
						path='/operation'
					/>
					<ButtonMenu
						icon={<ImBoxAdd />}
						nameIcon='Material/Serviço'
						path='/rawMaterial'
					/>
					<ButtonMenu icon={<FaUser />} nameIcon='Usuário' path='/user' />
					<ButtonMenu
						icon={<FaDharmachakra />}
						nameIcon='Posto'
						path='/workstation'
					/>
					<ButtonMenu
						icon={<FaPeopleCarry />}
						nameIcon='Funcionário'
						path='/employee'
					/>
					<ButtonMenu
						icon={<BsFillFileEarmarkBinaryFill />}
						nameIcon='Apontamento de Horas'
						path='/appointment_hours'
					/>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
