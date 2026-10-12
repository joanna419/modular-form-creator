import { Badge, Button, Card } from '@/design-system'

interface ModuleCardProps {
  title: string
  isComplete: boolean
  actionLabel: string
  onEdit: () => void
  locked?: boolean
  lockedReason?: string
}

export const ModuleCard = ({
  title,
  isComplete,
  actionLabel,
  onEdit,
  locked = false,
  lockedReason,
}: ModuleCardProps) => (
  <Card variant="outline">
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-lg">{title}</h2>
      <Badge variant={isComplete ? 'success' : 'neutral'}>
        {isComplete ? 'Complete' : 'Incomplete'}
      </Badge>
    </div>

    {locked && lockedReason && (
      <p className="mb-4 text-sm text-ink-muted">{lockedReason}</p>
    )}

    <Button variant="secondary" onClick={onEdit} disabled={locked}>
      {actionLabel}
    </Button>
  </Card>
)
