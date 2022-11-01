/** @format */

import React from 'react'
import Card from 'react-bootstrap/Card'
import ModalCommentDI from './ModalCommentDI'

export default function Comment({ data, di, status, allComments }) {
	const formatDateBr = (date) => {
		const dt = new Date(date)
		const day = dt.getDate() < 9 ? `0${dt.getDate()}` : dt.getDate()
		const month =
			dt.getMonth() + 1 < 9 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1
		const year = dt.getFullYear()
		return `${day}/${month}/${year} - ${
			dt.getHours() < 9 ? `0${dt.getHours()}` : dt.getHours()
		}:${dt.getMinutes() < 9 ? `0${dt.getMinutes()}` : dt.getMinutes()}:${
			dt.getSeconds() < 9 ? `0${dt.getSeconds()}` : dt.getSeconds()
		}`
	}

	const userName = 'MOISES'

	return (
		<div>
			{data.map((comm, index) => {
				return (
					<Card
						border={comm.user.name === userName ? 'primary' : 'secondary'}
						style={{ width: '100%', marginBottom: '1em' }}
						key={index}
					>
						<Card.Body
							style={
								index % 2 === 0
									? { backgroundColor: '#dadada', cursor: 'pointer' }
									: { backgroundColor: 'transparent', cursor: 'pointer' }
							}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Card.Title>Data: {formatDateBr(comm.date)}</Card.Title>
								<Card.Title>Usuário: {userName}</Card.Title>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Card.Text>{comm.comment}</Card.Text>
								{comm.user.name === userName ? (
									<ModalCommentDI
										btn='2'
										dataEdit={comm}
										di={di}
										status={status}
										allComments={allComments}
									/>
								) : (
									''
								)}
							</div>
						</Card.Body>
					</Card>
				)
			})}
		</div>
	)
}
