import { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/modules/usersApi'
import { useApi } from '../../hooks/useApi'

let usersPromise
let usersCache = []
let usersPage = -1
let usersLast = false

const loadUsers = (run, page) => {
  if (page === 0 && usersPromise) return usersPromise
  usersPromise = run(() => getAllUsers({ page, size: 10, sortBy: 'userId' })).then(({ data }) => {
    const items = data?.content ?? []
    usersCache = page === 0 ? items : [...usersCache, ...items]
    usersPage = page
    usersLast = data?.last ?? items.length < 10
    return usersCache
  }).catch((error) => { usersPromise = undefined; throw error })
  return usersPromise
}

export default function UserSelect({ label, name, value, onChange, required = false }) {
  const { run, loading } = useApi(); const [users, setUsers] = useState([])
  useEffect(() => { let active = true; loadUsers(run, 0).then((items) => { if (active) setUsers(items) }).catch(() => {}); return () => { active = false } }, [run])
  const loadMore = () => loadUsers(run, usersPage + 1).then(setUsers).catch(() => {})
  return <div className="mb-3"><label className="form-label" htmlFor={name}>{label}{required && ' *'}</label><select className="form-select" id={name} name={name} value={value ?? ''} onChange={(event) => onChange({ ...event, target: { ...event.target, value: event.target.value ? Number(event.target.value) : '' } })} required={required} disabled={loading}><option value="">{loading ? 'Loading users...' : `Select ${label.toLowerCase()}`}</option>{users.map((user) => <option value={user.userId} key={user.userId}>{[user.firstName, user.lastName].filter(Boolean).join(' ')} ({user.employeeId})</option>)}</select>{!usersLast && <button type="button" className="btn btn-link btn-sm px-0" onClick={loadMore} disabled={loading}>Load more users</button>}</div>
}
