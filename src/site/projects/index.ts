import BasicMaze from './BasicMaze'
import { GOL } from './GOL'
const basicMaze = new BasicMaze()
const gol = new GOL()
basicMaze.render()
gol.render()

export default [
  basicMaze,
  gol
]
