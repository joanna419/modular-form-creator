import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { APP_SHELL_ID } from '@/app/appShell'
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
}: ConfirmDialogProps) => {
  const layerRef = useRef<HTMLDivElement>(null)

  // Modal behaviour the design-system Drawer does not provide: focus moves into
  // the dialog (Cancel — the safe default for an irreversible action), the app
  // behind becomes inert (no focus, clicks or screen-reader access) and focus
  // returns to the element that opened the dialog when it closes.
  useEffect(() => {
    if (!isOpen) return

    const trigger =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const appShell = document.getElementById(APP_SHELL_ID)
    appShell?.setAttribute('inert', '')
    layerRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    return () => {
      appShell?.removeAttribute('inert')
      if (trigger?.isConnected) trigger.focus()
    }
  }, [isOpen])

  // Portal to <body>: ancestors (e.g. the animated content) cannot affect the fixed overlay.
  return createPortal(
    <DrawerLayer ref={layerRef}>
      <Drawer title={title} isOpen={isOpen} onClose={onClose}>
        <Message>{message}</Message>
        <Actions>
          <Button data-autofocus variant="ghost" onClick={onClose} disabled={isBusy}>
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
}

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
