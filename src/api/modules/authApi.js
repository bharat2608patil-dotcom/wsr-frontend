import apiClient from '../axiosClient'

export const login = (payload) => apiClient.post('/api/auth/login', payload)
export const getCurrentUser = () => apiClient.get('/api/auth/me')
export const changePassword = (payload) => apiClient.put('/api/auth/change-password', payload)