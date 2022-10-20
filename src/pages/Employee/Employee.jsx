/** @format */

import React, { useState, useEffect } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/itensForm/form/Form'
import MyInput from '../../components/itensForm/input/Input'
import CheckBox from '../../components/itensForm/checkBox/CheckBox'
import Message from '../../components/message/Message'
import Button from '../../components/itensForm/button/Button'
import MyTable from '../../components/table/Table'
import ButtonTable from '../../components/table/ButtonsTable'
import styles from './Employee.module.css'
import api from '../../api/api'

export default function Employee() {
	// usestate
	const [id, setId] = useState('')
	const [employee, setEmployee] = useState('')
	const [actived, setActived] = useState(true)
	const [listEmployee, setListEmployee] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setNameBtn] = useState('Incluir')

	// get all employees
	const allEmployees = async () => {
		const response = await api.get('/employee')
		setListEmployee(response.data)
	}

	useEffect(() => {
		allEmployees()
	}, [])

	// create a new employee
	const createEmployee = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('employee', {
					description: employee,
					actived,
				})
				setMsg({
					msg: 'Funcionário cadastrado com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Funcionário já cadastrado!',
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
				await api.patch('employee', {
					id,
					description: employee,
					actived,
				})
				setMsg({
					msg: 'Funcionário alterado com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Funcionário já cadastrado!',
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

	// edit employee
	const editEmployee = async (id) => {
		try {
			const response = await api.get(`employee/${id}`)
			setId(response.data.id)
			setEmployee(response.data.description)
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

	// disable / enable employee
	const disableEnableEmployee = async (id, actived) => {
		try {
			await api.put('employee', {
				id,
				actived,
			})
			allEmployees()
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
		setEmployee('')
		setActived(true)
		allEmployees()
		setMsg('')
		setNameBtn('Incluir')
	}

	// header table employees
	const header = ['Funcionário', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Funcionário'>
			<Form handleOnSubmit={createEmployee}>
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
					<div style={{ width: '85%' }}>
						<MyInput
							name='employee'
							placeHolder='Nome do funcionário'
							nameLabel='Funcionário'
							type='text'
							value={employee}
							handleOnchange={(e) => setEmployee(e.currentTarget.value)}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '10%',
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
				<h2>Lista de Funcionários</h2>
				{msg && <Message msg={msg} />}
			</div>
			<MyTable header={header}>
				{listEmployee.map((employee) => {
					return (
						<tr key={employee.id} className={styles.table_btn}>
							<td>{employee.description}</td>
							<td>{employee.actived ? 'Sim' : 'Não'}</td>
							<td>
								<ButtonTable
									btnType='edit'
									handleOnClick={() => editEmployee(employee.id)}
								/>
							</td>
							<td>
								{employee.actived ? (
									<ButtonTable
										btnType='disable'
										handleOnClick={() =>
											disableEnableEmployee(employee.id, false)
										}
									/>
								) : (
									<ButtonTable
										btnType='enable'
										handleOnClick={() =>
											disableEnableEmployee(employee.id, true)
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
