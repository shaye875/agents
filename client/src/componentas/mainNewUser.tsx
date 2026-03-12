import { useState } from "react"
import type { Option } from "../types/types"
import Select from 'react-select'


function MainNewUser() {
    const [answer, setAnswer] = useState<string | undefined>(undefined)
    const [agentCode, setAgentCode] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")
    const [role, setRole] = useState<Option|null>({
        label: "",
        value: ""
    })
    const [password, setPassword] = useState<string>("")
    async function postUser(): Promise<void> {
        const res = await fetch("http://localhost:3000/admin/users", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                token: String(localStorage.getItem("token"))
            },
            body: JSON.stringify({
                agentCode: agentCode,
                fullName: fullName,
                role: role?.value,
                password: password
            })
        })
        const result: object = await res.json()
            setAnswer(JSON.stringify(result))


    }
    const optionRole: Option[] = [
        { value: "admin", label: "admin" },
        { value: "agent", label: "agent" }
    ]


    return (
        <div id="man">
            <div>
                <p>category:</p>
                <Select id="sel"
                    defaultValue={role}
                    onChange={setRole}
                    options={optionRole}
                />
            </div>
            <div>
                <p>agent code:</p>
                <input id="sel" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setAgentCode(e.target.value)} />
            </div>
            <div>
                <p>full name:</p>
                <input id="sel" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setFullName(e.target.value)} />

            </div>
            <div>
                <p>password(optionly):</p>
                <input id="sel" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setPassword(e.target.value)} />
            </div>
            <button className="bta" onClick={() => {
                postUser()
            }}>submit</button>
            <h4 id="ans">{answer}</h4>
        </div>
    )
}

export default MainNewUser
