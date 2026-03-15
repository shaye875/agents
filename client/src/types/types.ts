import type { JSX } from "react"



export type ContextType = {
    role: string
    setRole: (role: string) => void
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
    id: string
    agentCode: string
    fullName: string
    passwordHash: string
    role: string
    createdAt: string
}

export type Option = {
    label: string
    value: string
}

export type UserMe = {
    id: string
    agentCode: string
    fullName: string
    role: string
}

export type ChildrenType = {
    children:JSX.Element |string|JSX.Element[]|any
}
