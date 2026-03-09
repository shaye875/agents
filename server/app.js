import express from 'express'
import cors from 'cors'

import { auth } from './auth/controller.js'
import { reports } from './report/controller.js'

const app = express()
app.use(express.json())
app.use(cors())
// app.use(fileUpload())

app.use("/auth",auth)
app.use("/reports",reports)

app.listen(3000,()=>{
    console.log("server run")
})
