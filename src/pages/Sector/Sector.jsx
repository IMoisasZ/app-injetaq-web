/** @format */

import React, { useState, useEffect } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/itensForm/form/Form'
import MyInput from '../../components/itensForm/input/Input'
import CheckBox from '../../components/itensForm/checkBox/CheckBox'
import Message from '../../components/message/Message'
import Button from '../../components/itensForm/button/Button'
import MyTable from '../../components/table/Table'
import styles from './Sector.module.css'
import api from '../../api/api'

export default function Sector() {
	// usestate
	const [id, setId] = useState('')
	const [sector, setSector] = useState('')
	const [actived, setActived] = useState(true)
	const [listSector, setListSector] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setNameBtn] = useState('Incluir')

	// get all sectors
	const allSectors = async () => {
		const response = await api.get('/sector')
		setListSector(response.data)
	}

	useEffect(() => {
		allSectors()
	}, [])

	// create a new sector
	const createSector = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('sector', {
					description: sector,
					actived,
				})
				setMsg({
					msg: 'Setor cadastrado com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Setor já cadastrado!',
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
				await api.patch('sector', {
					id,
					description: sector,
					actived,
				})
				setMsg({
					msg: 'Setor alterado com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Setor já cadastrado!',
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

	// edit sector
	const editSector = async ({ id, description, actived }) => {
		try {
			setId(id)
			setSector(description)
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

	// disable / enable sector
	const disableEnableSector = async (id, actived) => {
		try {
			await api.put('sector', {
				id,
				actived,
			})
			allSectors()
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
		setSector('')
		setActived(true)
		allSectors()
		setMsg('')
		setNameBtn('Incluir')
	}

	// header table sectors
	const header = ['Setor', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Setor'>
			<Form handleOnSubmit={createSector}>
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
					<div style={{ width: '85%' }}>
						<MyInput
							name='sector'
							placeHolder='Nome do setor'
							nameLabel='Setor'
							type='text'
							value={sector}
							handleOnchange={(e) => setSector(e.currentTarget.value)}
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
						<Button msg={msg} nameButton={nameBtn} btnType='text' />
					) : (
						<div className={styles.div_btns}>
							<Button
								msg={msg}
								nameButton={nameBtn}
								variant='warning'
								btnType='text'
							/>
							<Button
								nameButton='Limpar'
								variant='secondary'
								handleOnClick={handleClear}
								btnType='text'
							/>
						</div>
					)}
				</div>
			</Form>
			<div className={styles.title_table}>
				<h2>Lista de Setores</h2>
				{msg && <Message msg={msg} />}
			</div>
			<MyTable header={header}>
				{listSector.map((sector) => {
					return (
						<tr key={sector.id} className={styles.table_btn}>
							<td>{sector.description}</td>
							<td>{sector.actived ? 'Sim' : 'Não'}</td>
							<td>
								<Button
									btnType='edit'
									handleOnClick={() => editSector(sector)}
								/>
							</td>
							<td>
								{sector.actived ? (
									<Button
										btnType='disable'
										handleOnClick={() => disableEnableSector(sector.id, false)}
									/>
								) : (
									<Button
										btnType='enable'
										handleOnClick={() => disableEnableSector(sector.id, true)}
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
