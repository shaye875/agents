import { createContext, useState } from 'react'
import './App.css'
import Login from './pages/login'
import type { ContextType, UserType } from './types/types'
import { BrowserRouter, Route, Routes } from 'react-router'
import Agent from './pages/agent'
import NewReport from './pages/newReport'

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
        </Routes>
      </UseContext>
    </BrowserRouter>
  )
}

export default App
