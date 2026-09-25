import apiClient from '../axiosClient'

export const getTeamLeadDashboard = (userId) => apiClient.get(`/api/dashboard/team-lead/${userId}`)
export const getDeliveryManagerDashboard = (userId) => apiClient.get(`/api/dashboard/delivery-manager/${userId}`)
export const getExecutiveDashboard = () => apiClient.get('/api/dashboard/executive')