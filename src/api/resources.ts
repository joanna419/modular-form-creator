import { request } from './client'
import type {
  BasicInfo,
  ProjectDetails,
  Resource,
  ResourceListParams,
  ResourceListResponse,
  ResourcePayload,
} from './types'

const BASE = '/api/resources'

function buildQuery(params: ResourceListParams): string {
  const search = new URLSearchParams()
  if (params.page) search.set('page', String(params.page))
  if (params.pageSize) search.set('pageSize', String(params.pageSize))
  if (params.status) search.set('status', params.status)
  if (params.name?.trim()) search.set('name', params.name.trim())
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const query = search.toString()
  return query ? `?${query}` : ''
}

export function listResources(
  params: ResourceListParams = {},
): Promise<ResourceListResponse> {
  return request<ResourceListResponse>(`${BASE}${buildQuery(params)}`)
}

export function getResource(id: string): Promise<Resource> {
  return request<Resource>(`${BASE}/${id}`)
}

export function createResource(resourceName: string): Promise<Resource> {
  return request<Resource>(BASE, {
    method: 'POST',
    body: JSON.stringify({ resourceName }),
  })
}

export function updateBasicInfo(
  id: string,
  data: BasicInfo,
): Promise<Resource> {
  return request<Resource>(`${BASE}/${id}/basic-info`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function updateProjectDetails(
  id: string,
  data: ProjectDetails,
): Promise<Resource> {
  return request<Resource>(`${BASE}/${id}/project-details`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

/** draft -> completed. Only valid status transition. */
export function provisionResource(
  id: string,
): Promise<{ alreadyCompleted: boolean; resource: Resource }> {
  return request(`${BASE}/${id}/provisioning`, { method: 'PATCH' })
}

/** Full replace, allowed only for completed resources. */
export function replaceResource(
  id: string,
  data: ResourcePayload,
): Promise<Resource> {
  return request<Resource>(`${BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteResource(id: string): Promise<Resource> {
  return request<Resource>(`${BASE}/${id}`, { method: 'DELETE' })
}
