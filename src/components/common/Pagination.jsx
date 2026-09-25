export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages < 2) return null
  return <nav aria-label="Pagination"><ul className="pagination justify-content-end mb-0">
    <li className={`page-item ${page === 0 ? 'disabled' : ''}`}><button className="page-link" onClick={() => onChange(page - 1)} disabled={page === 0}>Previous</button></li>
    {Array.from({ length: totalPages }, (_, index) => <li className={`page-item ${page === index ? 'active' : ''}`} key={index}><button className="page-link" onClick={() => onChange(index)}>{index + 1}</button></li>)}
    <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => onChange(page + 1)} disabled={page === totalPages - 1}>Next</button></li>
  </ul></nav>
}