"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "../lib/session"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const tokenData = await getToken();
      if (tokenData) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
    checkAuth()
  }, [router])

  return <LoadingScreen isLoading={true}/> 
}
