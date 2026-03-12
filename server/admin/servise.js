import { enAtbash } from "../hash/atbash.js";
import { hashPassword } from "../hash/bycript.js";
import { verifyToken } from "../JWT/Token.js";
import { getAll, insertUser } from "./qweries.js";
import { isInformation, isTypes,schema } from "./validation.js";

export function midllwareTokenAdmin(req, res, next) {
  const { token } = req.headers
  const user = verifyToken(token)
  if (!user) {
    res.status(401)
    res.json({ "false": "token not good" })
  } else if (user.role != "admin") {
    res.status(403)
    res.json({ "false": "you are not admin" })
  }
  else {
    next()
  }
}

export async function login(req, res) {
  const { body } = req
  if (!isInformation(["agentCode", "fullName", "role"], body)) {
    res.status(400)
    return res.json({ "false": "missing information" })
  }
  if (!isTypes({ agentCode: "", fullName: "", role: "" }, body)) {
    res.status(400)
    return res.json({ "false": "one or more types wrong" })
  }
  if(!schema([{2:new Set([body.role,"admin","agent"])}])){
    res.status(400)
    return res.json({"false":"role must bu admin or agent"})
  }
  if(body.password === ""){
    body["passwordHash"] = await hashPassword(enAtbash(body.fullName))
  }else{
    body["passwordHash"] = await hashPassword(body.password)   
  }
  const user = await insertUser(body)
  if(!user){
    res.status(409)
    return res.json({"false":"agent code alredy exist"})
  }
  res.status(201)
  res.json({user:user})
}

export async function get(req,res){
  res.status(200)
  res.json(await getAll())
}


