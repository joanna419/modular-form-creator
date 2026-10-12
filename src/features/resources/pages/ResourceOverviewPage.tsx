import { useParams } from 'react-router-dom'

export function ResourceOverviewPage() {
  const { resourceId } = useParams()
  return <h1>Resource {resourceId} — overview</h1>
}
