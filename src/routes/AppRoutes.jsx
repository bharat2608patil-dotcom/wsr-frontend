import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import ForbiddenPage from '../pages/ForbiddenPage'
import LoginPage from '../pages/LoginPage'
import ChangePasswordPage from '../pages/ChangePasswordPage'
import UsersPage from '../pages/UsersPage'
import TeamsPage from '../pages/TeamsPage'
import ProjectsPage from '../pages/ProjectsPage'
import ProjectWorkspacePage from '../pages/ProjectWorkspacePage'
import WsrReportsPage from '../pages/WsrReportsPage'
import WsrReportDetailsPage from '../pages/WsrReportDetailsPage'
import NotificationsPage from '../pages/NotificationsPage'

export default function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/403" element={<ForbiddenPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route element={<ProtectedRoute module="users" />}><Route path="/users" element={<UsersPage />} /></Route>
        <Route element={<ProtectedRoute module="teams" />}><Route path="/teams" element={<TeamsPage />} /></Route>
        <Route element={<ProtectedRoute module="projects" />}><Route path="/projects" element={<ProjectsPage />} /><Route path="/projects/:projectId" element={<ProjectWorkspacePage />} /></Route>
        <Route element={<ProtectedRoute module="wsr" />}><Route path="/wsr-reports" element={<WsrReportsPage />} /><Route path="/wsr-reports/:reportId/details" element={<WsrReportDetailsPage />} /></Route>
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
}
