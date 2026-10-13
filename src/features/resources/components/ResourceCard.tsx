import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Resource, ResourceStatus } from '@/api'
import { media } from '@/app/media'
import { Card, IconButton } from '@/design-system'
import { ModuleProgress } from '@/features/resources/components/ModuleProgress'
import { StatusBadge } from '@/features/resources/components/StatusBadge'
import { countCompletedModules } from '@/features/resources/lib/completion'
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
  <HoverCard variant="outline" $status={resource.status}>
    <Row>
      <Info>
        <TextLink to={paths.resource(resource.resourceId)}>
          <Name>{resource.name}</Name>
          <Id>#{resource.resourceId}</Id>
        </TextLink>
        <ModuleProgress completed={countCompletedModules(resource)} />
      </Info>
      <Actions>
        <StatusBadge status={resource.status} />
        <IconButton
          variant="ghost"
          aria-label={`Delete ${resource.name}`}
          onClick={() => onDelete(resource)}
        >
          <TrashIcon />
        </IconButton>
      </Actions>
    </Row>
  </HoverCard>
)

// Extends the design-system Card through its public className passthrough.
const HoverCard = styled(Card)<{ $status: ResourceStatus }>`
  position: relative;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  /* Status accent stripe. */
  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: ${({ theme, $status }) =>
      $status === 'completed' ? theme.colors.success : theme.colors.primary};
  }

  &:hover,
  &:focus-within {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.raised};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.mobile} {
    flex-wrap: wrap;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`

const TextLink = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;

  /* Stretched link: the whole card is clickable, the delete button sits above it. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`

const Name = styled.span`
  font-weight: 600;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.inkStrong};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Id = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.875rem;
`

const Actions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`
