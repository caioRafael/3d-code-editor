import { FileNode } from '@renderer/interface/FileNode'
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from 'lucide-react'
import { ReactElement, useState } from 'react'
import { useEditorStore } from '@renderer/store/editor.store'

interface TreeNodeProps {
  node: FileNode
}

export function TreeNode({ node }: TreeNodeProps): ReactElement {
  const { openFile } = useEditorStore()
  const [expanded, setExpanded] = useState(false)

  const handleClick = async (): Promise<void> => {
    const content = await window.electronAPI.readFile(node.path)
    openFile({ path: node.path, name: node.name, content })
  }

  if (node.type === 'file') {
    return (
      <div
        onClick={handleClick}
        className="flex items-center gap-1.5 rounded-sm px-2 py-0.5 pl-6 text-[13px] text-text/90 hover:bg-primary/40 cursor-pointer"
      >
        <File size={14} className="shrink-0 text-text/60" />
        <span className="truncate">{node.name}</span>
      </div>
    )
  }

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 rounded-sm px-2 py-0.5 text-[13px] text-text/90 hover:bg-primary/40 cursor-pointer"
      >
        {expanded ? (
          <ChevronDown size={14} className="shrink-0 text-text/60" />
        ) : (
          <ChevronRight size={14} className="shrink-0 text-text/60" />
        )}
        {expanded ? (
          <FolderOpen size={14} className="shrink-0 text-text/70" />
        ) : (
          <Folder size={14} className="shrink-0 text-text/70" />
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {expanded &&
        node.children?.map((child) => (
          <div key={child.path} className="pl-3">
            <TreeNode node={child} />
          </div>
        ))}
    </div>
  )
}
