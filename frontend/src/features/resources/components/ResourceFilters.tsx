import styled from 'styled-components'
import type { ResourceStatus } from '../../../api'
import { Input, Select } from '../../../design-system'

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

export function ResourceFilters({
  name,
  onNameChange,
  status,
  onStatusChange,
}: ResourceFiltersProps) {
  return (
    <Filters>
      <Input
        label="Search"
        placeholder="Search by name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
      />
      <Select
        label="Status"
        options={STATUS_OPTIONS}
        value={status}
        onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
      />
    </Filters>
  )
}

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  & > *:first-child {
    flex: 1;
  }
`
