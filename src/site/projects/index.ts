import ArtGenerator from './ArtGenerator'
import BasicMaze from './BasicMaze'
import Carbination from './Carbination'
import { GOL } from './GOL'
import LineMap from './LineMap'
import ObjectVelocity from './ObjectVelocity'
import PolarSeparation from './PolarSeparation'
import Worm from './Worm'

const basicMaze = new BasicMaze()
const gol = new GOL()
const ov = new ObjectVelocity()
const lineMap = new LineMap()
const worm: Worm = new Worm()
const carbination: Carbination = new Carbination()
const polarSeparation: PolarSeparation = new PolarSeparation()
const artGen: ArtGenerator = new ArtGenerator()

basicMaze.render()
gol.render()
ov.render()
lineMap.render()
worm.render()
artGen.render()
polarSeparation.render()
export default [
  basicMaze,
  gol,
  ov,
  lineMap,
  worm,
  carbination,
  polarSeparation,
  artGen
]
