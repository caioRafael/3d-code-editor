import { ReactElement } from 'react'
import { Versions } from './components/Versions'

function App(): ReactElement {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Versions />
    </>
  )
}

export default App
