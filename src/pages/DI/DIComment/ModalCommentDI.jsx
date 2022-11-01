/**
 * /* eslint-disable array-callback-return
 *
 * @format
 */

/** @format */

import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MyButton from '../../../components/itensForm/button/Button'
import MyInput from '../../../components/itensForm/input/Input'
import MyTextArea from '../../../components/itensForm/textArea/MyTextArea'
import Message from '../../../components/message/Message'
import api from '../../../api/api'

export default function ModalRefreshDI({
	di,
	status,
	diId,
	allComments,
	btn = '1',
	dataEdit = [],
}) {
	// usestate
	const [idComment, setIDComment] = useState('')
	const [show, setShow] = useState(false)
	const [comment, setComment] = useState()
	const [msg, setMsg] = useState('')

	// function modal
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	// date
	const date = new Date()
	const day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate()
	const month =
		date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
	const year = date.getFullYear()
	const today = `${day}/${month}/${year}`

	// edit comment
	useEffect(() => {
		if (dataEdit) {
			setIDComment(dataEdit.id)
			setComment(dataEdit.comment)
		}
	}, [dataEdit])

	// refresh status di
	async function handleCommentDI() {
		if (!dataEdit) {
			try {
				await api.post('comment_di', {
					di_id: diId,
					date,
					comment,
					user_id: 1,
				})
				setMsg({
					msg: `Comentário realizado com sucesso!`,
					typeMsg: 'success',
				})
				setTimeout(() => {
					setMsg('')
					setComment('')
					allComments()
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
		} else {
			try {
				await api.patch('comment_di', {
					id: idComment,
					di_id: dataEdit.di_id,
					date: today,
					comment,
					user_id: 1,
				})
				setMsg({
					msg: `Comentário alterado com sucesso!`,
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
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
	}

	const handleClear = () => {
		setIDComment('')
		setShow(false)
		setComment()
		setMsg('')
		dataEdit = []
		allComments()
		handleClose()
	}

	return (
		<div>
			<MyButton
				nameButton='Incluir Comentário'
				variant='primary'
				width='6em'
				margin='1em 2em 0 0 '
				type='button'
				handleOnClick={() => handleShow()}
				btnType={btn === '1' ? 'text' : 'edit'}
				disabled={!di ? true : false}
			/>

			<Modal show={show} onHide={handleClose} open={handleShow} size={'lg'}>
				<Modal.Header closeButton>
					<Modal.Title>{`Comentar a DI ${di}`}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<MyInput
								name='di_comment'
								nameLabel='DI'
								type='text'
								value={di}
								readOnly={true}
								width='100%'
							/>
						</div>
						<div>
							<MyInput
								name='date'
								placeHolder='Data do comentário'
								nameLabel='Data'
								value={dataEdit ? dataEdit.date : today}
								readOnly={true}
							/>
						</div>
						<div>
							<MyInput
								name='status_comment_di'
								nameLabel='Status'
								type='text'
								value={status}
								readOnly={true}
								width='100%'
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							marginBottom: '1em',
						}}
					>
						<div
							style={{
								width: '100%',
							}}
						>
							<MyTextArea
								name='comment'
								nameTextArea='Comentário'
								placeHolder='Digite um comentário!'
								handleOnChange={(e) => setComment(e.target.value)}
								value={comment}
							/>
						</div>
					</div>
					{msg && <Message msg={msg} margin='0.5em 0 0 0' width='100%' />}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancelar
					</Button>
					<Button
						variant={dataEdit ? 'warning' : 'primary'}
						onClick={handleCommentDI}
					>
						{dataEdit ? 'Editar' : 'Incluir'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
