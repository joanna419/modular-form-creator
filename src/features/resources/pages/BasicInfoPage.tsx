import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { BasicInfo } from '@/api'
import { BasicInfoForm } from '@/features/resources/components/BasicInfoForm'
import { ModulePageLayout } from '@/features/resources/components/ModulePageLayout'
import { LoadingState } from '@/features/resources/components/LoadingState'
import { ResourceLoadError } from '@/features/resources/components/ResourceLoadError'
import { useEditBuffer } from '@/features/resources/hooks/useEditBuffer'
import { useResource } from '@/features/resources/hooks/useResource'
import { useUpdateBasicInfo } from '@/features/resources/hooks/useResourceMutations'
import { COMPLETED_EDIT_NOTICE } from '@/features/resources/lib/constants'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

export const BasicInfoPage = () => {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const update = useUpdateBasicInfo(resourceId)
  const buffer = useEditBuffer()

  if (isPending) return <LoadingState label="Loading resource" rows={2} />
  if (isError) return <ResourceLoadError error={error} />

  const isCompleted = resource.status === 'completed'
  const backToOverview = () => navigate(paths.resource(resourceId))

  // Completed: start from buffered edits if any, otherwise from persisted data.
  const basicInfo =
    (isCompleted && buffer.getEdits(resourceId).basicInfo) || resource.basicInfo
  const { resourceName, ...editableFields } = basicInfo

  const handleSubmit = (data: BasicInfo) => {
    if (isCompleted) {
      // Buffer only (persisted later via PUT from the overview).
      buffer.applyModuleEdit(resourceId, 'basicInfo', data, resource.basicInfo)
      backToOverview()
      return
    }

    update.mutate(data, {
      onSuccess: () => {
        toast.success('Basic Info saved')
        backToOverview()
      },
      onError: (err) => toast.error(getErrorMessage(err, 'Failed to save Basic Info.')),
    })
  }

  return (
    <ModulePageLayout
      resourceId={resourceId}
      title="Basic Info"
      notice={isCompleted ? COMPLETED_EDIT_NOTICE : undefined}
    >
      {/* Keyed by updatedAt: React Hook Form reads defaultValues only on mount, so
          remount when fresher server data arrives instead of submitting stale values. */}
      <BasicInfoForm
        key={resource.updatedAt}
        resourceName={resourceName || resource.name}
        defaultValues={editableFields}
        submitLabel={isCompleted ? 'Apply changes' : 'Save Basic Info'}
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </ModulePageLayout>
  )
}
