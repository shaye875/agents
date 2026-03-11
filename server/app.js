import express from 'express'
import cors from 'cors'
import { auth } from './auth/controller.js'
import { reports } from './report/controller.js'
import { admin } from './admin/controller.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))



app.use("/uploads",express.static("uploads"))
app.use("/auth",auth)
app.use("/reports",reports)
app.use("/admin/users",admin)

app.listen(3000,()=>{
    console.log("server run")
})
