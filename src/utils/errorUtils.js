export const errorMessage = (error) =>
  error?.response?.data?.message || (error?.request ? 'Unable to reach the backend service.' : 'Something went wrong. Please try again.')