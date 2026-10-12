import { useContext } from 'react'
import { EditBufferContext } from '@/features/resources/context/EditBufferContext'

export const useEditBuffer = () => {
  const context = useContext(EditBufferContext)
  if (!context) {
    throw new Error('useEditBuffer must be used within EditBufferProvider')
  }
  return context
}
