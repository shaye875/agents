import { createContext, useState } from 'react'
import './App.css'
import Login from './pages/login'
import type { ContextType, UserType } from './types/types'
import { BrowserRouter, Route, Routes } from 'react-router'
import Agent from './pages/agent'
import NewReport from './pages/newReport'
import CsvReport from './pages/csvReport'
import ReportsAgent from './pages/reports.Agent'
import Admin from './pages/admin'
import Users from './pages/users'
import NewUswr from './pages/newUswr'
import AdminReport from './pages/adminReport'

export const UseContext = createContext<ContextType | UserType | undefined>(undefined)

function App() {
  const [role, setRole] = useState<string>("")
  const [user, setUser] = useState<UserType>({
    role: "",
    fullName: "",
    id: "",
    agentCode: ""
  })
  return (
    <BrowserRouter>
      <UseContext value={{ role, setRole, user, setUser }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/agent' element={<Agent/>}/>
          <Route path='/newreport' element={<NewReport />}/> 
          <Route path='/reportcsv' element={<CsvReport />}/>
          <Route path='/agent/reports' element={<ReportsAgent />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/users' element={<Users />}/> 
          <Route path='/newuser' element={<NewUswr />}/> 
          <Route path='/admin/reports' element={<AdminReport />}/>
             </Routes>
      </UseContext>
    </BrowserRouter>
  )
}

export default App
