/** @format */

import React, { useState, useEffect } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/itensForm/form/Form'
import Input from '../../components/itensForm/input/Input'
import CheckBox from '../../components/itensForm/checkBox/CheckBox'
import MyTable from '../../components/table/Table'
import ButtonTable from '../../components/table/ButtonsTable'
import Button from '../../components/itensForm/button/Button'
import Message from '../../components/message/Message'
import styles from './Client.module.css'
import api from '../../api/api'

export default function Client() {
	// usestate
	const [id, setId] = useState('')
	const [client, setClient] = useState('')
	const [actived, setActived] = useState(true)
	const [list, setList] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setnameBtn] = useState('Incluir')

	// get all clients
	const allClients = async () => {
		const response = await api.get('client')
		setList(response.data)
	}

	useEffect(() => {
		allClients()
	}, [])

	// create a new client
	const createClient = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('client', {
					description: client,
					actived,
				})
				allClients()
				setMsg({
					msg: 'Cliente cadastrado com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Cliente já cadastrado!',
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
				await api.patch(`client`, {
					id,
					description: client,
					actived,
				})
				allClients()
				setMsg({
					msg: 'Cliente alterado com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Cliente já cadastrado!',
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

	// edit client
	const editClient = async ({ id, description, actived }) => {
		try {
			setId(id)
			setClient(description)
			setActived(actived)
			setnameBtn('Editar')
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

	// disable/enable client
	const disbleEnableClient = async (id, actived) => {
		try {
			await api.put('client', {
				id,
				actived,
			})
			allClients()
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

	// clear fields
	const handleClear = async () => {
		setId('')
		setClient('')
		setActived(true)
		allClients()
		setnameBtn('Incluir')
		setMsg('')
	}

	// header table clients
	const header = ['Cliente', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Cliente'>
			<Form handleOnSubmit={createClient}>
				<div className={styles.container}>
					<Input
						nameLabel='Nome'
						placeHolder='Nome do cliente'
						value={client}
						handleOnchange={(e) => setClient(e.currentTarget.value)}
					/>

					<div className={styles.checkbox}>
						<CheckBox
							name='actived'
							labelCheckBox='Ativo'
							value={actived}
							checked={actived && true}
							handleOnchange={() => setActived(!actived)}
						/>
					</div>
					{nameBtn === 'Incluir' ? (
						<Button nameButton={nameBtn} handleOnClick={createClient} />
					) : (
						<div className={styles.div_btns}>
							<Button
								nameButton={nameBtn}
								handleOnClick={createClient}
								variant='warning'
							/>
							<Button
								nameButton='Limpar'
								handleOnClick={handleClear}
								variant='secondary'
							/>
						</div>
					)}
				</div>
			</Form>
			<div className={styles.title_table}>
				<h2>Lista de Clientes</h2>
				{msg && <Message msg={msg} />}
			</div>
			<MyTable header={header}>
				{list.map((cli) => {
					return (
						<tr key={cli.id} className={styles.table_btn}>
							<td>{cli.description}</td>
							<td className={styles.table_btn}>
								{cli.actived ? 'Sim' : 'Não'}
							</td>
							<td className={styles.table_btn}>
								<ButtonTable
									btnType='edit'
									handleOnClick={() => editClient(cli)}
								/>
							</td>
							<td className={styles.table_btn}>
								{cli.actived ? (
									<ButtonTable
										btnType='disable'
										handleOnClick={() => disbleEnableClient(cli.id, false)}
									/>
								) : (
									<ButtonTable
										btnType='enable'
										handleOnClick={() => disbleEnableClient(cli.id, true)}
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
