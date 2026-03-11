


function HeaderAgent() {
   const user:any = JSON.parse(localStorage.getItem("userr"))
  return (
    <div id="hea">
      <h1>welcome {user?.fullName}</h1>
    </div>
  )
}

export default HeaderAgent
