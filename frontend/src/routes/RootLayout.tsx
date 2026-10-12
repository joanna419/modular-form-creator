import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { paths } from './paths'

export function RootLayout() {
  return (
    <Page>
      <Header>
        <Brand to={paths.resources}>Resources Management</Brand>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Page>
  )
}

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
`

const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkStrong};
  text-decoration: none;
`

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`
