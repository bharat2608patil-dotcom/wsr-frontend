import apiClient from '../axiosClient'

export const createReport = (payload) => apiClient.post('/api/wsr-reports', payload)
export const getAllReports = (params) => apiClient.get('/api/wsr-reports', { params })
export const submitReport = (reportId) => apiClient.post(`/api/wsr-reports/${reportId}/submit`)
export const approveReport = (reportId, approverId) => apiClient.post(`/api/wsr-reports/${reportId}/approve/${approverId}`)
export const rejectReport = (reportId, approverId, comments) => apiClient.post(`/api/wsr-reports/${reportId}/reject/${approverId}`, null, { params: { comments } })
export const getReportById = (reportId) => apiClient.get(`/api/wsr-reports/${reportId}`)
export const getWsrDetails = (reportId) => apiClient.get(`/api/wsr-reports/${reportId}/details`)