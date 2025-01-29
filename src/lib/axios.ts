import Axios from "axios";
import { getToken, verifyToken } from "./session";

const getAuthorization = async () => {
    const token = await getToken();
    if(token){
        return `Bearer ${token.token}`;
    }
    return null;
}

const axiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        "Content-Type": "application/json",
        "Accept" : "application/json",
    },
    withXSRFToken: true
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await getAuthorization();
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 403) {
            try {
                const token = await getToken()
                if (token) {
                    await verifyToken(token.token)
                } else throw new Error
            } catch {
                console.warn("Token verification failed")
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;