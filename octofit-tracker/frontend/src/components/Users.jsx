import CollectionPage from './CollectionPage.jsx'

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
      columns={columns}
    />
  )
}

export default Users