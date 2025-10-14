'use client'

import {
  PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { cn } from '../../utils'

import { Container } from '../../ui/container'
import { getPaginationItems } from './get-pagination-item'

type Props = {
  page: number
  pageSize: number
  totalItems?: number
  length?: number
  name?: string
  onChange: (page: number) => void
  pageSizeOptions?: number[]
  onPageSizeChange?: (pageSize: number) => void
}

export const Pagination = ({
  page = 1,
  pageSize = 1,
  totalItems = 0,
  length = 7,
  name = '',
  onChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100, 300, 500],
}: Props) => {
  const numPages = Math.ceil(totalItems / pageSize)
  const pagination = getPaginationItems(page, numPages, length)

  // Don't render pagination if there's only 1 page or no items
  if (numPages <= 1 || totalItems === 0) {
    return null
  }

  const handlePrevious = () => {
    if (page === 1) return
    onChange(page - 1)
  }

  const handleNext = () => {
    if (page === numPages) return
    onChange(page + 1)
  }

  const handleChangePage = (page: number) => {
    onChange(page)
  }

  const handlePageSizeChange = (value: string) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(value))
    }
  }

  return (
    <PaginationBase className="mt-4">
      {!!totalItems && (
        <Container className="flex items-center gap-x-2 text-sm">
          {/* <span>Total</span>
					<span>
						{totalItems}
						{' items'}
					</span> */}
          {onPageSizeChange && (
            <Select
              value={String(pageSize)}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-[120px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Container>
      )}
      <PaginationContent className="flex items-center justify-center gap-0">
        <PaginationPrevious
          size="icon"
          data-disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-r-none data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-[#A3ACBA] data-[disabled=true]:opacity-50"
          onClick={() => {
            if (page === 1) return
            handlePrevious()
          }}
        />
        {pagination.map((pageItem) => {
          if (Number.isNaN(pageItem)) {
            return <PaginationEllipsis key={`${name}_ellipsis`} />
          }
          return (
            <PaginationLink
              size="icon"
              key={`${name}_${pageItem}_${pageItem}`}
              isActive={pageItem === page}
              onClick={() => handleChangePage(pageItem)}
              className={cn(
                'hover:text-primary flex h-8 w-8 items-center justify-center rounded-none text-sm transition-colors duration-200',
                {
                  'border-primary bg-primary/5 text-primary border':
                    pageItem === page,
                }
              )}
            >
              {pageItem}
            </PaginationLink>
          )
        })}
        <PaginationNext
          size="icon"
          data-disabled={page === numPages}
          className="flex h-8 w-8 items-center justify-center rounded-l-none data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-[#A3ACBA] data-[disabled=true]:opacity-50"
          onClick={handleNext}
        />
      </PaginationContent>
    </PaginationBase>
  )
}
