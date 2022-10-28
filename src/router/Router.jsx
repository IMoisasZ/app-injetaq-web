/** @format */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Client from '../pages/Client/Client'
import Sector from '../pages/Sector/Sector'
import DI from '../pages/DI/DIMain/DI'
import Operation from '../pages/Operation/Operation'
import User from '../pages/User/User'
import Workstation from '../pages/Workstation/Workstation'
import Employee from '../pages/Employee/Employee'

export default function MyRoutes({ children }) {
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
					<Route path='/workstation' element={<Workstation />} />
					<Route path='/employee' element={<Employee />} />
				</Routes>
				{/* <Footer /> */}
			</Router>
		</>
	)
}
