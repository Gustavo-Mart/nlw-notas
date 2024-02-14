import  NoteCard  from './components/note-card'
import  NewCard  from './components/new-card'
import { ChangeEvent, useState } from 'react'

interface Note{
  id: string,
  date: Date,
  content: string
}

export default function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(()=>{
    const notesOnStorage = localStorage.getItem('notes')

    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNoteCreated(content:string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id:string){
    const notesArray = notes.filter(note => {
      return note.id !== id
    })
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search!== ''
  ? notes.filter(note => note.content.toLowerCase().includes(search))
  : notes

  return (
    <>
      <div className="mx-auto max-w-7xl my-12 space-y-6 px-5">
        <form className="w-full">
          <input 
            type="text" 
            className="w-full text-3xl md:text-4xl bg-transparent font-semibold tracking-tight outline-none placeholder:text-zinc-500" 
            placeholder="Busque em suas notas"
            onChange={handleSearch}
          />
        </form>
        <div className="w-full h-px bg-emerald-400"/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] auto-cols-[400px] gap-6">
          <NewCard onNoteCreated={onNoteCreated}/>  
          {filteredNotes.map(note=>{
            return <NoteCard key={note.id} notes={note} onNoteDeleted={onNoteDeleted}/>
          })}
        </div>
      </div>
    </>
  )
}