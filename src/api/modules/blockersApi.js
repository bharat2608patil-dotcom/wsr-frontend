import apiClient from '../axiosClient'

export const createBlocker = (payload) => apiClient.post('/api/blockers', payload)
export const getProjectBlockers = (projectId) => apiClient.get(`/api/blockers/project/${projectId}`)
export const updateBlocker = (blockerId, payload) => apiClient.put(`/api/blockers/${blockerId}`, payload)
export const deleteBlocker = (blockerId) => apiClient.delete(`/api/blockers/${blockerId}`)