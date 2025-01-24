"use client"

import axios from "axios"
import CryptoJS from "crypto-js"

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

    const isValid = await verifyToken(token)
    if (!isValid) {
      removeToken()
      return null
    }

    cachedToken = { token }
    tokenVerified = true
    return cachedToken
  } catch {
    removeToken()
    return null
  }
}

const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL+"/auth/check", 
      { 
        headers: { Authorization: `Bearer ${token}` } 
      }
    );
    return response.data.authenticated;
  } catch {
    console.warn("Failed to verify token");
    return false;
  }
}

export const removeToken = () => {
  sessionStorage.removeItem("authToken")
  cachedToken = null
  tokenVerified = false
}
