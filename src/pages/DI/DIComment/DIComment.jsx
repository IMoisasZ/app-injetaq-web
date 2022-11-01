/** @format */

import React from 'react'
import MyInput from '../../../components/itensForm/input/Input'
import ModalCommentDI from './ModalCommentDI'
import Comment from './Comment'

export default function DIComment({ di_id, di, status, data, allComments }) {
	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
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
			<div
				style={{
					margin: '0 0 1em 0',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<ModalCommentDI
					di={di}
					diId={di_id}
					status={status}
					allComments={allComments}
				/>
			</div>
			<div
				style={{ overflowY: 'scroll', height: '30em', padding: '0.5em 1em' }}
			>
				<Comment
					di_id={di_id}
					data={data}
					di={di}
					status={status}
					allComments={allComments}
				/>
			</div>
		</>
	)
}
