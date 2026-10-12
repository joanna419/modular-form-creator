import type { Priority, ProjectCategory, TeamMember } from '@/api'

export const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' },
  { value: 'vendor', label: 'Vendor' },
]

export const TEAM_MEMBER_OPTIONS: TeamMember[] = [
  'FE devs',
  'BE devs',
  'Designer',
  'Data Eng',
  'Product Owner',
]

export const COMPLETED_EDIT_NOTICE =
  'This resource is completed. Changes are kept locally and sent only when you submit them on the overview.'
