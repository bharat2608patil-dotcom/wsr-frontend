import { EmptyState, Loading } from './Feedback'

export default function DataTable({ columns, rows, loading, emptyMessage, actions }) {
  if (loading) return <Loading />
  if (!rows.length) return <EmptyState message={emptyMessage} />
  return <div className="table-responsive">
    <table className="table table-hover align-middle mb-0">
      <thead><tr>{columns.map((column) => <th scope="col" key={column.key}>{column.label}</th>)}{actions && <th scope="col">Actions</th>}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.id ?? row.userId ?? row.teamId ?? row.projectId ?? row.wsrReportId}>
        {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key] ?? '—'}</td>)}
        {actions && <td className="text-nowrap">{actions(row)}</td>}
      </tr>)}</tbody>
    </table>
  </div>
}