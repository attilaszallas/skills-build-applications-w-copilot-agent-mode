import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

const columns = [
  { label: 'WORKOUT', render: (record) => <strong>{record.title ?? 'Untitled workout'}</strong> },
  { label: 'FOCUS', render: (record) => record.focus ?? '-' },
  {
    label: 'LEVEL',
    render: (record) => <span className={`difficulty difficulty-${record.difficulty ?? 'beginner'}`}>{record.difficulty ?? '-'}</span>,
  },
  { label: 'DURATION', render: (record) => `${record.durationMinutes ?? '-'} min` },
  { label: 'DETAILS', render: (record) => record.description ?? '-' },
]

function Workouts() {
  return (
    <CollectionPage
      title="Workout library"
      description="A starting point for your next session, whatever your level."
      resource="workouts"
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Workouts