/** @format */

import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { MdOutlineAddLink } from 'react-icons/md'
import styles from './Table.module.css'

export default function ButtonTable({ handleOnClick, btnType, title }) {
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
	}
}
