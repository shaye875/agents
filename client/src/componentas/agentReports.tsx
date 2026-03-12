import { useEffect, useState } from "react"
import type { Report } from "../types/types"




function AgentReports() {
    const [reports, setReports] = useState<Report[]|null>(null)
    async function getReports(): Promise<void> {
        const res = await fetch("http://localhost:3000/reports", {
            method: "GET",
            headers: { token: String(localStorage.getItem("token")) }
        })
        const data = await res.json()
        if (res.ok) {
            setReports(data)
        }
    }
    useEffect(() => {
        getReports()
    }, [])
    return (
        <div>
            <table>
                <tr>
                    <th>id</th>
                    <th>userId</th>
                    <th>category</th>
                    <th>urgency</th>
                    <th>message</th>
                    <th>image</th>
                    <th>sourceType</th>
                    <th>createdAt</th>
                </tr>
                {reports != null && reports.map((item: Report) => {
                    return (
                        
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.userId}</td>
                                <td>{item.category}</td>
                                <td>{item.urgency}</td>
                                <td>{item.message}</td>
                                {item.image && item.image[0] == "u" && <td><img src={"http://localhost:3000/"+item.image} alt="" /></td>}
                                {(!item.image || item.image[0] != "u" )&& <td>{""}</td>}
                                <td>{item.sourceType}</td>
                                <td>{item.createdAt}</td>
                            </tr>
                    
                    )
                })}
            </table>
        </div>
    )
}

export default AgentReports
