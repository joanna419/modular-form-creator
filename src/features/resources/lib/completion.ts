import type { BasicInfo, ProjectDetails, Resource } from '../../../api'

/** Mirrors backend isBasicInfoComplete: every field must be non-empty. */
export function isBasicInfoComplete(basicInfo: BasicInfo): boolean {
  return Boolean(
    basicInfo.resourceName &&
      basicInfo.owner &&
      basicInfo.email &&
      basicInfo.description &&
      basicInfo.priority,
  )
}

/** Mirrors backend isProjectDetailsComplete: fields non-empty + at least one option. */
export function isProjectDetailsComplete(details: ProjectDetails): boolean {
  return Boolean(
    details.projectName &&
      details.budget &&
      details.category &&
      details.options.length > 0,
  )
}

/** Project Details is editable (draft) only after Basic Info is complete. */
export function canEditProjectDetails(resource: Resource): boolean {
  return isBasicInfoComplete(resource.basicInfo)
}

/** Provisioning is allowed only when both modules are complete. */
export function canProvision(resource: Resource): boolean {
  return (
    resource.status === 'draft' &&
    isBasicInfoComplete(resource.basicInfo) &&
    isProjectDetailsComplete(resource.projectDetails)
  )
}
