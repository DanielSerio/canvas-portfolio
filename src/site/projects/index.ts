import BasicMaze from './BasicMaze'
import { GOL } from './GOL'
import LineMap from './LineMap'
import ObjectVelocity from './ObjectVelocity'

const basicMaze = new BasicMaze()
const gol = new GOL()
const ov = new ObjectVelocity()
const lineMap = new LineMap()

basicMaze.render()
gol.render()
ov.render()
lineMap.render()
export default [
  basicMaze,
  gol,
  ov,
  lineMap
]
