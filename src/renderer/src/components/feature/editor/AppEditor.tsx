import Editor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { ReactElement } from 'react'

import { handleEditorWillMount } from '../../../themes/DraculaTheme'
import { useEditorStore } from '@renderer/store/editor.store'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

loader.config({ monaco })

export function AppEditor(): ReactElement {
  const { code, setCode, file } = useEditorStore()
  return (
    <div className="flex-1 min-w-0 overflow-hidden bg-primary flex flex-col">
      <div className="w-full p-2">
        <p className="text-text">Editor</p>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          beforeMount={handleEditorWillMount}
          theme="dracula"
          height="100%"
          defaultLanguage="javascript"
          value={file ?? code}
          options={{ automaticLayout: true }}
          onChange={(value) => setCode(value ?? '')}
        />
      </div>
    </div>
  )
}
