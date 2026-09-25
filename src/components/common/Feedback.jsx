export function Loading({ label = 'Loading...' }) {
  return <div className="d-flex justify-content-center align-items-center gap-2 py-5 text-secondary"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />{label}</div>
}

export function Feedback() {
  return null
}

export function EmptyState({ message = 'No records found.' }) {
  return <div className="text-center text-secondary py-5">{message}</div>
}