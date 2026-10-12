import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import type { ProjectCategory, ProjectDetails, TeamMember } from '@/api'
import { Button, CheckboxGroup, Input, Select } from '@/design-system'
import {
  CATEGORY_OPTIONS,
  TEAM_MEMBER_OPTIONS,
} from '@/features/resources/lib/constants'
import {
  validateBudget,
  validateProjectName,
} from '@/features/resources/lib/validation'

export interface ProjectDetailsFormValues {
  projectName: string
  budget: string
  category: ProjectCategory | ''
  options: TeamMember[]
}

interface ProjectDetailsFormProps {
  defaultValues: ProjectDetailsFormValues
  submitLabel: string
  isSubmitting: boolean
  onSubmit: (values: ProjectDetails) => void
}

const CATEGORY_SELECT_OPTIONS = [
  { value: '', label: 'Select category' },
  ...CATEGORY_OPTIONS,
]

export const ProjectDetailsForm = ({
  defaultValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: ProjectDetailsFormProps) => {
  const { control, handleSubmit } = useForm<ProjectDetailsFormValues>({
    defaultValues,
  })

  const submit = handleSubmit((values) => {
    onSubmit({
      projectName: values.projectName.trim(),
      budget: values.budget.trim(),
      category: values.category as ProjectCategory,
      options: values.options,
    })
  })

  return (
    <Form onSubmit={submit}>
      <Controller
        name="projectName"
        control={control}
        rules={{ validate: (value) => validateProjectName(value) ?? true }}
        render={({ field, fieldState }) => (
          <Input
            label="Project name"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="budget"
        control={control}
        rules={{ validate: (value) => validateBudget(value) ?? true }}
        render={({ field, fieldState }) => (
          <Input
            label="Budget"
            inputMode="numeric"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: 'Category is required' }}
        render={({ field, fieldState }) => (
          <Select
            label="Category"
            options={CATEGORY_SELECT_OPTIONS}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="options"
        control={control}
        rules={{
          validate: (value) =>
            value.length > 0 || 'Select at least one team member',
        }}
        render={({ field, fieldState }) => (
          <CheckboxGroup
            label="Team members"
            options={TEAM_MEMBER_OPTIONS}
            value={field.value}
            onChange={field.onChange}
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
`
