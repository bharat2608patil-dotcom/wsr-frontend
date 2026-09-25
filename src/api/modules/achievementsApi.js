import apiClient from '../axiosClient'

export const createAchievement = (payload) => apiClient.post('/api/achievements', payload)
export const getProjectAchievements = (projectId) => apiClient.get(`/api/achievements/project/${projectId}`)
export const updateAchievement = (achievementId, payload) => apiClient.put(`/api/achievements/${achievementId}`, payload)
export const deleteAchievement = (achievementId) => apiClient.delete(`/api/achievements/${achievementId}`)