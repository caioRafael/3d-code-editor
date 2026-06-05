import { Routes as RouterRoutes, Route } from 'react-router'
import { HomePage } from './HomePage'
import { EditorPage } from './EditorPage'
import { ReactElement } from 'react'

export function Routes(): ReactElement {
  return (
    <RouterRoutes>
      <Route index element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
    </RouterRoutes>
  )
}
