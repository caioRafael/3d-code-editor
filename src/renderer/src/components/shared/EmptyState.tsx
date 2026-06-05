import { ReactElement } from 'react'

export function EmptyState(): ReactElement {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-text">Nenhum arquivo selecionado</p>
    </div>
  )
}
