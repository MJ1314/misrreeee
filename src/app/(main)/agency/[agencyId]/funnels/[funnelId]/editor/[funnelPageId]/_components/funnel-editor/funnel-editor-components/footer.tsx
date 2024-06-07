'use client'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

type Props = {
  element: EditorElement
}

const FooterComponent = ({ element }: Props) => {
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
    <footer
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
      <div className="footer-content">
        <span
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => handleBlur('text', e.target.innerText)}
          style={{ fontSize: styles.fontSize, fontFamily: styles.fontFamily }}
        >
          {element.content.text}
        </span>
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
    </footer>
  )
}

export default FooterComponent
