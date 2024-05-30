import axios from "axios";


const BASE_URL = "http://44.233.110.170/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        // Get the access token from SecureStore
        // const accessToken =  localStorage.getItem("accessToken");
        const accessToken = " Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNDQuMjMzLjExMC4xNzAvYXBpL2xvZ2luIiwiaWF0IjoxNzE3MDU4MTM2LCJleHAiOjE3MTcxMDEzMzYsIm5iZiI6MTcxNzA1ODEzNiwianRpIjoidGlGTW5lMEVjMU9nQzhmTCIsInN1YiI6IjUxMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.HN4dNLAsjAuYI6D0kEIR5xoPLWCuovFjMivLv5qIqf8"
        // If an access token exists, set the Authorization header
        // if (accessToken) {
        config.headers.Authorization = `${accessToken}`;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;