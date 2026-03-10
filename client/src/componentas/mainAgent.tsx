import { useContext } from "react"
import { UseContext } from "../App"


function MainAgent() {
    const user = useContext(UseContext)
  return (
    <div>
      <h1>welcome {user?.fullName}</h1>
    </div>
  )
}

export default MainAgent
