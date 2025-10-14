'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../ui/alert-dialog'
import { Button } from '../../../ui/button'
import { Icon } from '../../../ui/icon'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface SurveyFormActionButtonsProps {
  id?: string
  isSubmitting: boolean
  isDeleting?: boolean
  isButtonDisabled: boolean
  onSubmit: () => void
  onCancel?: () => void
  onDelete: () => void
}

export function SurveyFormActionButtons({
  id,
  isSubmitting,
  isDeleting = false,
  isButtonDisabled,
  onSubmit,
  onCancel,
  onDelete,
}: SurveyFormActionButtonsProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleBack = useCallback(() => {
    if (onCancel) {
      onCancel()
    } else {
      router.back()
    }
  }, [onCancel, router])

  const handleDeleteClick = useCallback(() => {
    setIsDeleteDialogOpen(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    onDelete()
    setIsDeleteDialogOpen(false)
  }, [onDelete])

  return (
    <div className="mt-9 flex flex-row items-center justify-center gap-8 self-center">
      {/* Back/Cancel button */}
      <Button
        type="button"
        size="lg"
        className="flex items-center rounded-full border border-[#636F80] bg-[#EEEEEE] text-black hover:bg-[#B7BDC6]"
        disabled={isSubmitting || isDeleting}
        onClick={handleBack}
      >
        <Icon.Left className="!h-5 !w-5" />
        {id ? 'キャンセル' : '戻る'}
      </Button>

      {/* Delete button */}
      {id && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              size="lg"
              className="flex items-center rounded-full border border-[#636F80] bg-[#EEEEEE] text-black hover:bg-[#B7BDC6]"
              loading={isDeleting}
              disabled={isSubmitting || isDeleting}
              onClick={handleDeleteClick}
            >
              <Icon.Trash className="!h-5 !w-5" />
              削除
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>削除の確認</AlertDialogTitle>
              <AlertDialogDescription>
                このデータを完全に削除します。この操作は元に戻せません。よろしいですか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                キャンセル
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600"
              >
                {isDeleting ? '削除中...' : '削除する'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* Submit button */}
      <Button
        type="button"
        size="lg"
        disabled={isButtonDisabled}
        loading={isSubmitting}
        className="flex items-center rounded-full border border-[#636F80] bg-[#EEEEEE] text-black hover:bg-[#B7BDC6]"
        onClick={onSubmit}
      >
        {id ? '更新' : '作成'}
        <Icon.Right className="!h-5 !w-5" />
      </Button>
    </div>
  )
}
