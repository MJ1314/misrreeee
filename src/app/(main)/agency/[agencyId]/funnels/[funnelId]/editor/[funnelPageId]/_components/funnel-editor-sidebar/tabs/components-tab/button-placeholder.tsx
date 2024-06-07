import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const ButtonPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, 'button')
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="h-full w-full bg-green-500 text-white flex items-center justify-center">
        Button
      </div>
    </div>
  )
}

export default ButtonPlaceholder
