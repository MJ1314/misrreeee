import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const FooterPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, 'footer')
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="h-full w-full bg-gray-500 text-white flex items-center justify-center">
        Footer
      </div>
    </div>
  )
}

export default FooterPlaceholder
