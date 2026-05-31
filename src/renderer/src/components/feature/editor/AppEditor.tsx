import Editor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { ReactElement } from 'react'

import { handleEditorWillMount } from '../../../themes/DraculaTheme'
import { useEditorStore } from '@renderer/store/editor.store'

loader.config({ monaco })

export function AppEditor(): ReactElement {
  const { code, setCode } = useEditorStore()
  return (
    <div className="flex-1 min-w-1 overflow-hidden bg-primary">
      <div className="w-full p-2">
        <p className="text-text">Editor</p>
      </div>
      <Editor
        beforeMount={handleEditorWillMount}
        theme="dracula"
        height="96%"
        defaultLanguage="javascript"
        defaultValue={code}
        options={{ automaticLayout: true }}
        onChange={(value) => setCode(value ?? '')}
      />
    </div>
  )
}
