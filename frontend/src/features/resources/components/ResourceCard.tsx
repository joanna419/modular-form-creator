import { Link } from 'react-router-dom'
import type { Resource } from '@/api'
import { Card, IconButton } from '@/design-system'
import { StatusBadge } from '@/features/resources/components/StatusBadge'
import { paths } from '@/routes/paths'

interface ResourceCardProps {
  resource: Resource
  onDelete: (resource: Resource) => void
}

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9Z"
    />
  </svg>
)

export const ResourceCard = ({ resource, onDelete }: ResourceCardProps) => (
  <Card variant="outline">
    <div className="flex items-center justify-between gap-4">
      <Link
        to={paths.resource(resource.resourceId)}
        className="flex min-w-0 items-baseline gap-2"
      >
        <span className="truncate font-semibold text-ink-strong">
          {resource.name}
        </span>
        <span className="text-sm text-ink-muted">#{resource.resourceId}</span>
      </Link>
      <div className="flex shrink-0 items-center gap-4">
        <StatusBadge status={resource.status} />
        <IconButton
          variant="ghost"
          aria-label={`Delete ${resource.name}`}
          onClick={() => onDelete(resource)}
        >
          <TrashIcon />
        </IconButton>
      </div>
    </div>
  </Card>
)
