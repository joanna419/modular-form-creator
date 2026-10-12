import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  EditBufferContext,
  type EditBufferContextValue,
  type ResourceEdits,
} from '@/features/resources/context/EditBufferContext'
import { isSameModule } from '@/features/resources/lib/moduleEquality'

const NO_EDITS: ResourceEdits = {}

/**
 * Holds completed-resource edits until the user submits them (PUT).
 * Only real differences from the persisted data are kept.
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

  const applyModuleEdit = useCallback<EditBufferContextValue['applyModuleEdit']>(
    (resourceId, module, value, persisted) =>
      setBuffer((prev) => {
        const edits: ResourceEdits = { ...prev[resourceId] }
        if (isSameModule(value, persisted)) {
          delete edits[module]
        } else {
          edits[module] = value
        }

        const next = { ...prev }
        if (Object.keys(edits).length > 0) {
          next[resourceId] = edits
        } else {
          delete next[resourceId]
        }
        return next
      }),
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
    () => ({ getEdits, applyModuleEdit, clearEdits }),
    [getEdits, applyModuleEdit, clearEdits],
  )

  return <EditBufferContext.Provider value={value}>{children}</EditBufferContext.Provider>
}
