import { useCallback, useMemo, useState } from 'react'
import { ToastContext } from './toastContext'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const show = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((current) => [...current, { id, message, type }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4500)
  }, [])
  const dismiss = useCallback((id) => setToasts((current) => current.filter((toast) => toast.id !== id)), [])
  const value = useMemo(() => ({ show, dismiss }), [dismiss, show])
  return <ToastContext.Provider value={value}>
    {children}
    <div className="toast-container position-fixed top-0 end-0 p-3" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => <div className={`toast show text-bg-${toast.type === 'error' ? 'danger' : toast.type}`} role="alert" key={toast.id}><div className="d-flex"><div className="toast-body">{toast.message}</div><button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => dismiss(toast.id)} aria-label="Dismiss" /></div></div>)}
    </div>
  </ToastContext.Provider>
}

