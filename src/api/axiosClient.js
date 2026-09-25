import axios from 'axios'
import { clearSession } from '../utils/authUtils'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('wsr_access_token')
  const tokenType = localStorage.getItem('wsr_token_type') || 'Bearer'
  if (token) config.headers.Authorization = `${tokenType} ${token}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.startsWith('/login')) {
      clearSession()
      window.location.assign('/login')
    }
    return Promise.reject(error)
  },
)

export default apiClient