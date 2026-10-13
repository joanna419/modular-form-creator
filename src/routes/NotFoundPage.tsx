import { PageState } from '@/features/resources/components/PageState'
import { paths } from '@/routes/paths'

export const NotFoundPage = () => (
  <PageState action={{ to: paths.resources, label: 'Go to resources' }}>
    Page not found.
  </PageState>
)
