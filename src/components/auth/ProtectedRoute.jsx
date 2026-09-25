import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { can } from '../../constants/permissions'
import { getSession } from '../../utils/authUtils'

export default function ProtectedRoute({ module, action = 'view' }) {
  const location = useLocation()
  const session = getSession()
  if (!session.token) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (module && !can(session.role, module, action)) return <Navigate to="/403" replace />
  return <Outlet />
}
