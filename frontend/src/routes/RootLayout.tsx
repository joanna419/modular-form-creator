import { Link, Outlet } from 'react-router-dom'
import { paths } from '@/routes/paths'

export const RootLayout = () => (
  <div className="min-h-screen bg-surface-alt">
    <header className="border-b border-border bg-surface px-8 py-4">
      <Link
        to={paths.resources}
        className="font-heading text-xl font-semibold text-ink-strong"
      >
        Resources Management
      </Link>
    </header>
    <main className="mx-auto max-w-[960px] p-8">
      <Outlet />
    </main>
  </div>
)
