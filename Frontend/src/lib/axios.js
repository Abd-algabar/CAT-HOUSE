import axios from "axios"


export const axiosInstance=axios.create(
    {
        baseURL:"https://cat-house-backend.onrender.com/api",
       
    }
)
