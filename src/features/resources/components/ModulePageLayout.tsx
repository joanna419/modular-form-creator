import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '@/design-system'
import { paths } from '@/routes/paths'

interface ModulePageLayoutProps {
  resourceId: string
  title: string
  /** Optional explanation shown above the form (e.g. buffered edit mode). */
  notice?: string
  children: ReactNode
}

/** Shared frame for module form pages: back link, title, optional notice. */
export const ModulePageLayout = ({
  resourceId,
  title,
  notice,
  children,
}: ModulePageLayoutProps) => (
  <>
    <BackLink to={paths.resource(resourceId)}>← Back to overview</BackLink>
    <Title>{title}</Title>
    {notice && <Notice>{notice}</Notice>}
    <Card variant="elevated">{children}</Card>
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
