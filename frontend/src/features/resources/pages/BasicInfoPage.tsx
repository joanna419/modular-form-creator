import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError, type BasicInfo } from '@/api'
import { BasicInfoForm } from '@/features/resources/components/BasicInfoForm'
import { PageState } from '@/features/resources/components/PageState'
import { useResource } from '@/features/resources/hooks/useResource'
import { useUpdateBasicInfo } from '@/features/resources/hooks/useResourceMutations'
import { paths } from '@/routes/paths'

export const BasicInfoPage = () => {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const update = useUpdateBasicInfo(resourceId)

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState isError>
        {error instanceof ApiError ? error.message : 'Failed to load resource.'}
      </PageState>
    )
  }

  // Completed-resource editing uses the buffered full-update flow (next step).
  if (resource.status === 'completed') {
    return <PageState>Completed resources cannot be edited here yet.</PageState>
  }

  const handleSubmit = (data: BasicInfo) => {
    setSubmitError(null)
    update.mutate(data, {
      onSuccess: () => navigate(paths.resource(resourceId)),
      onError: (err) =>
        setSubmitError(
          err instanceof ApiError ? err.message : 'Failed to save Basic Info.',
        ),
    })
  }

  return (
    <>
      <Link
        to={paths.resource(resourceId)}
        className="mb-6 inline-block text-ink-muted"
      >
        ← Back to overview
      </Link>
      <h1 className="mb-6">Basic Info</h1>
      {submitError && (
        <p role="alert" className="mb-4 text-warning">
          {submitError}
        </p>
      )}
      <BasicInfoForm
        resourceName={resource.basicInfo.resourceName || resource.name}
        defaultValues={{
          owner: resource.basicInfo.owner,
          email: resource.basicInfo.email,
          description: resource.basicInfo.description,
          priority: resource.basicInfo.priority,
        }}
        submitLabel="Save Basic Info"
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </>
  )
}
