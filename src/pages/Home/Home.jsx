import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/Container'

export default function Home() {
	return (
		<Container nameHeader='Home'>
			<ul>
				<Link to='/'>
					<li>Home</li>
				</Link>
				<Link to='/client'>
					<li>Cliente</li>
				</Link>
				<Link to='/sector'>
					<li>Setor</li>
				</Link>
			</ul>
		</Container>
	)
}
