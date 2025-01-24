"use client"

import LoadingScreen from "@/components/loading-screen";
import useClientMiddleware from "@/hooks/use-client-middleware";
import { useUser } from "@/hooks/use-user";
import axiosInstance from "@/lib/axios";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const { setUserData } = useUser()
  const message = React.useRef("Something went wrong. Please try again later")

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const user = await axiosInstance.get("/auth/user").then((res) => { return res.data?.data })
        const isAdmin = user?.role?.name?.includes("admin")
        if (!isAdmin) {
          setIsAuthorized(false)
          message.current = "You are not authorized to access this page"
          return
        }
        setUserData(user)
        setIsAuthorized(true)
      } catch {
        console.warn("Something went wrong. Please try again later")
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [setUserData])

  useClientMiddleware(() => {})

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthorized && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-muted">
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
