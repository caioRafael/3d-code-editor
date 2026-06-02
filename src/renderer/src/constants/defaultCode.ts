export const DEFAULT_CODE = `
const { cuboid, sphere } = require('@jscad/modeling').primitives
const { subtract } = require('@jscad/modeling').booleans

function main() {
  return subtract(
    cuboid({ size: [20, 20, 20] }),
    sphere({ radius: 13 })
  )
}

module.exports = { main }
`
