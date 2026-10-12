import styled from 'styled-components'
import { MODULE_COUNT } from '@/features/resources/lib/completion'

interface ModuleProgressProps {
  completed: number
}

/** "1/2 modules" label with a small progress bar. */
export const ModuleProgress = ({ completed }: ModuleProgressProps) => (
  <Wrapper>
    <Track
      role="progressbar"
      aria-label="Modules completed"
      aria-valuemin={0}
      aria-valuemax={MODULE_COUNT}
      aria-valuenow={completed}
    >
      <Fill $ratio={completed / MODULE_COUNT} />
    </Track>
    <Label>
      {completed}/{MODULE_COUNT} modules
    </Label>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Track = styled.div`
  width: 96px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

const Fill = styled.div<{ $ratio: number }>`
  height: 100%;
  width: ${({ $ratio }) => $ratio * 100}%;
  border-radius: inherit;
  background: ${({ theme, $ratio }) =>
    $ratio === 1 ? theme.colors.success : theme.colors.primary};
  transition: width 0.4s ease;
`

const Label = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.8rem;
`
