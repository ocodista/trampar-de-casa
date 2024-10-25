import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from 'app/components/ui/dialog'
import { AlertCircle } from 'lucide-react'

type MissingFields = {
  name?: boolean
  englishLevel?: boolean
  skillsId?: boolean
  gitHub?: boolean
  linkedInUrl?: boolean
  startedWorkingAt?: boolean
}

interface ProfileCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  encryptedUserId: string
  missingFields: MissingFields
}

const ProfileCompletionModal = ({
  isOpen,
  onClose,
  encryptedUserId,
  missingFields,
}: ProfileCompletionModalProps) => {
  const router = useRouter()

  const getMissingFieldsList = () => {
    const fields = []
    if (missingFields.name) fields.push('Nome')
    if (missingFields.englishLevel) fields.push('Nível de inglês')
    if (missingFields.skillsId) fields.push('Habilidades')
    if (missingFields.gitHub) fields.push('GitHub')
    if (missingFields.linkedInUrl) fields.push('LinkedIn')
    if (missingFields.startedWorkingAt) fields.push('Experiência profissional')
    return fields
  }

  const handleComplete = () => {
    router.push(`/subscribers/profile/${encryptedUserId}`)
    onClose()
  }

  const missingFieldsList = getMissingFieldsList()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <DialogTitle>Complete seu perfil</DialogTitle>
          </div>
          <DialogDescription>
            Para se candidatar a esta vaga, precisamos que você complete algumas
            informações do seu perfil:
          </DialogDescription>
          <ul className="mt-2 list-disc pl-4">
            {missingFieldsList.map((field) => (
              <li key={field} className="text-muted-foreground text-sm">
                {field}
              </li>
            ))}
          </ul>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Depois
          </Button>
          <Button onClick={handleComplete}>Completar perfil</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileCompletionModal
