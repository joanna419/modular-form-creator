/** Mirror of backend NAME_REGEX for resourceName / projectName. */
const NAME_REGEX = /^[A-Za-z0-9 -]+$/

/** Returns an error message, or null when the name is valid. */
export function validateResourceName(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Name is required'
  if (trimmed.length > 255) return 'Name must be at most 255 characters'
  if (!NAME_REGEX.test(trimmed)) {
    return 'Only letters, numbers, spaces and hyphens are allowed'
  }
  return null
}
