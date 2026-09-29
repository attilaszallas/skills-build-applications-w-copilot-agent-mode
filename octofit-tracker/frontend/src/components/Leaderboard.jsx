import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

const columns = [
  { label: 'RANK', render: (_record, index) => <span className="rank-number">{String(index + 1).padStart(2, '0')}</span> },
  { label: 'ATHLETE', render: (record) => record.userId?.name ?? record.userId?.username ?? 'Unknown athlete' },
  { label: 'PERIOD', render: (record) => record.period ?? '-' },
  { label: 'POINTS', render: (record) => <strong>{record.points ?? 0}</strong> },
]

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="See how consistency adds up across each training period."
      resource="leaderboard"
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Leaderboard