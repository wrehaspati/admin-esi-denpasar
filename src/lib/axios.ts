import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        "Content-Type": "application/json",
        "Accept" : "application/json",
        "Authorization" : "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN
    },
    withXSRFToken: true
});

export default axiosInstance;