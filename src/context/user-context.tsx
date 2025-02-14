"use client"

import { IEvent } from "@/types/event"
import { IUser } from "@/types/user"
import React from "react"

export const UserContext = React.createContext<UserContextType | undefined>(undefined)

interface UserContextType {
  userData: IUser | null
  userEvents: IEvent[] | null 
  activeEvent: IEvent | null
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>
  setUserEvents: React.Dispatch<React.SetStateAction<IEvent[] | null>>
  setActiveEvent: React.Dispatch<React.SetStateAction<IEvent | null>>
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = React.useState<IUser | null>(null)
  const [userEvents, setUserEvents] = React.useState<IEvent[] | null>(null)
  const [activeEvent, setActiveEvent] = React.useState(() => {
    if (typeof window !== "undefined") {
      const activeEvent = localStorage.getItem("activeEvent");
      return activeEvent ? JSON.parse(activeEvent) : null;
    }
    return null;
  });

  React.useEffect(() => {
    if (activeEvent) {
      localStorage.setItem("activeEvent", JSON.stringify(activeEvent));
    }
  }, [activeEvent]);

  return (
    <UserContext.Provider value={{ userData, setUserData, userEvents, setUserEvents, activeEvent, setActiveEvent }}>
      {children}
    </UserContext.Provider>
  )
}
