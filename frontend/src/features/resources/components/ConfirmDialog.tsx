import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Button, Drawer } from '../../../design-system'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: ReactNode
  confirmLabel: string
  busyLabel?: string
  isBusy?: boolean
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  busyLabel,
  isBusy = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Drawer title={title} isOpen={isOpen} onClose={onClose}>
      <Message>{message}</Message>
      <Actions>
        <Button variant="ghost" onClick={onClose} disabled={isBusy}>
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={isBusy}>
          {isBusy && busyLabel ? busyLabel : confirmLabel}
        </Button>
      </Actions>
    </Drawer>
  )
}

const Message = styled.div`
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`
