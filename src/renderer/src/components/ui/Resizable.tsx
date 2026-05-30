import { useCallback, useRef, useState } from 'react'

interface ResizableProps {
  children: React.ReactNode
  direction: 'horizontal' | 'vertical' | 'both'
  initialWidth?: number
  initialHeight?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

type Edge = 'left' | 'right' | 'bottom' | 'corner'

export function Resizable({
  children,
  direction,
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 200,
  minHeight = 200,
  maxWidth,
  maxHeight
}: ResizableProps): React.JSX.Element {
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)
  const startPosRef = useRef({ x: 0, y: 0 })
  const startSizeRef = useRef({ width: 0, height: 0 })
  const isResizingRef = useRef(false)

  const handleMouseDown = useCallback(
    (edge: Edge): React.MouseEventHandler<HTMLDivElement> =>
      (e) => {
        e.preventDefault()
        isResizingRef.current = true
        startPosRef.current = { x: e.clientX, y: e.clientY }
        startSizeRef.current = { width, height }

        const cursors: Record<Edge, string> = {
          left: 'col-resize',
          right: 'col-resize',
          bottom: 'row-resize',
          corner: 'nwse-resize'
        }

        document.body.style.cursor = cursors[edge]
        document.body.style.userSelect = 'none'

        const handleMouseMove = (e: MouseEvent): void => {
          if (!isResizingRef.current) return

          const dx = e.clientX - startPosRef.current.x
          const dy = e.clientY - startPosRef.current.y

          if (direction === 'horizontal' || direction === 'both') {
            const rawWidth =
              edge === 'left' ? startSizeRef.current.width - dx : startSizeRef.current.width + dx
            setWidth(Math.max(minWidth, Math.min(maxWidth ?? Infinity, rawWidth)))
          }

          if (direction === 'vertical' || direction === 'both') {
            setHeight(
              Math.max(minHeight, Math.min(maxHeight ?? Infinity, startSizeRef.current.height + dy))
            )
          }
        }

        const handleMouseUp = (): void => {
          isResizingRef.current = false
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseup', handleMouseUp)
          document.body.style.cursor = ''
          document.body.style.userSelect = ''
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
      },
    [direction, height, maxHeight, maxWidth, minHeight, minWidth, width]
  )

  const baseEdgeStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10
  }

  const showLeft = direction === 'horizontal' || direction === 'both'
  const showRight = direction === 'horizontal' || direction === 'both'
  const showBottom = direction === 'vertical' || direction === 'both'

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden'
  }

  if (direction === 'horizontal' || direction === 'both') {
    containerStyle.width = width
  }
  if (direction === 'vertical' || direction === 'both') {
    containerStyle.height = height
  }

  return (
    <div style={containerStyle}>
      {children}
      {showLeft && (
        <div
          className="group"
          style={{
            ...baseEdgeStyle,
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            cursor: 'col-resize'
          }}
          onMouseDown={handleMouseDown('left')}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full bg-gray-500/50 group-hover:bg-gray-500/80" />
        </div>
      )}
      {showRight && (
        <div
          className="group"
          style={{
            ...baseEdgeStyle,
            right: 0,
            top: 0,
            bottom: 0,
            width: 6,
            cursor: 'col-resize'
          }}
          onMouseDown={handleMouseDown('right')}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full bg-gray-500/50 group-hover:bg-gray-500/80" />
        </div>
      )}
      {showBottom && (
        <div
          className="group"
          style={{
            ...baseEdgeStyle,
            left: 0,
            right: 0,
            bottom: 0,
            height: 6,
            cursor: 'row-resize'
          }}
          onMouseDown={handleMouseDown('bottom')}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-8 rounded-full bg-gray-500/50 group-hover:bg-gray-500/80" />
        </div>
      )}
      {direction === 'both' && (
        <div
          className="group"
          style={{
            ...baseEdgeStyle,
            right: 0,
            bottom: 0,
            width: 12,
            height: 12,
            cursor: 'nwse-resize'
          }}
          onMouseDown={handleMouseDown('corner')}
        >
          <div className="absolute right-0.5 bottom-0.5 w-2 h-2 border-r-2 border-b-2 border-gray-500/60 group-hover:border-gray-500/90" />
        </div>
      )}
    </div>
  )
}
