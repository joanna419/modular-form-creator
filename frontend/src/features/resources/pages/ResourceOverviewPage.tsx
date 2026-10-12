import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ApiError } from '../../../api'
import { Button } from '../../../design-system'
import { paths } from '../../../routes/paths'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { ModuleCard } from '../components/ModuleCard'
import { PageState } from '../components/PageState'
import { StatusBadge } from '../components/StatusBadge'
import { useResource } from '../hooks/useResource'
import { useProvisionResource } from '../hooks/useResourceMutations'
import {
  canProvision,
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '../lib/completion'

export function ResourceOverviewPage() {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const provision = useProvisionResource()

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState role="alert">
        {error instanceof ApiError ? error.message : 'Failed to load resource.'}
      </PageState>
    )
  }

  const isDraft = resource.status === 'draft'
  const basicComplete = isBasicInfoComplete(resource.basicInfo)
  const projectLocked = isDraft && !basicComplete
  const provisionable = canProvision(resource)

  const confirmProvision = () => {
    provision.mutate(resourceId, {
      onSuccess: () => setConfirmOpen(false),
    })
  }

  return (
    <>
      <TopBar>
        <BackLink to={paths.resources}>← Back to resources</BackLink>
        <DetailsLink to={paths.resourceDetails(resourceId)}>
          View details
        </DetailsLink>
      </TopBar>

      <Header>
        <Name>{resource.name}</Name>
        <StatusBadge status={resource.status} />
      </Header>

      <Modules>
        <ModuleCard
          title="Basic Info"
          isComplete={basicComplete}
          actionLabel="Edit Basic Info"
          onEdit={() => navigate(paths.basicInfo(resourceId))}
        />
        <ModuleCard
          title="Project Details"
          isComplete={isProjectDetailsComplete(resource.projectDetails)}
          actionLabel="Edit Project Details"
          onEdit={() => navigate(paths.projectDetails(resourceId))}
          locked={projectLocked}
          lockedReason="Complete Basic Info first"
        />
      </Modules>

      {isDraft ? (
        <Provisioning>
          <Button
            onClick={() => setConfirmOpen(true)}
            disabled={!provisionable}
          >
            Complete resource
          </Button>
          {!provisionable && (
            <Hint>Both modules must be complete before provisioning.</Hint>
          )}
        </Provisioning>
      ) : (
        <Provisioning>
          <Hint>This resource is completed.</Hint>
        </Provisioning>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Complete resource"
        message={
          <>
            Provision <strong>{resource.name}</strong> and mark it as completed?
            After this, modules can no longer be edited directly.
          </>
        }
        confirmLabel="Complete"
        busyLabel="Completing…"
        isBusy={provision.isPending}
        onConfirm={confirmProvision}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  )
}

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.inkMuted};
  text-decoration: none;
`

const DetailsLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Name = styled.h1`
  margin: 0;
`

const Modules = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Provisioning = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const Hint = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.875rem;
`
