import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

const token = "0123_456_789";
const apiBaseUrl = "https://6600364bdf565f1a6145f747.mockapi.io/UserDetails/";
const header = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 4500,
    headers: header
})

axiosInstance.interceptors.request.use(
    (config: any): any => {
        console.log(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        //AxiosRequestConfig
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
