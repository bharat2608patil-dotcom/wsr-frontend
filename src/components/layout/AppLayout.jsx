import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../api/modules/authApi'
import { can } from '../../constants/permissions'
import { useApi } from '../../hooks/useApi'
import { clearSession, getSession } from '../../utils/authUtils'
import { Feedback, Loading } from '../common/Feedback'

const links = [
  ['/dashboard', 'Dashboard'], ['/projects', 'Projects', 'projects'], ['/teams', 'Teams', 'teams'],
  ['/users', 'Users', 'users'], ['/wsr-reports', 'WSR reports', 'wsr'], ['/notifications', 'Notifications'],
]

export default function AppLayout() {
  const navigate = useNavigate(); const [menuOpen, setMenuOpen] = useState(false); const [accountOpen, setAccountOpen] = useState(false); const [profile, setProfile] = useState(null); const request = useApi(); const session = getSession()
  const openAccount = async () => { setAccountOpen(true); if (!profile) { try { const result = await request.run(getCurrentUser, 'Profile loaded'); setProfile(result.data) } catch { /* toast handles the error */ } } }
  const logout = () => { clearSession(); setAccountOpen(false); navigate('/login', { replace: true }) }
  const visibleLinks = links.filter(([, , module]) => !module || can(session.role, module, 'view'))
  return <div className="app-shell"><header className="navbar navbar-expand-lg bg-dark navbar-dark"><div className="container-fluid px-4"><NavLink className="navbar-brand fw-semibold" to="/dashboard" onClick={() => setMenuOpen(false)}>WSR Control Room</NavLink><button className="navbar-toggler d-lg-none" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button><div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="main-nav"><nav className="navbar-nav ms-auto align-items-lg-center">{visibleLinks.map(([to, label]) => <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to} key={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}<button className="nav-link btn btn-link text-start" type="button" onClick={() => { setMenuOpen(false); openAccount() }}>Account</button></nav></div></div></header><main className="container-fluid px-3 px-lg-4 py-4"><Outlet /></main>{accountOpen && <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="account-title"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h2 className="modal-title fs-5" id="account-title">Account</h2><button type="button" className="btn-close" onClick={() => setAccountOpen(false)} aria-label="Close" /></div><div className="modal-body">{request.loading && !profile ? <Loading label="Loading profile..." /> : <><Feedback error={request.error} />{profile && <dl className="row mb-0"><dt className="col-5">User ID</dt><dd className="col-7">{profile.userId ?? session.userId}</dd><dt className="col-5">Email</dt><dd className="col-7">{profile.email ?? session.email ?? '—'}</dd><dt className="col-5">Role</dt><dd className="col-7">{profile.role ?? session.role ?? '—'}</dd><dt className="col-5">Name</dt><dd className="col-7">{[profile.firstName, profile.lastName].filter(Boolean).join(' ') || '—'}</dd><dt className="col-5">Team</dt><dd className="col-7">{profile.teamName ?? '—'}</dd></dl>}</>}</div><div className="modal-footer"><button className="btn btn-outline-secondary" onClick={() => { setAccountOpen(false); navigate('/change-password') }}>Change password</button><button className="btn btn-danger" onClick={logout}>Logout</button></div></div></div></div>}</div>
}
