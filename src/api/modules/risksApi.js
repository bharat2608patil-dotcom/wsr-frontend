import apiClient from '../axiosClient'

export const createRisk = (payload) => apiClient.post('/api/risks', payload)
export const getRiskById = (riskId) => apiClient.get(`/api/risks/${riskId}`)
export const getProjectRisks = (projectId) => apiClient.get(`/api/risks/project/${projectId}`)
export const updateRisk = (riskId, payload) => apiClient.put(`/api/risks/${riskId}`, payload)
export const deleteRisk = (riskId) => apiClient.delete(`/api/risks/${riskId}`)