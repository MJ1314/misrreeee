'use client'
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const PhotoPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, 'photo')
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center border border-transparent"
    >
      <div className="h-full w-full bg-gray-500 text-white flex items-center justify-center">
        Photo
      </div>
    </div>
  )
}

export default PhotoPlaceholder
