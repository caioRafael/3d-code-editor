import { ReactElement } from 'react'

export function Header(): ReactElement {
  return (
    <header className="w-full min-h-6 flex items-center justify-between py-1 px-2 h-size-header-height">
      <h1 className="text-sm font-semibold text-text">3D-Editor</h1>
    </header>
  )
}
