import { useContext, useState } from "react"
import { UseContext } from "../App"
import { useNavigate } from "react-router"

function MainLogin() {
    const negativ = useNavigate()
    const { role, setRole ,setUser} = useContext(UseContext)
    const [agentCode, setAgentCode] = useState("")
    const [password, setPassword] = useState("")
    const [inSide, setInside] = useState(true)
    async function fetchLogin(agentCode: string, password: string) {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                agentCode: agentCode,
                password: password
            })
        })
        const result = await res.json()
        if (result.token) {
            setInside(true)
            while (localStorage.getItem("token") !== result.token) {
                localStorage.setItem("token", result.token)
            }
            const res = await fetch("http://localhost:3000/auth/me", {
                method: "GET",
                headers: { token: localStorage.getItem("token") }
            })
            const user = await res.json()
                setRole(user.role) 
                setUser(user)  
            if(user.role === "agent"){
                negativ("/agent")
            }    
        } else {
            setInside(false)
        }
    }
    return (
        <div>
            <h1>welcome</h1>
            <div>
                <p>Agent code:</p>
                <input type="password" onChange={(e) => setAgentCode(e.target.value)} />
            </div>
            <div>
                <p>password:</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={() => {
                fetchLogin(agentCode, password)
        
            }}>submit</button>
            {!inSide && <h4>wrong!!! try agein</h4>}
        </div>
    )
}

export default MainLogin
