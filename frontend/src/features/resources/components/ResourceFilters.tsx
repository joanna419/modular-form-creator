import type { ResourceStatus } from '@/api'
import { Input, Select } from '@/design-system'

export type StatusFilter = ResourceStatus | ''

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'completed', label: 'Completed' },
]

interface ResourceFiltersProps {
  name: string
  onNameChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
}

export const ResourceFilters = ({
  name,
  onNameChange,
  status,
  onStatusChange,
}: ResourceFiltersProps) => (
  <div className="mb-6 flex gap-4">
    <div className="flex-1">
      <Input
        label="Search"
        placeholder="Search by name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
      />
    </div>
    <Select
      label="Status"
      options={STATUS_OPTIONS}
      value={status}
      onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
    />
  </div>
)
