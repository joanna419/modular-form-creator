import styled from 'styled-components'
import { fadeInUp } from '@/app/animations'
import { media } from '@/app/media'
import { Button } from '@/design-system'

interface PendingChangesBarProps {
  isSubmitting: boolean
  error: string | null
  onSubmit: () => void
  onDiscard: () => void
}

export const PendingChangesBar = ({
  isSubmitting,
  error,
  onSubmit,
  onDiscard,
}: PendingChangesBarProps) => (
  <Bar role="status">
    <Text>
      <strong>Unsaved changes.</strong> They are kept only in this tab and will be lost on
      refresh or close until you submit them.
    </Text>
    {error && <ErrorText role="alert">{error}</ErrorText>}
    <Actions>
      <Button variant="ghost" onClick={onDiscard} disabled={isSubmitting}>
        Discard
      </Button>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit changes'}
      </Button>
    </Actions>
  </Bar>
)

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  animation: ${fadeInUp} 0.25s ease both;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.ink};
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.warning};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.mobile} {
    & > button {
      flex: 1;
    }
  }
`
