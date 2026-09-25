import { useEffect, useState } from 'react'
import { getDeliveryManagerDashboard, getExecutiveDashboard, getTeamLeadDashboard } from '../api/modules/dashboardsApi'
import { unwrap } from '../api/apiResponse'
import { useApi } from '../hooks/useApi'
import { getSession } from '../utils/authUtils'
import { Loading } from '../components/common/Feedback'

const dashboardDefinitions = {
  executive: { title: 'Portfolio dashboard', eyebrow: 'Executive view', description: 'A current read on project health and customer attention.', metrics: [['greenProjects', 'Green projects'], ['amberProjects', 'Amber projects'], ['redProjects', 'Red projects'], ['portfolioCapacity', 'Portfolio capacity'], ['customerHealthAlerts', 'Customer health alerts']] },
  delivery: { title: 'Delivery dashboard', eyebrow: 'Delivery manager view', description: 'Delivery health and submission compliance for your portfolio.', metrics: [['greenProjects', 'Green projects'], ['amberProjects', 'Amber projects'], ['redProjects', 'Red projects'], ['highRisks', 'High risks'], ['submissionCompliance', 'Submission compliance']] },
  team: { title: 'Team dashboard', eyebrow: 'Team lead view', description: 'Your assigned projects, team capacity, and open delivery issues.', metrics: [['assignedProjects', 'Assigned projects'], ['openRisks', 'Open risks'], ['openBlockers', 'Open blockers'], ['pendingWsrSubmissions', 'Pending WSR submissions'], ['totalTeamSize', 'Team size']] },
}

export default function DashboardPage() {
  const { role, userId } = getSession(); const request = useApi(); const { run } = request; const [data, setData] = useState({})
  const kind = ['ADMIN', 'VP', 'DIRECTOR'].includes(role) ? 'executive' : role === 'DELIVERY_MANAGER' ? 'delivery' : role === 'TEAM_LEAD' ? 'team' : 'personal'; const definition = dashboardDefinitions[kind]
  useEffect(() => { if (kind === 'personal') return; const fetchDashboard = kind === 'executive' ? getExecutiveDashboard : kind === 'delivery' ? () => getDeliveryManagerDashboard(userId) : () => getTeamLeadDashboard(userId); run(fetchDashboard).then(({ response }) => setData(unwrap(response) || {})).catch(() => {}) }, [kind, run, userId])
  if (kind === 'personal') return <section><p className="eyebrow mb-1">Personal view</p><h1 className="h2">Dashboard</h1><div className="alert alert-info mt-4">The backend contract does not expose a personal dashboard endpoint for team members.</div></section>
  return <section><div className="mb-4"><p className="eyebrow mb-1">{definition.eyebrow}</p><h1 className="h2 mb-1">{definition.title}</h1><p className="text-secondary">{definition.description}</p></div>{request.loading ? <Loading /> : <div className="row g-3">{definition.metrics.map(([key, label]) => <div className="col-12 col-sm-6 col-xl" key={key}><div className="metric-card h-100"><span className="text-secondary small">{label}</span><strong>{data[key] ?? '—'}</strong></div></div>)}</div>}</section>
}
