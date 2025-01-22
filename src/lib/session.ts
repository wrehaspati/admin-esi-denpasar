"use client"

import { User } from "@/types/UserType"
import axios from "axios"
import CryptoJS from "crypto-js"

const secretKey = String(process.env.SECRET_KEY)
let cachedToken: { token: string, id: string } | null = null
let tokenVerified = false

const combinedKey = (token: string, id: string, bitLength: number = 16) => {
  const binaryId = id.padStart(bitLength, "0")
  return token + binaryId
}

const separateKey = (combinedKey: string, bitLength: number = 16) => {
  const tokenLength = combinedKey.length - bitLength
  const token = combinedKey.slice(0, tokenLength)
  const binaryId = combinedKey.slice(tokenLength)
  const id = String(parseInt(binaryId, 2))
  return { token, id }
}

export const saveToken = (token: string, id: string) => {
  const key = combinedKey(token, id)
  const encrypted = CryptoJS.AES.encrypt(key, secretKey).toString()
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
    const { token, id } = separateKey(bytes.toString(CryptoJS.enc.Utf8))

    const isValid = await verifyTokenID(token, id)
    if (!isValid) {
      removeToken()
      return null
    }

    cachedToken = { token, id }
    tokenVerified = true
    return cachedToken
  } catch {
    removeToken()
    return null
  }
}

const verifyTokenID = async (token: string, id: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/admin/user/" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    saveUserData(response.data?.data);
    return response.data?.data?.id != null
  } catch {
    return false
  }
}

const saveUserData = async (user: User) => {
  try { 
    sessionStorage.setItem("userData", JSON.stringify(user))
  } 
  catch { 
    throw new Error("Failed to save user data") 
  }
}

export const getUserData = async (): Promise<User> => {
  try {
    const userData = sessionStorage.getItem("userData") as string
    if (!userData) await getToken()
    return JSON.parse(userData) as User
  } catch {
    throw new Error("Failed to get user data")
  }
}

export const removeToken = () => {
  sessionStorage.removeItem("authToken")
  cachedToken = null
  tokenVerified = false
}
