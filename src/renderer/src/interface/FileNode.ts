export interface FileNode {
  name: string
  path: string
  type: 'folder' | 'file'
  children?: FileNode[]
}
