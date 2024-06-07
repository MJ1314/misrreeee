'use client'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

type Props = {
  element: EditorElement
}

const PhotoComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const styles = element.styles

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_ELEMENT',
          payload: {
            elementDetails: {
              ...element,
              content: {
                ...element.content,
                photoSrc: reader.result as string,
              },
            },
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      className={clsx(
        'relative w-full h-full p-4 transition-all bg-cover bg-center border',
        {
          'border-blue-500 ': state.editor.selectedElement.id === element.id,
          'border-dashed border-slate-300': !state.editor.liveMode,
        }
      )}
      style={{ ...styles, backgroundImage: `url(${element.content.photoSrc})` }}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </div>
        )}
    </div>
  )
}

export default PhotoComponent
