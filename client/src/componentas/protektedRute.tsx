

import { useEffect, useState } from "react"
import {  Navigate, Outlet } from "react-router"
import type { UserMe } from "../types/types"

export function Protected() {
    const [token, setToken] = useState<boolean>(true)
    async function me() {
        const res = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: { token: String(localStorage.getItem("token")) }
        })
        setToken(res.ok)
    }
    useEffect(() => {
        me()
        console.log(token);
    }, [])
    if (!token) {
        return <Navigate to="/" />

    }
    return <Outlet />
}

export function PreconnectAdmin() {
    const [token, setToken] = useState<boolean>(true)
    const [role, setRole] = useState<string>("admin")
    async function me():Promise<void|UserMe> {
        const res = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: { token: String(localStorage.getItem("token")) }
        })
        const data: UserMe = await res.json()
        setToken(res.ok)
        setRole(data.role)
       
    }
    useEffect(() => {
        me()  
    }, [])
    if (token && role === "admin") {
        return <Outlet />
    }
    return <Navigate to="/" />
}