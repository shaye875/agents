import type { Dispatch, SetStateAction } from "react"

export type UserType = {
    role: string
    id: string
    agentCode: string
    fullName: string
}

export type ContextType = {
    role: string
    setRole: (role: string) => void
    user: object
    setUser: Dispatch<SetStateAction<UserType>>
}

export type Report = {
    id: string
    userId: string
    category: string
    urgency: string
    message: string
    image: string | undefined
    sourceType: string
    createdAt: string
}

export type User = {
    id:string
    agentCode:string
    fullName:string
    passwordHash:string
    role:string
    createdAt:string
}

export type Option = {
    label:string
    value:string
}
