import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '-'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}

const columns = [
  { label: 'ATHLETE', render: (record) => record.userId?.name ?? record.userId?.username ?? 'Unknown athlete' },
  { label: 'ACTIVITY', render: (record) => record.activityType ?? '-' },
  { label: 'DATE', render: (record) => formatDate(record.startedAt) },
  { label: 'DURATION', render: (record) => `${record.durationMinutes ?? '-'} min` },
  { label: 'DISTANCE', render: (record) => `${Number(record.distanceKm ?? 0).toFixed(1)} km` },
  { label: 'CALORIES', render: (record) => `${record.calories ?? '-'} kcal` },
]

function Activities() {
  return (
    <CollectionPage
      title="Activity log"
      description="Recent sessions from across your training community."
      resource="activities"
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Activities