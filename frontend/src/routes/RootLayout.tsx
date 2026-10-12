import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { fadeInUp } from '@/app/animations'
import { media } from '@/app/media'
import { paths } from '@/routes/paths'

export const RootLayout = () => {
  const { pathname } = useLocation()

  return (
    <>
      <Header>
        <HeaderInner>
          <Brand to={paths.resources}>
            <Logo aria-hidden="true" />
            Resources Management
          </Brand>
        </HeaderInner>
      </Header>
      {/* Keyed by path so the entrance animation replays on navigation. */}
      <Main key={pathname}>
        <Outlet />
      </Main>
    </>
  )
}

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
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

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  /* No fill-mode on purpose: a filling transform animation would keep <main> a
     containing block for position: fixed (the Drawer overlay) after it ends. */
  animation: ${fadeInUp} 0.3s ease;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`
