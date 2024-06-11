import axios from "axios"

export const api = axios.create({
    baseURL : "https://bittera-tickets-1.onrender.com",
    timeout: 10000,
})