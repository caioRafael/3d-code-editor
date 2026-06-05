import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps): React.JSX.Element | null {
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70"
      onClick={onClose}
    >
      <div
        className="min-w-[360px] rounded-md border border-current-line bg-background p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          {title && <h2 className="text-sm font-semibold text-text">{title}</h2>}
          <button
            onClick={onClose}
            className="text-comment hover:text-text transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
