"use client"

import { Event } from "@/types/EventType"
import { User } from "@/types/UserType"
import React from "react"

export const UserContext = React.createContext<UserContextType | undefined>(undefined)

interface UserContextType {
  userData: User | null
  userEvents: Event[] | null 
  activeEvent: Event | null
  setUserData: React.Dispatch<React.SetStateAction<User | null>>
  setUserEvents: React.Dispatch<React.SetStateAction<Event[] | null>>
  setActiveEvent: React.Dispatch<React.SetStateAction<Event | null>>
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = React.useState<User | null>(null)
  const [userEvents, setUserEvents] = React.useState<Event[] | null>(null)
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
