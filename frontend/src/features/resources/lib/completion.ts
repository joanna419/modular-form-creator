import type { BasicInfo, ProjectDetails, Resource } from '@/api'

/** Mirrors backend isBasicInfoComplete: every field must be non-empty. */
export const isBasicInfoComplete = (basicInfo: BasicInfo): boolean =>
  Boolean(
    basicInfo.resourceName &&
    basicInfo.owner &&
    basicInfo.email &&
    basicInfo.description &&
    basicInfo.priority,
  )

/** Mirrors backend isProjectDetailsComplete: fields non-empty + at least one option. */
export const isProjectDetailsComplete = (details: ProjectDetails): boolean =>
  Boolean(
    details.projectName &&
    details.budget &&
    details.category &&
    details.options.length > 0,
  )

/** Project Details is editable (draft) only after Basic Info is complete. */
export const canEditProjectDetails = (resource: Resource): boolean =>
  isBasicInfoComplete(resource.basicInfo)

/** Provisioning is allowed only for a draft with both modules complete. */
export const canProvision = (resource: Resource): boolean =>
  resource.status === 'draft' &&
  isBasicInfoComplete(resource.basicInfo) &&
  isProjectDetailsComplete(resource.projectDetails)
