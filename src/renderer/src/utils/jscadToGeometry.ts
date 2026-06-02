import * as jscadModeling from '@jscad/modeling'
import { BufferGeometry, Float32BufferAttribute } from 'three'

interface Geom3Polygon {
  vertices: Array<[number, number, number]>
}

interface Geom3 {
  polygons: Geom3Polygon[]
}

function isGeom3(value: unknown): value is Geom3 {
  return typeof value === 'object' && value !== null && Array.isArray((value as Geom3).polygons)
}

export function runEditorCode(code: string): Geom3 {
  const require = (name: string): unknown => {
    if (name === '@jscad/modeling') return jscadModeling
    throw new Error(`Module not found: ${name}`)
  }

  const module = { exports: {} as { main?: () => unknown } }

  const factory = new Function('require', 'module', 'exports', code)
  factory(require, module, module.exports)

  const main = module.exports.main
  if (typeof main !== 'function') {
    throw new Error('O código precisa exportar uma função main(): module.exports = { main }')
  }

  const result = main()
  if (!isGeom3(result)) {
    throw new Error('main() precisa retornar uma geometria 3D (geom3) do @jscad/modeling')
  }

  return result
}

export function geom3ToBufferGeometry(geom: Geom3): BufferGeometry {
  const positions: number[] = []

  for (const polygon of geom.polygons) {
    const vertices = polygon.vertices
    for (let i = 2; i < vertices.length; i++) {
      const a = vertices[0]
      const b = vertices[i - 1]
      const c = vertices[i]
      positions.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2])
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.computeVertexNormals()

  return geometry
}
