import { verifyPassword } from '../hash/bycript.js'
import { promises as fs } from 'fs'

export async function checkUser(agentCode, password) {
    try {
        const data = await fs.readFile("./data/users.json", "utf8")
        const arr = await JSON.parse(data)
        for (let user of arr) {
            if (user.agentCode === agentCode) {
                if(await verifyPassword(password, user.passwordHash)){
                    return user
                }
            }
        }
        return false
    } catch (err) {
        throw new Error("error read file", err)
    }
}

export async function insertUser(obj) {
    try {
        const data = await fs.readFile("./data/users.json", "utf8")
        const arr = await JSON.parse(data)
        arr.push(obj)
        await fs.writeFile("./data/scores.json", JSON.stringify(arr))
    } catch (err) {
        throw new Error("error read score", err)
    }
}



