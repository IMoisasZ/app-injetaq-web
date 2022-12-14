/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */

import React, { useState, useEffect } from 'react'
import MyContainer from '../../../components/container/Container'
import Mytab from '../../../components/tab/Tab'
import Tab from 'react-bootstrap/Tab'
import MyForm from '../../../components/itensForm/form/Form'
import MyInput from '../../../components/itensForm/input/Input'
import MySelect from '../../../components/itensForm/select/Select'
import MyButton from '../../../components/itensForm/button/Button'
import Message from '../../../components/message/Message'
import DIHours from '../DIHours/DIHours'
import DIMaterial from '../DIMaterial/DIMaterial'
import ModalListDI from './ModalListDI'
import ModalRefreshDI from '../RefreshDI/ModalRefreshDI'
import api from '../../../api/api'
import styles from './DI.module.css'
import { formatDate, formatDateBr } from '../../../utils/formatDate'
import {
	formatNumberCurrency,
	formatNumberDecimal,
} from '../../../utils/formatNumber'
import DITotal from './DITotal'
import DIComment from '../DIComment/DIComment'

export default function DI() {
	// usestate
	const [diId, setDIId] = useState('')
	const [di, setDI] = useState('')
	const [listDI, setListDI] = useState([])
	const [op, setOP] = useState('')
	const [description, setDescription] = useState('')
	const [number, setNumber] = useState('')
	const [partName, setPartName] = useState('')
	const [partNumber, setPartNumber] = useState('')
	const [client, setClient] = useState('')
	const [listClient, setListClient] = useState([])
	const [start, setStart] = useState('')
	const [finish, setFinish] = useState('')
	const [status, setStatus] = useState('')
	const [msg, setMsg] = useState('')
	const [disable, setDisable] = useState(false)
	const [dataDI, setDataDI] = useState({})
	const [visible, setVisible] = useState('none')
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [loadDI, setLoadDI] = useState('')
	const [totalHours, setTotalHours] = useState('0,00')
	const [totalMaterial, setTotalMaterial] = useState('R$ 0,00')

	// useState di hours
	const [listDIHours, setListDIHours] = useState([])

	// useState di hours
	const [listDIMaterial, setListDIMaterial] = useState([])

	// useState di comment
	const [listComment, setListComment] = useState([])

	// all clients
	const allClients = async () => {
		try {
			const response = await api.get('/client')
			setListClient(response.data)
		} catch (error) {
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			console.error(error.response.data.error)
		}
	}

	// all di's
	const allDI = async () => {
		const response = await api.get('di')
		setListDI(response.data)
	}

	useEffect(() => {
		allClients()
		allDI()
	}, [])

	// show the selected di
	const diSelected = (loadDI) => {
		if (loadDI) {
			setDIId(loadDI.id)
			setDI(loadDI.di)
			setOP(loadDI.op)
			setDescription(loadDI.description)
			setNumber(loadDI.number)
			setPartName(loadDI.partName)
			setPartNumber(loadDI.partNumber)
			setClient(loadDI.client_id)
			setStart(formatDate(loadDI.start))
			setFinish(formatDate(loadDI.start))
			setStatus(loadDI.status)
			setDataDI({
				createdBy: 'Moises',
				createdAt: formatDateBr(loadDI.createdAt),
				updatedBy: 'Moises',
				updatedAt: formatDateBr(loadDI.updatedAt),
			})
			setVisible('block')
			setDisable(true)
			setNameBtn('Editar')
		} else {
			setDisable(false)
			setVisible('none')
			setNameBtn('Incluir')
		}
	}

	// load di selected all the time when the function diSelected was change
	useEffect(() => {
		diSelected(loadDI)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadDI])

	// show di created
	const showDICreated = (data) => {
		setDIId(data.id)
		setDI(data.di)
		setOP(data.op)
		setDescription(data.description)
		setNumber(data.number)
		setPartName(data.partName)
		setPartNumber(data.partNumber)
		setClient(data.client_id)
		setStart(formatDate(data.start))
		setFinish(formatDate(data.finish))
		setStatus(data.status)

		setDataDI({
			createdBy: 'Moises',
			createdAt: formatDateBr(data.createdAt),
			updatedBy: 'Moises',
			updatedAt: formatDateBr(data.updatedAt),
		})
	}

	// create DI
	const createDI = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Incluir') {
			try {
				const newDI = await api.post('/di', {
					op,
					description,
					number,
					part_name: partName,
					part_number: partNumber,
					client_id: client,
					start,
					finish,
					status: 'EM EXECU????O',
					user_id: 1,
				})
				showDICreated(newDI.data)
				setMsg({
					msg: 'DI cadastrada com sucesso!',
					typeMsg: 'success',
				})
				setTimeout(() => {
					setMsg('')
				}, 2000)
				allDI()
				setDisable(true)
				setVisible('block')
			} catch (error) {
				console.error({ error })
				setMsg({
					msg: error.response.data.error,
					typeMsg: 'error',
				})
				setTimeout(() => {
					setMsg('')
				}, 2000)
			}
		} else {
			try {
				const alterDI = await api.patch('/di', {
					id: diId,
					di,
					op,
					description,
					number,
					partName,
					partNumber,
					client_id: client,
					start,
					finish,
					status: 'EM EXECU????O',
					user_id: 1,
				})
				showDICreated(alterDI.data)
				setMsg({
					msg: 'DI alterada com sucesso!',
					typeMsg: 'warning',
				})
				setTimeout(() => {
					setMsg('')
				}, 2000)
				allDI()
				setDisable(true)
				setVisible('block')
			} catch (error) {
				console.error({ error })
				setMsg({
					msg: error.response.data.error,
					typeMsg: 'error',
				})
				setTimeout(() => {
					setMsg('')
				}, 2000)
			}
		}
	}

	// handle clear
	const handleClear = () => {
		setDIId('')
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
		setStatus('')
		setMsg('')
		setVisible('none')
		setNameBtn('Incluir')
		setDisable(false)
		setLoadDI('')
		allClients()
		totalGeralHours()
	}

	// ----------------------------------di hours-----------------------------------------------------
	// allDI hours
	const allDIHours = async () => {
		try {
			const response = await api.get(`di_hours/hours/${Number(diId)}`)
			setListDIHours(response.data)
		} catch (error) {
			setMsg({
				msg: error.response.data.error || error.response.data.erros,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
			console.error({ error })
		}
	}

	const totalGeralCustoHoras = () => {
		let costTotal = listDIHours.reduce((count, act) => {
			return count + act.price * act.quantity
		}, 0)
		return formatNumberCurrency(costTotal.toString())
	}

	const totalGeralHours = async () => {
		const total = await api.get(`di_hours/sum/${Number(diId)}`)
		setTotalHours(
			total.data[0].total_hours === null
				? '0,00'
				: formatNumberDecimal(total.data[0].total_hours)
		)
	}

	useEffect(() => {
		totalGeralHours()
		allDIHours()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [diId])

	// ----------------------------------di material-----------------------------------------------------
	// allDI material
	const allDIMaterial = async () => {
		try {
			const response = await api.get(`di_material/material/${Number(diId)}`)
			setListDIMaterial(response.data)
		} catch (error) {
			setMsg({
				msg: error.response.data.error || error.response.data.erros,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
			console.error({ error })
		}
	}

	const totalGeralMaterial = async () => {
		const total = await api.get(`di_material/sum/${Number(diId)}`)
		setTotalMaterial(
			total.data[0].total_material === null
				? 'R$ 0,00'
				: formatNumberCurrency(total.data[0].total_material)
		)
	}

	useEffect(() => {
		totalGeralMaterial()
		allDIMaterial()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [diId])

	// ----------------------------------di comments-----------------------------------------------------
	// all comments
	const allComments = async () => {
		const response = await api.get(`comment_di/di/${Number(diId)}`)
		setListComment(response.data)
	}

	useEffect(() => {
		allComments()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [diId])

	return (
		<MyContainer nameHeader={di ? `DI ${di}` : 'Cadastro DI'}>
			<Mytab>
				<Tab eventKey='di' title='DI'>
					<MyForm margin='1em 0 0 0' handleOnSubmit={createDI}>
						<div className={styles.btns_di}>
							<div className={styles.div_btns}>
								<MyButton
									nameButton='Nova DI'
									handleOnClick={handleClear}
									width='5em'
									type='button'
									btnType='text'
								/>
								<ModalListDI
									data={listDI}
									load={setLoadDI}
									allClients={listClient}
								/>
								<MyButton
									nameButton='Habilitar Edi????o'
									handleOnClick={() => {
										setDisable(false)
										setNameBtn('Editar')
									}}
									width='5em'
									variant='warning'
									type='button'
									display={visible}
									btnType='text'
									disabled={status !== 'CANCELADA' ? false : true}
								/>
							</div>
							<div>
								{di && (
									<ModalRefreshDI
										di={di}
										status={status}
										diId={diId}
										setStatus={setStatus}
										allDI={allDI}
									/>
								)}
							</div>
						</div>
						<div className={styles.div_fixed_fields}>
							<MyInput
								type='text'
								nameLabel='Incluido por'
								name='incluidoPor'
								placeHolder='Inclu??do por'
								width='15em'
								readOnly={true}
								value={di && dataDI.createdBy}
							/>
							<MyInput
								type='text'
								nameLabel='Data inclus??o'
								name='dataInclusao'
								placeHolder='Data inclus??o'
								width='10em'
								readOnly={true}
								value={di && dataDI.createdAt}
							/>
							<MyInput
								type='text'
								nameLabel='Alterado por'
								name='alteradoPor'
								placeHolder='Alterado por'
								width='15em'
								readOnly={true}
								value={di && dataDI.updatedBy}
							/>
							<MyInput
								type='text'
								nameLabel='Data altera????o'
								name='dataAlteracao'
								placeHolder='Data altera????o'
								width='10em'
								readOnly={true}
								value={di && dataDI.updatedAt}
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
								value={status}
							/>
						</div>
						<div className={styles.div_fields_di}>
							<div className={styles.di}>
								<MyInput
									type='text'
									nameLabel='DI'
									name='di'
									placeHolder='DI'
									handleOnchange={(e) => setDI(e.currentTarget.value)}
									value={di}
									readOnly={true}
								/>
							</div>

							<div className={styles.op}>
								<MyInput
									type='text'
									nameLabel='OP'
									name='op'
									placeHolder='OP'
									handleOnchange={(e) => setOP(e.currentTarget.value)}
									value={op}
									readOnly={disable}
								/>
							</div>

							<div className={styles.description}>
								<MyInput
									type='text'
									nameLabel='Descri????o'
									name='descricao'
									placeHolder='Descri????o'
									handleOnchange={(e) => setDescription(e.currentTarget.value)}
									value={description}
									readOnly={disable}
								/>
							</div>
							<div className={styles.number}>
								<MyInput
									type='text'
									nameLabel='Numero'
									name='numero'
									placeHolder='Numero'
									handleOnchange={(e) => setNumber(e.currentTarget.value)}
									value={number}
									readOnly={disable}
								/>
							</div>
						</div>
						<div className={styles.div_fields_di}>
							<MyInput
								type='text'
								nameLabel='Nome da pe??a'
								name='nomePeca'
								placeHolder='Nome da pe??a'
								handleOnchange={(e) => setPartName(e.currentTarget.value)}
								value={partName}
								margin='0 1em 0 0'
								readOnly={disable}
							/>
							<MyInput
								type='text'
								nameLabel='Numero da pe??a'
								name='numeroPeca'
								placeHolder='Numero da pe??a'
								handleOnchange={(e) => setPartNumber(e.currentTarget.value)}
								value={partNumber}
								readOnly={disable}
							/>
						</div>
						<div className={styles.div_fields_di}>
							<MySelect
								name='cliente'
								nameLabel='Cliente'
								value={client}
								handleOnChange={(e) => setClient(e.target.value)}
								readOnly={disable}
								margin='0 0 0.5em 0'
							>
								<option value='' disabled={disable}>
									Selecione um cliente...
								</option>
								{listClient.map((client) => {
									return (
										<option
											key={client.id}
											value={client.id}
											disabled={disable}
										>
											{client.description}
										</option>
									)
								})}
							</MySelect>

							<MyInput
								type='date'
								nameLabel='Data de in??cio'
								name='inicio'
								placeHolder='Data de in??cio'
								handleOnchange={(e) =>
									setStart(formatDate(e.currentTarget.value))
								}
								value={start}
								margin='0 1em'
								readOnly={disable}
							/>

							<MyInput
								type='date'
								nameLabel='Data de t??rmino'
								name='termino'
								placeHolder='Data de t??rmino'
								handleOnchange={(e) =>
									setFinish(formatDate(e.currentTarget.value))
								}
								value={finish}
								margin='0 2em 0 0'
								readOnly={disable}
							/>

							<MyButton
								type='submit'
								nameButton={nameBtn}
								variant={nameBtn === 'Incluir' ? 'primary' : 'warning'}
								btnType='text'
								disabled={status !== 'CANCELADA' ? false : true}
							/>
						</div>
					</MyForm>
					<DITotal
						totalHours={totalHours}
						totalCostHrs={totalGeralCustoHoras}
						totalMaterial={totalMaterial}
					/>
					{msg && <Message msg={msg} margin='0.5em 0 0 0' width='100%' />}
				</Tab>
				<Tab eventKey='di_horas' title='DI Horas'>
					<DIHours
						di={di}
						di_id={diId}
						status={status}
						listDIHours={listDIHours}
						allDIHours={allDIHours}
						totalGeralHours={totalGeralHours}
						totalHours={totalHours}
						totalCostHrs={totalGeralCustoHoras}
					/>
				</Tab>
				<Tab eventKey='di_material' title='DI Material'>
					<DIMaterial
						di={di}
						di_id={diId}
						status={status}
						listDIMaterial={listDIMaterial}
						allDIMaterial={allDIMaterial}
						totalGeralMaterial={totalGeralMaterial}
						totalMaterial={totalMaterial}
					/>
				</Tab>
				<Tab eventKey='comment' title='Comentarios DI'>
					<DIComment
						di={di}
						di_id={diId}
						status={status}
						data={listComment}
						allComments={allComments}
					/>
				</Tab>
			</Mytab>
		</MyContainer>
	)
}
