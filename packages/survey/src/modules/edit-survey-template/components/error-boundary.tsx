'use client'

import { Alert, AlertDescription } from '../../../ui/alert'
import { Button } from '../../../ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Component, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface EditSurveyTemplateErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, retry: () => void) => ReactNode
}

export class EditSurveyTemplateErrorBoundary extends Component<
  EditSurveyTemplateErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: EditSurveyTemplateErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(
      'Edit Survey Template Error Boundary caught an error:',
      error,
      errorInfo
    )
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.retry)
      }

      return (
        <Alert variant="destructive" className="mx-auto max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="space-y-2">
            {/* Something went wrong while editing the survey template. */}
            <p>アンケートテンプレートの編集に失敗しました。</p>
            <Button
              variant="outline"
              size="sm"
              onClick={this.retry}
              className="mt-2"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {/* Try again */}
              再度試す
            </Button>
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
}
