import { Link } from 'react-router-dom'

export default function ForbiddenPage() {
  return <main className="container py-5"><div className="card border-0 shadow-sm p-5 text-center"><p className="eyebrow mb-2">Authorization</p><h1 className="display-6">403 - Access Denied</h1><p className="text-secondary">You do not have permission to access this page.</p><Link className="btn btn-primary" to="/dashboard">Return to dashboard</Link></div></main>
}
