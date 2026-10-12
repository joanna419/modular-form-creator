import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listResources, type ResourceListParams } from '../../../api'
import { resourceKeys } from './keys'

export function useResources(params: ResourceListParams) {
  return useQuery({
    queryKey: resourceKeys.list(params),
    queryFn: () => listResources(params),
    placeholderData: keepPreviousData,
  })
}
