import express from 'express'
import cors from 'cors'
import { auth } from './auth/controller.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth",auth)

app.listen(3000,()=>{
    console.log("server run")
})
