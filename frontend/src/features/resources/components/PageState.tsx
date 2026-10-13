import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface PageStateProps {
  children: ReactNode
  isError?: boolean
  /** Optional way out of a dead end (e.g. back to the list). */
  action?: { to: string; label: string }
}

/** Soft panel for error / empty states. */
export const PageState = ({ children, isError = false, action }: PageStateProps) => (
  <Panel role={isError ? 'alert' : undefined} $isError={isError}>
    {children}
    {action && <ActionLink to={action.to}>{action.label}</ActionLink>}
  </Panel>
)

const Panel = styled.div<{ $isError: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px dashed
    ${({ theme, $isError }) => ($isError ? theme.colors.warning : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.6);
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.warning : theme.colors.inkMuted};
  text-align: center;
`

const ActionLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`
