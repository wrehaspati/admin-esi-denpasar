"use client"

import { User } from "@/types/UserType"
import React from "react"

export const UserContext = React.createContext<UserContextType | undefined>(undefined)

interface UserContextType {
  userData: User | null
  setUserData: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = React.useState<User | null>(null)
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
