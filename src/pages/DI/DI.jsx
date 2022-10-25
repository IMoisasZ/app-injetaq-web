/** @format */

import React, { useState, useEffect } from 'react'
import MyContainer from '../../components/container/Container'
import Mytab from '../../components/tab/Tab'
import Tab from 'react-bootstrap/Tab'
import MyForm from '../../components/itensForm/form/Form'
import MyRow from '../../components/itensForm/row/Row'
import MyInput from '../../components/itensForm/input/Input'
import MySelect from '../../components/itensForm/select/Select'
import MyButton from '../../components/itensForm/button/Button'
import Message from '../../components/message/Message'
import MyTable from '../../components/table/Table'
import { CiSearch } from 'react-icons/ci'
import api from '../../api/api'
import styles from './DI.module.css'

export default function DI() {
	// usestate
	const [diId, setDiId] = useState('')
	const [di, setDI] = useState('')
	const [op, setOP] = useState('')
	const [description, setDescription] = useState('')
	const [number, setNumber] = useState('')
	const [partName, setPartName] = useState('')
	const [partNumber, setPartNumber] = useState('')
	const [client, setClient] = useState('Selecione um cliente...')
	const [listClient, setListClient] = useState([])
	const [start, setStart] = useState('')
	const [finish, setFinish] = useState('')
	const [status, setStatus] = useState('')
	const [msg, setMsg] = useState('')

	// di hours
	const [operation, setOperation] = useState('Selecione uma operação...')
	const [listOperation, setListOperation] = useState([])
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')
	const [totalCost, setTotalCost] = useState(0)

	// all clients
	const allClients = async () => {
		try {
			const response = await api.get('/client')
			setListClient(response.data)
		} catch (error) {
			console.error(error.response.data.error || error.response.data.erros)
		}
	}

	useEffect(() => {
		allClients()
		allOperations()
	}, [])

	// create DI
	const createDI = async (e) => {
		e.preventDefault()
		try {
			const newDI = {
				di,
				op,
				description,
				number,
				partName,
				partNumber,
				client,
				start,
				finish,
			}
			await api.post('/di', newDI)
			setMsg({
				msg: 'DI cadastrada com sucesso!',
				typeMsg: 'success',
			})
			setTimeout(() => {
				handleClear()
			}, 2000)
		} catch (error) {
			console.log({ error })
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
		}
	}

	// all operations
	const allOperations = async () => {
		try {
			const response = await api.get('operation')
			setListOperation(response.data)
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
		}
	}

	// handle clear
	const handleClear = () => {
		setDI('')
		setOP('')
		setDescription('')
		setNumber('')
		setPartName('')
		setPartNumber('')
		setClient('Selecione um cliente...')
		setListClient([])
		setStart('')
		setFinish('')
		setMsg('')
	}

	// format field quantity
	const formatQuantity = (e) => {
		if (quantity.includes('.', ',')) {
			setQuantity(quantity)
			formatTotalCost()
		} else {
			setQuantity(
				Intl.NumberFormat('pt-BR', {
					style: 'decimal',
					minimumFractionDigits: 2,
					maximumFractionDigits: 4,
				}).format(e.currentTarget.value.replace(',', '.'))
			)
			formatTotalCost()
		}
	}

	// format field price
	const formatPrice = (e) => {
		if (price.includes('R$')) {
			setPrice(price)
			formatTotalCost()
		} else {
			setPrice(
				Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
				}).format(e.currentTarget.value.replace(',', '.'))
			)
			formatTotalCost()
		}
	}

	// format field price
	const formatTotalCost = () => {
		const new_quantity = quantity.replace('.', '').replace(',', '.')
		const new_price = price.replace('R$', '').replace('.', '').replace(',', '.')
		const total_cost = Number(new_quantity) * Number(new_price)
		console.log(total_cost)
		setTotalCost(
			Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
				minimumFractionDigits: 2,
			}).format(total_cost.toString().replace(',', '.'))
		)
	}

	//include hours
	const includeHours = async (e) => {
		e.preventDefault()
		try {
			await api.post('di_hours', {
				di_id: diId,
				operation_id: operation,
				quantity,
				price,
			})
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
		}
	}

	//header DI hous
	const headerDIHours = [
		'Operação',
		'Quantidade Horas',
		'Custo Hora',
		'Custo Total',
		'Ações',
	]

	return (
		<MyContainer nameHeader='Cadastro DI'>
			<Mytab>
				<Tab eventKey='di' title='DI'>
					<MyForm margin='1em 0 0 0' handleOnSubmit={createDI}>
						<MyRow>
							<MyInput
								type='text'
								nameLabel='Incluido por'
								name='incluidoPor'
								placeHolder='Incluído por'
								width='15em'
								readOnly={true}
							/>
							<MyInput
								type='text'
								nameLabel='Data inclusão'
								name='dataInclusao'
								placeHolder='Data inclusão'
								width='10em'
								readOnly={true}
							/>
							<MyInput
								type='text'
								nameLabel='Alterado por'
								name='alteradoPor'
								placeHolder='Alterado por'
								width='15em'
								readOnly={true}
							/>
							<MyInput
								type='text'
								nameLabel='Data alteração'
								name='dataAlteracao'
								placeHolder='Data alteração'
								width='10em'
								readOnly={true}
							/>
							<MyInput
								type='text'
								nameLabel='Status'
								name='status'
								placeHolder='Status da di'
								width='15em'
								display='flex'
								justifyContent='center'
								alignItems='flex-end'
								flexDirection='column'
								readOnly={true}
							/>
						</MyRow>
						<MyRow style={{ display: 'flex' }}>
							<div style={{ display: 'flex' }}>
								<div style={{ width: '10%' }}>
									<MyInput
										type='text'
										nameLabel='DI'
										name='di'
										placeHolder='DI'
										handleOnchange={(e) => setDI(e.currentTarget.value)}
										value={di}
									/>
								</div>
								<button
									type='button'
									style={{
										background: 'transparent',
										border: 'none',
										display: 'flex',
										alignItems: 'center',
										width: '5%',
									}}
								>
									<CiSearch
										style={{
											fontSize: '1.5em',
											color: 'blue',
											width: '100%',
											margin: '0',
										}}
									/>
								</button>
							</div>
							<div style={{ width: '10%' }}>
								<MyInput
									type='text'
									nameLabel='OP'
									name='op'
									placeHolder='OP'
									handleOnchange={(e) => setOP(e.currentTarget.value)}
									value={op}
								/>
							</div>

							<div>
								<MyInput
									type='text'
									nameLabel='Descrição'
									name='descricao'
									placeHolder='Descrição'
									handleOnchange={(e) => setDescription(e.currentTarget.value)}
									value={description}
								/>
							</div>
							<div>
								<MyInput
									type='text'
									nameLabel='Numero'
									name='numero'
									placeHolder='Numero'
									handleOnchange={(e) => setNumber(e.currentTarget.value)}
									value={number}
								/>
							</div>
						</MyRow>
						<MyRow>
							<MyInput
								type='text'
								nameLabel='Nome da peça'
								name='nomePeca'
								placeHolder='Nome da peça'
								handleOnchange={(e) => setPartName(e.currentTarget.value)}
								value={partName}
							/>
							<MyInput
								type='text'
								nameLabel='Numero da peça'
								name='numeroPeca'
								placeHolder='Numero da peça'
								handleOnchange={(e) => setPartNumber(e.currentTarget.value)}
								value={partNumber}
							/>
						</MyRow>
						<MyRow>
							<MySelect
								name='cliente'
								nameLabel='Cliente'
								value={client}
								handleOnChange={(e) => setClient(e.target.value)}
							>
								{listClient.map((client) => {
									return (
										<option key={client.id} value={client.id}>
											{client.description}
										</option>
									)
								})}
							</MySelect>
							<MyInput
								type='date'
								nameLabel='Data de início'
								name='inicio'
								placeHolder='Data de início'
								width='90%'
								handleOnchange={(e) => setStart(e.currentTarget.value)}
								value={start}
							/>
							<MyInput
								type='date'
								nameLabel='Data de término'
								name='termino'
								placeHolder='Data de término'
								width='90%'
								handleOnchange={(e) => setFinish(e.currentTarget.value)}
								value={finish}
							/>
							<MyButton type='submit' nameButton='Incluir' />
						</MyRow>
						{msg && <Message msg={msg} />}
					</MyForm>
				</Tab>
				<Tab eventKey='di_horas' title='DI Horas'>
					<div style={{ display: 'flex' }}>
						<MyInput
							name='di_hours'
							nameLabel='DI'
							type='text'
							value={di}
							readOnly={true}
						/>
						<MyInput
							name='status_hours'
							nameLabel='Status'
							type='text'
							value={status}
							readOnly={true}
						/>
					</div>
					<div style={{ display: 'flex', width: '100%' }}>
						<div style={{ width: '30%', marginRight: '2%' }}>
							<MySelect
								name='operation'
								nameLabel='Operação'
								value={operation}
								handleOnChange={(e) => setOperation(e.currentTarget.value)}
							>
								{listOperation.map((operation) => {
									return (
										<option key={operation.id} value={operation.id}>
											{operation.description}
										</option>
									)
								})}
							</MySelect>
						</div>
						<div style={{ width: '20%', marginRight: '2%' }}>
							<MyInput
								name='quantity'
								nameLabel='Total horas'
								placeHolder='Digite o total de horas previstas!'
								type='text'
								value={quantity}
								handleOnchange={(e) =>
									setQuantity(e.currentTarget.value.replace('.', ''))
								}
								handleOnBlur={formatQuantity}
							/>
						</div>
						<div style={{ width: '20%', marginRight: '2%' }}>
							<MyInput
								name='price'
								nameLabel='Custo hora'
								placeHolder='Digite o custo hora!'
								type='text'
								value={price}
								handleOnchange={(e) => setPrice(e.currentTarget.value)}
								handleOnBlur={formatPrice}
							/>
						</div>
						<div style={{ width: '15%', marginRight: '5%' }}>
							<MyInput
								name='total_cost'
								nameLabel='Custo total'
								type='text'
								value={totalCost}
							/>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', margin: '0' }}>
							<MyButton
								nameButton='Incluir'
								type='submit'
								handleOnClick={includeHours}
							/>
						</div>
					</div>
					<MyTable header={headerDIHours}></MyTable>
				</Tab>
				<Tab eventKey='di_material' title='DI Material'>
					<h2>DI Material</h2>
				</Tab>
				<Tab eventKey='comment' title='Comentarios DI'>
					<h2>Comentários</h2>
				</Tab>
			</Mytab>
		</MyContainer>
	)
}
