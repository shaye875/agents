import { useEffect, useState } from "react"
import type { User } from "../types/types"
import { useNavigate } from "react-router"


function MainUsers() {
    const negativ = useNavigate()
    const [users, setUsers] = useState<User[] | null>(null)
    async function getUsers(): Promise<void> {
        const res = await fetch("http://localhost:3000/admin/users", {
            method: "GET",
            headers: { token: String(localStorage.getItem("token")) }
        })
        const data = await res.json()
        if (res.ok) {
            setUsers(data)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div id="mau">
            <button id="bnw" className="bta" onClick={() => {
                negativ("/newuser")
            }}>new</button>
            <table id="tus">
                <tr>
                    <th>id</th>
                    <th>agentCode</th>
                    <th>fullName</th>
                    <th>passwordHash</th>
                    <th>role</th>
                    <th>createdAt</th>
                </tr>
                {users != null && users.map((item: User) => {
                    return (

                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.agentCode}</td>
                            <td>{item.fullName}</td>
                            <td>{item.passwordHash}</td>
                            <td>{item.role}</td>
                            <td>{item.createdAt}</td>
                        </tr>

                    )
                })}
            </table>
        </div>
    )
}

export default MainUsers
