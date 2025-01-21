"use client";

import axios from "axios";
import CryptoJS from "crypto-js";

const secretKey = String(process.env.SECRET_KEY);
let cachedToken: { token: string; id: string } | null = null;
let tokenVerified = false;

const combinedKey = (token: string, id: string, bitLength: number = 16) => {
  const binaryId = id.padStart(bitLength, "0");
  return token + binaryId;
};

const separateKey = (combinedKey: string, bitLength: number = 16) => {
  const tokenLength = combinedKey.length - bitLength;
  const token = combinedKey.slice(0, tokenLength);
  const binaryId = combinedKey.slice(tokenLength);
  const id = String(parseInt(binaryId, 2));
  return { token, id };
};

export const saveToken = (token: string, id: string) => {
  const key = combinedKey(token, id);
  const encrypted = CryptoJS.AES.encrypt(key, secretKey).toString();
  sessionStorage.setItem("authToken", encrypted);
};

export const getToken = async () => {
  if (cachedToken && tokenVerified) {
    return cachedToken;
  }

  const encrypted = sessionStorage.getItem("authToken");
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    const { token, id } = separateKey(bytes.toString(CryptoJS.enc.Utf8));

    const isValid = await verifyToken(token, id);
    if (!isValid) {
      removeToken();
      return null;
    }

    cachedToken = { token, id };
    tokenVerified = true;
    console.log("success");
    return cachedToken;
  } catch {
    removeToken();
    return null;
  }
};

const verifyToken = async (token: string, id: string): Promise<boolean> => {
  // this function is not implemented yet
  // try {
  //   const response = await axios.post("/api/verify-token", { token });
  //   return response.data.isValid;
  // } catch (error) {
  //   console.error("Token verification failed:", error);
  //   return false;
  // }
  // using this instead
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/user/" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return response.data?.data?.id != null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

export const removeToken = () => {
  sessionStorage.removeItem("authToken");
  cachedToken = null;
  tokenVerified = false;
};
