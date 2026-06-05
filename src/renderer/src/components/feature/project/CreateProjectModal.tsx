import { useState } from 'react'
import { Modal } from '@renderer/components/ui/Modal'
import { Button } from '@renderer/components/ui/Button'

interface CreateProjectModalProps {
  open: boolean
  onClose: () => void
  onCreate: (projectName: string) => void
}

export function CreateProjectModal({
  open,
  onClose,
  onCreate
}: CreateProjectModalProps): React.JSX.Element {
  const [projectName, setProjectName] = useState('')

  const handleCreate = (): void => {
    if (!projectName.trim()) {
      return
    }
    onCreate(projectName.trim())
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Project">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
          className="w-full rounded-sm border border-current-line bg-current-line px-3 py-1 text-[13px] text-text outline-none focus:border-purple"
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  )
}
