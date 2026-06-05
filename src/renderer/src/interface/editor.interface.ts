import { FileNode } from './FileNode'

export interface EditorState {
  workspace: FileNode | null
  setWorkspace: (workspace: FileNode | null) => void
  code: string
  setCode: (code: string) => void
  file: string | null
  setFile: (file: string) => void
}
