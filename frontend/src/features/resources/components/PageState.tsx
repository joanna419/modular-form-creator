import type { ReactNode } from 'react'
import styled from 'styled-components'

interface PageStateProps {
  children: ReactNode
  isError?: boolean
}

/** Soft panel for error / empty states. */
export const PageState = ({ children, isError = false }: PageStateProps) => (
  <Panel role={isError ? 'alert' : undefined} $isError={isError}>
    {children}
  </Panel>
)

const Panel = styled.div<{ $isError: boolean }>`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px dashed
    ${({ theme, $isError }) => ($isError ? theme.colors.warning : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.6);
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.warning : theme.colors.inkMuted};
  text-align: center;
`
