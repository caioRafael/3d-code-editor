import { AppEditor } from '@renderer/components/feature/editor/AppEditor'
import { Sidebar } from '@renderer/components/feature/sidebar/Sidebar'
import { Resizable } from '@renderer/components/ui/Resizable'
import { AppPreview } from '@renderer/components/feature/preview/AppPreview'
import { ReactElement } from 'react'
import { useEditorStore } from '@renderer/store/editor.store'
import { EmptyState } from '@renderer/components/shared/EmptyState'
import { FileNode } from '@renderer/interface/FileNode'

export function EditorPage(): ReactElement {
  const { file, workspace, setWorkspace } = useEditorStore()

  const handleOpenWorkspace = async (): Promise<void> => {
    const path = await window.electronAPI.openWorkspace()

    if (path) {
      const tree: FileNode = await window.electronAPI.getWorkspaceTree(path)
      setWorkspace(tree)
    }
  }
  return (
    <main className="w-full flex-1 flex flex-row h-size-page-height">
      <Resizable direction="horizontal" initialWidth={300} minWidth={200}>
        <Sidebar tree={workspace} onOpenWorkspace={handleOpenWorkspace} />
      </Resizable>
      {workspace && file ? <AppEditor /> : <EmptyState />}
      <Resizable direction="horizontal" initialWidth={300} minWidth={200}>
        <AppPreview />
      </Resizable>
    </main>
  )
}
