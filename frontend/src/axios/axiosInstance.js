import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3001/api',
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance
