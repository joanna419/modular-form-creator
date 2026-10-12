import type { ReactNode } from 'react'
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
}: ConfirmDialogProps) => (
  <Drawer title={title} isOpen={isOpen} onClose={onClose}>
    <div className="mb-6 text-ink">{message}</div>
    <div className="flex justify-end gap-2">
      <Button variant="ghost" onClick={onClose} disabled={isBusy}>
        Cancel
      </Button>
      <Button onClick={onConfirm} disabled={isBusy}>
        {isBusy && busyLabel ? busyLabel : confirmLabel}
      </Button>
    </div>
  </Drawer>
)
