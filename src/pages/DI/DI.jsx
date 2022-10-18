import React from 'react'
import MyContainer from '../../components/container/Container'
import MyForm from '../../components/itensForm/form/Form'
import MyRow from '../../components/itensForm/row/Row'
import MyInput from '../../components/itensForm/input/Input'
import MySelect from '../../components/itensForm/select/Select'
import MyButton from '../../components/itensForm/button/Button'

export default function DI() {
	return (
		<MyContainer nameHeader='Cadastro DI'>
			<MyForm margin='1em 0 0 0'>
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
					<MyInput type='text' nameLabel='DI' name='di' placeHolder='DI' />
					<MyInput type='text' nameLabel='OP' name='op' placeHolder='OP' />
					<MyInput
						type='text'
						nameLabel='Descrição'
						name='descricao'
						placeHolder='Descrição'
					/>
					<MyInput
						type='text'
						nameLabel='Numero'
						name='numero'
						placeHolder='Numero'
					/>
				</MyRow>
				<MyRow>
					<MyInput
						type='text'
						nameLabel='Nome da peça'
						name='nomePeca'
						placeHolder='Nome da peça'
					/>
					<MyInput
						type='text'
						nameLabel='Numero da peça'
						name='numeroPeca'
						placeHolder='Numero da peça'
					/>
				</MyRow>
				<MyRow>
					<MySelect
						name='cliente'
						nameLabel='Cliente'
						defaultValue='Cliente...'
					>
						{'data'}
					</MySelect>
					<MyInput
						type='date'
						nameLabel='Data de início'
						name='inicio'
						placeHolder='Data de início'
						width='90%'
					/>
					<MyInput
						type='date'
						nameLabel='Data de término'
						name='termino'
						placeHolder='Data de término'
						width='90%'
					/>
					<MyButton type='submit' nameButton='Incluir' />
				</MyRow>
			</MyForm>
		</MyContainer>
	)
}
