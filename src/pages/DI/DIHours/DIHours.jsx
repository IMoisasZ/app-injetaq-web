/** @format */

import React, { useState, useEffect } from 'react'
import MyInput from '../../../components/itensForm/input/Input'
import MySelect from '../../../components/itensForm/select/Select'
import MyTable from '../../../components/table/Table'
import MyButton from '../../../components/itensForm/button/Button'
import Message from '../../../components/message/Message'
import {
	formatNumberDecimal,
	formatNumberCurrency,
} from '../../../utils/formatNumber'
import api from '../../../api/api'
import styles from './DIHours.module.css'

export default function DIHours({
	di_id,
	di,
	status,
	listDIHours,
	allDIHours,
}) {
	//usestate
	const [operation, setOperation] = useState('')
	const [listOperation, setListOperation] = useState([])
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')
	const [totalCost, setTotalCost] = useState(0)
	const [msg, setMsg] = useState('')

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
			console.error({ error })
		}
	}

	useEffect(() => {
		allOperations()
	}, [])

	// format field quantity
	const formatQuantity = (e) => {
		if (quantity.includes('.', ',')) {
			setQuantity(quantity)
			formatTotalCost()
		} else {
			setQuantity(formatNumberDecimal(e.currentTarget.value))
			formatTotalCost()
		}
	}

	// format field price
	const formatPrice = (e) => {
		if (price.includes('R$')) {
			setPrice(price)
			formatTotalCost()
		} else {
			setPrice(formatNumberCurrency(e.currentTarget.value))
			formatTotalCost()
		}
	}

	// format field price
	const formatTotalCost = () => {
		const new_quantity = quantity.replace('.', '').replace(',', '.')
		const new_price = price.replace('R$', '').replace('.', '').replace(',', '.')
		const total_cost = Number(new_quantity) * Number(new_price)
		setTotalCost(formatNumberCurrency(total_cost.toString()))
	}

	// include hours DI
	const inclurHoursDI = async (e) => {
		e.preventDefault()
		try {
			await api.post('di_hours', {
				di_id,
				operation_id: operation,
				quantity,
				price: parseFloat(
					price.replace('R$', '').replace('.', '').replace(',', '.')
				),
			})
			setMsg({
				msg: 'Horas incluídas com sucesso!',
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
			console.error({ error })
			allDIHours()
		}
	}

	// virify if the operation have ever used
	const handleOperation = (e) => {
		const usedOperation = listDIHours.find(
			(op) => op.operation_id === Number(e.currentTarget.value)
		)
		console.log('teste', typeof usedOperation)
		if (usedOperation) {
			setMsg({
				msg: 'Operação já utilizada!',
				typeMsg: 'error',
			})
			setTimeout(() => {
				setOperation('')
			}, 2000)
		} else {
			setOperation(e.currentTarget.value)
		}
	}

	// delete the operation selected
	const handleDelete = async (id) => {
		try {
			const response = await api.delete(`di_hours/${Number(id)}`)
			setMsg({
				msg: response.data.msg,
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
			console.error({ error })
		}
	}

	// handle clear
	const handleClear = () => {
		setOperation('Selecione uma operação...')
		allOperations()
		setQuantity('')
		setPrice('')
		setTotalCost(0)
		allDIHours()
		setMsg('')
	}

	//header DI hours
	const headerDIHours = [
		'Operação',
		'Quantidade Horas',
		'Custo Hora',
		'Custo Total',
		'Ações',
	]

	return (
		<div>
			<div className={styles.div_di_status}>
				<div>
					<MyInput
						name='di_hours'
						nameLabel='DI'
						type='text'
						value={di}
						readOnly={true}
						width='100%'
					/>
				</div>
				<div>
					<MyInput
						name='status_hours'
						nameLabel='Status'
						type='text'
						value={status}
						readOnly={true}
						width='100%'
					/>
				</div>
			</div>
			<div className={styles.div_apontamento}>
				<div className={styles.div_select}>
					<MySelect
						name='operation'
						nameLabel='Operação'
						value={operation}
						handleOnChange={handleOperation}
						margin='1em 0 0.5em 0'
					>
						<option value=''>Selecione operação...</option>
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
						readOnly={true}
					/>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', margin: '0' }}>
					<MyButton
						nameButton='Incluir'
						type='submit'
						handleOnClick={inclurHoursDI}
						disabled={di && status === 'EM EXECUÇÃO' ? false : true}
						btnType='text'
					/>
				</div>
			</div>
			<MyTable header={headerDIHours}>
				{listDIHours.map((diHrs) => {
					console.log(typeof diHrs.quantity)
					return (
						<tr key={diHrs.id}>
							<td>{diHrs.operation.description}</td>
							<td>{formatNumberDecimal(diHrs.quantity)}</td>
							<td>{formatNumberCurrency(diHrs.price)}</td>
							<td>
								{formatNumberCurrency(
									(
										parseFloat(diHrs.quantity) * parseFloat(diHrs.price)
									).toString()
								)}
							</td>
							<td className={styles.table_btn}>
								<MyButton
									btnType='delete'
									title={`horas da operação ${diHrs.operation.description}`}
									handleOnClick={() => handleDelete(diHrs.id)}
								/>
							</td>
						</tr>
					)
				})}
			</MyTable>
			{msg && <Message msg={msg} width='100%' />}
		</div>
	)
}
