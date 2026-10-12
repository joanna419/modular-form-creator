import { useQuery } from '@tanstack/react-query'
import { getResource } from '../../../api'
import { resourceKeys } from './keys'

export function useResource(id: string) {
  return useQuery({
    queryKey: resourceKeys.detail(id),
    queryFn: () => getResource(id),
  })
}
