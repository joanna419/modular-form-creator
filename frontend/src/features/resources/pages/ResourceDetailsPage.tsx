import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ModuleSummary } from '@/features/resources/components/ModuleSummary'
import { LoadingState } from '@/features/resources/components/LoadingState'
import { PageState } from '@/features/resources/components/PageState'
import { StatusBadge } from '@/features/resources/components/StatusBadge'
import { useEditBuffer } from '@/features/resources/hooks/useEditBuffer'
import { useResource } from '@/features/resources/hooks/useResource'
import {
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '@/features/resources/lib/completion'
import {
  CATEGORY_OPTIONS,
  getOptionLabel,
  PRIORITY_OPTIONS,
} from '@/features/resources/lib/constants'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { paths } from '@/routes/paths'

/** Read-only summary of persisted data (buffered edits are not shown here). */
export const ResourceDetailsPage = () => {
  const { resourceId = '' } = useParams()
  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const buffer = useEditBuffer()

  if (isPending) return <LoadingState label="Loading resource" rows={2} />
  if (isError) {
    return (
      <PageState isError>{getErrorMessage(error, 'Failed to load resource.')}</PageState>
    )
  }

  const { basicInfo, projectDetails } = resource

  return (
    <>
      <BackLink to={paths.resource(resourceId)}>← Back to overview</BackLink>

      <Header>
        <h1>{resource.name}</h1>
        <StatusBadge status={resource.status} />
      </Header>

      {buffer.hasEdits(resourceId) && (
        <Notice role="status">
          This resource has unsaved changes. Values below are the saved ones —{' '}
          <Link to={paths.resource(resourceId)}>
            submit or discard them on the overview
          </Link>
          .
        </Notice>
      )}

      <Sections>
        <ModuleSummary
          title="Basic Info"
          isComplete={isBasicInfoComplete(basicInfo)}
          fields={[
            { label: 'Resource name', value: basicInfo.resourceName || resource.name },
            { label: 'Owner', value: basicInfo.owner },
            { label: 'Email', value: basicInfo.email },
            { label: 'Description', value: basicInfo.description },
            {
              label: 'Priority',
              value: getOptionLabel(PRIORITY_OPTIONS, basicInfo.priority),
            },
          ]}
        />
        <ModuleSummary
          title="Project Details"
          isComplete={isProjectDetailsComplete(projectDetails)}
          fields={[
            { label: 'Project name', value: projectDetails.projectName },
            { label: 'Budget', value: projectDetails.budget },
            {
              label: 'Category',
              value: getOptionLabel(CATEGORY_OPTIONS, projectDetails.category),
            },
            { label: 'Team members', value: projectDetails.options.join(', ') },
          ]}
        />
      </Sections>
    </>
  )
}

const BackLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Notice = styled.p`
  color: ${({ theme }) => theme.colors.info};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  a {
    text-decoration: underline;
  }
`

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`
