import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { paths } from '@/routes/paths'

interface ModulePageLayoutProps {
  resourceId: string
  title: string
  submitError: string | null
  /** Optional explanation shown above the form (e.g. buffered edit mode). */
  notice?: string
  children: ReactNode
}

/** Shared frame for module form pages: back link, title, notice, submit error. */
export const ModulePageLayout = ({
  resourceId,
  title,
  submitError,
  notice,
  children,
}: ModulePageLayoutProps) => (
  <>
    <BackLink to={paths.resource(resourceId)}>← Back to overview</BackLink>
    <Title>{title}</Title>
    {notice && <Notice>{notice}</Notice>}
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

const Notice = styled.p`
  color: ${({ theme }) => theme.colors.info};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SubmitError = styled.p`
  color: ${({ theme }) => theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
