// components/survey-creator/section-header-creator.tsx
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
} from '../../ui/alert-dialog'
import { Button } from '../../ui/button'
import { Card, CardHeader } from '../../ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Input } from '../../ui/input'
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Combine,
  Copy,
  MoreVertical,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import type { SurveyItemType, SurveySchemaType } from '../../types/schema'

interface SectionHeaderCreatorProps {
  itemIndex: number
  removeItem: (index: number) => void
  insertItem: (index: number, item: any) => void
  activeElementId: string | null
  setActiveElementId: (id: string | null) => void
  itemId: string
  onOpenReorderModal: () => void
}

export const SectionHeaderCreator: React.FC<SectionHeaderCreatorProps> = ({
  itemIndex,
  removeItem,
  activeElementId,
  setActiveElementId,
  itemId,
  onOpenReorderModal,
}) => {
  const { register, watch, setValue, getValues } =
    useFormContext<SurveySchemaType>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const allItems = watch('items')
  const isActive = activeElementId === itemId
  const itemData = watch(`items.${itemIndex}`) as Extract<
    SurveyItemType,
    { type: 'section-header' }
  >

  const sectionHeaders = allItems.filter(
    (item) => item.type === 'section-header'
  )
  const currentSectionNumber =
    sectionHeaders.findIndex((s) => s.id === itemData.id) + 1
  const totalSections = sectionHeaders.length

  const isLastRemainingSection = sectionHeaders.length <= 1

  const handleDuplicate = () => {
    const allItems = getValues('items')
    let endIndex = allItems.findIndex(
      (item, index) => index > itemIndex && item.type === 'section-header'
    )
    if (endIndex === -1) endIndex = allItems.length

    const itemsToDuplicate = allItems.slice(itemIndex, endIndex)
    const duplicatedItems = itemsToDuplicate.map((item, i) => {
      const newId = `${
        item.type === 'section-header' ? 'sec' : 'q'
      }_${Date.now() + i}`
      if (item.type === 'section-header') {
        return { ...item, id: newId, title: `${item.title} (Copy)` }
      }
      return { ...item, id: newId }
    })

    const finalItems = [
      ...allItems.slice(0, endIndex),
      ...duplicatedItems,
      ...allItems.slice(endIndex),
    ]
    setValue('items', finalItems)
  }

  const handleMerge = () => {
    if (itemIndex > 0) removeItem(itemIndex)
  }

  const handleDeleteSection = () => {
    const allItems = getValues('items')
    let endIndex = allItems.findIndex(
      (item, index) => index > itemIndex && item.type === 'section-header'
    )
    if (endIndex === -1) endIndex = allItems.length
    const newItems = [
      ...allItems.slice(0, itemIndex),
      ...allItems.slice(endIndex),
    ]
    setValue('items', newItems)
    setIsDeleteDialogOpen(false)
  }

  const menu = (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onOpenReorderModal}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <span>Move section</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Duplicate section</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleMerge}
            disabled={itemIndex === 0 || isLastRemainingSection}
          >
            <Combine className="mr-2 h-4 w-4" />
            <span>Merge with above</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => e.preventDefault()}
              disabled={isLastRemainingSection}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete section</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete questions and section?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting a section also deletes all questions it contains. This
            action cannot be undone.
            <br />
            <br />
            To preserve the questions, choose "Merge with above" from the
            section options instead.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSection}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <div id={itemId} className="relative pt-5">
      {/* Section Number Tab */}
      <div className="bg-primary text-primary-foreground absolute -top-1 left-0 z-10 rounded-md rounded-b-none px-3 py-1 text-xs font-semibold">
        Section {currentSectionNumber} of {totalSections}
      </div>

      {/* Main Content Card */}
      {isActive ? (
        // ============================================================================
        // ACTIVE MODE
        // ============================================================================
        <Card
          className="border-l-primary rounded-tl-none border-l-4 shadow-lg"
          onClick={() => setActiveElementId(itemId)}
        >
          <CardHeader className="flex flex-row items-start justify-between gap-4 p-6">
            <div className="w-full space-y-4">
              <Input
                placeholder="Untitled Section"
                {...register(`items.${itemIndex}.title`)}
                className="h-auto rounded-none border-0 border-b p-1 text-xl font-semibold shadow-none focus-visible:ring-0"
              />
              <Input
                placeholder="Description (optional)"
                {...register(`items.${itemIndex}.description`)}
                className="h-auto rounded-none border-0 border-b p-1 text-sm shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveElementId(null)
                }}
              >
                <ChevronUp className="text-muted-foreground h-5 w-5" />
              </Button>
              {menu}
            </div>
          </CardHeader>
        </Card>
      ) : (
        // ============================================================================
        // VIEW MODE
        // ============================================================================
        <div
          className="bg-card cursor-pointer rounded-lg rounded-tl-none border p-6 shadow-sm"
          onClick={() => setActiveElementId(itemId)}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="font-semibold">
                {itemData?.title || 'Untitled Section'}
              </p>
              {itemData?.description && (
                <p className="text-muted-foreground text-sm">
                  {itemData.description}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveElementId(itemId)
                }}
              >
                <ChevronDown className="text-muted-foreground h-5 w-5" />
              </Button>
              {menu}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
