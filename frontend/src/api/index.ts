import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL
console.log(baseURL, import.meta.env.VITE_API_URL)

const apiClient = axios.create({
   baseURL: baseURL,
   timeout: 1000,
})

export default apiClient;
