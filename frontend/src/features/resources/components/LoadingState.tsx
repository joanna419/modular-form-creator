import styled from 'styled-components'
import { shimmer } from '@/app/animations'

interface LoadingStateProps {
  label: string
  rows?: number
}

/** Skeleton placeholders shaped like the content that is loading. */
export const LoadingState = ({ label, rows = 3 }: LoadingStateProps) => (
  <Wrapper role="status" aria-label={label}>
    {Array.from({ length: rows }, (_, index) => (
      <Block key={index} />
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Block = styled.div`
  height: 88px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceAlt} 25%,
    ${({ theme }) => theme.colors.surface} 37%,
    ${({ theme }) => theme.colors.surfaceAlt} 63%
  );
  background-size: 400% 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${shimmer} 1.4s ease infinite;
`
