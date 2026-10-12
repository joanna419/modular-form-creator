import { useState } from 'react'
import styled from 'styled-components'
import { ApiError, type Resource, type ResourceListParams } from '../../../api'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { CreateResourceForm } from '../components/CreateResourceForm'
import { Pagination } from '../components/Pagination'
import {
  ResourceFilters,
  type StatusFilter,
} from '../components/ResourceFilters'
import { ResourceCard } from '../components/ResourceCard'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useResources } from '../hooks/useResources'
import { useDeleteResource } from '../hooks/useResourceMutations'

const PAGE_SIZE = 10

export function ResourcesListPage() {
  const [nameInput, setNameInput] = useState('')
  const [status, setStatus] = useState<StatusFilter>('')
  const [page, setPage] = useState(1)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  )

  const debouncedName = useDebouncedValue(nameInput)

  const params: ResourceListParams = {
    page,
    pageSize: PAGE_SIZE,
    sortOrder: 'desc',
    name: debouncedName.trim() || undefined,
    status: status || undefined,
  }

  const { data, isPending, isError, error } = useResources(params)
  const deleteResource = useDeleteResource()

  const confirmDelete = () => {
    if (!resourceToDelete) return
    deleteResource.mutate(String(resourceToDelete.resourceId), {
      onSuccess: () => setResourceToDelete(null),
    })
  }

  const items = data?.items ?? []

  return (
    <>
      <Title>Resources</Title>

      <CreateResourceForm />

      <ResourceFilters
        name={nameInput}
        onNameChange={(value) => {
          setNameInput(value)
          setPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setPage(1)
        }}
      />

      {isPending ? (
        <State>Loading resources…</State>
      ) : isError ? (
        <State role="alert">
          {error instanceof ApiError
            ? error.message
            : 'Failed to load resources.'}
        </State>
      ) : items.length === 0 ? (
        <State>No resources found.</State>
      ) : (
        <List>
          {items.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onDelete={setResourceToDelete}
            />
          ))}
        </List>
      )}

      {data && (
        <Pagination
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          onPageChange={setPage}
        />
      )}

      <ConfirmDialog
        isOpen={resourceToDelete !== null}
        title="Delete resource"
        message={
          <>
            Are you sure you want to delete{' '}
            <strong>{resourceToDelete?.name}</strong>? This action cannot be
            undone.
          </>
        }
        confirmLabel="Delete"
        busyLabel="Deleting…"
        isBusy={deleteResource.isPending}
        onConfirm={confirmDelete}
        onClose={() => setResourceToDelete(null)}
      />
    </>
  )
}

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const State = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
`
