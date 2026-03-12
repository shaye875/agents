import { useNavigate } from "react-router"


function MainAdminReports() {
    const negativ = useNavigate()
    return (
        <div id="bts">
            <button className="bta" onClick={() => {
                negativ("/newreport")
            }}>new report</button>
            <button className="bta" onClick={() => {
                negativ("/reportcsv")
            }}>csv report</button>
            <button className="bta" onClick={() => {
                negativ("/agent/reports")
            }}>all reports</button>
        </div>
    )
}

export default MainAdminReports
