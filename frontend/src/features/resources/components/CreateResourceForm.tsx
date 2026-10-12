import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { media } from '@/app/media'
import { Button, Card, Input } from '@/design-system'
import { useCreateResource } from '@/features/resources/hooks/useResourceMutations'
import { getErrorMessage } from '@/features/resources/lib/errors'
import { validateResourceName } from '@/features/resources/lib/validation'

export const CreateResourceForm = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const create = useCreateResource()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const validationError = validateResourceName(name)
    if (validationError) {
      setError(validationError)
      return
    }

    create.mutate(name.trim(), {
      onSuccess: () => {
        setName('')
        setError(null)
      },
      onError: (err) => setError(getErrorMessage(err, 'Failed to create resource')),
    })
  }

  return (
    <Card variant="elevated">
      <PanelTitle>New resource</PanelTitle>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Input
            aria-label="Resource name"
            placeholder="Resource name"
            helperText="The name cannot be changed after creation."
            value={name}
            error={error ?? undefined}
            onChange={(event) => {
              setName(event.target.value)
              if (error) setError(null)
            }}
          />
        </Field>
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? 'Creating…' : 'Create'}
        </Button>
      </Form>
    </Card>
  )
}

const PanelTitle = styled.h2`
  font-size: 1.05rem;
`

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`

const Field = styled.div`
  flex: 1;
`
