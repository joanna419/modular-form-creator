import { Button } from '@/design-system'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-ink-muted">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
