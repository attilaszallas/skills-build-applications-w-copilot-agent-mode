import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : '/api/users/'

const columns = [
  { label: 'NAME', render: (record) => <strong>{record.name ?? 'Unnamed athlete'}</strong> },
  { label: 'USERNAME', render: (record) => record.username ? `@${record.username}` : '-' },
  { label: 'EMAIL', render: (record) => record.email ?? '-' },
]

function Users() {
  return (
    <CollectionPage
      title="Athletes"
      description="The people behind every logged session and personal best."
      resource="users"
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Users