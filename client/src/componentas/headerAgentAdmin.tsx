import type { UserMe } from "../types/types"

function HeaderAgent() {
   const user:UserMe = JSON.parse(String(localStorage.getItem("userr")))
  return (
    <div id="hea">
      <h1>welcome {user?.fullName}</h1>
    </div>
  )
}

export default HeaderAgent
