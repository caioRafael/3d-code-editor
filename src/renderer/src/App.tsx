import { ReactElement, useState } from 'react'
import { Resizable } from './components/ui/Resizable'
import { Versions } from './components/Versions'
import { AppEditor } from './components/feature/editor/AppEditor'
import { AppPreview } from './components/feature/preview/AppPreview'
import { FileNode } from './interface/FileNode'
import { TreeNode } from './components/shared/TreeNode'

function App(): ReactElement {
  const [tree, setTree] = useState<FileNode | null>(null)
  const handleOpenWorkspace = async (): Promise<void> => {
    const path = await window.electronAPI.openWorkspace()

    if (path) {
      const tree: FileNode = await window.electronAPI.getWorkspaceTree(path)
      setTree(tree)
      console.log('tree: ', tree)
    }
  }
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center">
        <header className="w-full min-h-6 flex items-center justify-between py-1 px-2 h-size-header-height">
          <h1 className="text-sm font-semibold text-text">3D-Editor</h1>
        </header>
        <main className="w-full flex-1 flex flex-row h-size-page-height">
          <Resizable direction="horizontal" initialWidth={300} minWidth={200} maxWidth={280}>
            <div className="h-full">
              <p className="text-text">Sidebar</p>
              <button onClick={handleOpenWorkspace}>Open Workspace</button>
              {tree && <p>Workspace: {tree.name}</p>}
              {tree && <TreeNode node={tree} />}
            </div>
          </Resizable>
          <AppEditor />
          <Resizable direction="horizontal" initialWidth={300} minWidth={200}>
            <AppPreview />
          </Resizable>
        </main>
      </div>
      <Versions />
    </>
  )
}

export default App
