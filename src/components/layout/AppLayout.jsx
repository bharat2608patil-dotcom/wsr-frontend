import { NavLink, Outlet } from 'react-router-dom'

const links = [['/dashboard', 'Dashboard'], ['/projects', 'Projects'], ['/teams', 'Teams'], ['/users', 'Users'], ['/wsr-reports', 'WSR reports'], ['/notifications', 'Notifications']]

export default function AppLayout() {
  return <div className="app-shell"><header className="navbar navbar-expand-lg bg-dark navbar-dark"><div className="container-fluid px-4"><NavLink className="navbar-brand fw-semibold" to="/dashboard">WSR Control Room</NavLink><button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button><div className="collapse navbar-collapse" id="main-nav"><nav className="navbar-nav ms-auto">{links.map(([to, label]) => <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to} key={to}>{label}</NavLink>)}<NavLink className="nav-link" to="/change-password">Account</NavLink></nav></div></div></header><main className="container-fluid px-3 px-lg-4 py-4"><Outlet /></main></div>
}