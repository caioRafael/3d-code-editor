import { create } from 'zustand'
import { DEFAULT_CODE } from '@renderer/constants/defaultCode'
import { EditorState } from '@renderer/interface/editor.interface'

export const useEditorStore = create<EditorState>((set) => ({
  code: DEFAULT_CODE,
  setCode: (code: string) => set({ code })
}))
