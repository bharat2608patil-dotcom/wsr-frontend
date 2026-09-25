import apiClient from '../axiosClient'

export const createTeam = (payload) => apiClient.post('/api/teams', payload)
export const getTeamById = (teamId) => apiClient.get(`/api/teams/${teamId}`)
export const getAllTeams = (params) => apiClient.get('/api/teams', { params })
export const updateTeam = (teamId, payload) => apiClient.put(`/api/teams/${teamId}`, payload)
export const deleteTeam = (teamId) => apiClient.delete(`/api/teams/${teamId}`)