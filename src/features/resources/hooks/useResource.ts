import { useQuery } from '@tanstack/react-query'
import { getResource } from '@/api'
import { resourceKeys } from '@/features/resources/hooks/keys'

export const useResource = (id: string) =>
  useQuery({
    queryKey: resourceKeys.detail(id),
    queryFn: () => getResource(id),
  })
