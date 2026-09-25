import apiClient from '../axiosClient'

export const createWeeklyUpdate = (payload) => apiClient.post('/api/weekly-updates', payload)
export const getWeeklyUpdateById = (weeklyUpdateId) => apiClient.get(`/api/weekly-updates/${weeklyUpdateId}`)
export const getProjectUpdates = (projectId) => apiClient.get(`/api/weekly-updates/project/${projectId}`)
export const updateWeeklyUpdate = (weeklyUpdateId, payload) => apiClient.put(`/api/weekly-updates/${weeklyUpdateId}`, payload)
export const deleteWeeklyUpdate = (weeklyUpdateId) => apiClient.delete(`/api/weekly-updates/${weeklyUpdateId}`)