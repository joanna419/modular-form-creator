import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ApiError, type BasicInfo } from '../../../api'
import { paths } from '../../../routes/paths'
import { BasicInfoForm } from '../components/BasicInfoForm'
import { PageState } from '../components/PageState'
import { useResource } from '../hooks/useResource'
import { useUpdateBasicInfo } from '../hooks/useResourceMutations'

export function BasicInfoPage() {
  const { resourceId = '' } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { data: resource, isPending, isError, error } = useResource(resourceId)
  const update = useUpdateBasicInfo(resourceId)

  if (isPending) return <PageState>Loading resource…</PageState>
  if (isError) {
    return (
      <PageState role="alert">
        {error instanceof ApiError ? error.message : 'Failed to load resource.'}
      </PageState>
    )
  }

  // Completed-resource editing uses the buffered full-update flow (next step).
  if (resource.status === 'completed') {
    return (
      <PageState>Completed resources cannot be edited here yet.</PageState>
    )
  }

  const handleSubmit = (data: BasicInfo) => {
    setSubmitError(null)
    update.mutate(data, {
      onSuccess: () => navigate(paths.resource(resourceId)),
      onError: (err) =>
        setSubmitError(
          err instanceof ApiError ? err.message : 'Failed to save Basic Info.',
        ),
    })
  }

  return (
    <>
      <BackLink to={paths.resource(resourceId)}>← Back to overview</BackLink>
      <Title>Basic Info</Title>
      {submitError && <Error role="alert">{submitError}</Error>}
      <BasicInfoForm
        resourceName={resource.basicInfo.resourceName || resource.name}
        defaultValues={{
          owner: resource.basicInfo.owner,
          email: resource.basicInfo.email,
          description: resource.basicInfo.description,
          priority: resource.basicInfo.priority,
        }}
        submitLabel="Save Basic Info"
        isSubmitting={update.isPending}
        onSubmit={handleSubmit}
      />
    </>
  )
}

const BackLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`

const Error = styled.p`
  color: ${({ theme }) => theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
