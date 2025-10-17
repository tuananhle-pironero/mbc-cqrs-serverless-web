// components/survey-creator/sortable-item.tsx
'use client'

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

interface SortableChildProps {
  dndAttributes?: DraggableAttributes
  dndListeners?: DraggableSyntheticListeners
}

interface SortableItemProps {
  id: string
  children: React.ReactElement<Partial<SortableChildProps>>
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {React.cloneElement(children, {
        dndAttributes: attributes,
        dndListeners: listeners,
      })}
    </div>
  )
}
