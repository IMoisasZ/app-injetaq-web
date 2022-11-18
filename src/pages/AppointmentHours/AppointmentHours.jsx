/** @format */

import React, { useState, useEffect } from 'react'
import Container from '../../components/container/Container'
import MyForm from '../../components/itensForm/form/Form'
import MyInput from '../../components/itensForm/input/Input'
import MyTextArea from '../../components/itensForm/textArea/MyTextArea'
import MySelect from '../../components/itensForm/select/Select'
import MyButton from '../../components/itensForm/button/Button'
import api from '../../api/api'
import styles from './Appointment.module.css'

export default function AppointmentHours() {
	const [date, setDate] = useState('')
	const [employee, setEmployee] = useState('')
	const [listEmployee, setListEmployee] = useState([])
	const [workstation, setWorkstation] = useState('')
	const [listWorkstation, setListWorkstation] = useState([])
	const [di, setDi] = useState('')
	const [listDi, setListDi] = useState([])
	const [position, setPosition] = useState('')
	const [timeStart, setTimeStart] = useState('')
	const [timeInterval, setTimeInterval] = useState('')
	const [timeFinish, setTimeFinish] = useState('')
	const [timeTotal, setTimeTotal] = useState('')

	const allEmployee = async () => {
		const response = await api.get('employee')
		setListEmployee(response.data)
	}

	const allWorkstation = async () => {
		const response = await api.get('workstation')
		setListWorkstation(response.data)
	}

	const allDI = async () => {
		const response = await api.get('di')
		setListDi(response.data)
	}

	useEffect(() => {
		allEmployee()
		allWorkstation()
		allDI()
	}, [])

	const calcTime = () => {
		const start = timeStart.slice(0, 2)
		const restStart = timeStart.slice(3, 5)
		const newStart = Number(restStart) / 60

		const interval = timeInterval.slice(0, 2)
		const restInterval = timeInterval.slice(3, 5)
		const newInterval = Number(restInterval) / 60

		const finish = timeFinish.slice(0, 2)
		const restFinish = timeFinish.slice(3, 5)
		const newFinish = Number(restFinish) / 60

		const result =
			finish - start - interval + newStart + newInterval + newFinish

		return result
	}
	console.log(calcTime())

	return (
		<Container nameHeader='Apontamento de Horas'>
			<MyForm>
				<div className={styles.style_date_employee_workstation}>
					<div>
						<MyInput
							name='date'
							nameLabel='Data'
							placeHolder='Digite a data do apontamento'
							type='date'
							value={date}
							handleOnchange={(e) => setDate(e.currentTarget.value)}
						/>
					</div>
					<div>
						<MySelect
							name='employee'
							nameLabel='Código do funcionário'
							value={employee}
							handleOnChange={(e) => setEmployee(e.currentTarget.value)}
							title={'number'}
						>
							<option value=''>Selecione um funcionário...</option>
							{listEmployee.map((employee) => {
								return (
									<>
										<option key={employee.id} value={employee.id}>
											{employee.id}
										</option>
									</>
								)
							})}
						</MySelect>
						{employee ? (
							<p className={styles.style_name_fields}>
								{
									listEmployee.find(
										(selected) => selected.id === Number(employee)
									).description
								}
							</p>
						) : (
							''
						)}
					</div>
					<div>
						<MySelect
							name='workstation'
							nameLabel='Código do posto'
							value={workstation}
							handleOnChange={(e) => setWorkstation(e.currentTarget.value)}
						>
							<option value=''>Selecione um posto...</option>
							{listWorkstation.map((workstation) => {
								return (
									<>
										<option key={workstation.id} value={workstation.id}>
											{workstation.id}
										</option>
									</>
								)
							})}
						</MySelect>
						{workstation ? (
							<p className={styles.style_name_fields}>
								{
									listWorkstation.find(
										(selected) => selected.id === Number(workstation)
									).description
								}
							</p>
						) : (
							''
						)}
					</div>
				</div>
				<di>
					<MySelect
						name='di'
						nameLabel='DI'
						value={di}
						handleOnChange={(e) => setDi(e.currentTarget.value)}
					>
						<option value=''>Selecione uma DI...</option>
						{listDi.map((di) => {
							return (
								<>
									<option key={di.id} value={di.id}>
										{di.di}
									</option>
								</>
							)
						})}
					</MySelect>
					{di ? (
						<div className={styles.style_di}>
							<div className={styles.style_di_column}>
								<p>
									<span>OP: </span>
									{listDi.find((selected) => selected.id === Number(di)).op}
								</p>
								<p>
									<span>Descrição: </span>
									{
										listDi.find((selected) => selected.id === Number(di))
											.description
									}
								</p>
							</div>
							<div className={styles.style_di_column}>
								<p>
									<span>Numero: </span>
									{listDi.find((selected) => selected.id === Number(di)).number}
								</p>
								<p>
									<span>Nome: </span>
									{
										listDi.find((selected) => selected.id === Number(di))
											.part_name
									}
								</p>
							</div>
							<div className={styles.style_di_column}>
								<p>
									<span>Numero Peça: </span>
									{
										listDi.find((selected) => selected.id === Number(di))
											.part_number
									}
								</p>
								<p>
									<span>Cliente: </span>
									{
										listDi.find((selected) => selected.id === Number(di)).client
											.description
									}
								</p>
							</div>
						</div>
					) : (
						''
					)}
				</di>
				<div className={styles.style_text_area}>
					<MyTextArea
						name='position'
						nameTextArea='Posição'
						placeHolder='Digite uma posição...'
						handleOnChange={(e) => setPosition(e.target.value)}
						value={position}
					/>
				</div>
				<div className={styles.style_fields_time}>
					<div>
						<MyInput
							name='start'
							nameLabel='Inicio'
							placeHolder='Inicio...'
							type='time'
							value={timeStart}
							handleOnchange={(e) => setTimeStart(e.currentTarget.value)}
						/>
					</div>
					<div>
						<MyInput
							name='interval'
							nameLabel='Intervalo'
							placeHolder='Intervalo...'
							type='time'
							value={timeInterval}
							handleOnchange={(e) => setTimeInterval(e.currentTarget.value)}
						/>
					</div>
					<div>
						<MyInput
							name='finish'
							nameLabel='Termino'
							placeHolder='Termino...'
							type='time'
							value={timeFinish}
							handleOnchange={(e) => setTimeFinish(e.currentTarget.value)}
						/>
					</div>
					<div>
						<MyInput
							name='total'
							nameLabel='Total'
							placeHolder='Total...'
							type='text'
							value={timeTotal}
							handleOnchange={(e) => setTimeTotal(e.currentTarget.value)}
							readOnly={true}
						/>
					</div>
				</div>
			</MyForm>
		</Container>
	)
}
