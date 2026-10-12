import type { ResourceListParams } from '../../../api'

export const resourceKeys = {
  all: ['resources'] as const,
  list: (params: ResourceListParams) => ['resources', 'list', params] as const,
  detail: (id: string) => ['resources', 'detail', id] as const,
}
