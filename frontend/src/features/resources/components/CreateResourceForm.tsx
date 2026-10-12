import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { ApiError } from '../../../api'
import { Button, Input } from '../../../design-system'
import { useCreateResource } from '../hooks/useResourceMutations'
import { validateResourceName } from '../lib/validation'

export function CreateResourceForm() {
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
      onError: (err) => {
        setError(
          err instanceof ApiError ? err.message : 'Failed to create resource',
        )
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Input
          label="New resource"
          placeholder="Resource name"
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
  )
}

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Field = styled.div`
  flex: 1;
`
