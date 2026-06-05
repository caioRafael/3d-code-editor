import { create } from 'zustand'
import { DEFAULT_CODE } from '@renderer/constants/defaultCode'
import { EditorState } from '@renderer/interface/editor.interface'
import { FileNode } from '@renderer/interface/FileNode'

export const useEditorStore = create<EditorState>((set) => ({
  workspace: null,
  setWorkspace: (workspace: FileNode | null) => set({ workspace }),
  code: DEFAULT_CODE,
  setCode: (code: string) => set({ code }),
  file: null,
  setFile: (file: string | null) => set({ file })
}))
