import express from 'express'
import { login,me } from './servise.js'


export const reports = express()

auth.post("/reports", async (req, res) => {
    const resut = await login(req.body)
    if (Object.keys(resut)[0] === "false") {
        if (resut.false === "Incorrect login details") {
            res.status(401)
            res.json(resut)
        } else {
            res.status(400)
            res.json(resut)
        }
    }else{
        res.status(200)
        res.json({token:resut})
    }
})

auth.get("/me", async (req, res) => {
    const resut = me(req.headers.token)
    if (Object.keys(resut)[0] === "false") {
        res.status(401)
        res.json(resut)
    } else {
        res.status(200)
        res.json(resut)
    }
})
