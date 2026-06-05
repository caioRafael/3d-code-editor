import { FileNode } from './FileNode'

export interface OpenFile {
  path: string
  name: string
  content: string
  savedContent: string
}

export interface EditorState {
  workspace: FileNode | null
  setWorkspace: (workspace: FileNode | null) => void
  code: string
  setCode: (code: string) => void
  openFiles: OpenFile[]
  activePath: string | null
  openFile: (file: { path: string; name: string; content: string }) => void
  setActiveFile: (path: string) => void
  closeFile: (path: string) => void
  updateActiveContent: (content: string) => void
  markActiveSaved: () => void
}
