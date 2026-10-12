import styled from 'styled-components'
import type { Resource } from '../../../api'
import { Button, Drawer } from '../../../design-system'

interface DeleteResourceDialogProps {
  resource: Resource | null
  isDeleting: boolean
  onConfirm: () => void
  onClose: () => void
}

export function DeleteResourceDialog({
  resource,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteResourceDialogProps) {
  return (
    <Drawer title="Delete resource" isOpen={resource !== null} onClose={onClose}>
      {resource && (
        <>
          <Message>
            Are you sure you want to delete <strong>{resource.name}</strong>?
            This action cannot be undone.
          </Message>
          <Actions>
            <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
          </Actions>
        </>
      )}
    </Drawer>
  )
}

const Message = styled.p`
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`
