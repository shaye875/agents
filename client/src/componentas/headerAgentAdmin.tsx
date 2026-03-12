import type { UserType } from "../types/types"



function HeaderAgent() {
   const user:UserType = JSON.parse(String(localStorage.getItem("userr")))
  return (
    <div id="hea">
      <h1>welcome {user?.fullName}</h1>
    </div>
  )
}

export default HeaderAgent
