import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import { ReactElement, useMemo } from 'react'

import { useEditorStore } from '@renderer/store/editor.store'
import { geom3ToBufferGeometry, runEditorCode } from '@renderer/utils/jscadToGeometry'

export function AppPreview(): ReactElement {
  const { code } = useEditorStore()

  const { geometry, error } = useMemo(() => {
    try {
      const geom = runEditorCode(code)
      // console.log('geom: ', geom)
      return { geometry: geom3ToBufferGeometry(geom), error: null }
    } catch (err) {
      return { geometry: null, error: err instanceof Error ? err.message : String(err) }
    }
  }, [code])

  console.log('geometry: ', geometry)

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full p-2">
        <p className="text-text">Preview</p>
      </div>
      <div className="flex-1 min-h-0 relative">
        {error && (
          <pre className="absolute inset-2 z-10 overflow-auto text-xs text-red-400 whitespace-pre-wrap">
            {error}
          </pre>
        )}
        <Canvas camera={{ position: [40, 40, 40], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[20, 30, 20]} intensity={1} />
          <Grid infiniteGrid sectionColor="#444" cellColor="#333" fadeDistance={200} />
          {geometry && (
            <mesh geometry={geometry}>
              <meshStandardMaterial color="#bd93f9" />
            </mesh>
          )}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}
