import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { media } from '@/app/media'
import type { BasicInfo, Priority } from '@/api'
import { Button, Input, Select } from '@/design-system'
import { PRIORITY_OPTIONS } from '@/features/resources/lib/constants'
import {
  validateDescription,
  validateEmail,
  validateOwner,
} from '@/features/resources/lib/validation'

export interface BasicInfoFormValues {
  owner: string
  email: string
  description: string
  priority: Priority | ''
}

interface BasicInfoFormProps {
  /** Locked after creation — shown read-only, sent unchanged. */
  resourceName: string
  defaultValues: BasicInfoFormValues
  submitLabel: string
  isSubmitting: boolean
  onSubmit: (values: BasicInfo) => void
}

const PRIORITY_SELECT_OPTIONS = [
  { value: '', label: 'Select priority' },
  ...PRIORITY_OPTIONS,
]

export const BasicInfoForm = ({
  resourceName,
  defaultValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: BasicInfoFormProps) => {
  const { control, handleSubmit } = useForm<BasicInfoFormValues>({
    defaultValues,
  })

  const submit = handleSubmit((values) => {
    onSubmit({
      resourceName,
      owner: values.owner.trim(),
      email: values.email.trim(),
      description: values.description.trim(),
      priority: values.priority as Priority,
    })
  })

  return (
    <Form onSubmit={submit}>
      <Input label="Resource name" value={resourceName} disabled />

      <Controller
        name="owner"
        control={control}
        rules={{ validate: (value) => validateOwner(value) ?? true }}
        render={({ field, fieldState }) => (
          <Input
            label="Owner"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ validate: (value) => validateEmail(value) ?? true }}
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ validate: (value) => validateDescription(value) ?? true }}
        render={({ field, fieldState }) => (
          <Input
            label="Description"
            multiline
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        rules={{ required: 'Priority is required' }}
        render={({ field, fieldState }) => (
          <Select
            label="Priority"
            options={PRIORITY_SELECT_OPTIONS}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Actions>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </Actions>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  ${media.mobile} {
    & > button {
      width: 100%;
    }
  }
`
