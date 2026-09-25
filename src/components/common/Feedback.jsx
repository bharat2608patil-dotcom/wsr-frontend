export function Loading({ label = 'Loading...' }) {
  return <div className="d-flex justify-content-center align-items-center gap-2 py-5 text-secondary"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />{label}</div>
}

export function Feedback({ error, success }) {
  return <>
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    {success && <div className="alert alert-success" role="status">{success}</div>}
  </>
}

export function EmptyState({ message = 'No records found.' }) {
  return <div className="text-center text-secondary py-5">{message}</div>
}