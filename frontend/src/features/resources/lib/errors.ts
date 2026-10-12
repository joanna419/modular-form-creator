import { ApiError } from '@/api'

/** Backend business errors carry a user-facing message; anything else gets the fallback. */
export const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof ApiError ? error.message : fallback
