"use client"

import LoadingScreen from "@/components/loading-screen";
import useClientMiddleware from "@/hooks/use-client-middleware";
import { useUser } from "@/hooks/use-user";
import axiosInstance from "@/lib/axios";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const { userData, setUserData } = useUser()
  const message = React.useRef("Something went wrong. Please try again later")

  React.useEffect(() => {
    async function fetchUser() {
      try {
        if(userData){
          const isAdmin = userData?.role?.name?.includes("admin")
          if (!isAdmin) {
            message.current = "You are not authorized to access this page"
            setIsAuthorized(false)
            setIsLoading(false)
            return
          }
          setIsAuthorized(true)
          setIsLoading(false)
        } else {
          const user = await axiosInstance.get("/auth/user").then((res) => { return res.data?.data })
          setUserData(user)
        }
      } catch {
        setIsAuthorized(false)
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [setUserData, userData])

  useClientMiddleware(() => {})

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
