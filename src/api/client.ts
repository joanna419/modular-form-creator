const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001'

/** Error carrying the backend's business error shape: { message, details }. */
export class ApiError extends Error {
  readonly status: number
  readonly details?: unknown

  constructor(status: number, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

interface ErrorBody {
  message?: string
  details?: unknown
}

export const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await response.json() : undefined

  if (!response.ok) {
    const error = body as ErrorBody | undefined
    throw new ApiError(
      response.status,
      error?.message ?? response.statusText,
      error?.details,
    )
  }

  return body as T
}
