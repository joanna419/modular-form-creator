export type ResourceStatus = 'draft' | 'completed'

export type Priority = 'low' | 'medium' | 'high'

export type ProjectCategory = 'internal' | 'external' | 'vendor'

export type TeamMember = 'FE devs' | 'BE devs' | 'Designer' | 'Data Eng' | 'Product Owner'

export interface BasicInfo {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: Priority | ''
}

export interface ProjectDetails {
  projectName: string
  budget: string
  category: ProjectCategory | ''
  options: TeamMember[]
}

export interface Resource {
  _id: string
  resourceId: number
  name: string
  status: ResourceStatus
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface ResourceListResponse {
  items: Resource[]
  pagination: Pagination
}

export interface ResourceListParams {
  page?: number
  pageSize?: number
  status?: ResourceStatus
  name?: string
  sortOrder?: 'asc' | 'desc'
}

/** Full business payload accepted by PUT /api/resources/{id} (completed only). */
export interface ResourcePayload {
  name: string
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}
