import type { ReactNode } from 'react'

interface PageStateProps {
  children: ReactNode
  isError?: boolean
}

/** Centered muted message for loading / error / empty states. */
export const PageState = ({ children, isError = false }: PageStateProps) => (
  <p
    role={isError ? 'alert' : undefined}
    className="py-8 text-center text-ink-muted"
  >
    {children}
  </p>
)
