import apiClient from '../axiosClient'

export const createUser = (payload) => apiClient.post('/api/users', payload)
export const getUserById = (userId) => apiClient.get(`/api/users/${userId}`)
export const getAllUsers = (params) => apiClient.get('/api/users', { params })
export const updateUser = (userId, payload) => apiClient.put(`/api/users/${userId}`, payload)
export const deleteUser = (userId) => apiClient.delete(`/api/users/${userId}`)