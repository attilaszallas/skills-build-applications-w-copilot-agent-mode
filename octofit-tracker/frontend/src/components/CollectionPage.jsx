import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function CollectionPage({ title, description, resource, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        const items = await fetchCollection(resource, controller.signal)
        setRecords(items)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [resource])

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER / {resource.toUpperCase()}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <span>{loading ? '...' : records.length}</span>
          <small>{loading ? 'LOADING' : 'RECORDS'}</small>
        </div>
      </div>

      <div className="table-wrap">
        {loading && <p className="table-message">Loading {title.toLowerCase()}...</p>}
        {!loading && error && (
          <div className="table-message error-message" role="alert">
            <strong>Could not load {title.toLowerCase()}.</strong>
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && records.length === 0 && (
          <p className="table-message">No {title.toLowerCase()} to show yet.</p>
        )}
        {!loading && !error && records.length > 0 && (
          <div className="table-responsive">
            <table className="table collection-table">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id ?? record.id ?? `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>{column.render(record, index)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionPage