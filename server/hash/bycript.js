import bcrypt from "bcrypt";

export async function hashPassword(plainPassword, round = 10) {
    const password = await bcrypt.hash(plainPassword, round)
    return password
}

export async function verifyPassword(plainPassword,hashPassword){
    const result = await bcrypt.compare(plainPassword,hashPassword)
    return result
}