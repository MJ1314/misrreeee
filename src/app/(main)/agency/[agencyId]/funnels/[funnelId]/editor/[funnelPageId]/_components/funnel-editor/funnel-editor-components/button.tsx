'use client'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

type Props = {
  element: EditorElement
}

const ButtonComponent = ({ element }: Props) => {
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

  const handleBlur = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            [field]: value,
          },
        },
      },
    })
  }

  return (
    <button
      style={styles}
      className={clsx('relative p-4 transition-all border', {
        'border-blue-500 border-solid': state.editor.selectedElement.id === element.id,
        'border-dashed border-slate-300': !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
      contentEditable={!state.editor.liveMode}
      onBlur={(e) => handleBlur('text', e.target.innerText)}
      suppressContentEditableWarning={true}
    >
      {element.content.text}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-25px -right-1px rounded-none rounded-t-lg text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </button>
  )
}

export default ButtonComponent
