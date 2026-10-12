import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '@/api'
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
      <div className="mb-6 flex justify-between">
        <Link to={paths.resources} className="text-ink-muted">
          ← Back to resources
        </Link>
        <Link
          to={paths.resourceDetails(resourceId)}
          className="font-semibold text-primary"
        >
          View details
        </Link>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <h1>{resource.name}</h1>
        <StatusBadge status={resource.status} />
      </div>

      <div className="mb-8 flex flex-col gap-4">
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
      </div>

      <div className="flex items-center gap-4">
        {isDraft ? (
          <>
            <Button
              onClick={() => setConfirmOpen(true)}
              disabled={!provisionable}
            >
              Complete resource
            </Button>
            {!provisionable && (
              <span className="text-sm text-ink-muted">
                Both modules must be complete before provisioning.
              </span>
            )}
          </>
        ) : (
          <span className="text-sm text-ink-muted">
            This resource is completed.
          </span>
        )}
      </div>

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
