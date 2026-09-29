import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'TEAM', render: (record) => <strong>{record.name ?? 'Unnamed team'}</strong> },
  { label: 'ABOUT', render: (record) => record.description ?? '-' },
  {
    label: 'MEMBERS',
    render: (record) => Array.isArray(record.memberIds)
      ? record.memberIds.map((member) => member.name ?? member.username ?? 'Member').join(', ') || 'No members'
      : '-',
  },
]

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Find your crew and the people keeping each other moving."
      resource="teams"
      columns={columns}
    />
  )
}

export default Teams