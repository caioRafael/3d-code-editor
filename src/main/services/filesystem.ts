import fs from 'fs'
import path from 'path'
import { FileNode } from '../interfaces/FileNode'

export function readDirectory(dir: string): FileNode[] {
  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const fullPath = path.join(dir, file)

    const stat = fs.statSync(fullPath)

    return {
      name: file,
      path: fullPath,
      type: stat.isDirectory() ? 'folder' : 'file'
    }
  })
}

export function buildTree(dir: string): FileNode {
  return {
    name: path.basename(dir),
    path: dir,
    type: 'folder',
    children: fs.readdirSync(dir).map((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        return buildTree(fullPath)
      }
      return {
        name: file,
        path: fullPath,
        type: 'file'
      }
    })
  }
}
