import {} from 'react'

export function Versions(): React.JSX.Element {
  return <div className="fixed bottom-2 right-2 text-xs text-gray-400">v{__APP_VERSION__}</div>
}
