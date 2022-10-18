import Container from 'react-bootstrap/Container'
import Header from '../../components/header/Header'
import styles from './Container.module.css'

export default function MyContainer({ children, nameHeader }) {
	return (
		<Container className={styles.container}>
			<Header>{nameHeader}</Header>
			{children}
		</Container>
	)
}
