'use client'

import { Pagination } from '../../../components/pagination'
import type { SurveyTemplateDataEntity } from '../../../types'
import type { SurveyTemplateDataListEntity } from '../../../types'
import { Alert, AlertDescription } from '../../../ui/alert'
import { Skeleton } from '../../../ui/skeleton'
import { AlertCircle, Search } from 'lucide-react'
import { memo } from 'react'
import { SurveyCard } from './survey-card'

interface SurveyListProps {
  surveys: SurveyTemplateDataListEntity | null
  error?: Error | null
  page: number
  pageSize: number
  onClick: (survey: SurveyTemplateDataEntity) => void
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function SurveyListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Search className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">No surveys found</h3>
      <p className="text-muted-foreground mb-4">
        Get started by creating your first survey template.
      </p>
    </div>
  )
}

export const SurveyList = memo<SurveyListProps>(
  ({
    surveys,
    error,
    page,
    pageSize,
    onClick,
    onPageChange,
    onPageSizeChange,
  }) => {
    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load surveys. Please try again later.
          </AlertDescription>
        </Alert>
      )
    }

    if (!surveys || surveys.items.length === 0) {
      return <EmptyState />
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {surveys.items.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} onClick={onClick} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={surveys.total}
            onChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </>
    )
  }
)

SurveyList.displayName = 'SurveyList'
