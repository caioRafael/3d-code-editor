import { ipcMain } from 'electron'
import fs from 'fs'

export function registerFileIpc(): void {
  ipcMain.handle('file:read', async (_, filePath: string) => {
    return fs.readFileSync(filePath, 'utf8')
  })

  ipcMain.handle('file:save', async (_, filePath: string, content: string) => {
    fs.writeFileSync(filePath, content)

    return true
  })
}
