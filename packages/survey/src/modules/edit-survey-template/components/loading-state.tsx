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
            {id
              ? // Loading survey...
                'アンケートを読み込んでいます...'
              : // Preparing survey creator...
                'アンケート作成インターフェースを準備しています...'}
          </h3>
          <p className="text-muted-foreground text-sm">
            {id
              ? // Please wait while we load your survey data
                'アンケートデータを読み込んでいます。しばらくお待ちください。'
              : // Setting up the survey creation interface
                'アンケート作成インターフェースを準備しています。しばらくお待ちください。'}
          </p>
        </div>
      </div>
    </div>
  )
}
