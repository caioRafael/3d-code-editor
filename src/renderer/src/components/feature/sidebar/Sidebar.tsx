import { FolderOpen } from 'lucide-react'
import { FileNode } from '@renderer/interface/FileNode'
import { Button } from '@renderer/components/ui/Button'
import { TreeNode } from '@renderer/components/shared/TreeNode'

interface SidebarProps {
  tree: FileNode | null
  onOpenWorkspace: () => void
}

export function Sidebar({ tree, onOpenWorkspace }: SidebarProps): React.JSX.Element {
  return (
    <div className="flex h-full flex-col bg-background text-text">
      <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-text/60">
        <FolderOpen size={14} />
        Explorer
      </div>

      <div className="px-2 pb-2">
        <Button variant="secondary" onClick={onOpenWorkspace}>
          Open Workspace
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-1 pb-2">{tree && <TreeNode node={tree} />}</div>
    </div>
  )
}
