interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ orientation = 'horizontal' }: SeparatorProps): React.JSX.Element {
  const orientationClass =
    orientation === 'horizontal' ? 'h-px w-full my-2' : 'w-px h-full mx-2'

  return <div className={`bg-current-line ${orientationClass}`} />
}
