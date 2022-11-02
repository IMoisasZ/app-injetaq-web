/** @format */

import React from 'react'
import Card from 'react-bootstrap/Card'
import ModalCommentDI from './ModalCommentDI'
import { formatDateBrWithHour } from '../../../utils/formatDate'
import styles from './DIComment.module.css'

export default function Comment({
	data,
	di,
	status,
	allComments,
	filterComments,
}) {
	// user logged
	const userName = 'MOISES'

	// filter comments
	const newData =
		filterComments !== 'Todos'
			? data.filter((it) => it.user.name === userName)
			: data

	return (
		<div>
			{newData.map((comm, index) => {
				return (
					<Card
						border={comm.user.name === userName ? 'primary' : 'secondary'}
						style={{ width: '100%', marginBottom: '1em' }}
						key={index}
					>
						<Card.Body
							className={index % 2 === 0 ? styles.fill : styles.transparent}
						>
							<div className={styles.comments}>
								<Card.Title>Data: {formatDateBrWithHour(comm.date)}</Card.Title>
								<Card.Title>Usuário: {userName}</Card.Title>
							</div>
							<div className={styles.comments}>
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
