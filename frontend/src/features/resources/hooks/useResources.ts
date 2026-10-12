import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listResources, type ResourceListParams } from '@/api'
import { resourceKeys } from '@/features/resources/hooks/keys'

export const useResources = (params: ResourceListParams) =>
  useQuery({
    queryKey: resourceKeys.list(params),
    queryFn: () => listResources(params),
    placeholderData: keepPreviousData,
  })
