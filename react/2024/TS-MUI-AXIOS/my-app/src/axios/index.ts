import axios from "axios";

const token = "1234567890";

export const axiosInstance = axios.create({
    baseURL:"https://dummyjson.com/",
    timeout:5000,
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
})

axiosInstance.interceptors.request.use((config)=>{
    console.log("Config",config);
    return {
        ...config
    }
},(err)=>{
    console.log("Error-AXIOS",err)
})