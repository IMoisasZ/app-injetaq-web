/** @format */

import React, { useState, useEffect } from 'react'
import MyContainer from '../../components/container/Container'
import MyForm from '../../components/itensForm/form/Form'
import MyRow from '../../components/itensForm/row/Row'
import MyInput from '../../components/itensForm/input/Input'
import MySelect from '../../components/itensForm/select/Select'
import MyButton from '../../components/itensForm/button/Button'
import Message from '../../components/message/Message'
import api from '../../api/api'

export default function DI() {
	// usestate
	const [di, setDI] = useState('')
	const [op, setOP] = useState('')
	const [description, setDescription] = useState('')
	const [number, setNumber] = useState('')
	const [partName, setPartName] = useState('')
	const [partNumber, setPartNumber] = useState('')
	const [client, setClient] = useState('Selecione um cliente...')
	const [listClient, setListClient] = useState([])
	const [start, setStart] = useState('')
	const [finish, setFinish] = useState('')
	const [msg, setMsg] = useState('')

	// all clients
	const allClients = async () => {
		try {
			const response = await api.get('/client')
			setListClient(response.data)
		} catch (error) {
			console.error(error.response.data.error || error.response.data.erros)
		}
	}

	useEffect(() => {
		allClients()
	}, [])

	// create DI
	const createDI = async (e) => {
		e.preventDefault()
		try {
			const newDI = {
				di,
				op,
				description,
				number,
				partName,
				partNumber,
				client,
				start,
				finish,
			}
			await api.post('/di', newDI)
			setMsg({
				msg: 'DI cadastrada com sucesso!',
				typeMsg: 'success',
			})
			setTimeout(() => {
				handleClear()
			}, 2000)
		} catch (error) {
			console.log({ error })
			setMsg({
				msg: error.response.data.error,
				typeMsg: 'error',
			})
			setTimeout(() => {
				setMsg('')
			}, 2000)
		}
	}

	console.log(client)

	const handleClear = () => {
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
		setMsg('')
	}

	return (
		<MyContainer nameHeader='Cadastro DI'>
			<MyForm margin='1em 0 0 0' handleOnSubmit={createDI}>
				<MyRow>
					<MyInput
						type='text'
						nameLabel='Incluido por'
						name='incluidoPor'
						placeHolder='Incluído por'
						width='15em'
						readOnly={true}
					/>
					<MyInput
						type='text'
						nameLabel='Data inclusão'
						name='dataInclusao'
						placeHolder='Data inclusão'
						width='10em'
						readOnly={true}
					/>
					<MyInput
						type='text'
						nameLabel='Alterado por'
						name='alteradoPor'
						placeHolder='Alterado por'
						width='15em'
						readOnly={true}
					/>
					<MyInput
						type='text'
						nameLabel='Data alteração'
						name='dataAlteracao'
						placeHolder='Data alteração'
						width='10em'
						readOnly={true}
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
					/>
				</MyRow>
				<MyRow>
					<MyInput
						type='text'
						nameLabel='DI'
						name='di'
						placeHolder='DI'
						handleOnchange={(e) => setDI(e.currentTarget.value)}
						value={di}
					/>
					<MyInput
						type='text'
						nameLabel='OP'
						name='op'
						placeHolder='OP'
						handleOnchange={(e) => setOP(e.currentTarget.value)}
						value={op}
					/>
					<MyInput
						type='text'
						nameLabel='Descrição'
						name='descricao'
						placeHolder='Descrição'
						handleOnchange={(e) => setDescription(e.currentTarget.value)}
						value={description}
					/>
					<MyInput
						type='text'
						nameLabel='Numero'
						name='numero'
						placeHolder='Numero'
						handleOnchange={(e) => setNumber(e.currentTarget.value)}
						value={number}
					/>
				</MyRow>
				<MyRow>
					<MyInput
						type='text'
						nameLabel='Nome da peça'
						name='nomePeca'
						placeHolder='Nome da peça'
						handleOnchange={(e) => setPartName(e.currentTarget.value)}
						value={partName}
					/>
					<MyInput
						type='text'
						nameLabel='Numero da peça'
						name='numeroPeca'
						placeHolder='Numero da peça'
						handleOnchange={(e) => setPartNumber(e.currentTarget.value)}
						value={partNumber}
					/>
				</MyRow>
				<MyRow>
					<MySelect
						name='cliente'
						nameLabel='Cliente'
						value={client}
						handleOnChange={(e) => setClient(e.target.value)}
					>
						{listClient.map((client) => {
							return (
								<option key={client.id} value={client.id}>
									{client.description}
								</option>
							)
						})}
					</MySelect>
					<MyInput
						type='date'
						nameLabel='Data de início'
						name='inicio'
						placeHolder='Data de início'
						width='90%'
						handleOnchange={(e) => setStart(e.currentTarget.value)}
						value={start}
					/>
					<MyInput
						type='date'
						nameLabel='Data de término'
						name='termino'
						placeHolder='Data de término'
						width='90%'
						handleOnchange={(e) => setFinish(e.currentTarget.value)}
						value={finish}
					/>
					<MyButton type='submit' nameButton='Incluir' />
				</MyRow>
				{msg && <Message msg={msg} />}
			</MyForm>
		</MyContainer>
	)
}
