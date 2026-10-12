import type { ResourceStatus } from '@/api'
import { Badge, type BadgeVariant } from '@/design-system'

const STATUS_BADGE: Record<ResourceStatus, { variant: BadgeVariant; label: string }> = {
  draft: { variant: 'neutral', label: 'Draft' },
  completed: { variant: 'success', label: 'Completed' },
}

export const StatusBadge = ({ status }: { status: ResourceStatus }) => {
  const { variant, label } = STATUS_BADGE[status]
  return <Badge variant={variant}>{label}</Badge>
}
