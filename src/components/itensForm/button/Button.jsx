/** @format */

import React from 'react'
import Button from 'react-bootstrap/Button'
import styles from './Button.module.css'
import { FiEdit } from 'react-icons/fi'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { MdOutlineAddLink, MdRemoveRedEye } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GrClearOption } from 'react-icons/gr'

export default function MyButton({
	variant = 'primary',
	type,
	nameButton,
	handleOnClick,
	width = '4em',
	height = '4em',
	backgroundColor,
	color,
	display = 'block',
	margin,
	disabled,
	btnType,
	title,
}) {
	if (btnType === 'edit') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Editar ${title}`}
				className={styles.btn}
			>
				<FiEdit
					style={{ color: '#ff8c00', fontSize: '2em', padding: 0, margin: 0 }}
				/>
			</button>
		)
	} else if (btnType === 'enable') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Desabilitar ${title}`}
			>
				<ImCheckboxUnchecked
					style={{ color: '#00008b', fontSize: '2em', padding: 0 }}
				/>
			</button>
		)
	} else if (btnType === 'disable') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Habilitar ${title}`}
			>
				<ImCheckboxChecked
					style={{ color: '#006400', fontSize: '2em', padding: 0 }}
				/>
			</button>
		)
	} else if (btnType === 'associate') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Associar a operação ${title}`}
			>
				<MdOutlineAddLink
					style={{ color: '#0000CD', fontSize: '2.5em', padding: 0 }}
				/>
			</button>
		)
	} else if (btnType === 'delete') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Delete a associação a operação ${title}`}
			>
				<RiDeleteBinLine style={{ color: '#B22222', fontSize: '2.5em' }} />
			</button>
		)
	} else if (btnType === 'see') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Mostrar ${title}`}
			>
				<MdRemoveRedEye style={{ color: '#D2691E', fontSize: '2.5em' }} />
			</button>
		)
	} else if (btnType === 'clear') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					padding: 0,
				}}
				title={`Limpar ${title}`}
			>
				<GrClearOption style={{ color: '#FF6347', fontSize: '1.5em' }} />
			</button>
		)
	} else if (btnType === 'text') {
		return (
			<div className={styles.container} style={{ margin }}>
				<Button
					variant={variant}
					type={type}
					onClick={handleOnClick}
					className={styles.button}
					style={{ width, height, backgroundColor, color, display }}
					disabled={disabled}
				>
					{nameButton}
				</Button>
			</div>
		)
	}
}
