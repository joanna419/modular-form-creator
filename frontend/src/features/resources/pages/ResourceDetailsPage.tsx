import { useParams } from 'react-router-dom'

export const ResourceDetailsPage = () => {
  const { resourceId } = useParams()
  return <h1>Resource {resourceId} — details</h1>
}
