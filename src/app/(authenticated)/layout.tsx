"use client"

import LoadingScreen from "@/components/loading-screen";
import useClientMiddleware from "@/hooks/use-client-middleware";
import { useUser } from "@/hooks/use-user";
import axiosInstance from "@/lib/axios";
import React from "react";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const { userData, setUserData, setUserEvents } = useUser()
  const message = React.useRef("Something went wrong. Please try again later")

  React.useEffect(() => {
    async function fetchUser() {
      try {
        let isEO: boolean|undefined = false
        if (!userData) {
          const user = await axiosInstance.get("/auth/user").then((res) => { return res.data?.data })
          isEO = user?.role?.name?.includes("event_organizer")
          setUserData(user)
        }
        if (isEO) {
          const events = await axiosInstance.get("/eo/events").then((res) => { return res.data?.data })
          if (events.length === 0) {
            setIsAuthorized(false)
            message.current = "There is no event that you manage. Please contact the administrator for further information."
            return
          }
          setUserEvents(events)
        }
        setIsAuthorized(true)
      } catch {
        setIsAuthorized(false)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [setUserData, setUserEvents, userData])

  useClientMiddleware(() => { })

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthorized && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-muted mx-auto text-center">
        <h1 className="font-semibold text-lg">{message.current}</h1>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  );
}
