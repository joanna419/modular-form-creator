import { request } from '@/api/client'
import type {
  BasicInfo,
  ProjectDetails,
  Resource,
  ResourceListParams,
  ResourceListResponse,
  ResourcePayload,
} from '@/api/types'

const BASE = '/api/resources'

const buildQuery = (params: ResourceListParams): string => {
  const search = new URLSearchParams()
  if (params.page) search.set('page', String(params.page))
  if (params.pageSize) search.set('pageSize', String(params.pageSize))
  if (params.status) search.set('status', params.status)
  if (params.name?.trim()) search.set('name', params.name.trim())
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const query = search.toString()
  return query ? `?${query}` : ''
}

export const listResources = (
  params: ResourceListParams = {},
): Promise<ResourceListResponse> =>
  request<ResourceListResponse>(`${BASE}${buildQuery(params)}`)

export const getResource = (id: string): Promise<Resource> =>
  request<Resource>(`${BASE}/${id}`)

export const createResource = (resourceName: string): Promise<Resource> =>
  request<Resource>(BASE, {
    method: 'POST',
    body: JSON.stringify({ resourceName }),
  })

export const updateBasicInfo = (
  id: string,
  data: BasicInfo,
): Promise<Resource> =>
  request<Resource>(`${BASE}/${id}/basic-info`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

export const updateProjectDetails = (
  id: string,
  data: ProjectDetails,
): Promise<Resource> =>
  request<Resource>(`${BASE}/${id}/project-details`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

/** draft -> completed. Only valid status transition. */
export const provisionResource = (
  id: string,
): Promise<{ alreadyCompleted: boolean; resource: Resource }> =>
  request(`${BASE}/${id}/provisioning`, { method: 'PATCH' })

/** Full replace, allowed only for completed resources. */
export const replaceResource = (
  id: string,
  data: ResourcePayload,
): Promise<Resource> =>
  request<Resource>(`${BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const deleteResource = (id: string): Promise<Resource> =>
  request<Resource>(`${BASE}/${id}`, { method: 'DELETE' })
