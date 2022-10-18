import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Client from '../pages/Client/Client'
import Sector from '../pages/Sector/Sector'
import DI from '../pages/DI/DI'
import Operation from '../pages/Operation/Operation'
import User from '../pages/User/User'

function KfpRoutes({ children }) {
	return (
		<>
			<Router>
				{children}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/client' element={<Client />} />
					<Route path='/sector' element={<Sector />} />
					<Route path='/di' element={<DI />} />
					<Route path='/operation' element={<Operation />} />
					<Route path='/user' element={<User />} />
				</Routes>
				{/* <Footer /> */}
			</Router>
		</>
	)
}

export default KfpRoutes
