import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { BasicInfo } from '@/api'
import { BasicInfoForm } from '@/features/resources/components/BasicInfoForm'
import { ModulePageLayout } from '@/features/resources/components/ModulePageLayout'
import { PageState } from '@/features/resources/components/PageState'
import { useEditBuffer } from '@/features/resources/hooks/useEditBuffer'
import { useResource } from '@/features/resources/hooks/useResource'
import { useUpdateBasicInfo } from '@/features/resources/hooks/useResourceMutations'
import { COMPLETED_EDIT_NOTICE } from '@/features/resources/lib/constants'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

export const BasicInfoPage = () => {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const update = useUpdateBasicInfo(resourceId)
  const buffer = useEditBuffer()

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState isError>{getErrorMessage(error, 'Failed to load resource.')}</PageState>
    )
  }

  const isCompleted = resource.status === 'completed'
  const backToOverview = () => navigate(paths.resource(resourceId))

  // Completed: start from buffered edits if any, otherwise from persisted data.
  const basicInfo =
    (isCompleted && buffer.getEdits(resourceId).basicInfo) || resource.basicInfo
  const { resourceName, ...editableFields } = basicInfo

  const handleSubmit = (data: BasicInfo, isDirty: boolean) => {
    if (isCompleted) {
      // Buffer only — persisted later via PUT from the overview.
      if (isDirty) buffer.saveModuleEdit(resourceId, { basicInfo: data })
      backToOverview()
      return
    }

    setSubmitError(null)
    update.mutate(data, {
      onSuccess: backToOverview,
      onError: (err) =>
        setSubmitError(getErrorMessage(err, 'Failed to save Basic Info.')),
    })
  }

  return (
    <ModulePageLayout
      resourceId={resourceId}
      title="Basic Info"
      submitError={submitError}
      notice={isCompleted ? COMPLETED_EDIT_NOTICE : undefined}
    >
      <BasicInfoForm
        resourceName={resourceName || resource.name}
        defaultValues={editableFields}
        submitLabel={isCompleted ? 'Apply changes' : 'Save Basic Info'}
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </ModulePageLayout>
  )
}
