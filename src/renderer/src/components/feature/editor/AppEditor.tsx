import Editor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { ReactElement, KeyboardEvent } from 'react'
import { Save, X } from 'lucide-react'

import { handleEditorWillMount } from '../../../themes/DraculaTheme'
import { useEditorStore } from '@renderer/store/editor.store'
import { cn } from '@renderer/utils/cn'
import { Button } from '@renderer/components/ui/Button'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

loader.config({ monaco })

export function AppEditor(): ReactElement {
  const { openFiles, activePath, setActiveFile, closeFile, updateActiveContent, markActiveSaved } =
    useEditorStore()

  const activeFile = openFiles.find((f) => f.path === activePath)
  const isActiveDirty = activeFile ? activeFile.content !== activeFile.savedContent : false

  const handleSave = async (): Promise<void> => {
    if (!activeFile) return
    await window.electronAPI.saveFile(activeFile.path, activeFile.content)
    markActiveSaved()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault()
      void handleSave()
    }
  }

  return (
    <div
      className="flex-1 min-w-0 overflow-hidden bg-primary flex flex-col"
      onKeyDown={handleKeyDown}
    >
      <div className="flex w-full items-center justify-between bg-background">
        <div className="flex flex-1 overflow-x-auto">
          {openFiles.map((file) => {
            const isActive = file.path === activePath
            const isDirty = file.content !== file.savedContent
            return (
              <div
                key={file.path}
                onClick={() => setActiveFile(file.path)}
                className={cn(
                  'group flex items-center gap-2 border-r border-primary/40 px-3 py-1.5 text-[13px] cursor-pointer',
                  isActive
                    ? 'bg-primary text-text'
                    : 'bg-background text-text/60 hover:text-text/90'
                )}
              >
                <span className="truncate max-w-[160px]">{file.name}</span>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    closeFile(file.path)
                  }}
                  className="flex h-4 w-4 items-center justify-center rounded-sm text-text/70 hover:bg-primary/60 hover:text-text"
                >
                  {isDirty ? (
                    <>
                      <span className="block h-2 w-2 rounded-full bg-text/80 group-hover:hidden" />
                      <X size={14} className="hidden group-hover:block" />
                    </>
                  ) : (
                    <X size={14} className="opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
        <Button
          variant="ghost"
          onClick={() => void handleSave()}
          disabled={!isActiveDirty}
          className="mr-2 flex shrink-0 items-center gap-1.5"
        >
          <Save size={14} />
          Salvar
        </Button>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          beforeMount={handleEditorWillMount}
          theme="dracula"
          height="100%"
          defaultLanguage="javascript"
          path={activeFile?.path}
          value={activeFile?.content ?? ''}
          options={{ automaticLayout: true }}
          onChange={(value) => updateActiveContent(value ?? '')}
        />
      </div>
    </div>
  )
}
