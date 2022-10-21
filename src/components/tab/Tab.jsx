/** @format */
import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'

export default function MyTab({ defaultTab = 'di', children }) {
	const [key, setKey] = useState(defaultTab)
	return (
		<Tabs
			defaultActiveKey='profile'
			id='justify-tab-example'
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className='mb-3'
			justify
			style={{ marginTop: '1em' }}
		>
			{children}
			{/* <Tab eventKey='home' title='Home' active>
				<Sonnet />
			</Tab>
			<Tab eventKey='profile' title='Profile'>
				<Sonnet />
			</Tab>
			<Tab eventKey='longer-tab' title='Loooonger Tab'>
				<Sonnet />
			</Tab>
			<Tab eventKey='contact' title='Contact' disabled>
				<Sonnet />
			</Tab> */}
		</Tabs>
	)
}
