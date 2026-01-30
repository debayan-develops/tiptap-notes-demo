import React from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const isActive = (type, opts) => editor.isActive(type, opts) ? 'is-active' : ''

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="menu-bar">
      {/* Basic Formatting */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={isActive('bold')}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={isActive('italic')}>I</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={isActive('strike')}>S</button>
      
      <div className="divider" />

      {/* Headings */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={isActive('heading', { level: 1 })}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={isActive('heading', { level: 2 })}>H2</button>
      
      <div className="divider" />

      {/* Lists & Code */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={isActive('bulletList')}>List</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={isActive('codeBlock')}>&lt;/&gt;</button>

      <div className="divider" />

      {/* Advanced Inserts */}
      <button onClick={addImage}>Img</button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Table</button>
      
      {/* Table Controls (only show if inside a table) */}
      {editor.isActive('table') && (
        <>
          <button onClick={() => editor.chain().focus().deleteTable().run()} style={{color: 'red'}}>Del Table</button>
        </>
      )}

      <div className="divider" />

      {/* History */}
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        ↺
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        ↻
      </button>
    </div>
  )
}

export default MenuBar