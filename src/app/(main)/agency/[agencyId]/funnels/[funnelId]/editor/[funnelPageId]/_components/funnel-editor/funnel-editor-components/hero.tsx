'use client'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

type Props = {
  element: EditorElement
}

const HeroComponent = ({ element }: Props) => {
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
    <div
      className={clsx(
        'p-4 w-full m-5 relative text-16 transition-all bg-cover bg-center border',
        {
          'border-blue-500 border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-slate-300': !state.editor.liveMode,
        }
      )}
      style={styles}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-23px -left-1px rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <div className="hero-content">
        <h1
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => handleBlur('heading', e.target.innerText)}
          style={{ fontSize: styles.fontSize, fontFamily: styles.fontFamily }}
        >
          {element.content.heading}
        </h1>
        <h2
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => handleBlur('subtext', e.target.innerText)}
          style={{ fontSize: styles.fontSize, fontFamily: styles.fontFamily }}
        >
          {element.content.subtext}
        </h2>
        <button
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => handleBlur('buttonText', e.target.innerText)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          style={{ fontSize: styles.fontSize, fontFamily: styles.fontFamily }}
        >
          {element.content.buttonText}
        </button>
      </div>
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
    </div>
  )
}

export default HeroComponent
