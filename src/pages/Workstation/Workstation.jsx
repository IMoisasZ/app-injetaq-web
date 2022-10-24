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
import ModalAssociateOperation from '../../pages/Workstation/ModalAssociateOperation'
import styles from './Workstation.module.css'
import api from '../../api/api'

export default function Workstation({ set }) {
	// usestate
	const [id, setId] = useState('')
	const [code, setCode] = useState('')
	const [workstation, setWorkstations] = useState('')
	const [actived, setActived] = useState(true)
	const [listWorkstations, setListWorkstations] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setNameBtn] = useState('Incluir')

	// get all sectors
	const allWorkstationss = async () => {
		const response = await api.get('/workstation')
		setListWorkstations(response.data)
	}

	useEffect(() => {
		allWorkstationss()
	}, [])

	// create a new workstation
	const createWorkstations = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('workstation', {
					code,
					description: workstation,
					actived,
				})
				setMsg({
					msg: 'Posto cadastrado com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Posto já cadastrado!',
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
				await api.patch('workstation', {
					id,
					code,
					description: workstation,
					actived,
				})
				setMsg({
					msg: 'Posto alterado com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Posto já cadastrado!',
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

	// edit workstation
	const editWorkstations = async ({ id, code, description, actived }) => {
		try {
			setId(id)
			setCode(code)
			setWorkstations(description)
			setActived(actived)
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

	// disable / enable workstation
	const disableEnableWorkstations = async (id, actived) => {
		try {
			await api.put('workstation', {
				id,
				actived,
			})
			allWorkstationss()
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
		setCode('')
		setWorkstations('')
		setActived(true)
		allWorkstationss()
		setMsg('')
		setNameBtn('Incluir')
	}

	// header table sectors
	const header = ['Código do Posto', 'Descrição', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Posto'>
			<Form handleOnSubmit={createWorkstations}>
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
					<div style={{ width: '22%', marginRight: '1em' }}>
						<MyInput
							name='code'
							placeHolder='Digite o código do posto'
							nameLabel='Código do posto'
							type='text'
							value={code}
							handleOnchange={(e) => setCode(e.currentTarget.value)}
						/>
					</div>
					<div style={{ width: '85%' }}>
						<MyInput
							name='workstation'
							placeHolder='Descrição do posto'
							nameLabel='Posto'
							type='text'
							value={workstation}
							handleOnchange={(e) => setWorkstations(e.currentTarget.value)}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '12%',
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
				<h2>Lista de Postos</h2>
				{msg && <Message msg={msg} />}
			</div>
			<MyTable header={header} numCol={3}>
				{listWorkstations.map((workstation) => {
					return (
						<tr key={workstation.id} className={styles.table_btn}>
							<td>{workstation.code}</td>
							<td>{workstation.description}</td>
							<td>{workstation.actived ? 'Sim' : 'Não'}</td>
							<td>
								<ButtonTable
									btnType='edit'
									handleOnClick={() => editWorkstations(workstation)}
								/>
							</td>
							<td>
								{workstation.actived ? (
									<ButtonTable
										btnType='disable'
										handleOnClick={() =>
											disableEnableWorkstations(workstation.id, false)
										}
									/>
								) : (
									<ButtonTable
										btnType='enable'
										handleOnClick={() =>
											disableEnableWorkstations(workstation.id, true)
										}
									/>
								)}
							</td>
							<td>
								<ModalAssociateOperation
									code={workstation.code}
									description={workstation.description}
									workstationId={workstation.id}
								/>
							</td>
						</tr>
					)
				})}
			</MyTable>
		</Container>
	)
}
