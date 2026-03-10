
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
