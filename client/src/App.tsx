

import './App.css'
import Login from './pages/login'

import { BrowserRouter, Route, Routes } from 'react-router'
import Agent from './pages/agent'
import NewReport from './pages/newReport'
import CsvReport from './pages/csvReport'
import ReportsAgent from './pages/reports.Agent'
import Admin from './pages/admin'
import Users from './pages/users'
import NewUswr from './pages/newUswr'
import AdminReport from './pages/adminReport'





function App() {


  return (
    <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/agent' element={

            <Agent />

          } />


          <Route path='/newreport' element={
            <NewReport />

          } />
          <Route path='/reportcsv' element={

            <CsvReport />

          } />
          <Route path='/agent/reports' element={

            <ReportsAgent />
          } />
          <Route path='/admin' element={<Admin />} />
          <Route path='/users' element={<Users />} />
          <Route path='/newuser' element={<NewUswr />} />
          <Route path='/admin/reports' element={<AdminReport />} />


        </Routes>
  
    </BrowserRouter>
  )
}

export default App