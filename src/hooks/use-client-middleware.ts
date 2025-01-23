"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { getToken, removeToken } from "../lib/session"

const useClientMiddleware = (onAuthorized: () => void) => {
  const router = useRouter()
  const isAuthorizedRef = useRef(false)

  useEffect(() => {
    if (isAuthorizedRef.current) return

    const authorize = async () => {
      const tokenData = await getToken()

      if (tokenData) {
        isAuthorizedRef.current = true
        onAuthorized()
      } else {
        isAuthorizedRef.current = true
        console.warn("Unauthorized access. Redirecting to login...")
        removeToken()
        router.push("/login")
      }
    }

    authorize()
  }, [router, onAuthorized])
}

export default useClientMiddleware
