/** @format */

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MyInput from '../../components/itensForm/input/Input'
import MySelect from '../../components/itensForm/select/Select'
import Message from '../../components/message/Message'
import ButtonTable from '../../components/table/ButtonsTable'
import MyButton from '../../components/itensForm/button/Button'
import MyTable from '../../components/table/Table'
import api from '../../api/api'

export default function ModalChangePassword({ id, code, description }) {
	// usestate
	const [show, setShow] = useState(false)
	const [operation, setOperation] = useState('Selecione operação...')
	const [listOperation, setListOperation] = useState([])
	const [listAssociate, setListAssociate] = useState([])
	const [msg, setMsg] = useState('')

	// function modal
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	// all operations
	const allOperations = async () => {
		const response = await api.get('operation')
		setListOperation(response.data)
	}

	// all associations
	const allAssociates = async (id) => {
		const response = await api.get(`workstation/connectToOperation/${id}`)
		setListAssociate(response.data)
	}

	console.log(id)

	useEffect(() => {
		allOperations()
		allAssociates(id)
	}, [id])

	console.log(listAssociate)

	const createAssociate = async (e) => {
		e.preventDefault()
		try {
			await api.post('workstation/connectToOperation', {
				workstation_id: Number(id),
				operation_id: Number(operation),
			})
			setMsg({
				msg: 'Associação realizada com sucesso!',
				typeMsg: 'success',
			})
			setTimeout(() => {
				handleClear()
			}, 2000)
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
		}
	}

	// clear the fields
	const handleClear = () => {
		setShow(false)
		setOperation('Selecione operação...')
		allOperations()
		allAssociates()
		setMsg('')
	}

	// header table
	const header = ['Operação', 'Ações']

	return (
		<>
			<ButtonTable btnType='associate' handleOnClick={() => handleShow()} />
			<Modal show={show} onHide={handleClose} open={handleShow} size={'lg'}>
				<Modal.Header closeButton>
					<Modal.Title>Associar posto com operação</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<div style={{ width: '25%' }}>
							<MyInput
								name='code'
								nameLabel='Código Posto'
								type='text'
								value={code}
								readOnly={true}
							/>
						</div>
						<div style={{ width: '70%' }}>
							<MyInput
								name='posto'
								nameLabel='Descrição'
								type='text'
								value={description}
								readOnly={true}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							justifyContent: 'space-between',
							alignItems: 'center',
							border: '1px solid black',
							borderRadius: '0.5em',
						}}
					>
						<MySelect
							name='operation'
							nameLabel='Operação'
							value={operation}
							handleOnChange={(e) => setOperation(e.currentTarget.value)}
							width='98%'
						>
							{listOperation.map((op) => {
								return (
									<option key={op.id} value={op.id}>
										{op.description}
									</option>
								)
							})}
						</MySelect>

						<MyButton
							nameButton='Incluir'
							type='submit'
							handleOnClick={createAssociate}
						/>
					</div>
					<div>
						<MyTable header={header} numCol={2}>
							{listAssociate.map((associate) => {
								return (
									<option key={associate.id} value={associate.id}>
										{associate.operation.description}
									</option>
								)
							})}
						</MyTable>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant='primary' onClick={''}>
						Salvar
					</Button>
					{msg && <Message msg={msg} />}
				</Modal.Footer>
			</Modal>
		</>
	)
}
