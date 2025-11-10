'use client'
import { Button } from '../ui/button'
import { UploadIcon } from 'lucide-react'
import React, { useRef } from 'react'

interface Props {
  disabled?: boolean
  onAdd: (jsonValue: string) => void
}

export default function ImportJSONButton({ disabled, onAdd }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileReader = new FileReader()
    const inputElement = e.target

    fileReader.readAsText(file, 'UTF-8')

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target?.result as string
      onAdd(fileContent)
      // Reset the input value to allow selecting the same file again
      inputElement.value = ''
    }

    fileReader.onerror = () => {
      console.error('Error reading file')
      // Reset the input value even on error
      inputElement.value = ''
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        disabled={disabled}
        onClick={() => fileRef.current?.click()}
      >
        <UploadIcon size={16} />
        <span>JSON読込</span>
      </Button>

      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept={'.json'}
        onChange={handleChange}
      />
    </>
  )
}
