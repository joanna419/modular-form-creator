/** Mirrors of backend validation regexes (resource.service.ts). */
const NAME_REGEX = /^[A-Za-z0-9 -]+$/
const OWNER_REGEX = /^[A-Za-z ]+$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INTEGER_REGEX = /^\d+$/

/** Each validator returns an error message, or null when valid. */

export function validateResourceName(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Name is required'
  if (trimmed.length > 255) return 'Name must be at most 255 characters'
  if (!NAME_REGEX.test(trimmed)) {
    return 'Only letters, numbers, spaces and hyphens are allowed'
  }
  return null
}

export function validateOwner(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Owner is required'
  if (trimmed.length > 255) return 'Owner must be at most 255 characters'
  if (!OWNER_REGEX.test(trimmed)) {
    return 'Only letters and spaces are allowed'
  }
  return null
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required'
  if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address'
  return null
}

export function validateDescription(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Description is required'
  if (trimmed.length > 1000) {
    return 'Description must be at most 1000 characters'
  }
  return null
}

export function validateProjectName(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Project name is required'
  if (trimmed.length > 255) return 'Project name must be at most 255 characters'
  if (!NAME_REGEX.test(trimmed)) {
    return 'Only letters, numbers, spaces and hyphens are allowed'
  }
  return null
}

export function validateBudget(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Budget is required'
  if (!INTEGER_REGEX.test(trimmed)) return 'Budget must be a whole number'
  return null
}
