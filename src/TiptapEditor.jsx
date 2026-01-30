import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

// FIX: Use curly braces { } for these imports
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'

import MenuBar from './MenuBar'

const TiptapEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes History (Undo/Redo) and CodeBlock
      Placeholder.configure({
        placeholder: 'Start writing your story...',
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
  })

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  )
}

export default TiptapEditor