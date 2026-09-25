export default function ConfirmModal({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null
  return <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
    <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
      <div className="modal-header"><h2 className="modal-title fs-5" id="confirm-title">{title}</h2><button type="button" className="btn-close" onClick={onCancel} aria-label="Close" /></div>
      <div className="modal-body">{message}</div>
      <div className="modal-footer"><button className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button><button className="btn btn-danger" onClick={onConfirm} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button></div>
    </div></div>
  </div>
}