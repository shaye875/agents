import { useNavigate } from "react-router"

function MainAdmin() {
    const negativ = useNavigate()
  return (
    <div id="bas">
         <button className="bta" onClick={()=>{
        negativ("/users")
         }}>agents</button>
         <button className="bta" onClick={()=>{
            negativ("/admin/reports")
         }}>reports</button>
    </div>
  )
}

export default MainAdmin
