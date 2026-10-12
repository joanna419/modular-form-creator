import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { paths } from '@/routes/paths'

interface ModulePageLayoutProps {
  resourceId: string
  title: string
  submitError: string | null
  children: ReactNode
}

/** Shared frame for module form pages: back link, title, submit error. */
export const ModulePageLayout = ({
  resourceId,
  title,
  submitError,
  children,
}: ModulePageLayoutProps) => (
  <>
    <BackLink to={paths.resource(resourceId)}>← Back to overview</BackLink>
    <Title>{title}</Title>
    {submitError && <SubmitError role="alert">{submitError}</SubmitError>}
    {children}
  </>
)

const BackLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const SubmitError = styled.p`
  color: ${({ theme }) => theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
