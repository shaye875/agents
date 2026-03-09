import { getToken, verifyToken } from "../JWT/Token.js";
import { getAllReports, getReportById, getReportsByUserId, insertReport } from "./qweries.js";
import { isInformation, isTypes, schema } from "./validation.js";
import csv from 'csv-parser'
import fs from 'fs'


export async function postReports(req, res) {
  const body = req.body
  if (!isInformation(["category", "urgency", "message"], body)) {
    res.status(400)
    res.json({ "false": "missing information" })
  }
  if (!isTypes({ category: "", urgency: "", message: "" }, body)) {
    res.status(400)
    res.json({ "false": "one or more types wrong" })
  }

  if (!schema([{ 3: new Set([body.category, "intelligence", "logistics", "alert"]) }, { 3: new Set([body.urgency, "low", "medium", "high"]) }])) {
    res.status(400)
    res.json({ "false": "category or urgency not good" })
  }
  const { user } = req
  if (req.file) {
    body["imagePath"] = req.file.path
  }
  body["sourceType"] = "form"
  const result = await insertReport(body, user.id)
  res.status(201)
  res.json(result)
}

export function midllwareToken(req, res, next) {
  const { token } = req.headers
  const user = verifyToken(token)
  if (!user) {
    res.status(401)
    res.json({ "false": "token not good" })
  } else {
    req.user = user
    next()
  }
}

export async function reportCsv(req, res) {
  const arr = []
  if (req) {
    try {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => arr.push(data))
        .on('end', async () => {
          const { user } = req
          let count = 0
          for (let report of arr) {
            report["sourceType"] = "csv"
            await insertReport(report, user.id)
            count+=1
          }
          res.status(201)
          res.json({"importedCount":count,"reports":arr})
        })
    } catch (err){
      res.status(400)
      return res.json({ "false": "the file isnot good" })
    }
  } else {
    res.status(400)
    return res.json({ "false": "short file csv" })
  }
}

export async function getReports(req,res){
  const {id,role} = req.user
  let reports 
  if(role === "admin"){
     reports = await getAllReports()
  }else{
    reports = await getReportsByUserId(id)
  }
  res.status(200)
  res.json({Report:reports})
}

export async function reportById(req,res){
  const {user} = req
  const {id} = req.params
  const report = await getReportById(id)
  if(!report){
    res.status(404)
    return res.json({"false":"not found"})
  }
  if(user.role !== "admin" && user.id !== report.userId){
    res.status(403)
    return res.json({"false":"isnot your report"})
  }
  res.status(200)
  res.json({report:report})
}