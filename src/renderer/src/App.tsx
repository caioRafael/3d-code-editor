import { ReactElement } from 'react'
import { Versions } from './components/Versions'
import { BrowserRouter } from 'react-router'
import { Routes } from './pages/route'
import { Header } from './components/shared/Header'

function App(): ReactElement {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen flex-col items-center">
        <Header />
        <Routes />
      </div>
      <Versions />
    </BrowserRouter>
  )
}

export default App
