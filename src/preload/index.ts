import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      openWorkspace: () => ipcRenderer.invoke('workspace:open'),
      getWorkspaceTree: (workspacePath: string) =>
        ipcRenderer.invoke('workspace:tree', workspacePath),
      readFile: (filePath: string) => ipcRenderer.invoke('file:read', filePath),
      saveFile: (filePath: string, content: string) =>
        ipcRenderer.invoke('file:save', filePath, content),
      createWorkspace: (projectName: string) => ipcRenderer.invoke('workspace:create', projectName)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
