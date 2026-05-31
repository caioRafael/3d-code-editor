import { Monaco } from '@monaco-editor/react'

export function handleEditorWillMount(monaco: Monaco): void {
  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {
        token: 'comment',
        foreground: '6272A4',
        fontStyle: 'italic'
      },
      {
        token: 'keyword',
        foreground: 'FF79C6'
      },
      {
        token: 'string',
        foreground: 'F1FA8C'
      },
      {
        token: 'number',
        foreground: 'BD93F9'
      },
      {
        token: 'type',
        foreground: '8BE9FD'
      },
      {
        token: 'function',
        foreground: '50FA7B'
      },
      {
        token: 'variable',
        foreground: 'F8F8F2'
      }
    ],
    colors: {
      'editor.background': '#282A36',
      'editor.foreground': '#F8F8F2',

      'editorLineNumber.foreground': '#6272A4',

      'editorCursor.foreground': '#FF79C6',

      'editor.selectionBackground': '#44475A',

      'editor.inactiveSelectionBackground': '#3A3D4B',

      'editor.lineHighlightBackground': '#44475A50',

      'editorIndentGuide.background': '#44475A',

      'editorIndentGuide.activeBackground': '#6272A4'
    }
  })
}
