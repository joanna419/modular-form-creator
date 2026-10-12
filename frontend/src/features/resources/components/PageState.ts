import styled from 'styled-components'

/** Centered muted message for loading / error / empty states. */
export const PageState = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
`
