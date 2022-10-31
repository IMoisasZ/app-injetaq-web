/** @format */

import React, { useState, useEffect } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/itensForm/form/Form'
import MyInput from '../../components/itensForm/input/Input'
import CheckBox from '../../components/itensForm/checkBox/CheckBox'
import Message from '../../components/message/Message'
import Button from '../../components/itensForm/button/Button'
import MyTable from '../../components/table/Table'
import styles from './RawMaterial.module.css'
import api from '../../api/api'

export default function RawMaterial() {
	// usestate
	const [id, setId] = useState('')
	const [rawMaterial, setRawMaterial] = useState('')
	const [actived, setActived] = useState(true)
	const [listRawMaterial, setListRawMaterial] = useState([])
	const [msg, setMsg] = useState('')
	const [nameBtn, setNameBtn] = useState('Incluir')

	// get all rawMaterials
	const allRawMaterials = async () => {
		const response = await api.get('/material')
		setListRawMaterial(response.data)
	}

	useEffect(() => {
		allRawMaterials()
	}, [])

	// create a new rawMaterial
	const createRawMaterial = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				await api.post('material', {
					description: rawMaterial,
					actived,
				})
				setMsg({
					msg: 'Material/Serviço cadastrado com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Material/serviço já cadastrado!',
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
				await api.patch('material', {
					id,
					description: rawMaterial,
					actived,
				})
				setMsg({
					msg: 'Material/Serviço alterado com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				if (error.response.data.erros) {
					setMsg({
						msg: 'Material/Serviço já cadastrado!',
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

	// edit rawMaterial
	const editRawMaterial = async ({ id, description, actived }) => {
		try {
			setId(id)
			setRawMaterial(description)
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

	// disable / enable rawMaterial
	const disableEnableRawMaterial = async (id, actived) => {
		try {
			await api.put('material', {
				id,
				actived,
			})
			allRawMaterials()
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
		setRawMaterial('')
		setActived(true)
		allRawMaterials()
		setMsg('')
		setNameBtn('Incluir')
	}

	// header table rawMaterials
	const header = ['Material/Serviço', 'Ativo', 'Ações']

	return (
		<Container nameHeader='Setor'>
			<Form handleOnSubmit={createRawMaterial}>
				<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
					<div style={{ width: '85%' }}>
						<MyInput
							name='rawMaterial'
							placeHolder='Descrição do material/Serviço'
							nameLabel='Material/Serviço'
							type='text'
							value={rawMaterial}
							handleOnchange={(e) => setRawMaterial(e.currentTarget.value)}
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
				{listRawMaterial.map((rawMaterial) => {
					return (
						<tr key={rawMaterial.id} className={styles.table_btn}>
							<td>{rawMaterial.description}</td>
							<td>{rawMaterial.actived ? 'Sim' : 'Não'}</td>
							<td>
								<Button
									btnType='edit'
									handleOnClick={() => editRawMaterial(rawMaterial)}
								/>
							</td>
							<td>
								{rawMaterial.actived ? (
									<Button
										btnType='disable'
										handleOnClick={() =>
											disableEnableRawMaterial(rawMaterial.id, false)
										}
									/>
								) : (
									<Button
										btnType='enable'
										handleOnClick={() =>
											disableEnableRawMaterial(rawMaterial.id, true)
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
