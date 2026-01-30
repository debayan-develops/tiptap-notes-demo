import React, { useState, useEffect } from 'react'
import TiptapEditor from './TiptapEditor'
import './App.css' // We will style this next

function App() {
  const [notes, setNotes] = useState(() => {
    // Load saved notes from local storage on startup
    const saved = localStorage.getItem('my-tiptap-notes')
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'New Note', content: '<p></p>' }]
  })
  const [activeNoteId, setActiveNoteId] = useState(notes[0].id)

  // Find the currently selected note object
  const activeNote = notes.find(n => n.id === activeNoteId)

  // Save to local storage whenever notes change
  useEffect(() => {
    localStorage.setItem('my-tiptap-notes', JSON.stringify(notes))
  }, [notes])

  const handleContentUpdate = (newContent) => {
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === activeNoteId ? { ...note, content: newContent } : note
    ))
  }

  const createNewNote = () => {
    const newId = Date.now()
    const newNote = { id: newId, title: `Note ${notes.length + 1}`, content: '' }
    setNotes([...notes, newNote])
    setActiveNoteId(newId)
  }

  const deleteNote = (e, id) => {
    e.stopPropagation()
    const remaining = notes.filter(n => n.id !== id)
    if (remaining.length === 0) {
      // If we deleted the last note, create a fresh empty one
      setNotes([{ id: Date.now(), title: 'New Note', content: '' }])
      setActiveNoteId(remaining[0]?.id) // Will be undefined but effect handles it
    } else {
      setNotes(remaining)
      if (id === activeNoteId) setActiveNoteId(remaining[0].id)
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>My Notes</h3>
          <button onClick={createNewNote}>+</button>
        </div>
        <ul className="note-list">
          {notes.map(note => (
            <li 
              key={note.id} 
              className={note.id === activeNoteId ? 'active' : ''}
              onClick={() => setActiveNoteId(note.id)}
            >
              <span>{note.title}</span>
              <button className="delete-btn" onClick={(e) => deleteNote(e, note.id)}>×</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Editor Area */}
      <div className="main-content">
        <TiptapEditor 
          content={activeNote?.content || ''} 
          onUpdate={handleContentUpdate} 
        />
      </div>
    </div>
  )
}

export default App