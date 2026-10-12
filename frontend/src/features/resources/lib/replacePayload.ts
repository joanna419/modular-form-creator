import type { Resource, ResourcePayload } from '@/api'
import type { ResourceEdits } from '@/features/resources/context/EditBufferContext'

/** PUT requires the full business payload: buffered modules override persisted ones. */
export const buildReplacePayload = (
  resource: Resource,
  edits: ResourceEdits,
): ResourcePayload => ({
  name: resource.name,
  basicInfo: edits.basicInfo ?? resource.basicInfo,
  projectDetails: edits.projectDetails ?? resource.projectDetails,
})
