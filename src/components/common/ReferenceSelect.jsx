import { useCallback, useEffect, useState } from 'react'
import { getAllProjects } from '../../api/modules/projectsApi'
import { getAllTeams } from '../../api/modules/teamsApi'
import { useApi } from '../../hooks/useApi'

const loaders = { teams: getAllTeams, projects: getAllProjects }
const caches = { teams: { items: [], page: -1, last: false, promise: null }, projects: { items: [], page: -1, last: false, promise: null } }

const optionText = (resource, item) => resource === 'teams' ? item.teamName : `${item.projectCode} - ${item.projectName}`
const optionId = (resource, item) => resource === 'teams' ? item.teamId : item.projectId

export default function ReferenceSelect({ resource, label, name, value, onChange, required = false }) {
  const { run, loading } = useApi(); const [items, setItems] = useState(caches[resource].items); const cache = caches[resource]
  const loadPage = useCallback((page) => { if (page === 0 && cache.promise) return cache.promise; cache.promise = run(() => loaders[resource]({ page, size: 10, sortBy: resource === 'teams' ? 'teamId' : 'projectId' })).then(({ data }) => { const next = data?.content ?? []; cache.items = page === 0 ? next : [...cache.items, ...next]; cache.page = page; cache.last = data?.last ?? next.length < 10; return cache.items }).catch((error) => { cache.promise = null; throw error }); return cache.promise }, [cache, resource, run])
  useEffect(() => { let active = true; loadPage(0).then((next) => { if (active) setItems(next) }).catch(() => {}); return () => { active = false } }, [loadPage])
  const loadMore = () => loadPage(cache.page + 1).then(setItems).catch(() => {})
  return <div className="mb-3"><label className="form-label" htmlFor={name}>{label}{required && ' *'}</label><select className="form-select" id={name} name={name} value={value ?? ''} onChange={(event) => onChange({ ...event, target: { ...event.target, value: event.target.value ? Number(event.target.value) : '' } })} required={required} disabled={loading}><option value="">{loading ? `Loading ${resource}...` : `Select ${label.toLowerCase()}`}</option>{items.map((item) => <option key={optionId(resource, item)} value={optionId(resource, item)}>{optionText(resource, item)}</option>)}</select>{!cache.last && <button type="button" className="btn btn-link btn-sm px-0" onClick={loadMore} disabled={loading}>Load more {resource}</button>}</div>
}
