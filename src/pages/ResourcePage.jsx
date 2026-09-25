import { useCallback, useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { usePagination } from '../hooks/usePagination'
import { pageOf } from '../api/apiResponse'
import DataTable from '../components/common/DataTable'
import Pagination from '../components/common/Pagination'
import ConfirmModal from '../components/common/ConfirmModal'
import FormField from '../components/common/FormField'
import { Feedback } from '../components/common/Feedback'

export default function ResourcePage({ title, description, api, idKey, columns, createFields, updateFields, emptyMessage }) {
  const { page, pageSize, setPage, reset } = usePagination()
  const { run, ...request } = useApi()
  const [records, setRecords] = useState([])
  const [meta, setMeta] = useState({ totalPages: 0, totalElements: 0 })
  const [form, setForm] = useState(null)
  const [remove, setRemove] = useState(null)

  const load = useCallback(async () => {
    try {
      const result = await run(() => api.list({ page, size: pageSize, ...(api.sortBy ? { sortBy: api.sortBy } : {}) }), `Loaded ${title.toLowerCase()}`)
      const responsePage = pageOf(result.response)
      setRecords(responsePage.content)
      setMeta(responsePage)
    } catch { /* feedback is rendered by the hook */ }
  }, [api, page, pageSize, run, title])
  // The request synchronizes the page with backend data when its zero-based page changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load() }, [load])

  const submit = async (event) => {
    event.preventDefault()
    const fields = form.mode === 'create' ? createFields : updateFields
    const payload = Object.fromEntries(fields.map(({ name, type }) => [name, type === 'boolean' ? form.values[name] === 'true' : form.values[name] ?? '']))
    try { await run(() => form.mode === 'create' ? api.create(payload) : api.update(form.values[idKey], payload), `${title} saved`); setForm(null); reset(); load() } catch { /* feedback is rendered by the hook */ }
  }
  const destroy = async () => { try { await run(() => api.remove(remove[idKey]), `${title} deleted`); setRemove(null); load() } catch { /* feedback is rendered by the hook */ } }
  const begin = (mode, item = {}) => setForm({ mode, values: { ...item } })

  return <section><div className="d-flex flex-wrap gap-3 justify-content-between align-items-start mb-4"><div><p className="eyebrow mb-1">Operations</p><h1 className="h2 mb-1">{title}</h1><p className="text-secondary mb-0">{description}</p></div><button className="btn btn-primary" onClick={() => begin('create')}>Create {title.slice(0, -1)}</button></div><Feedback error={request.error} success={request.success} />
    <div className="card border-0 shadow-sm"><DataTable columns={columns} rows={records} loading={request.loading && !form && !remove} emptyMessage={emptyMessage} actions={(row) => <><button className="btn btn-sm btn-outline-primary me-2" onClick={() => begin('edit', row)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={() => setRemove(row)}>Delete</button></>} /></div><div className="d-flex justify-content-between align-items-center mt-3"><small className="text-secondary">{meta.totalElements} total records</small><Pagination page={page} totalPages={meta.totalPages} onChange={setPage} /></div>
    {form && <div className="modal d-block" role="dialog" aria-modal="true"><div className="modal-dialog modal-lg modal-dialog-centered"><form className="modal-content" onSubmit={submit}><div className="modal-header"><h2 className="modal-title fs-5">{form.mode === 'create' ? `Create ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}</h2><button type="button" className="btn-close" onClick={() => setForm(null)} aria-label="Close" /></div><div className="modal-body row">{(form.mode === 'create' ? createFields : updateFields).map((field) => <div className="col-md-6" key={field.name}><FormField {...field} value={form.values[field.name]} onChange={(event) => setForm({ ...form, values: { ...form.values, [field.name]: field.type === 'number' ? Number(event.target.value) : event.target.value } })} /></div>)}</div><div className="modal-footer"><button type="button" className="btn btn-outline-secondary" onClick={() => setForm(null)}>Cancel</button><button className="btn btn-primary" disabled={request.loading}>{request.loading ? 'Saving...' : 'Save'}</button></div></form></div></div>}
    <ConfirmModal open={Boolean(remove)} title={`Delete ${title.slice(0, -1)}`} message={`This will permanently delete the selected ${title.slice(0, -1).toLowerCase()}.`} onCancel={() => setRemove(null)} onConfirm={destroy} loading={request.loading} />
  </section>
}