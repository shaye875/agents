
// // import { useNavigate } from "react-router"
// // import type { UserMe } from "../types/types"
// // import { createContext, useEffect, type ReactNode } from "react";

import React, { useEffect, useState } from "react"
import { data, Navigate, Outlet } from "react-router"
import type { ChildrenType, User, UserMe } from "../types/types"

// import { createContext, useEffect, useState } from "react";
// import type { ContextType } from "../types/types";
// import { useNavigate } from "react-router";


// // type Children = {
// //     children?:ReactNode
// // }

// // const Context = createContext(null)

// // export function PotektedRute({children}:Children) {
// //
// //     let res:Response|undefined
// //     async function me(){
// //      res = await fetch("http://localhost:3000/auth/me", {
// //         method: "GET",
// //         headers: { token: String(localStorage.getItem("token")) }
// //     })
// //     if (res !== undefined && res?.ok) {
// //         console.log(children);

// //     return 

// //      (
// //         <Context>
// //             {children}
// //         </Context>
// //      )


// //     } else {
// //         useEffect(()=>{
// //             negative("/")
// //         })

// //     }
// //     }
// //     useEffect(()=>{
// //         me()
// //     })



// // }

// // export async function ProtektedRputeAdmin({children}:Element){
// //     const negative = useNavigate()
// //     const res = await fetch("http://localhost:3000/auth/me", {
// //         method: "GET",
// //         headers: { token: String(localStorage.getItem("token")) }
// //     })
// //     const user: UserMe = await res.json()
// //     if(res.ok && user?.role === "admin"){
// //         return children
// //     }else{
// //         negative("/")
// //     }
// // }

// export const UseContext = createContext<ContextType | undefined>(undefined)
// export function AuthProvaider({ children }) {
//     const negative = useNavigate()
//     const [role, setRole] = useState<string>("")
//     if (false) {
//         return <UseContext value={{ role, setRole }}>{children}</UseContext>
//     } else {
//         setRole("jj")
//         console.log("ff");

//         return children
//     }

// }

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