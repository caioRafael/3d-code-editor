import Editor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { ReactElement } from 'react'

import { handleEditorWillMount } from '../../../themes/DraculaTheme'

loader.config({ monaco })

export function AppEditor(): ReactElement {
  return (
    <div className="flex-1 min-w-1 overflow-hidden bg-primary">
      <div className="w-full p-2">
        <p className="text-text">Editor</p>
      </div>
      <Editor
        beforeMount={handleEditorWillMount}
        theme="dracula"
        height="90%"
        defaultLanguage="javascript"
        defaultValue="console.log('Hello, world!')"
        options={{ automaticLayout: true }}
        onChange={(value) => console.log('value: ', value)}
      />
    </div>
  )
}
