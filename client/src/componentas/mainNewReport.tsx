import { useState } from "react"
import Select from 'react-select'


function MainNewReport() {
    const [answer, setAnswer] = useState<string | undefined>(undefined)
    const [category, setCategory] = useState<string | object>("")
    const [urgency, setUrgency] = useState<string | object>("")
    const [message, setMessage] = useState<string>("")
    const [imagePath, setImagePath] = useState<string>("")
    async function postReport(): Promise<void> {
        const formdata = new FormData()
        formdata.append("imagePath", imagePath)
        formdata.append("category", category?.value)
        formdata.append("urgency", urgency?.value)
        formdata.append("message", message)
        const res = await fetch("http://localhost:3000/reports", {
            method: "POST",
            headers: {
                token: String(localStorage.getItem("token"))
            },
            body: formdata,
            redirect: "follow"
        })
        const result: object = await res.json()
        if (res.ok) {
            setAnswer(JSON.stringify(result))
        } else {
            setAnswer("wrong")
        }
        console.log(result);
        
    }
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
            <div>
                <p>category:</p>
                <Select defaultValue={category}
                    onChange={setCategory}
                    options={optionCategory}
                />
            </div>
            <div>

                <p>urgency:</p>
                <Select defaultValue={urgency}
                    onChange={setUrgency}
                    options={urgencyOptions}
                />
            </div>
            <div>
                <p>message:</p>
                <textarea rows={4} cols={50} onChange={(e) => setMessage(e.target.value)}></textarea>

            </div>
            <div>
                <p>image(optionly)</p>
                <input type="file" onChange={(e) => setImagePath(e.target.value)} />
            </div>
            <button onClick={() => {
                postReport()
            }}>submit</button>
            <h4>{answer}</h4>
        </div>
    )
}

export default MainNewReport
