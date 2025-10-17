'use client'

import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert'
import { Button } from '../../../ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface EditSurveyTemplateErrorStateProps {
  error: Error
  onRetry: () => void
}

export function EditSurveyTemplateErrorState({
  error,
  onRetry,
}: EditSurveyTemplateErrorStateProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive" className="mx-auto max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          {/* Failed to load survey */}
          アンケートの読み込みに失敗しました。
        </AlertTitle>
        <AlertDescription className="space-y-3">
          <p>
            {/* Failed to fetch survey data. Please try again. */}
            {error.message ||
              'アンケートデータの取得に失敗しました。再度試してください。'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {/* Try again */}
            再度試す
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
