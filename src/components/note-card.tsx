import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps{
  notes:{
    id: string,
    date:Date,
    content: string
  }
  onNoteDeleted: (id:string) => void
}
export default function card({ notes, onNoteDeleted }:NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-zinc-700 rounded-md p-5 gap-3 text-left overflow-hidden relative hover:ring-2 hover:ring-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-400 outline-none flex flex-col ">
        <span className="text-sm font-medium text-zinc-200">
          {formatDistanceToNow(notes.date, {locale:ptBR, addSuffix:true})}
        </span>
        <p className="text-sm leading-6 text-zinc-300 break-words">
          {notes.content}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-zinc-950 to-black/0 pointer-events-none"/>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='inset-0 bg-black/60 fixed'/>
      <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-zinc-600 md:rounded-md flex flex-col'>
        <Dialog.Close className='absolute right-0 top-0 bg-zinc-800 p-1.5 text-zinc-300 hover:text-zinc-50'>
          <X className='size-5'/>
        </Dialog.Close>
        <div className='flex flex-1 flex-col gap-3 p-5'>
          <span className="text-sm font-medium text-zinc-200">
            {formatDistanceToNow(notes.date, {locale:ptBR, addSuffix:true})}
          </span>
          <p className="text-sm leading-6 text-zinc-300 break-words">
            {notes.content}
          </p>
        </div>
        <button 
        type="button" 
        className='w-full bg-zinc-800 py-4 text-center text-sm font-medium text-slate-50 outline-none group' onClick={() =>onNoteDeleted(notes.id)}>
          Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
        </button>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}