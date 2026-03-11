import { useState } from "react"


function MainCsv() {
    const [answer, setAnswer] = useState<string|undefined>(undefined)
    const [file, setFile] = useState<File | null>(null)
    async function postReportcsv(): Promise<void> {
        const formdata = new FormData()
        if (file !== null) {
            formdata.append("file", file)
        }
        const res = await fetch("http://localhost:3000/reports/csv", {
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
    return (
        <div id="csv">
            <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                if (e.target.files !== null) {
                    setFile(e.target.files[0])
                }
            }} />
            <button className="btn" onClick={() => {
                postReportcsv()
            }}>submit</button>
            <h4 id="ans">{answer}</h4>
        </div>
    )
}

export default MainCsv
