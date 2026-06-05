import { create } from 'zustand'
import { DEFAULT_CODE } from '@renderer/constants/defaultCode'
import { EditorState } from '@renderer/interface/editor.interface'
import { FileNode } from '@renderer/interface/FileNode'

export const useEditorStore = create<EditorState>((set) => ({
  workspace: null,
  setWorkspace: (workspace: FileNode | null) =>
    set({ workspace, openFiles: [], activePath: null, code: DEFAULT_CODE }),

  code: DEFAULT_CODE,
  setCode: (code: string) => set({ code }),

  openFiles: [],
  activePath: null,

  openFile: ({ path, name, content }) =>
    set((state) => {
      const exists = state.openFiles.some((f) => f.path === path)
      const openFiles = exists
        ? state.openFiles
        : [...state.openFiles, { path, name, content, savedContent: content }]
      return { openFiles, activePath: path, code: content }
    }),

  setActiveFile: (path: string) =>
    set((state) => {
      const active = state.openFiles.find((f) => f.path === path)
      return { activePath: path, code: active ? active.savedContent : state.code }
    }),

  closeFile: (path: string) =>
    set((state) => {
      const openFiles = state.openFiles.filter((f) => f.path !== path)
      let activePath = state.activePath
      if (activePath === path) {
        activePath = openFiles.length ? openFiles[openFiles.length - 1].path : null
      }
      const active = openFiles.find((f) => f.path === activePath)
      return { openFiles, activePath, code: active ? active.savedContent : DEFAULT_CODE }
    }),

  updateActiveContent: (content: string) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) => (f.path === state.activePath ? { ...f, content } : f))
    })),

  markActiveSaved: () =>
    set((state) => {
      const openFiles = state.openFiles.map((f) =>
        f.path === state.activePath ? { ...f, savedContent: f.content } : f
      )
      const active = openFiles.find((f) => f.path === state.activePath)
      return { openFiles, code: active ? active.savedContent : state.code }
    })
}))
