import { StaticProject } from '../../lib/Project'

class Walls {
  public top: boolean = true
  public right: boolean = true
  public bottom: boolean = true
  public left: boolean = false
}

class Cell {
  public walls: Walls = new Walls()
  public visited: boolean = false
  constructor (public x: number, public y: number) {}
}

export default class BasicMaze extends StaticProject {
  public data: Cell[][] = []
  private _current: Cell|null = null
  public rows: number = 30
  public cellMargin: number = 0

  constructor () {
    super({
      name: 'Basic Maze',
      desc: 'A Simple Maze (without exits)'
    })
    this.onCreate()
    this.render()
  }

  private populate = () => {
    for (let y = 0; y < this.rows; y += 1) {
      const row: Cell[] = []
      for (let x = 0; x < this.rows; x += 1) {
        row.push(new Cell(x, y))
      }
      this.data.push(row)
    }
  }

  public onCreate () {
    if (this.data) {
      this.populate()
      this.breakAllWalls()
    }
  }

  public pickRandomNeighbor = (x: number, y: number): Cell => {
    const { floor, random } = Math
    const origins = [
      [x, y - 1],
      [x - 1, y], [x + 1, y],
      [x, y + 1]
    ]

    const neighbors: Cell[] = []

    for (const o of origins) {
      if (this.data[o[1]] && this.data[o[1]][o[0]]) neighbors.push(this.data[o[1]][o[0]])
    }

    const ri: number = floor(random() * neighbors.length)

    return neighbors[ri]
  }

  public get unvisited (): boolean {
    const unvisited = this.data
      .reduce((a: Cell[], b: Cell[]) => a.concat(b))
      .filter((cell: Cell) => cell.visited === false)

    return unvisited.length > 0
  }

  private removeWalls = (cell: Cell) => {
    const { x, y } = this._current as Cell
    if (cell.x < x) {
      cell.walls.right = false;
      (this._current as Cell).walls.left = false
    }

    if (cell.x > x) {
      cell.walls.left = false;
      (this._current as Cell).walls.right = false
    }

    if (cell.y < y) {
      cell.walls.bottom = false;
      (this._current as Cell).walls.top = false
    }

    if (cell.y > y) {
      cell.walls.top = false;
      (this._current as Cell).walls.bottom = false
    }
  }

  public breakAllWalls = () => {
    this._current = this.data[0][0]
    let unvisited = this.unvisited
    while (unvisited) {
      const random = this.pickRandomNeighbor(this._current.x, this._current.y)
      if (random.visited === false) {
        this.removeWalls(random)
        random.visited = true
      }
      this._current = random
      unvisited = this.unvisited
    }
  }

  public get cellSize (): number { return this.size / this.rows }

  private renderWalls = (cell: Cell) => {
    const renderTop = () => {
      this.save(() => {
        this.ctx.translate(cell.x * this.cellSize, cell.y * this.cellSize)
        this.drawPath(() => {
          this.ctx.moveTo(0, 0)
          this.ctx.lineTo(this.cellSize, 0)
          this.ctx.stroke()
        })
      })
    }

    const renderRight = () => {
      this.save(() => {
        this.ctx.translate(cell.x * this.cellSize, cell.y * this.cellSize)
        this.drawPath(() => {
          this.ctx.moveTo(this.cellSize, 0)
          this.ctx.lineTo(this.cellSize, this.cellSize)
          this.ctx.stroke()
        })
      })
    }
    const renderBottom = () => {
      this.save(() => {
        this.ctx.translate(cell.x * this.cellSize, cell.y * this.cellSize)
        this.drawPath(() => {
          this.ctx.moveTo(this.cellSize, this.cellSize)
          this.ctx.lineTo(0, this.cellSize)
          this.ctx.stroke()
        })
      })
    }
    const renderleft = () => {
      this.save(() => {
        this.ctx.translate(cell.x * this.cellSize, cell.y * this.cellSize)
        this.drawPath(() => {
          this.ctx.moveTo(0, this.cellSize)
          this.ctx.lineTo(0, 0)
          this.ctx.stroke()
        })
      })
    }
    if (cell.walls.top) renderTop()
    if (cell.walls.right) renderRight()
    if (cell.walls.bottom) renderBottom()
    if (cell.walls.left) renderleft()
  }

  public override render (): void {
    this.clear()
    if (this.data) {
      this.data.forEach((row: Cell[]) => {
        row.forEach(this.renderWalls)
      })
    }
  }
}
