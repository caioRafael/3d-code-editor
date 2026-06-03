import { ipcMain } from 'electron'
import { buildTree } from '../../services/filesystem'

export function registerWorkspaceTreeIpc(): void {
  ipcMain.handle('workspace:tree', async (_, workspacePath: string) => {
    return buildTree(workspacePath)
  })
}
