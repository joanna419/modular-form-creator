import styled from 'styled-components'
import { media } from '@/app/media'
import { Badge, Card } from '@/design-system'

export interface SummaryField {
  label: string
  value: string
}

interface ModuleSummaryProps {
  title: string
  isComplete: boolean
  fields: SummaryField[]
}

/** Read-only module card: completion badge + label/value list ("—" when empty). */
export const ModuleSummary = ({ title, isComplete, fields }: ModuleSummaryProps) => (
  <Card variant="outline">
    <Header>
      <Title>{title}</Title>
      <Badge variant={isComplete ? 'success' : 'neutral'}>
        {isComplete ? 'Complete' : 'Incomplete'}
      </Badge>
    </Header>
    <Fields>
      {fields.map(({ label, value }) => (
        <Row key={label}>
          <Label>{label}</Label>
          <Value>{value || '—'}</Value>
        </Row>
      ))}
    </Fields>
  </Card>
)

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Title = styled.h2`
  font-size: 1.125rem;
`

const Fields = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

const Label = styled.dt`
  color: ${({ theme }) => theme.colors.inkMuted};
`

const Value = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.inkStrong};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`
