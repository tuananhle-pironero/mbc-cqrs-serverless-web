'use client'

import SearchInput from '../../../components/SearchInput'
import { Button } from '../../../ui/button'
import { Container } from '../../../ui/container'
import { Icon } from '../../../ui/icon'
import { memo } from 'react'

interface SearchHeaderProps {
  onCreateNew?: () => void
  createButtonText?: string
}

export const SearchHeader = memo<SearchHeaderProps>(
  ({ onCreateNew, createButtonText = '新規作成' }) => {
    return (
      <Container className="mb-2 flex flex-row items-center justify-between gap-2">
        <Container className="w-full md:w-1/2 lg:w-1/3">
          <SearchInput />
        </Container>
        <Button
          size="default"
          className="rounded-full border border-[#636F80] bg-[#EEEEEE] !px-10 text-black transition-colors duration-200 hover:bg-[#B7BDC6]"
          onClick={onCreateNew}
          aria-label="Create new survey template"
        >
          <Icon.Add className="!h-5 !w-5 text-black" />
          {createButtonText}
        </Button>
      </Container>
    )
  }
)

SearchHeader.displayName = 'SearchHeader'
