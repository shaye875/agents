import { getToken,verifyToken } from "../JWT/Token.js";
import { checkUser, insertUser } from "./qweries.js";
import { isInformation, isTypes } from "./validation.js";

export async function login(body) {
    if (!isInformation(["agentCode", "password"], body)) {
        return { "false": "missing information" }
    }
    if(!isTypes({agentCode:"",password:""},body)){
        return { "false": "one or more types wrong" }
    }
    const user = await checkUser(body.agentCode,body.password)
    if(!user){
        return {"false":"Incorrect login details"}
    }
    const token = getToken(user.id,user.agentCode,user.fullName,user.role)
    return token
}

export function me(token){
  const result = verifyToken(token)
  if(!result){
    return {"false":"token not work"}
  }
  return result
}
