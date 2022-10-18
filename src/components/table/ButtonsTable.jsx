import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { ImCheckboxChecked } from 'react-icons/im'
import { ImCheckboxUnchecked } from 'react-icons/im'

export default function ButtonTable({ handleOnClick, btnType }) {
	if (btnType === 'edit') {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
				}}
			>
				<FiEdit style={{ color: '#ff8c00', fontSize: '2em' }} />
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
				}}
			>
				<ImCheckboxUnchecked style={{ color: '#00008b', fontSize: '2em' }} />
			</button>
		)
	} else {
		return (
			<button
				onClick={handleOnClick}
				type='button'
				style={{
					backgroundColor: 'transparent',
					border: 'none',
				}}
			>
				<ImCheckboxChecked style={{ color: '#006400', fontSize: '2em' }} />
			</button>
		)
	}
}
