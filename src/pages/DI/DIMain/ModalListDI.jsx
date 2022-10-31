/** @format */

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MyButton from '../../../components/itensForm/button/Button'
import MyTable from '../../../components/table/Table'
import Form from '../../../components/itensForm/form/Form'
import CheckBox from '../../../components/itensForm/checkBox/CheckBox'
import MySelect from '../../../components/itensForm/select/Select'
import MyInput from '../../../components/itensForm/input/Input'

export default function ModalListDI({ load, data, allClients }) {
	// usestate
	const [show, setShow] = useState(false)
	const [status, setStatus] = useState('EM EXECUÇÃO')
	const [dataDI, setDataDI] = useState([])
	const [client, setClient] = useState('')
	const [listClient, setListClient] = useState([])
	const [di, setDI] = useState('')
	const [filtro, setFiltro] = useState(1) //1 = status - 2 = client - 3 = di
	const [error, setError] = useState('')

	// function modal
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	// header table
	const header = [
		'DI',
		'OP',
		'Cliente',
		'Descrição',
		'Numero',
		'Nome Peça',
		'Numero Peça',
		'Status',
		'Ações',
	]

	// load di selected
	const handleLoadDI = (di) => {
		load(di)
		handleClose()
	}

	useEffect(() => {
		setListClient(allClients)
	}, [allClients])

	// new data with selection the filter
	useEffect(() => {
		const newData = () => {
			if (!di && !client) {
				setFiltro(1)
			}
			// eslint-disable-next-line default-case
			switch (filtro) {
				case 1:
					if (!client) {
						const responseStatus = data.filter((sts) => sts.status === status)
						setDataDI(responseStatus)
					} else {
						setFiltro(2)
					}
					break
				case 2:
					const responseClient = data.filter(
						(sts) => sts.client_id === Number(client) && sts.status === status
					)
					setDataDI(responseClient)
					break
				case 3:
					const responseDI = data.filter((sts) => sts.di === Number(di))
					if (responseDI[0]) {
						setDataDI(responseDI)
						setStatus(di ? responseDI[0].status : status)
						setError('')
					} else if (di === '') {
						setFiltro(1)
					} else {
						setDataDI([])
						setError('error')
					}
					break
			}
		}
		newData()
	}, [data, status, client, di, filtro])

	return (
		<div>
			<MyButton
				nameButton='Pesquisar DI'
				handleOnClick={() => handleShow()}
				width='5em'
				variant='secondary'
				type='button'
				btnType='text'
			/>

			<Modal
				show={show}
				onHide={handleClose}
				open={handleShow}
				size={'fullscreen'}
			>
				<Modal.Header closeButton>
					<Modal.Title>Indice de DI</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							width: '100%',
						}}
					>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<p style={{ fontWeight: 'bold', fontSize: '1.2em', margin: '0' }}>
								Filtro
							</p>
							<Form
								display='flex'
								padding='1em'
								justifyContent='space-between'
								width='100%'
								margin='0 1em 0 0'
							>
								<CheckBox
									type='checkbox'
									checked={status === 'EM EXECUÇÃO' ? true : false}
									value={status}
									labelCheckBox='EM EXECUÇÃO'
									handleOnchange={() => {
										setStatus('EM EXECUÇÃO')
										setFiltro(1)
									}}
								/>
								<CheckBox
									type='checkbox'
									checked={status === 'ENCERRADA' ? true : false}
									value={status}
									labelCheckBox='ENCERRADA'
									handleOnchange={() => {
										setStatus('ENCERRADA')
										setFiltro(1)
									}}
								/>
								<CheckBox
									type='checkbox'
									checked={status === 'CANCELADA' ? true : false}
									value={status}
									labelCheckBox='CANCELADA'
									handleOnchange={() => {
										setStatus('CANCELADA')
										setFiltro(1)
									}}
								/>
							</Form>
						</div>
						<div
							style={{
								display: 'flex',
								width: '30%',
								margin: '0 0 0 1em',
							}}
						>
							<MySelect
								name='client'
								nameLabel='Cliente'
								value={client}
								handleOnChange={(e) => {
									setClient(e.currentTarget.value)
									setFiltro(2)
								}}
								margin='0 0 0.5em 0'
								width='95%'
							>
								<option value=''>Selecione cliente...</option>
								{listClient.map((cli) => {
									return (
										<option key={cli.id} value={cli.id}>
											{cli.description}
										</option>
									)
								})}
							</MySelect>
						</div>
						<div style={{ margin: '0 1em 0 0' }}>
							<MyButton
								btnType='clear'
								type='button'
								handleOnClick={() => setClient('')}
								title='cliente'
							/>
						</div>
						<div>
							<MyInput
								name='di'
								nameLabel='DI'
								type='text'
								value={di}
								handleOnchange={(e) => {
									setDI(e.currentTarget.value)
									setFiltro(3)
								}}
								margin='0 0 0.5em 0em'
								width='100%'
							/>
						</div>
						{error && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginLeft: '1em',
									width: '5%',
									textAlign: 'center',
								}}
							>
								<span style={{ color: 'red', fontWeight: 'bold' }}>
									DI não encontrada!
								</span>
							</div>
						)}
					</div>
					<MyTable header={header} numCol={2} margin='0.5em 0 0 0'>
						{dataDI.map((di) => {
							return (
								<tr key={di.id}>
									<td>{di.di}</td>
									<td>{di.op}</td>
									<td>{di.client.description}</td>
									<td>{di.description}</td>
									<td>{di.number}</td>
									<td>{di.part_name}</td>
									<td>{di.part_number}</td>
									<td>{di.status}</td>
									<td style={{ textAlign: 'center' }}>
										<MyButton
											btnType='see'
											handleOnClick={() => handleLoadDI(di)}
											title={`a DI ${di.di}`}
										/>
									</td>
								</tr>
							)
						})}
					</MyTable>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={handleClose}>
						Voltar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
