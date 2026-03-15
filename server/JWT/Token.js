import JWT from 'jsonwebtoken'
import 'dotenv/config'

export function getToken( id, agentCode, fullName, role) {
    const token = JWT.sign({
        id: id,
        agentCode:agentCode,
        fullName:fullName,
        role:role
    },
        process.env.JWT_SECRET,
        { expiresIn:"1min" }
    )
    return token
}

export function verifyToken(token){
    let result
    JWT.verify(token,process.env.JWT_SECRET,async(err,decodd)=>{
        if(err){
           result = JSON.stringify(err)
        }else{
        result = decodd
        }
    })
    if(!result.id){
        return false
    }
    return { id:result.id, agentCode:result.agentCode, fullName:result.fullName, role:result.role}
}

