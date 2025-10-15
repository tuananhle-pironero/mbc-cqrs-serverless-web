'use client'
import { Skeleton } from '../../../ui/skeleton'

interface LoadingStateProps {
  height?: number
}

export function SurveyTemplateLoadingState({
  height = 375,
}: LoadingStateProps) {
  return (
    <div
      className="flex items-start justify-center p-4"
      style={{ minHeight: height, maxHeight: '500px' }}
      role="status"
      aria-label="Loading survey templates"
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="from-muted/30 to-muted/10 group animate-pulse rounded-lg border-2 bg-gradient-to-br p-4 transition-all duration-300 hover:shadow-md"
          >
            {/* Header Section */}
            <div className="space-y-3 pb-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-3">
              {/* Stats Row */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
