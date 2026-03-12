import { useEffect, useState } from "react"
import { type Option, type Report } from "../types/types"
import Select from 'react-select'




function AgentReports() {
    const [reports, setReports] = useState<Report[] | null>(null)
    const [category, setCategory] = useState<Option | null>(null)
    const [agentCode, setAgentCode] = useState<string>("")
    const [urgency, setUrgency] = useState<Option | null>(null)
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
    const optionCategory = [
        { value: "intelligence", label: "intelligence" },
        { value: "logistics", label: "logistics" },
        { value: "alert", label: "alert" }
    ]
    const urgencyOptions = [
        { value: "low", label: "low" },
        { value: "medium", label: "medium" },
        { value: "high", label: "high" }
    ]
    return (
        <div>
            <div id="her">
                <div className="sec">
                    <p>category:</p>
                    <Select className="int" defaultValue={category}
                        onChange={setCategory}
                        options={optionCategory}
                    />
                </div>
                <div className="sec">
                    <p>urgency:</p>
                    <Select className="int" defaultValue={urgency}
                        onChange={setUrgency}
                        options={urgencyOptions}
                    />
                </div>
                <div className="sec">
                    <p>agent code:</p>
                    <input className="int" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => setAgentCode(e.target.value)} />
                </div>
                <button className="btn" id="btn" onClick={()=>{
                    setAgentCode("")
                    setCategory(null)
                    setUrgency(null)
                }}>all</button>
            </div>
            <table id="rep">
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
                {reports != null && reports.filter((item1: Report) => {
                    if (category === null && urgency === null && agentCode === "") {
                        return item1
                    } else if (category !== null && urgency === null && agentCode === "") {
                        if (category.value === item1.category) {
                            return item1
                        }
                    }else if(category !== null && urgency !== null && agentCode === ""){
                        if(category.value === item1.category && urgency.value === item1.urgency){
                            return item1
                        }
                    }else if(category !== null && urgency !== null && agentCode !== ""){
                        if(category.value === item1.category && urgency.value === item1.urgency && agentCode === item1.userId){
                            return item1
                        }
                    }else if(category !== null && urgency === null && agentCode !== ""){
                        if(category.value === item1.category && agentCode === item1.userId){
                            return item1
                        }
                    }else if(category === null && urgency !== null && agentCode === ""){
                        if(urgency.value === item1.urgency){
                            return item1
                        }
                    }else if(category === null && urgency !== null && agentCode !== ""){
                        if(urgency.value === item1.urgency && agentCode === item1.userId){
                            return item1
                        }
                    }else if(category === null && urgency === null && agentCode !== ""){
                        if(agentCode === item1.userId){
                            return item1
                        }
                    }
                })
                    .map((item: Report) => {
                        return (

                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.userId}</td>
                                <td>{item.category}</td>
                                <td>{item.urgency}</td>
                                <td>{item.message}</td>
                                {item.image && item.image[0] == "u" && <td><img src={"http://localhost:3000/" + item.image} alt="" /></td>}
                                {(!item.image || item.image[0] != "u") && <td>{""}</td>}
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
