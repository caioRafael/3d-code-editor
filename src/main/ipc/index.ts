import { registerFileIpc } from './file'
import { registerWorkspaceIpc, registerWorkspaceTreeIpc } from './workspace'

export function registerIpc(): void {
  registerFileIpc()
  registerWorkspaceIpc()
  registerWorkspaceTreeIpc()
}
