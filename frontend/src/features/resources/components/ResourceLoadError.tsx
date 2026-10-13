import { PageState } from '@/features/resources/components/PageState'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

/** Error state shared by resource pages (e.g. 404 not found, 400 invalid id). */
export const ResourceLoadError = ({ error }: { error: unknown }) => (
  <PageState isError action={{ to: paths.resources, label: '← Back to resources' }}>
    {getErrorMessage(error, 'Failed to load resource.')}
  </PageState>
)
