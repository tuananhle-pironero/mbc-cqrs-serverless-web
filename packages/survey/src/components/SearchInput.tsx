import { Input } from '../ui/input'
import { cn } from '../utils'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

const DEBOUNCE_DELAY_MS = 300

interface SearchInputProps {
  className?: string
}

const SearchInput = ({ className }: SearchInputProps) => {
  const [queryValue, setQueryValue] = useQueryState('keyword', {
    defaultValue: '',
  })
  const [_, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const [inputValue, setInputValue] = useState(queryValue)

  useEffect(() => {
    setInputValue(queryValue)
  }, [queryValue])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== queryValue) {
        setQueryValue(inputValue)
        setPage(1)
      }
    }, DEBOUNCE_DELAY_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue, queryValue, setQueryValue, setPage])

  return (
    <Input
      type="text"
      className={cn(
        'rounded-full border border-[#636F80] bg-white placeholder:text-[#B7BDC6]',
        className
      )}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      showSearchIcon
      placeholder="テキスト・タグ・IDで検索" // "Search by text, tag, or ID"
    />
  )
}

export default SearchInput
