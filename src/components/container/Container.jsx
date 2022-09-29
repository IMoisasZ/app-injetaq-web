import Container from 'react-bootstrap/Container'
import MyRow from '../itensForm/row/Row'
import MyCol from '../container/Col'
import Header from '../../components/header/Header'
import styles from './Container.module.css'

export default function MyContainer({ children, nameHeader }) {
	return (
		<Container className={styles.container}>
			<Header>{nameHeader}</Header>

			<MyRow>
				<MyCol>{children}</MyCol>
			</MyRow>
		</Container>
	)
}
