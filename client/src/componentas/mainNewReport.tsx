import { useState } from "react"
import Select from 'react-select'
import type { Option } from "../types/types"


function MainNewReport() {
    const [answer, setAnswer] = useState<string | undefined>(undefined)
    const [category, setCategory] = useState<Option|null>({
        label:"",
        value:""
    })
    const [urgency, setUrgency] = useState<Option|null>({
        label:"",
        value:""
    })
    const [message, setMessage] = useState<string>("")
    const [image, setImage] = useState<File | null>(null)
    async function postReport(): Promise<void> {
        const formdata = new FormData()
        if (image !== null) {
            formdata.append("image", image)
        }
        formdata.append("category", String(category?.value))
        formdata.append("urgency", String(urgency?.value))
        formdata.append("message", message)
        const res = await fetch("http://localhost:3000/reports", {
            method: "POST",
            headers: {
                token: String(localStorage.getItem("token"))
            },
            body: formdata
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
        <div id="man">
            <div>
                <p>category:</p>
                <Select id="sel" defaultValue={category}
                    onChange={setCategory}
                    options={optionCategory}
                />
            </div>
            <div>

                <p>urgency:</p>
                <Select id="sel" defaultValue={urgency}
                    onChange={setUrgency}
                    options={urgencyOptions}
                />
            </div>
            <div>
                <p>message:</p>
                <textarea rows={4} cols={50} onChange={(e:React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => setMessage(e.target.value)}></textarea>

            </div>
            <div>
                <p>image(optionly)</p>
                <input type="file" onChange={(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                    if (e.target.files !== null) {
                        setImage(e.target.files[0])
                    }

                }} />
            </div>
            <button className="btn" onClick={() => {
                postReport()
            }}>submit</button>
            <h4 id="ans">{answer}</h4>
        </div>
    )
}

export default MainNewReport
