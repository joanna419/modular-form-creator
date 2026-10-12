import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  EditBufferContext,
  type ResourceEdits,
} from '@/features/resources/context/EditBufferContext'

const NO_EDITS: ResourceEdits = {}

/**
 * Holds completed-resource edits until the user submits them (PUT).
 * Plain React state on purpose: the buffer is lost on refresh / tab close.
 */
export const EditBufferProvider = ({ children }: { children: ReactNode }) => {
  const [buffer, setBuffer] = useState<Record<string, ResourceEdits>>({})
  const hasPendingEdits = Object.keys(buffer).length > 0

  // Warn before the browser discards unsaved edits.
  useEffect(() => {
    if (!hasPendingEdits) return

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = '' // legacy browsers
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasPendingEdits])

  const getEdits = useCallback(
    (resourceId: string) => buffer[resourceId] ?? NO_EDITS,
    [buffer],
  )

  const saveModuleEdit = useCallback(
    (resourceId: string, edit: ResourceEdits) =>
      setBuffer((prev) => ({
        ...prev,
        [resourceId]: { ...prev[resourceId], ...edit },
      })),
    [],
  )

  const clearEdits = useCallback(
    (resourceId: string) =>
      setBuffer((prev) => {
        const next = { ...prev }
        delete next[resourceId]
        return next
      }),
    [],
  )

  const value = useMemo(
    () => ({ getEdits, saveModuleEdit, clearEdits }),
    [getEdits, saveModuleEdit, clearEdits],
  )

  return <EditBufferContext.Provider value={value}>{children}</EditBufferContext.Provider>
}
