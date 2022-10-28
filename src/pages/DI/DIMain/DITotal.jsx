/** @format */
import React from 'react'
import styles from './DI.module.css'

export default function DITotal({ totalHours, totalCostHrs }) {
	const cost = totalCostHrs()
	return (
		<div className={styles.total}>
			<div className={styles.prev}>
				<h5>Previsão</h5>
				<p>
					Total Horas: <span>{totalHours}</span>
				</p>
				<p>
					Custo Total Horas: <span>{cost}</span>
				</p>
				<p>
					Custo Total Material: <span></span>
				</p>
				<p>
					Custo Total Previsto: <span></span>
				</p>
			</div>
			<div className={styles.util}>
				<h5>Utilizado</h5>
				<p>Total Horas: 0,00</p>
				<p>Custo Total Horas: R$ 0,00</p>
				<p>Custo Total Material: R$ 0,00</p>
				<p>Custo Total Utilizado: R$ 0,00</p>
			</div>
			<div className={styles.rest}>
				<h5>Saldos</h5>
				<p>Saldo Horas: 0,00</p>
				<p>Saldo Custo Horas: R$ 0,00</p>
				<p>Saldo Custo Material: R$ 0,00</p>
				<p>Saldo Custo Total: R$ 0,00</p>
			</div>
		</div>
	)
}
