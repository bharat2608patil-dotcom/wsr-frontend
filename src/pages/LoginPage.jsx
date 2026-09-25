import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/modules/authApi'
import { useApi } from '../hooks/useApi'
import FormField from '../components/common/FormField'
import { Feedback } from '../components/common/Feedback'

export default function LoginPage() {
  const navigate = useNavigate(); const request = useApi(); const [form, setForm] = useState({ email: '', password: '' })
  const submit = async (event) => { event.preventDefault(); try { const result = await request.run(() => login(form), 'Signed in'); const token = result.data?.accessToken; if (token) localStorage.setItem('wsr_access_token', token); if (result.data?.userId) localStorage.setItem('wsr_user_id', String(result.data.userId)); if (result.data?.role) localStorage.setItem('wsr_role', result.data.role); navigate('/dashboard') } catch { /* displayed below */ } }
  return <main className="auth-page d-flex align-items-center justify-content-center p-3"><form className="card border-0 shadow-sm p-4 auth-card" onSubmit={submit}><p className="eyebrow mb-1">WSR management</p><h1 className="h3 mb-4">Sign in</h1><Feedback error={request.error} success={request.success} /><FormField label="Email" name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /><FormField label="Password" name="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /><button className="btn btn-primary w-100" disabled={request.loading}>{request.loading ? 'Signing in...' : 'Sign in'}</button></form></main>
}