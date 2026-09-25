export const errorMessage = (error) => {
  const status = error?.response?.status
  if (status === 401) return 'Your session has expired. Please sign in again.'
  if (status === 403) return 'You do not have permission to perform this action.'
  if (status === 404) return 'The requested resource was not found.'
  if (status >= 500) return 'Something went wrong on the server. Please try again.'
  return error?.response?.data?.message || (error?.request ? 'Unable to connect to the server. Please try again.' : 'Something went wrong. Please try again.')
}