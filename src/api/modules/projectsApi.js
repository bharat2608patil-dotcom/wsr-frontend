import apiClient from '../axiosClient'

export const createProject = (payload) => apiClient.post('/api/projects', payload)
export const getProjectById = (projectId) => apiClient.get(`/api/projects/${projectId}`)
export const getAllProjects = (params) => apiClient.get('/api/projects', { params })
export const searchProjects = (params) => apiClient.get('/api/projects/search', { params })
export const updateProject = (projectId, payload) => apiClient.put(`/api/projects/${projectId}`, payload)
export const deleteProject = (projectId) => apiClient.delete(`/api/projects/${projectId}`)