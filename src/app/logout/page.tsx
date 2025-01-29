"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"
import { getToken, removeToken } from "@/lib/session";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const tokenData = await getToken();
      if (tokenData) {
        removeToken()
        router.push("/login");
      } 
    }
    checkAuth()
  }, [router])

  return <LoadingScreen isLoading={true}/> 
}
