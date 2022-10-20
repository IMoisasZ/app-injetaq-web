/** @format */

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MyInput from '../../components/itensForm/input/Input'
import Message from '../../components/message/Message'
import api from '../../api/api'

export default function ModalChangePassword({ name, email }) {
	const [show, setShow] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [msg, setMsg] = useState('')

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleChangePassword = async () => {
		try {
			await api.patch('user/change_password', {
				email,
				password,
				confirmPassword,
			})
			setMsg({
				msg: 'Senha alterada com sucesso',
				typeMsg: 'success',
			})
			setTimeout(() => {
				setMsg('')
				setPassword('')
				setConfirmPassword('')
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
		}
	}

	return (
		<>
			<div style={{ margin: '0.5em 0.8em 0 -1em', padding: '0', width: '4em' }}>
				<Button
					variant='primary'
					onClick={handleShow}
					style={{ padding: '0.5em 0.5em' }}
				>
					Alterar Senha
				</Button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Alterar senha do Usuário</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MyInput
						name='fullName'
						nameLabel='Nome do usuário'
						type='text'
						value={name}
						readOnly={true}
					/>
					<MyInput
						name='email'
						nameLabel='Email do usuário'
						type='email'
						value={email}
						readOnly={true}
					/>
					<div
						style={{
							display: 'flex',
							width: '100%',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<MyInput
								name='password'
								nameLabel='Senha'
								placeHolder='Digite a nova senha'
								type='password'
								value={password}
								handleOnchange={(e) => setPassword(e.currentTarget.value)}
							/>
						</div>
						<div>
							<MyInput
								name='confirmPassword'
								nameLabel='Confirme a senha'
								placeHolder='Digite a nova senha'
								type='password'
								value={confirmPassword}
								handleOnchange={(e) =>
									setConfirmPassword(e.currentTarget.value)
								}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant='primary' onClick={handleChangePassword}>
						Salvar
					</Button>
					{msg && <Message msg={msg} />}
				</Modal.Footer>
			</Modal>
		</>
	)
}
