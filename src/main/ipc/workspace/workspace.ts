import { dialog, ipcMain } from 'electron'

export function registerWorkspaceIpc(): void {
  ipcMain.handle('workspace:open', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    })

    if (result.canceled) {
      return null
    }

    return result.filePaths[0]
  })
}
