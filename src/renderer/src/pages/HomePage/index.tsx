import { ReactElement, useEffect, useState } from 'react'
import Logo from '@renderer/assets/images/logo.svg'
import { Button } from '@renderer/components/ui/Button'
import { Separator } from '@renderer/components/ui/Separator'
import { FileIcon, FolderIcon } from 'lucide-react'
import { WorkspaceService } from '@renderer/services/workspace.service'
import { useEditorStore } from '@renderer/store/editor.store'
import { useNavigate } from 'react-router'
import { CreateProjectModal } from '@renderer/components/feature/project/CreateProjectModal'

export function HomePage(): ReactElement {
  const { workspace, setWorkspace } = useEditorStore()
  const navigate = useNavigate()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const workspaceService = new WorkspaceService(workspace?.path ?? '')

  useEffect(() => {
    if (workspace) {
      navigate('/editor')
    }
  }, [workspace, navigate])

  const handleOpenWorkspace = async (): Promise<void> => {
    const workspace = await workspaceService.openWorkspace()
    if (workspace) {
      setWorkspace(workspace)
    }
  }

  const handleCreateWorkspace = async (projectName: string): Promise<void> => {
    const workspace = await workspaceService.createWorkspace(projectName)
    if (workspace) {
      setWorkspace(workspace)
      setIsCreateModalOpen(false)
      navigate('/editor')
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
      <section className="flex flex-col min-w-[400px]  items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img src={Logo} alt="Logo" className="w-[120px] h-[120px]" />
          <h1 className="text-xl font-bold text-text">3Dev Editor</h1>
        </div>
        <Separator />
        <div className="flex flex-col w-full items-center justify-center">
          <Button
            variant="ghost"
            className="flex w-full  text-comment hover:text-purple transition-all  text-xs justify-center items-center gap-2"
            onClick={handleOpenWorkspace}
          >
            <FolderIcon />
            <span>Open Project</span>
          </Button>
          <Button
            variant="ghost"
            className="flex w-full text-comment hover:text-purple transition-all text-xs justify-center items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <FileIcon />
            <span>Create Project</span>
          </Button>
        </div>
      </section>

      <CreateProjectModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateWorkspace}
      />
    </div>
  )
}
