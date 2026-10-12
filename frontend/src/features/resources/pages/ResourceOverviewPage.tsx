import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/design-system'
import { ConfirmDialog } from '@/features/resources/components/ConfirmDialog'
import { ModuleCard } from '@/features/resources/components/ModuleCard'
import { PageState } from '@/features/resources/components/PageState'
import { StatusBadge } from '@/features/resources/components/StatusBadge'
import { useResource } from '@/features/resources/hooks/useResource'
import { useProvisionResource } from '@/features/resources/hooks/useResourceMutations'
import {
  canProvision,
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '@/features/resources/lib/completion'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

export const ResourceOverviewPage = () => {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const provision = useProvisionResource()

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState isError>
        {getErrorMessage(error, 'Failed to load resource.')}
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
        <h1>{resource.name}</h1>
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

      <Provisioning>
        {isDraft ? (
          <>
            <Button
              onClick={() => setConfirmOpen(true)}
              disabled={!provisionable}
            >
              Complete resource
            </Button>
            {!provisionable && (
              <Hint>Both modules must be complete before provisioning.</Hint>
            )}
          </>
        ) : (
          <Hint>This resource is completed.</Hint>
        )}
      </Provisioning>

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
`

const DetailsLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
