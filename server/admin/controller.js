import express from 'express'
import { get, login, midllwareTokenAdmin } from './servise.js'


export const admin = express()

admin.post("",midllwareTokenAdmin,login)

admin.get("",midllwareTokenAdmin,get)