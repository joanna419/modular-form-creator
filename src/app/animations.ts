import { keyframes } from 'styled-components'

/** Subtle entrance for page content and appearing panels. */
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`

/** Moving highlight for loading skeletons. */
export const shimmer = keyframes`
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
`
