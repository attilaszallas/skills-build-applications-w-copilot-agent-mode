const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export async function fetchCollection(resource, signal, endpoint = `${apiBaseUrl}/${resource}/`) {
  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  throw new Error('The API returned an unsupported collection response.')
}