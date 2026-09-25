export const getSession = () => ({
  token: localStorage.getItem('wsr_access_token'),
  userId: localStorage.getItem('wsr_user_id'),
  role: localStorage.getItem('wsr_role'),
})

export const isAuthenticated = () => Boolean(getSession().token)

export const clearSession = () => {
  localStorage.removeItem('wsr_access_token')
  localStorage.removeItem('wsr_user_id')
  localStorage.removeItem('wsr_role')
  localStorage.removeItem('wsr_token_type')
}

export const roleMatches = (allowedRoles = []) => {
  const { role } = getSession()
  return Boolean(role && allowedRoles.includes(role))
}
