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
import styles from './User.module.css'
import api from '../../api/api'
import clear from '../../utils/clear'

export default function User() {
	// usestate
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [role, setRole] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [actived, setActived] = useState(true)
	const [listUser, setListUser] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setNameBtn] = useState('Incluir')

	// get all Users
	const allUsers = async () => {
		const response = await api.get('/user')
		setListUser(response.data)
	}

	useEffect(() => {
		allUsers()
	}, [])

	// create a new user
	const createUser = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('user', {
					name,
					lastName,
					email,
					role,
					password,
					confirmPassword,
					actived,
				})
				setMsg({
					msg: 'Usuário cadastrado com sucesso!',
					typeMsg: 'success',
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
			}
		}
		if (nameBtn === 'Editar') {
			try {
				await api.patch('user', {
					id,
					name,
					lastName,
					email,
					role,
					actived,
				})
				setMsg({
					msg: 'Usuário alterado com sucesso!',
					typeMsg: 'warning',
				})
				clear(handleClear, 2000)
			} catch (error) {
				console.log('patch', { error })
				setMsg({
					msg: error.response.data.error || error.response.data.erros,
					typeMsg: 'error',
				})
				clear('msg', setMsg, handleClear)
			}
		}
	}

	// edit user
	const editUser = async (id) => {
		try {
			const response = await api.get(`user/${id}`)
			setId(id)
			setName(response.data.name)
			setLastName(response.data.lastName)
			setEmail(response.data.email)
			setRole(response.data.role)
			setActived(response.data.actived)
			setNameBtn('Editar')
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			clear(handleClear, 2000)
		}
	}

	// disable / enable user
	const disableEnableUser = async (id, actived) => {
		try {
			await api.put('user', {
				id,
				actived,
			})
			allUsers()
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			clear(handleClear, 2000)
		}
	}

	const handleClear = () => {
		setId('')
		setName('')
		setLastName('')
		setEmail('')
		setRole('')
		setPassword('')
		setConfirmPassword('')
		setActived(true)
		allUsers()
		setMsg('')
		setNameBtn('Incluir')
	}

	// role users
	const listRole = [
		{
			id: 1,
			description: 'MASTER',
		},
		{
			id: 2,
			description: 'ADMINISTRADOR',
		},
		{
			id: 3,
			description: 'USER',
		},
	]

	// header table Users
	const header = ['Nome', 'Email', 'Tipo Perfil', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Usuário'>
			<Form handleOnSubmit={createUser}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<div style={{ width: '50%', marginRight: '1em' }}>
							<MyInput
								name='name'
								placeHolder='Nome do usuário'
								nameLabel='Nome'
								type='text'
								value={name}
								handleOnchange={(e) => setName(e.currentTarget.value)}
							/>
						</div>
						<div style={{ width: '50%', marginRight: '1em' }}>
							<MyInput
								name='lastName'
								placeHolder='Sobrenome do usuário'
								nameLabel='Sobrenome'
								type='text'
								value={lastName}
								handleOnchange={(e) => setLastName(e.currentTarget.value)}
							/>
						</div>
						<div style={{ width: '50%' }}>
							<MyInput
								name='email'
								placeHolder='Email do usuário'
								nameLabel='Email'
								type='email'
								value={email}
								handleOnchange={(e) => setEmail(e.currentTarget.value)}
							/>
						</div>
						<div
							style={{ display: 'flex', alignItems: 'center', width: '50%' }}
						>
							<MySelect
								name='role'
								nameLabel='Perfil'
								value={role}
								handleOnChange={(e) => setRole(e.currentTarget.value)}
								defaultValue='Selecione o perfil...'
							>
								{listRole.map((role) => {
									return (
										<option key={role.id} value={role.id}>
											{role.description}
										</option>
									)
								})}
							</MySelect>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<div style={{ width: '50%', marginRight: '1em' }}>
							<MyInput
								name='password'
								placeHolder='Digite sua senha'
								nameLabel='Senha'
								type='password'
								value={password}
								handleOnchange={(e) => setPassword(e.currentTarget.value)}
							/>
						</div>
						<div style={{ width: '50%', marginRight: '1em' }}>
							<MyInput
								name='confirmPassword'
								placeHolder='Confirme sua senha'
								nameLabel='Confirmar senha'
								type='password'
								value={confirmPassword}
								handleOnchange={(e) =>
									setConfirmPassword(e.currentTarget.value)
								}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '10%',
								marginLeft: '0.8em',
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
								<Button
									msg={msg}
									nameButton={nameBtn}
									variant='warning'
									handleOnClick={editUser}
								/>
								<Button
									nameButton='Limpar'
									variant='secondary'
									handleOnClick={handleClear}
								/>
							</div>
						)}
					</div>
				</div>
			</Form>
			<div className={styles.title_table}>
				<h2>Lista de Usuários</h2>
				{msg && <Message msg={msg} />}
			</div>
			<MyTable header={header}>
				{listUser.map((user) => {
					return (
						<tr key={user.id} className={styles.table_btn}>
							<td>{`${user.name} ${user.lastName}`}</td>
							<td>{user.email}</td>
							<td>
								{listRole.find((role) => user.role === role.id).description}
							</td>
							<td>{user.actived ? 'Sim' : 'Não'}</td>
							<td>
								<ButtonTable
									btnType='edit'
									handleOnClick={() => editUser(user.id)}
								/>
							</td>
							<td>
								{user.actived ? (
									<ButtonTable
										btnType='disable'
										handleOnClick={() => disableEnableUser(user.id, false)}
									/>
								) : (
									<ButtonTable
										btnType='enable'
										handleOnClick={() => disableEnableUser(user.id, true)}
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
