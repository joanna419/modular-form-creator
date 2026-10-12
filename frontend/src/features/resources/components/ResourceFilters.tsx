import styled from 'styled-components'
import type { ResourceStatus } from '@/api'
import { media } from '@/app/media'
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
  <Filters>
    <Search>
      <Input
        label="Search"
        placeholder="Search by name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
      />
    </Search>
    <Select
      label="Status"
      options={STATUS_OPTIONS}
      value={status}
      onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
    />
  </Filters>
)

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${media.mobile} {
    flex-direction: column;
  }
`

const Search = styled.div`
  flex: 1;
`
