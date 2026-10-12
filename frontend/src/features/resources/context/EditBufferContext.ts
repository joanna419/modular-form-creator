import { createContext } from 'react'
import type { BasicInfo, ProjectDetails } from '@/api'

/** Locally buffered module edits of a completed resource (never persisted). */
export interface ResourceEdits {
  basicInfo?: BasicInfo
  projectDetails?: ProjectDetails
}

export type ModuleKey = keyof ResourceEdits

export interface EditBufferContextValue {
  getEdits: (resourceId: string) => ResourceEdits
  /** Buffers `value`, or drops the module edit when it equals `persisted`. */
  applyModuleEdit: <K extends ModuleKey>(
    resourceId: string,
    module: K,
    value: NonNullable<ResourceEdits[K]>,
    persisted: NonNullable<ResourceEdits[K]>,
  ) => void
  clearEdits: (resourceId: string) => void
}

export const EditBufferContext = createContext<EditBufferContextValue | null>(null)
