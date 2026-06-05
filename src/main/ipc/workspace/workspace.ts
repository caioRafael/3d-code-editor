import { dialog, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

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

  ipcMain.handle('workspace:create', async (_, projectName: string) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    })

    if (result.canceled) {
      return null
    }

    const selectedFolder = result.filePaths[0]

    const projectPath = path.join(selectedFolder, projectName)

    fs.mkdirSync(projectPath, { recursive: true })

    const modelPath = path.join(projectPath, 'main.js')

    fs.writeFileSync(
      modelPath,
      `
const { cuboid, sphere } = require('@jscad/modeling').primitives
const { subtract } = require('@jscad/modeling').booleans

function main() {
  return subtract(
    cuboid({ size: [20, 20, 20] }),
    sphere({ radius: 13 })
  )
}

    
module.exports = { main }
`
    )

    return { selectedFolder, projectPath }
  })
}
