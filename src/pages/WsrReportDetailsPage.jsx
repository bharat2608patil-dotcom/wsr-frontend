import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWsrDetails } from '../api/modules/wsrReportsApi'
import { unwrap } from '../api/apiResponse'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/common/DataTable'
import { EmptyState, Loading } from '../components/common/Feedback'

const display = (value) => value === null || value === undefined || value === '' ? 'N/A' : value
const dateTime = (value) => value ? new Date(value).toLocaleString() : 'N/A'

function Summary({ report }) {
  const fields = [['WSR Report ID', report.wsrReportId], ['Project', report.projectName], ['Project Code', report.projectCode], ['Reporting Week', report.reportingWeek], ['Status', report.status], ['Submitted By', report.submittedBy], ['Approved By', report.approvedBy], ['Submission Date', dateTime(report.submissionDate)], ['Approval Date', dateTime(report.approvalDate)], ['Rejection Comments', report.rejectionComments]]
  return <div className="card border-0 shadow-sm"><div className="card-header bg-white"><h2 className="h5 mb-0">Report summary</h2></div><dl className="row p-3 mb-0">{fields.map(([label, value]) => <div className="col-12 col-md-6 mb-3" key={label}><dt className="small text-secondary">{label}</dt><dd className="mb-0">{display(value)}</dd></div>)}</dl></div>
}

export default function WsrReportDetailsPage() {
  const { reportId } = useParams(); const { run, loading, error } = useApi(); const [report, setReport] = useState(null)
  useEffect(() => { run(() => getWsrDetails(reportId)).then(({ response }) => setReport(unwrap(response))).catch(() => {}) }, [reportId, run])
  if (loading) return <Loading />
  if (!report) return <div className="alert alert-danger" role="alert">{error || 'WSR report details are unavailable.'}</div>
  const stats = [['Total Achievements', report.totalAchievements], ['Total Risks', report.totalRisks], ['Total Blockers', report.totalBlockers], ['High Risk Count', report.highRiskCount], ['Critical Risk Count', report.criticalRiskCount], ['Open Blocker Count', report.openBlockerCount], ['Escalation Raised Count', report.escalationRaisedCount]]
  return <section><div className="mb-4"><p className="eyebrow mb-1">WSR report details</p><h1 className="h2 mb-1">{display(report.projectName)}</h1><p className="text-secondary">{display(report.projectCode)} · {display(report.reportingWeek)}</p></div>{error && <div className="alert alert-danger">{error}</div>}<Summary report={report} /><div className="row g-3 my-1">{stats.map(([label, value]) => <div className="col-6 col-md-3" key={label}><div className="metric-card h-100"><span className="text-secondary small">{label}</span><strong>{display(value)}</strong></div></div>)}</div><div className="row g-4 mt-1"><DetailTable title="Achievements" columns={[{ key: 'achievementId', label: 'ID' }, { key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }, { key: 'businessImpact', label: 'Business impact' }]} rows={report.achievements} /><DetailTable title="Risks" columns={[{ key: 'riskId', label: 'ID' }, { key: 'title', label: 'Title' }, { key: 'description', label: 'Description' }, { key: 'riskType', label: 'Type' }, { key: 'riskStatus', label: 'Status' }, { key: 'severity', label: 'Severity' }, { key: 'probability', label: 'Probability' }, { key: 'impact', label: 'Impact' }, { key: 'riskScore', label: 'Score' }, { key: 'ownerName', label: 'Owner' }, { key: 'mitigationPlan', label: 'Mitigation plan' }, { key: 'targetDate', label: 'Target date' }]} rows={report.risks} /><DetailTable title="Blockers" columns={[{ key: 'blockerId', label: 'ID' }, { key: 'description', label: 'Description' }, { key: 'severity', label: 'Severity' }, { key: 'status', label: 'Status' }, { key: 'ownerName', label: 'Owner' }, { key: 'raisedDate', label: 'Raised date' }, { key: 'targetResolutionDate', label: 'Target resolution' }]} rows={report.blockers} /><DetailTable title="Customer connects" columns={[{ key: 'customerConnectId', label: 'ID' }, { key: 'lastMeetingDate', label: 'Last meeting' }, { key: 'nextMeetingDate', label: 'Next meeting' }, { key: 'meetingFrequency', label: 'Frequency' }, { key: 'customerFeedback', label: 'Feedback' }, { key: 'escalationRaised', label: 'Escalation' }]} rows={report.customerConnects} emptyMessage="No customer connects available." /></div></section>
}

function DetailTable({ title, columns, rows = [], emptyMessage = `No ${title.toLowerCase()} available.` }) {
  return <div className="col-12"><div className="card border-0 shadow-sm"><div className="card-header bg-white"><h2 className="h5 mb-0">{title}</h2></div>{rows.length ? <DataTable columns={columns.map((column) => ({ ...column, render: (row) => display(row[column.key]) }))} rows={rows} loading={false} emptyMessage={emptyMessage} /> : <EmptyState message={emptyMessage} />}</div></div>
}
