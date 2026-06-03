import { FileNode } from '@renderer/interface/FileNode'
import { ReactElement, useState } from 'react'

interface TreeNodeProps {
  node: FileNode
}

export function TreeNode({ node }: TreeNodeProps): ReactElement {
  const [expanded, setExpanded] = useState(true)

  if (node.type === 'file') {
    return (
      <div
        style={{
          paddingLeft: 20,
          cursor: 'pointer'
        }}
      >
        📄 {node.name}
      </div>
    )
  }

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer'
        }}
      >
        {expanded ? '📂' : '📁'} {node.name}
      </div>

      {expanded &&
        node.children?.map((child) => (
          <div key={child.path} style={{ paddingLeft: 20 }}>
            <TreeNode node={child} />
          </div>
        ))}
    </div>
  )
}
