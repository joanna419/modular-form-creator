import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { ProjectDetails } from '@/api'
import { ModulePageLayout } from '@/features/resources/components/ModulePageLayout'
import { PageState } from '@/features/resources/components/PageState'
import { ProjectDetailsForm } from '@/features/resources/components/ProjectDetailsForm'
import { useEditBuffer } from '@/features/resources/hooks/useEditBuffer'
import { useResource } from '@/features/resources/hooks/useResource'
import { useUpdateProjectDetails } from '@/features/resources/hooks/useResourceMutations'
import { canEditProjectDetails } from '@/features/resources/lib/completion'
import { COMPLETED_EDIT_NOTICE } from '@/features/resources/lib/constants'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

export const ProjectDetailsPage = () => {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const update = useUpdateProjectDetails(resourceId)
  const buffer = useEditBuffer()

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState isError>{getErrorMessage(error, 'Failed to load resource.')}</PageState>
    )
  }

  const isCompleted = resource.status === 'completed'

  // Business rule (draft): Project Details only after Basic Info is complete.
  if (!isCompleted && !canEditProjectDetails(resource)) {
    return <Navigate to={paths.resource(resourceId)} replace />
  }

  const backToOverview = () => navigate(paths.resource(resourceId))

  // Completed: start from buffered edits if any, otherwise from persisted data.
  const projectDetails =
    (isCompleted && buffer.getEdits(resourceId).projectDetails) || resource.projectDetails

  const handleSubmit = (data: ProjectDetails) => {
    if (isCompleted) {
      // Buffer only (persisted later via PUT from the overview).
      buffer.applyModuleEdit(resourceId, 'projectDetails', data, resource.projectDetails)
      backToOverview()
      return
    }

    setSubmitError(null)
    update.mutate(data, {
      onSuccess: backToOverview,
      onError: (err) =>
        setSubmitError(getErrorMessage(err, 'Failed to save Project Details.')),
    })
  }

  return (
    <ModulePageLayout
      resourceId={resourceId}
      title="Project Details"
      submitError={submitError}
      notice={isCompleted ? COMPLETED_EDIT_NOTICE : undefined}
    >
      <ProjectDetailsForm
        defaultValues={projectDetails}
        submitLabel={isCompleted ? 'Apply changes' : 'Save Project Details'}
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </ModulePageLayout>
  )
}
