import axios from "axios"

const BASE_URL=import.meta.env.BASE_URL
export const axiosInstance=axios.create(
    {
        baseURL:"http://localhost:5000/api",
       
    }
)