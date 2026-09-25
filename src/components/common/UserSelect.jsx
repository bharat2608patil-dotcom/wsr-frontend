import { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/modules/usersApi'
import { useApi } from '../../hooks/useApi'

let usersPromise

export default function UserSelect({ label, name, value, onChange, required = false }) {
  const { run, loading } = useApi(); const [users, setUsers] = useState([])
  useEffect(() => { let active = true; if (!usersPromise) usersPromise = run(() => getAllUsers({ page: 0, size: 100, sortBy: 'userId' })).then(({ data }) => data?.content ?? []).catch((error) => { usersPromise = undefined; throw error }); usersPromise.then((items) => { if (active) setUsers(items) }).catch(() => {}); return () => { active = false } }, [run])
  return <div className="mb-3"><label className="form-label" htmlFor={name}>{label}{required && ' *'}</label><select className="form-select" id={name} name={name} value={value ?? ''} onChange={(event) => onChange({ ...event, target: { ...event.target, value: event.target.value ? Number(event.target.value) : '' } })} required={required} disabled={loading}><option value="">{loading ? 'Loading users...' : `Select ${label.toLowerCase()}`}</option>{users.map((user) => <option value={user.userId} key={user.userId}>{[user.firstName, user.lastName].filter(Boolean).join(' ')} ({user.employeeId})</option>)}</select></div>
}
