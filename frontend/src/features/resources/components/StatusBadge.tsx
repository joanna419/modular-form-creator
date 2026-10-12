import { Badge, type BadgeVariant } from '../../../design-system'
import type { ResourceStatus } from '../../../api'

const STATUS_BADGE: Record<
  ResourceStatus,
  { variant: BadgeVariant; label: string }
> = {
  draft: { variant: 'neutral', label: 'Draft' },
  completed: { variant: 'success', label: 'Completed' },
}

export function StatusBadge({ status }: { status: ResourceStatus }) {
  const { variant, label } = STATUS_BADGE[status]
  return <Badge variant={variant}>{label}</Badge>
}
