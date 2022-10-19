/** @format */

import React, { useState, useEffect } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/itensForm/form/Form'
import MyInput from '../../components/itensForm/input/Input'
import MySelect from '../../components/itensForm/select/Select'
import CheckBox from '../../components/itensForm/checkBox/CheckBox'
import Message from '../../components/message/Message'
import Button from '../../components/itensForm/button/Button'
import MyTable from '../../components/table/Table'
import ButtonTable from '../../components/table/ButtonsTable'
import styles from './Operation.module.css'
import api from '../../api/api'

export default function Operation() {
	// usestate
	const [id, setId] = useState('')
	const [operation, setOperation] = useState('')
	const [sector, setSector] = useState('')
	const [listSector, setListSector] = useState([])
	const [actived, setActived] = useState(true)
	const [listOperation, setListOperation] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setNameBtn] = useState('Incluir')
	// get all operations
	const allOperations = async () => {
		const response = await api.get('/operation')
		setListOperation(response.data)
	}

	useEffect(() => {
		allOperations()
	}, [])

	// get all sectors
	const allSectors = async () => {
		const response = await api.get(`sector?actived=${true}`)
		setListSector(response.data)
	}

	useEffect(() => {
		allSectors()
	}, [])

	// create a new operation
	const createOperation = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('operation', {
					description: operation,
					sector_id: sector,
					actived,
				})
				setMsg({
					msg: 'Operação cadastrada com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Operação já cadastrado!',
						typeMsg: 'error',
					})
				} else {
					setMsg({
						msg: error.response.data.error,
						typeMsg: 'error',
					})
				}
				setTimeout(() => {
					setMsg('')
				}, 2000)
			}
		} else {
			try {
				await api.patch('operation', {
					id,
					description: operation,
					sector_id: sector,
					actived,
				})
				setMsg({
					msg: 'Operação alterada com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Operação já cadastrado!',
						typeMsg: 'error',
					})
				} else {
					setMsg({
						msg: error.response.data.error,
						typeMsg: 'error',
					})
				}
				setTimeout(() => {
					setMsg('')
				}, 2000)
			}
		}
	}
	console.log(operation, sector, actived, 'operation')
	// edit operation
	const editOperation = async (id) => {
		try {
			const response = await api.get(`operation/${id}`)
			setId(response.data.id)
			setOperation(response.data.description)
			setSector(response.data.sector_id)
			setActived(response.data.actived)
			setNameBtn('Editar')
		} catch (error) {
			setMsg({
				msg: error.data.response.error,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
		}
	}

	// disable / enable operation
	const disableEnableOperation = async (id, actived) => {
		try {
			await api.put('operation', {
				id,
				actived,
			})
			allOperations()
		} catch (error) {
			setMsg({
				msg: error.data.response.error,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
		}
	}

	const handleClear = () => {
		setId('')
		setOperation('')
		setSector('')
		setActived(true)
		allSectors()
		allOperations()
		setMsg('')
		setNameBtn('Incluir')
	}

	// header table operations
	const header = ['Operação', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Operação'>
			<Form handleOnSubmit={createOperation}>
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
					<div style={{ width: '85%' }}>
						<MyInput
							name='operation'
							placeHolder='Nome do setor'
							nameLabel='Operação'
							type='text'
							value={operation}
							handleOnchange={(e) => setOperation(e.currentTarget.value)}
						/>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
						<MySelect
							name='sector'
							nameLabel='Setor'
							value={sector}
							handleOnChange={(e) => setSector(e.currentTarget.value)}
							// defaultValue='Selecione o setor...'
						>
							{listSector.map((sector) => {
								return (
									<option key={sector.id} value={sector.id}>
										{sector.description}
									</option>
								)
							})}
						</MySelect>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '20%',
							marginLeft: '2em',
						}}
					>
						<CheckBox
							checked={actived && true}
							name='actived'
							value={actived}
							handleOnchange={() => setActived(!actived)}
							labelCheckBox='Ativo'
						/>
					</div>
					{nameBtn === 'Incluir' ? (
						<Button msg={msg} nameButton={nameBtn} />
					) : (
						<div className={styles.div_btns}>
							<Button msg={msg} nameButton={nameBtn} variant='warning' />
							<Button
								nameButton='Limpar'
								variant='secondary'
								handleOnClick={handleClear}
							/>
						</div>
					)}
				</div>
			</Form>
			<div className={styles.title_table}>
				<h2>Lista de Operações</h2>
				{msg && <Message msg={msg} />}
			</div>
			<MyTable header={header}>
				{listOperation.map((operation) => {
					return (
						<tr key={operation.id} className={styles.table_btn}>
							<td>{operation.description}</td>
							<td>{operation.actived ? 'Sim' : 'Não'}</td>
							<td>
								<ButtonTable
									btnType='edit'
									handleOnClick={() => editOperation(operation.id)}
								/>
							</td>
							<td>
								{operation.actived ? (
									<ButtonTable
										btnType='disable'
										handleOnClick={() =>
											disableEnableOperation(operation.id, false)
										}
									/>
								) : (
									<ButtonTable
										btnType='enable'
										handleOnClick={() =>
											disableEnableOperation(operation.id, true)
										}
									/>
								)}
							</td>
						</tr>
					)
				})}
			</MyTable>
		</Container>
	)
}
