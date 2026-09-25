import apiClient from '../axiosClient'

export const getUserNotifications = (userId) => apiClient.get(`/api/notifications/user/${userId}`)
export const markAsRead = (notificationId) => apiClient.patch(`/api/notifications/${notificationId}/read`)