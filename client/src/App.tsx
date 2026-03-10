import { createContext, useState } from 'react'
import './App.css'
import Login from './pages/login'
import type { ContextType, UserType } from './types/types'
import { BrowserRouter, Route, Routes } from 'react-router'
import Agent from './pages/agent'

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
        </Routes>
      </UseContext>
    </BrowserRouter>
  )
}

export default App
