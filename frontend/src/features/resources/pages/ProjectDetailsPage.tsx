import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { ProjectDetails } from '@/api'
import { ModulePageLayout } from '@/features/resources/components/ModulePageLayout'
import { PageState } from '@/features/resources/components/PageState'
import { ProjectDetailsForm } from '@/features/resources/components/ProjectDetailsForm'
import { useResource } from '@/features/resources/hooks/useResource'
import { useUpdateProjectDetails } from '@/features/resources/hooks/useResourceMutations'
import { canEditProjectDetails } from '@/features/resources/lib/completion'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

export const ProjectDetailsPage = () => {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const update = useUpdateProjectDetails(resourceId)

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState isError>
        {getErrorMessage(error, 'Failed to load resource.')}
      </PageState>
    )
  }

  // Completed-resource editing uses the buffered full-update flow (next step).
  if (resource.status === 'completed') {
    return <PageState>Completed resources cannot be edited here yet.</PageState>
  }

  // Business rule: Project Details is available only after Basic Info is complete.
  if (!canEditProjectDetails(resource)) {
    return <Navigate to={paths.resource(resourceId)} replace />
  }

  const handleSubmit = (data: ProjectDetails) => {
    setSubmitError(null)
    update.mutate(data, {
      onSuccess: () => navigate(paths.resource(resourceId)),
      onError: (err) =>
        setSubmitError(getErrorMessage(err, 'Failed to save Project Details.')),
    })
  }

  return (
    <ModulePageLayout
      resourceId={resourceId}
      title="Project Details"
      submitError={submitError}
    >
      <ProjectDetailsForm
        defaultValues={resource.projectDetails}
        submitLabel="Save Project Details"
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </ModulePageLayout>
  )
}
