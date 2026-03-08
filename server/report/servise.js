import { getToken, verifyToken } from "../JWT/Token.js";
import { insertReport } from "./qweries.js";
import { isInformation, isTypes, schema } from "./validation.js";

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

  if (!schema([{3:new Set([body.category, "intelligence", "logistics", "alert"])}, {3: new Set([body.urgency, "low", "medium", "high"]) }])) {
    res.status(400)
    res.json({ "false": "category or urgency not good" })
  }
  const { user } = req
  body["imagePath"] = req.files.imagePath
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
