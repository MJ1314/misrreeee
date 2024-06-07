import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const HeroPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, 'hero')
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="h-full w-full bg-blue-500 text-white flex items-center justify-center">
        Hero
      </div>
    </div>
  )
}

export default HeroPlaceholder
