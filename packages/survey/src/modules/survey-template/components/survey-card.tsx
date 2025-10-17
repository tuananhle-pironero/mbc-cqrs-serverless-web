'use client'

import type { SurveyTemplateDataEntity } from '../../../types'
import { Badge } from '../../../ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card'
import { format } from 'date-fns'
import { FileText, Layers } from 'lucide-react'
import { memo } from 'react'

interface SurveyCardProps {
  survey: SurveyTemplateDataEntity
  onClick: (survey: SurveyTemplateDataEntity) => void
}

export const SurveyCard = memo<SurveyCardProps>(({ survey, onClick }) => {
  const { attributes } = survey
  const surveyTemplate = attributes?.surveyTemplate as any

  // Count questions in the survey
  const questionCount =
    surveyTemplate?.items?.filter((item: any) => item.type !== 'section-header')
      .length || 0

  // Count sections
  const sectionCount =
    surveyTemplate?.items?.filter((item: any) => item.type === 'section-header')
      .length || 0

  return (
    <Card
      className="from-background to-muted/20 hover:border-primary/20 group cursor-pointer border-2 bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onClick(survey)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(survey)
        }
      }}
      aria-label={`View survey template: ${survey.name}`} // View survey template: ${survey.name}
    >
      <CardHeader className="pb-4">
        <div className="space-y-2">
          <CardTitle className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors sm:text-xl">
            {survey.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm sm:text-base">
            {/* No description provided */}
            {attributes?.description || '説明が提供されていません'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Stats Row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <FileText className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">
                  {/* questions */}
                  {questionCount} 質問
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5">
                <Layers className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">
                  {/* sections */}
                  {sectionCount} セクション
                </span>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="border-primary/20 bg-primary/10 text-primary px-2 py-1 text-xs font-medium"
            >
              {format(new Date(survey.createdAt || new Date()), 'MMM dd, yyyy')}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

SurveyCard.displayName = 'SurveyCard'
