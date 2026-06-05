import { FileNode } from '@renderer/interface/FileNode'

export class WorkspaceService {
  private workspacePath: string

  constructor(workspacePath: string) {
    this.workspacePath = workspacePath
  }

  getWorkspacePath(): string {
    return this.workspacePath
  }

  async openWorkspace(): Promise<FileNode | null> {
    const path = await window.electronAPI.openWorkspace()
    if (path) {
      this.workspacePath = path
      return await window.electronAPI.getWorkspaceTree(this.workspacePath)
    }
    return null
  }

  async createWorkspace(projectName: string): Promise<FileNode | null> {
    const result = await window.electronAPI.createWorkspace(projectName)
    if (result) {
      this.workspacePath = result.projectPath
      return await window.electronAPI.getWorkspaceTree(this.workspacePath)
    }
    return null
  }
}
