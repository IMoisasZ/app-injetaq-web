/** @format */

import Table from 'react-bootstrap/Table'
import styles from './Table.module.css'

export default function MyTable({ header, children, numCol = 2 }) {
	return (
		<div className={styles.container}>
			<Table striped bordered hover className={styles.table_container}>
				<thead className={styles.header_table}>
					<tr>
						{header.map((it, index) => {
							return it === 'Ações' ? (
								<th key={index} colSpan={numCol}>
									{it}
								</th>
							) : (
								<th key={index}>{it}</th>
							)
						})}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</Table>
		</div>
	)
}
