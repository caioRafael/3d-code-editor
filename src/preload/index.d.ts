import { ElectronAPI } from '@electron-toolkit/preload'
import { FileNode } from '../main/interfaces/FileNode'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      openWorkspace: () => Promise<string | null>
      readFile: (filePath: string) => Promise<string>
      saveFile: (filePath: string, content: string) => Promise<boolean>
      getWorkspaceTree: (workspacePath: string) => Promise<FileNode>
      createWorkspace: (
        projectName: string
      ) => Promise<{ selectedFolder: string; projectPath: string } | null>
    }
  }
}
