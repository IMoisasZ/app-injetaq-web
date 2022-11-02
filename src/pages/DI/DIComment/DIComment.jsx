/** @format */

import React, { useState } from 'react'
import MyInput from '../../../components/itensForm/input/Input'
import Form from '../../../components/itensForm/form/Form'
import MyCheckBox from '../../../components/itensForm/checkBox/CheckBox'
import ModalCommentDI from './ModalCommentDI'
import Comment from './Comment'
import styles from './DIComment.module.css'

export default function DIComment({ di_id, di, status, data, allComments }) {
	const [filterComments, setFilterComments] = useState('Todos')
	return (
		<div>
			<div className={styles.data_fixed}>
				<div>
					<MyInput
						name='di_comment'
						nameLabel='DI'
						type='text'
						value={di}
						readOnly={true}
						width='100%'
					/>
				</div>
				<div>
					<MyInput
						name='status_comment_di'
						nameLabel='Status'
						type='text'
						value={status}
						readOnly={true}
						width='100%'
					/>
				</div>
			</div>
			<div className={styles.div_container}>
				<div className={styles.div_comments}>
					<div className={styles.div_filter}>
						<Form
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							width='100%'
							padding='1em 1em'
						>
							<MyCheckBox
								name='all_comments'
								value='Todos'
								labelCheckBox='Todos'
								type='checkbox'
								checked={filterComments === 'Todos' ? true : false}
								handleOnchange={() => setFilterComments('Todos')}
							/>
							<MyCheckBox
								name='my_comments'
								value='Meus Comentarios'
								labelCheckBox='Meus Comentários'
								type='checkbox'
								checked={filterComments === 'Meus Comentarios' ? true : false}
								handleOnchange={() => setFilterComments('Meus Comentarios')}
							/>
						</Form>
					</div>
					<ModalCommentDI
						di={di}
						diId={di_id}
						status={status}
						allComments={allComments}
					/>
				</div>
			</div>
			<div className={styles.comments_container}>
				<Comment
					di_id={di_id}
					data={data}
					di={di}
					status={status}
					allComments={allComments}
					filterComments={filterComments}
				/>
			</div>
		</div>
	)
}
