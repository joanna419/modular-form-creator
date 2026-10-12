import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Button, Drawer } from '@/design-system'

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

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel,
  busyLabel,
  isBusy = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) =>
  // Portal to <body>: ancestors (e.g. the animated <main>) cannot affect the fixed overlay.
  createPortal(
    <DrawerLayer>
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
    </DrawerLayer>,
    document.body,
  )

/*
 * The design-system Drawer stays mounted when closed, with its panel translated
 * off-screen inside a fixed overlay — which widens the page (sideways scroll on
 * mobile). This viewport-sized layer becomes the overlay's containing block
 * (`contain: paint`) and clips the hidden panel. Clicks pass through it; the
 * Drawer's own overlay enables pointer events only while open.
 */
const DrawerLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  contain: paint;
  pointer-events: none;
`

const Message = styled.div`
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`
