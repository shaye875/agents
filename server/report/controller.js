import express from 'express'
import { postReports, midllwareToken,reportCsv, getReports, reportById } from './servise.js'
import multer from 'multer'

const storege = multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
       cb(null,file.originalname)
    }
})

const upload =  multer({storage:storege})

export const reports = express()

reports.post("",midllwareToken,upload.single("image"),postReports)

reports.post("/csv",midllwareToken,upload.single("file"),reportCsv)

reports.get("",midllwareToken,getReports)

reports.get("/:id",midllwareToken,reportById)