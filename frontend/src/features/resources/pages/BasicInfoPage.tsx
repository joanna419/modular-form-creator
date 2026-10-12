import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { BasicInfo } from '@/api'
import { BasicInfoForm } from '@/features/resources/components/BasicInfoForm'
import { ModulePageLayout } from '@/features/resources/components/ModulePageLayout'
import { PageState } from '@/features/resources/components/PageState'
import { useResource } from '@/features/resources/hooks/useResource'
import { useUpdateBasicInfo } from '@/features/resources/hooks/useResourceMutations'
import { getErrorMessage } from '@/features/resources/lib/errors'
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
        {getErrorMessage(error, 'Failed to load resource.')}
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
        setSubmitError(getErrorMessage(err, 'Failed to save Basic Info.')),
    })
  }

  const { resourceName, ...editableFields } = resource.basicInfo

  return (
    <ModulePageLayout
      resourceId={resourceId}
      title="Basic Info"
      submitError={submitError}
    >
      <BasicInfoForm
        resourceName={resourceName || resource.name}
        defaultValues={editableFields}
        submitLabel="Save Basic Info"
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </ModulePageLayout>
  )
}
