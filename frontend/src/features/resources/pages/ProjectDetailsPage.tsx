import { useParams } from 'react-router-dom'

export function ProjectDetailsPage() {
  const { resourceId } = useParams()
  return <h1>Resource {resourceId} — Project Details</h1>
}
