import { useState, type FormEvent } from 'react'
import { ApiError } from '@/api'
import { Button, Input } from '@/design-system'
import { useCreateResource } from '@/features/resources/hooks/useResourceMutations'
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
      onError: (err) => {
        setError(
          err instanceof ApiError ? err.message : 'Failed to create resource',
        )
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-start gap-2">
      <div className="flex-1">
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
      </div>
      <Button type="submit" disabled={create.isPending}>
        {create.isPending ? 'Creating…' : 'Create'}
      </Button>
    </form>
  )
}
