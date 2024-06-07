// header.tsx
'use client'
import React from 'react'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Trash } from 'lucide-react'

type Props = {
  element: EditorElement
}

const HeaderComponent = ({ element }: Props) => {
  const { dispatch, state } = useEditor()

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id
    let value = e.target.value
    const styleObject = {
      [styleSettings]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

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

  return (
    <header
      style={element.styles}
      className={clsx(
        'header-component p-4 bg-gray-800 text-white flex justify-between items-center relative',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-1 border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-23px -left-1px rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <div className="logo">
        <img src={element.content.logoSrc || ''} alt="Logo" className="h-10" />
      </div>
      <nav className="flex gap-4">
        {(element.content.links || []).map(
          (link: { id: string; href: string; text: string }) => (
            <a key={link.id} href={link.href} className="hover:underline">
              {link.text}
            </a>
          )
        )}
      </nav>
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-25px -right-1px rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </header>
  )
}

export default HeaderComponent
