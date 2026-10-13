import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/api'

/**
 * Retry once for network / 5xx failures only. A 4xx (invalid id, not found,
 * business rule) will not change on retry — it would only delay the error.
 */
const shouldRetry = (failureCount: number, error: Error): boolean =>
  !(error instanceof ApiError && error.status < 500) && failureCount < 1

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      refetchOnWindowFocus: false,
    },
  },
})
