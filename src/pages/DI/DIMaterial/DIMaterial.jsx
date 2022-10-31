/** @format */

import React, { useState, useEffect } from 'react'
import MyInput from '../../../components/itensForm/input/Input'
import MySelect from '../../../components/itensForm/select/Select'
import MyTable from '../../../components/table/Table'
import MyButton from '../../../components/itensForm/button/Button'
import Message from '../../../components/message/Message'
import { formatNumberCurrency } from '../../../utils/formatNumber'
import api from '../../../api/api'
import styles from './DIMaterial.module.css'

export default function DIHours({
	di_id,
	di,
	status,
	listDIMaterial = [],
	allDIMaterial,
	totalGeralMaterial,
	totalMaterial,
}) {
	//usestate
	const [description, setDescription] = useState('')
	const [material, setMaterial] = useState('')
	const [listMaterial, setListMaterial] = useState([])
	const [costTotal, setCostTotal] = useState('')
	const [msg, setMsg] = useState('')

	// all materials
	const allMaterials = async () => {
		try {
			const response = await api.get('material')
			setListMaterial(response.data)
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			console.error({ error })
		}
	}

	useEffect(() => {
		allMaterials()
	}, [])

	// format field price
	const formatCostTotal = (e) => {
		if (!costTotal.includes('R$')) {
			return setCostTotal(formatNumberCurrency(e.currentTarget.value))
		}
	}

	// include hours DI
	const includeMaterialDI = async (e) => {
		e.preventDefault()
		try {
			await api.post('di_material', {
				di_id,
				description,
				material_id: material,
				total: parseFloat(
					costTotal.replace('R$', '').replace('.', '').replace(',', '.')
				),
			})
			setMsg({
				msg: 'Materia Prima/Serviço incluído com sucesso!',
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
			allDIMaterial()
		}
	}

	// virify if the material have been ever used
	const handleMaterial = (e) => {
		setMaterial(e.currentTarget.value)
	}

	// delete the material selected
	const handleDelete = async (id) => {
		try {
			const response = await api.delete(`di_material/${Number(id)}`)
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
		setDescription('')
		setMaterial('Selecione uma operação...')
		setCostTotal('')
		allMaterials()
		allDIMaterial()
		setMsg('')
		totalGeralMaterial()
	}

	//header DI hours
	const headerDIRawMaterial = [
		'Descrição',
		'Material/Serviço',
		'Custo Total',
		'Ações',
	]

	return (
		<div>
			<div className={styles.div_di_status}>
				<div>
					<MyInput
						name='di_material'
						nameLabel='DI'
						type='text'
						value={di}
						readOnly={true}
						width='100%'
					/>
				</div>
				<div>
					<MyInput
						name='status_material'
						nameLabel='Status'
						type='text'
						value={status}
						readOnly={true}
						width='100%'
					/>
				</div>
			</div>
			<div className={styles.div_apontamento}>
				<div style={{ width: '60%', marginRight: '2%' }}>
					<MyInput
						name='description'
						nameLabel='Material/Serviço'
						placeHolder='Descrição do material/serviço'
						type='text'
						value={description}
						handleOnchange={(e) => setDescription(e.currentTarget.value)}
					/>
				</div>
				<div className={styles.div_select}>
					<MySelect
						name='material'
						nameLabel='Matéria Prima/Serviço'
						value={material}
						handleOnChange={handleMaterial}
						margin='1em 0 0.5em 0'
					>
						<option value=''>Selecione material/serviço...</option>
						{listMaterial.map((material) => {
							return (
								<option key={material.id} value={material.id}>
									{material.description}
								</option>
							)
						})}
					</MySelect>
				</div>
				<div style={{ width: '20%', marginRight: '2%' }}>
					<MyInput
						name='costTotal'
						nameLabel='Custo matéria prima/serviço'
						placeHolder='Digite o custo total!'
						type='text'
						value={costTotal}
						handleOnchange={(e) => setCostTotal(e.currentTarget.value)}
						handleOnBlur={formatCostTotal}
					/>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', margin: '0' }}>
					<MyButton
						nameButton='Incluir'
						type='submit'
						handleOnClick={includeMaterialDI}
						disabled={di && status === 'EM EXECUÇÃO' ? false : true}
						btnType='text'
					/>
				</div>
			</div>
			<MyTable header={headerDIRawMaterial} height='25em'>
				{listDIMaterial.map((diMPS) => {
					console.log(typeof diMPS.quantity)
					return (
						<tr key={diMPS.id}>
							<td>{diMPS.description}</td>
							<td>{diMPS.material.description}</td>
							<td>{formatNumberCurrency(diMPS.total)}</td>
							<td className={styles.table_btn}>
								<MyButton
									btnType='delete'
									title={`matéria prima/serviço ${diMPS.material.description}`}
									handleOnClick={() => handleDelete(diMPS.id)}
								/>
							</td>
						</tr>
					)
				})}
			</MyTable>
			{totalMaterial !== 'R$ 0,00' ? (
				<div className={styles.div_total_material}>
					Custo total previsto de matéria prima/serviço{' '}
					<span>{totalMaterial}</span>
				</div>
			) : (
				''
			)}
			{msg && <Message msg={msg} width='100%' />}
		</div>
	)
}
