import { useState } from 'react'
import { toast } from 'sonner'
import styled from 'styled-components'
import { media } from '@/app/media'
import type { Resource, ResourceListParams } from '@/api'
import { ConfirmDialog } from '@/features/resources/components/ConfirmDialog'
import { CreateResourceForm } from '@/features/resources/components/CreateResourceForm'
import { LoadingState } from '@/features/resources/components/LoadingState'
import { PageState } from '@/features/resources/components/PageState'
import { Pagination } from '@/features/resources/components/Pagination'
import { ResourceCard } from '@/features/resources/components/ResourceCard'
import {
  ResourceFilters,
  type StatusFilter,
} from '@/features/resources/components/ResourceFilters'
import { useDebouncedValue } from '@/features/resources/hooks/useDebouncedValue'
import { useEditBuffer } from '@/features/resources/hooks/useEditBuffer'
import { useDeleteResource } from '@/features/resources/hooks/useResourceMutations'
import { useResources } from '@/features/resources/hooks/useResources'
import { getErrorMessage } from '@/features/resources/lib/errors'

const PAGE_SIZE = 10

export const ResourcesListPage = () => {
  const [nameInput, setNameInput] = useState('')
  const [status, setStatus] = useState<StatusFilter>('')
  const [page, setPage] = useState(1)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null)

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
  const buffer = useEditBuffer()

  const confirmDelete = () => {
    if (!resourceToDelete) return
    const { name } = resourceToDelete
    const id = String(resourceToDelete.resourceId)
    deleteResource.mutate(id, {
      onSuccess: () => {
        buffer.clearEdits(id) // drop edits of a resource that no longer exists
        setResourceToDelete(null)
        toast.success(`Resource “${name}” deleted`)
      },
      onError: (err) => toast.error(getErrorMessage(err, 'Failed to delete resource.')),
    })
  }

  const items = data?.items ?? []
  const hasFilters = Boolean(debouncedName.trim() || status)

  return (
    <Page>
      <Header>
        <h1>Resources</h1>
        <Subtitle>
          Create, track and complete resources
          {data ? ` · ${data.pagination.totalItems} total` : ''}
        </Subtitle>
      </Header>

      <Section>
        <CreateResourceForm />
      </Section>

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

      <ListArea>
        {isPending ? (
          <LoadingState label="Loading resources" />
        ) : isError ? (
          <PageState isError>
            {getErrorMessage(error, 'Failed to load resources.')}
          </PageState>
        ) : items.length === 0 ? (
          <PageState>
            {hasFilters
              ? 'No resources match your filters.'
              : 'No resources yet. Create the first one above.'}
          </PageState>
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
      </ListArea>

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
            Are you sure you want to delete <strong>{resourceToDelete?.name}</strong>?
            This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
        busyLabel="Deleting…"
        isBusy={deleteResource.isPending}
        onConfirm={confirmDelete}
        onClose={() => setResourceToDelete(null)}
      />
    </Page>
  )
}

// Desktop: the page fills the layout height and only the list region scrolls;
// title, create form, filters and pagination stay in place.
const Page = styled.div`
  ${media.desktop} {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

const ListArea = styled.div`
  ${media.desktop} {
    flex: 1;
    min-height: 240px;
    overflow-y: auto;
    /* Room for the cards' hover lift and shadow inside the scroll box. */
    margin: 0 -8px;
    padding: 4px 8px 12px;
  }
`

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.inkMuted};
`

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`
