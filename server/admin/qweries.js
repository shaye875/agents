import { promises as fs } from 'fs'

export async function insertUser(obj) {
    try {
        const data = await fs.readFile("./data/users.json", "utf8")
        const arr = await JSON.parse(data)
        for (let user of arr) {
            if (user.agentCode === obj.agentCode) {
                return false
            }
        }
        obj["createdAt"] = new Date()
        obj["id"] = String(arr.length + 1)
        arr.push(obj)
        await fs.writeFile("./data/users.json", JSON.stringify(arr))
        return obj
    } catch (err) {
        throw new Error("error read file", err)
    }
}

export async function getAll(){
    try {
        const data = await fs.readFile("./data/users.json", "utf8")
        const arr = await JSON.parse(data)
        return arr
    } catch (err) {
        throw new Error("error read file", err)
    }
}



