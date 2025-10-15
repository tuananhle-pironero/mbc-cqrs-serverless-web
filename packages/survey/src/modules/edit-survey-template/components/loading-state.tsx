'use client'

import { Spinner } from '../../../components/loading/Spinner'

interface EditSurveyTemplateLoadingStateProps {
  id?: string
}

export function EditSurveyTemplateLoadingState({
  id,
}: EditSurveyTemplateLoadingStateProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Spinner size="lg" />
        <div className="text-center">
          <h3 className="text-foreground text-lg font-semibold">
            {id ? 'Loading survey...' : 'Preparing survey creator...'}
          </h3>
          <p className="text-muted-foreground text-sm">
            {id
              ? 'Please wait while we load your survey data'
              : 'Setting up the survey creation interface'}
          </p>
        </div>
      </div>
    </div>
  )
}
