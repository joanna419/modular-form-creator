import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createResource,
  deleteResource,
  provisionResource,
  updateBasicInfo,
  type BasicInfo,
} from '@/api'
import { resourceKeys } from '@/features/resources/hooks/keys'

/** Every mutation refreshes all resource queries (list + detail) on success. */
const useInvalidateResources = () => {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: resourceKeys.all })
}

export const useCreateResource = () => {
  const invalidate = useInvalidateResources()
  return useMutation({
    mutationFn: (resourceName: string) => createResource(resourceName),
    onSuccess: invalidate,
  })
}

export const useDeleteResource = () => {
  const invalidate = useInvalidateResources()
  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSuccess: invalidate,
  })
}

export const useProvisionResource = () => {
  const invalidate = useInvalidateResources()
  return useMutation({
    mutationFn: (id: string) => provisionResource(id),
    onSuccess: invalidate,
  })
}

export const useUpdateBasicInfo = (id: string) => {
  const invalidate = useInvalidateResources()
  return useMutation({
    mutationFn: (data: BasicInfo) => updateBasicInfo(id, data),
    onSuccess: invalidate,
  })
}
