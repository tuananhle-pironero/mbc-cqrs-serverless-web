import { Column } from '@tanstack/react-table'
import { Button } from '../ui/button'
import SortIndicator from './sort-indicator'
import React from 'react'

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
}: {
  column: Column<TData, TValue>
  title: string
}) => {
  return (
    <Button
      variant="ghost"
      className="bg-muted hover:bg-muted/80 focus:bg-muted/80 focus:!text-muted-foreground flex w-full items-center justify-between rounded-none font-bold"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <SortIndicator sortState={column.getIsSorted()} />
    </Button>
  )
}

export { DataTableColumnHeader }
