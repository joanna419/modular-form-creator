import styled from 'styled-components'
import { Badge, Button, Card } from '@/design-system'

interface ModuleCardProps {
  /** Position in the workflow (Basic Info comes before Project Details). */
  step: number
  title: string
  isComplete: boolean
  actionLabel: string
  onEdit: () => void
  /** Module has buffered (not yet submitted) edits. */
  isEdited?: boolean
  locked?: boolean
  lockedReason?: string
}

export const ModuleCard = ({
  step,
  title,
  isComplete,
  actionLabel,
  onEdit,
  isEdited = false,
  locked = false,
  lockedReason,
}: ModuleCardProps) => (
  <StepCard variant="outline" $locked={locked}>
    <Header>
      <TitleRow>
        <StepMarker $isComplete={isComplete} aria-hidden="true">
          {isComplete ? '✓' : step}
        </StepMarker>
        <Title>{title}</Title>
      </TitleRow>
      <Badges>
        {isEdited && <Badge variant="warning">Edited</Badge>}
        <Badge variant={isComplete ? 'success' : 'neutral'}>
          {isComplete ? 'Complete' : 'Incomplete'}
        </Badge>
      </Badges>
    </Header>

    {locked && lockedReason && <LockNote>{lockedReason}</LockNote>}

    <Button variant="secondary" onClick={onEdit} disabled={locked}>
      {actionLabel}
    </Button>
  </StepCard>
)

const StepCard = styled(Card)<{ $locked: boolean }>`
  opacity: ${({ $locked }) => ($locked ? 0.7 : 1)};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme, $locked }) => ($locked ? 'none' : theme.shadows.card)};
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const StepMarker = styled.span<{ $isComplete: boolean }>`
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  background: ${({ theme, $isComplete }) =>
    $isComplete ? theme.colors.success : theme.colors.primary};
  transition: background 0.3s ease;
`

const Title = styled.h2`
  font-size: 1.125rem;
`

const Badges = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const LockNote = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.875rem;
`
