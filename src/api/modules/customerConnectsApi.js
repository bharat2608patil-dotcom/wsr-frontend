import apiClient from '../axiosClient'

export const createCustomerConnect = (payload) => apiClient.post('/api/customer-connects', payload)
export const getProjectCustomerConnects = (projectId) => apiClient.get(`/api/customer-connects/project/${projectId}`)
export const updateCustomerConnect = (customerConnectId, payload) => apiClient.put(`/api/customer-connects/${customerConnectId}`, payload)
export const deleteCustomerConnect = (customerConnectId) => apiClient.delete(`/api/customer-connects/${customerConnectId}`)