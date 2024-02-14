import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface newNoteCardProps{
  onNoteCreated:(content: string) => void
}

export default function newCard ({onNoteCreated}: newNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [content, setContent] = useState('')

  function handleStartEditor(){
    setShouldShowOnBoarding(false)
  }

  function handleContentChanged(event:ChangeEvent<HTMLTextAreaElement>){
    setContent(event.target.value)
    if(event.target.value === ''){
      setShouldShowOnBoarding(true)
    }
  }

  function handleSaveNote(event:FormEvent){
    event.preventDefault()
    onNoteCreated(content)

    setContent('')
    setShouldShowOnBoarding(true)

    toast.success('Nota criada com sucesso!')
  }
  return(
    <Dialog.Root>
      <Dialog.Trigger className="bg-zinc-500 rounded-md p-5 gap-3 text-left hover:ring-2 hover:ring-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-400 outline-none flex flex-col">
        <span className="text-sm font-medium text-zinc-200">
          Adicionar Nota
        </span>
        <p className="text-sm leading-6 text-zinc-300">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
      <Dialog.Overlay className='inset-0 bg-black/60 fixed'/>
      <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-zinc-600 md:rounded-md flex flex-col'>
        <Dialog.Close className='absolute right-0 top-0 bg-zinc-800 p-1.5 text-zinc-300 hover:text-zinc-50'>
          <X className='size-5'/>
        </Dialog.Close>
        <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className="text-sm font-medium text-zinc-200">
            Adicionar nota
            </span>
          {shouldShowOnBoarding?(
            <p className="text-sm leading-6 text-zinc-300">Comece <button className='font-medium text-emerald-400 hover:underline'>gravando uma nota </button> em áudio ou se preferir <button className='font-medium text-emerald-400 hover:underline' onClick={handleStartEditor}>utilize apenas texto</button>.</p>
          ):(
            <textarea
              autoFocus
              className='text-sm leading-6 text-zinc-300 bg-transparent resize-none flex-1 outline-none'
              onChange={handleContentChanged}
              value={content}
            />
          )}
          </div>
          <button 
          type="submit" 
          className='w-full bg-emerald-400 py-4 text-center text-medium font-medium text-emerald-950 outline-none hover:bg-emerald-500'>
            Salvar nota
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root>
  )
}