import { useParams } from 'react-router-dom'

export function ResourceDetailsPage() {
  const { resourceId } = useParams()
  return <h1>Resource {resourceId} — details</h1>
}
