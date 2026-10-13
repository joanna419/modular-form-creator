import { Link, Outlet, useLocation, useMatches } from 'react-router-dom'
import { Toaster } from 'sonner'
import styled, { useTheme } from 'styled-components'
import { fadeInUp } from '@/app/animations'
import { APP_SHELL_ID } from '@/app/appShell'
import { media } from '@/app/media'
import { paths } from '@/routes/paths'

/** Per-route layout flags, set via the route's `handle`. */
export interface RouteHandle {
  /** Desktop: the page fills the viewport and scrolls only its own region. */
  fillViewport?: boolean
}

export const RootLayout = () => {
  const { pathname } = useLocation()
  const theme = useTheme()
  const fillViewport = useMatches().some(
    (match) => (match.handle as RouteHandle | undefined)?.fillViewport,
  )

  return (
    <>
      <Shell id={APP_SHELL_ID}>
        <Header>
          <HeaderInner>
            <Brand to={paths.resources}>
              <Logo aria-hidden="true" />
              Resources Management
            </Brand>
          </HeaderInner>
        </Header>
        {/* Keyed by path so the entrance animation replays and scroll resets on navigation. */}
        <Content key={pathname}>
          <Main $fillViewport={fillViewport}>
            <Outlet />
          </Main>
        </Content>
      </Shell>
      {/* Action feedback (success / server errors). Field errors stay inline.
          Outside the shell so toasts stay usable while a modal makes the shell inert. */}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: theme.typography.body,
            borderRadius: theme.radii.md,
          },
        }}
      />
    </>
  )
}

// Desktop: an app shell exactly the viewport's height — the header stays put and
// only the content area scrolls. Mobile keeps the regular page scroll.
const Shell = styled.div`
  ${media.desktop} {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    /* The entrance animation briefly shifts the content down; never let that
       turn into a page-level scrollbar. */
    overflow: hidden;
  }
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const HeaderInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkStrong};
`

const Logo = styled.span`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  box-shadow: ${({ theme }) => theme.shadows.card};
`

const Content = styled.div`
  /* No fill-mode on purpose: a filling transform animation would keep this
     element a containing block for position: fixed descendants after it ends. */
  animation: ${fadeInUp} 0.3s ease;

  ${media.desktop} {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
`

const Main = styled.main<{ $fillViewport: boolean }>`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  ${media.desktop} {
    ${({ $fillViewport }) => ($fillViewport ? 'height: 100%;' : '')}
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`
