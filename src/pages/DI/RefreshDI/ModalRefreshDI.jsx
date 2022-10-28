/**
 * /* eslint-disable array-callback-return
 *
 * @format
 */

/** @format */

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MyButton from '../../../components/itensForm/button/Button'
import MySelect from '../../../components/itensForm/select/Select'
import Message from '../../../components/message/Message'
import api from '../../../api/api'

export default function ModalRefreshDI({ di, status, diId, setStatus, allDI }) {
	// usestate
	const [show, setShow] = useState(false)
	const [newStatus, setNewStatus] = useState('')
	const [msg, setMsg] = useState('')

	// function modal
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	// list status
	const listStatus = ['EM EXECUÇÃO', 'ENCERRADA', 'CANCELADA']

	// refresh status di
	const refreshStatusDI = async () => {
		try {
			await api.put('di', {
				id: diId,
				status: newStatus,
			})
			setMsg({
				msg: `Status da DI ${di} foi atualizado com sucesso`,
				typeMsg: 'success',
			})
			setTimeout(() => {
				setMsg('')
				setStatus(newStatus)
				allDI()
				handleClose()
			}, 2000)
		} catch (error) {
			setMsg({
				msg: error.response.data.error || error.response.data.erros,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
			console.error({ error })
		}
	}

	return (
		<div>
			<MyButton
				nameButton='Atualizar DI'
				variant='dark'
				width='6em'
				margin='1em 2em 0 0 '
				type='button'
				handleOnClick={() => handleShow()}
			/>

			<Modal show={show} onHide={handleClose} open={handleShow} size={'md'}>
				<Modal.Header closeButton>
					<Modal.Title>{`Atualizar DI ${di}`}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						Status atual{' '}
						<span style={{ fontWeight: 'bold', margin: '0' }}>{status}</span>
					</p>
					<MySelect
						margin='0'
						handleOnChange={(e) => setNewStatus(e.currentTarget.value)}
					>
						<option value=''>Selecione um status...</option>
						{status === 'CANCELADA' ? (
							<option value='EM EXECUÇÃO'>EM EXECUÇÃO</option>
						) : (
							// eslint-disable-next-line array-callback-return
							listStatus.map((it, index) => {
								if (it !== status) {
									return (
										<option key={index} value={it}>
											{it}
										</option>
									)
								}
							})
						)}
					</MySelect>
					{msg && <Message msg={msg} margin='0.5em 0 0 0' width='100%' />}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant='warning' onClick={refreshStatusDI}>
						Atualizar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
