import axios from "axios"

const BASE_URL=import.meta.env.BASE_URL
export const axiosInstance=axios.create(
    {
        baseURL:"https://cat-house-backend.onrender.com/",
       
    }
)
