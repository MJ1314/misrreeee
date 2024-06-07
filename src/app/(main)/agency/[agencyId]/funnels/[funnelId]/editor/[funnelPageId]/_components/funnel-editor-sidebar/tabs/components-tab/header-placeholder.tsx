// header-placeholder.tsx
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const HeaderPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, 'header')
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="h-full w-full bg-green-500 text-white flex items-center justify-center">
        Header
      </div>
    </div>
  )
}

export default HeaderPlaceholder
