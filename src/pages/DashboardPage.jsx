import { useEffect, useState } from 'react'
import { getExecutiveDashboard } from '../api/modules/dashboardsApi'
import { unwrap } from '../api/apiResponse'
import { useApi } from '../hooks/useApi'
import { Feedback, Loading } from '../components/common/Feedback'
const metrics = [['greenProjects', 'Green projects'], ['amberProjects', 'Amber projects'], ['redProjects', 'Red projects'], ['portfolioCapacity', 'Portfolio capacity'], ['customerHealthAlerts', 'Customer health alerts']]
export default function DashboardPage() { const request = useApi(); const [data, setData] = useState({}); // eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { request.run(getExecutiveDashboard).then(({ response }) => setData(unwrap(response) || {})).catch(() => {}) }, [request.run]); return <section><div className="mb-4"><p className="eyebrow mb-1">Executive view</p><h1 className="h2 mb-1">Portfolio dashboard</h1><p className="text-secondary">A current read on project health and customer attention.</p></div><Feedback error={request.error} success={request.success} />{request.loading ? <Loading /> : <div className="row g-3">{metrics.map(([key, label]) => <div className="col-12 col-sm-6 col-xl" key={key}><div className="metric-card h-100"><span className="text-secondary small">{label}</span><strong>{data[key] ?? '—'}</strong></div></div>)}</div>}</section> }