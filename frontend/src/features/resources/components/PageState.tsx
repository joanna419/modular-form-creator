import type { ReactNode } from 'react'
import styled from 'styled-components'

interface PageStateProps {
  children: ReactNode
  isError?: boolean
}

/** Centered muted message for loading / error / empty states. */
export const PageState = ({ children, isError = false }: PageStateProps) => (
  <Message role={isError ? 'alert' : undefined}>{children}</Message>
)

const Message = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
`
