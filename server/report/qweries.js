import { promises as fs } from 'fs'

export async function insertReport(report, userid) {
    try {
        const data = await fs.readFile("./data/reports.json", "utf8")
        const arr = await JSON.parse(data)
        const id = arr.length + 1
        report["id"] = String(id)
        report["createdAt"] = new Date()
        report["userId"] = userid
        arr.push(report)
        await fs.writeFile("./data/reports.json", JSON.stringify(arr))
        return report
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

export async function getAllReports() {
    try {
        const data = await fs.readFile("./data/reports.json", "utf8")
        const arr = await JSON.parse(data)
        return arr
    } catch (err) {
        throw new Error("error read file", err)
    }
}

export async function getReportsByUserId(id) {
    try {
        const data = await fs.readFile("./data/reports.json", "utf8")
        const arr = await JSON.parse(data)
        const reports = arr.filter((report) => {
            if (report.userId === id) {
                return report
            }
        })
        return reports
    } catch (err) {
        throw new Error("error read file", err)
    }
}

export async function getReportById(id){
    try {
        const data = await fs.readFile("./data/reports.json", "utf8")
        const arr = await JSON.parse(data)
        for(let report of arr){
            if(report.id === id){
                return report
            }
        }
        return false
    } catch (err) {
        throw new Error("error read file", err)
    }
}

