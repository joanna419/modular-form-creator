import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
    <Row>
      <TextLink to={paths.resource(resource.resourceId)}>
        <Name>{resource.name}</Name>
        <Id>#{resource.resourceId}</Id>
      </TextLink>
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
  </Card>
)

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

const TextLink = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`

const Name = styled.span`
  font-weight: 600;
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
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`
