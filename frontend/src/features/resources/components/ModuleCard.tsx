import styled from 'styled-components'
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
    <Header>
      <Title>{title}</Title>
      <Badge variant={isComplete ? 'success' : 'neutral'}>
        {isComplete ? 'Complete' : 'Incomplete'}
      </Badge>
    </Header>

    {locked && lockedReason && <LockNote>{lockedReason}</LockNote>}

    <Button variant="secondary" onClick={onEdit} disabled={locked}>
      {actionLabel}
    </Button>
  </Card>
)

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Title = styled.h2`
  font-size: 1.125rem;
`

const LockNote = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
