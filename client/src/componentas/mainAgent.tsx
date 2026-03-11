import { useNavigate } from "react-router"

function MainAgent() {
    const negativ = useNavigate()
    return (

        <div id="bts">
            <button className="btn" onClick={() => {
                negativ("/newreport")
            }}>new report</button>
            <button className="btn" onClick={() => {
                negativ("/reportcsv")
            }}>csv report</button>
            <button className="btn" onClick={() => {
                negativ("/agent/reports")
            }}>my reports</button>
        </div>
    )
}

export default MainAgent
