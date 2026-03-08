import express from 'express'
import { postReports, midllwareToken } from './servise.js'


export const reports = express()

reports.post("",midllwareToken,postReports)

