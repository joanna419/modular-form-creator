import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createResource,
  deleteResource,
  provisionResource,
} from '../../../api'
import { resourceKeys } from './keys'

export function useCreateResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (resourceName: string) => createResource(resourceName),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: resourceKeys.all }),
  })
}

export function useDeleteResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: resourceKeys.all }),
  })
}

export function useProvisionResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => provisionResource(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: resourceKeys.all }),
  })
}
