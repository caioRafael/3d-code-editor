import { ReactElement } from 'react'
import { Resizable } from './components/ui/Resizable'
import { Versions } from './components/Versions'
import { Star } from 'lucide-react'
import { AppEditor } from './components/feature/editor/AppEditor'

function App(): ReactElement {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center">
        <header className="w-full min-h-6 flex items-center justify-between py-1 px-2 h-size-header-height">
          <h1 className="text-sm font-semibold text-text">3D-Editor</h1>
        </header>
        <main className="w-full flex-1 flex flex-row h-size-page-height">
          <Resizable direction="horizontal" initialWidth={300} minWidth={200} maxWidth={280}>
            <div className="h-full">
              <p className="text-text">Sidebar</p>
            </div>
          </Resizable>
          <AppEditor />
          <Resizable direction="horizontal" initialWidth={300} minWidth={200}>
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-text">Preview</p>
              <Star className="w-10 h-10 text-text animate-pulse" />
            </div>
          </Resizable>
        </main>
      </div>
      <Versions />
    </>
  )
}

export default App
