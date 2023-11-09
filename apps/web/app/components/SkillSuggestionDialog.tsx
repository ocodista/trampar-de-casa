import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'app/components/ui/dialog'
import { useState } from 'react'
import { SkillSuggestionField } from './SkillSuggestionField'

export function SkillSuggestionDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)
  return (
    <>
      <p>
        <button
          type="button"
          className="text-blue-400 underline transition-all hover:text-blue-500"
          onClick={openDialog}
        >
          Não encontrou sua tecnologia?
        </button>
      </p>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className="gap-4">
            <DialogTitle>Habilidades não cadastradas</DialogTitle>
            <DialogDescription>
              Faltou algo na lista? Por favor, adicione abaixo. Será incluído em
              breve.
            </DialogDescription>
          </DialogHeader>
          <SkillSuggestionField closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  )
}
