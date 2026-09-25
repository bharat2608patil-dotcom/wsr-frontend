import UserSelect from './UserSelect'
import ReferenceSelect from './ReferenceSelect'

export default function FormField({ label, name, value, onChange, type = 'text', required = false, options, placeholder, userSelect = false, error }) {
  const usesUserSelect = userSelect || ['userId', 'ownerUserId', 'managerId', 'teamLeadId', 'vpId', 'directorId', 'deliveryManagerId'].includes(name)
  if (usesUserSelect) return <UserSelect label={label} name={name} value={value} onChange={onChange} required={required} />
  if (name === 'teamId') return <ReferenceSelect resource="teams" label={label} name={name} value={value} onChange={onChange} required={required} />
  if (name === 'projectId') return <ReferenceSelect resource="projects" label={label} name={name} value={value} onChange={onChange} required={required} />
  const className = `form-control${error ? ' is-invalid' : ''}`
  const control = options
    ? <select className={`form-select${error ? ' is-invalid' : ''}`} id={name} name={name} value={value ?? ''} onChange={onChange} required={required}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option value={option} key={option}>{option.replaceAll('_', ' ')}</option>)}</select>
    : type === 'textarea'
      ? <textarea className={className} id={name} name={name} value={value ?? ''} onChange={onChange} required={required} placeholder={placeholder} rows="3" />
      : <input className={className} id={name} name={name} type={type} value={value ?? ''} onChange={onChange} required={required} placeholder={placeholder} />
  return <div className="mb-3"><label className="form-label" htmlFor={name}>{label}{required && ' *'}</label>{control}{error && <div className="invalid-feedback">{error}</div>}</div>
}
