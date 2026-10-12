import { useState } from 'react'
import styled from 'styled-components'
import type { Resource, ResourceListParams } from '@/api'
import { ConfirmDialog } from '@/features/resources/components/ConfirmDialog'
import { CreateResourceForm } from '@/features/resources/components/CreateResourceForm'
import { PageState } from '@/features/resources/components/PageState'
import { Pagination } from '@/features/resources/components/Pagination'
import { ResourceCard } from '@/features/resources/components/ResourceCard'
import {
  ResourceFilters,
  type StatusFilter,
} from '@/features/resources/components/ResourceFilters'
import { useDebouncedValue } from '@/features/resources/hooks/useDebouncedValue'
import { useDeleteResource } from '@/features/resources/hooks/useResourceMutations'
import { useResources } from '@/features/resources/hooks/useResources'
import { getErrorMessage } from '@/features/resources/lib/errors'

const PAGE_SIZE = 10

export const ResourcesListPage = () => {
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
        <PageState>Loading resources…</PageState>
      ) : isError ? (
        <PageState isError>
          {getErrorMessage(error, 'Failed to load resources.')}
        </PageState>
      ) : items.length === 0 ? (
        <PageState>No resources found.</PageState>
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
