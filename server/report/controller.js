import express from 'express'
import { postReports, midllwareToken,reportCsv, getReports, reportById } from './servise.js'
import multer from 'multer'
const upload =  multer({dest: "uploads/"})

export const reports = express()

reports.post("",upload.single("imagePath"),midllwareToken,postReports)

reports.post("/csv",midllwareToken,upload.single("file"),reportCsv)

reports.get("",midllwareToken,getReports)

reports.get("/:id",midllwareToken,reportById)