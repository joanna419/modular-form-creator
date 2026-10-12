import { createContext } from 'react'
import type { BasicInfo, ProjectDetails } from '@/api'

/** Locally buffered module edits of a completed resource (never persisted). */
export interface ResourceEdits {
  basicInfo?: BasicInfo
  projectDetails?: ProjectDetails
}

export interface EditBufferContextValue {
  getEdits: (resourceId: string) => ResourceEdits
  saveModuleEdit: (resourceId: string, edit: ResourceEdits) => void
  clearEdits: (resourceId: string) => void
}

export const EditBufferContext = createContext<EditBufferContextValue | null>(null)
