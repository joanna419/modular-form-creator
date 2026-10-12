import { createGlobalStyle } from 'styled-components'

/** App-level global styles layered on top of the design system's GlobalStyles. */
export const AppStyles = createGlobalStyle`
  h1 {
    font-size: clamp(1.6rem, 1.2rem + 1.6vw, 2.2rem);
    letter-spacing: -0.01em;
  }

  a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* Respect users who ask for less motion: no animations or transitions. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`
