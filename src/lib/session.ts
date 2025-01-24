"use client"

import axios from "axios"
import CryptoJS from "crypto-js"
import axiosInstance from "./axios"

const secretKey = String(process.env.SECRET_KEY)
let cachedToken: { token: string } | null = null
let tokenVerified = false

export const saveToken = (token: string) => {
  const encrypted = CryptoJS.AES.encrypt(token, secretKey).toString()
  sessionStorage.setItem("authToken", encrypted)
}

export const getToken = async () => {
  if (cachedToken && tokenVerified) {
    return cachedToken
  }

  const encrypted = sessionStorage.getItem("authToken")
  if (!encrypted) return null

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey)
    const token = bytes.toString(CryptoJS.enc.Utf8)

    await verifyToken(token)

    cachedToken = { token }
    tokenVerified = true
    return cachedToken
  } catch {
    removeToken()
    return null
  }
}

export const verifyToken = async (token: string | null) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL+"/auth/check", 
      { 
        headers: { Authorization: `Bearer ${token}` } 
      }
    )
    if (!response.data.authenticated) {
      console.warn("Failed to verify token")
      throw new Error
    }
  } catch {
    console.warn("Failed to verify token")
    removeToken()
  }
}

export const removeToken = () => {
  sessionStorage.removeItem("authToken")
  cachedToken = null
  tokenVerified = false
}

export const logout = async () => {
  const token = await getToken()
  if (token) {
    await axiosInstance.delete( process.env.NEXT_PUBLIC_API_URL+"/logout" )
  }
  removeToken()
}
