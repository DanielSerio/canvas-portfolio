import { AnimProject } from '../../lib/Project/AnimProject'

type Position = [number, number]
type Dir = 0|1|2|3

function randomDir (exclude?: Dir): Dir {
  const { floor, random } = Math
  const dirs: Dir[] = [0, 1, 2, 3]
  if (exclude) dirs.splice(exclude, 1)
  return dirs[floor(random() * 4)] as Dir
}

export default class Worm extends AnimProject {
  public rows: number = 30
  public data: Position[] = []
  public dir: Dir = randomDir()
  public cellMargin: number = 1
  public get cellSize (): number { return this.size / this.rows }

  public get color (): string {
    if (this.dir === 0 || this.dir === 2) return this.colors.green
    return this.colors.purple
  }

  constructor () {
    super({
      name: 'Worm',
      desc: 'A worm on an infinite board that randomly changes directions'
    })
    this.create()
  }

  private create = () => {
    const { round } = Math
    const cx: number = round(this.rows / 2)
    const cy: number = round(this.rows / 2)
    const head: Position = [cx, cy]

    const placeUpwards = () => {
      this.data.push(head)
      for (let i = cy + 1; i < cy + 8; i += 1) {
        this.data.push([cx, i])
      }
    }

    const placeDownwards = () => {
      this.data.push(head)
      for (let i = cy - 1; i > cy - 8; i -= 1) {
        this.data.push([cx, i])
      }
    }

    const placeRightwards = () => {
      this.data.push(head)
      for (let i = cx - 1; i > cx - 8; i -= 1) {
        this.data.push([i, cy])
      }
    }

    const placeLeftwards = () => {
      this.data.push(head)
      for (let i = cx - 1; i < cx + 8; i += 1) {
        this.data.push([i, cy])
      }
    }

    switch (this.dir) {
      case 0:
        placeUpwards()
        break
      case 1:
        placeRightwards()
        break
      case 2:
        placeDownwards()
        break
      case 3:
        placeLeftwards()
        break
      default: placeRightwards()
    }
  }

  public override render (): void {
    this.clear()
    if (this.data) {
      const renderCells = () => {
        for (let y = 0; y < this.rows; y += 1) {
          for (let x = 0; x < this.rows; x += 1) {
            this.save(() => {
              this.ctx.translate(x * this.cellSize, y * this.cellSize)
              this.drawPath(() => {
                this.ctx.lineWidth = 0.25
                const m: number = this.cellMargin
                const s: number = this.cellSize - (m * 2)
                this.ctx.strokeStyle = this.colors.grey75
                this.ctx.strokeRect(m, m, s, s)
              })
            })
          }
        }
      }
      const renderWorm = () => {
        if (this.data) {
          this.data.forEach((cell: Position) => {
            this.save(() => {
              this.ctx.fillStyle = this.color
              this.drawPath(() => {
                const [x, y] = cell
                this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
              })
            })
          })
        }
      }

      renderCells()
      renderWorm()
    }
  }

  public override onAnimate (): void {
    if (Math.random() < 0.05) this.dir = randomDir(this.dir)
    const handleUp = () => {
      const newHead = [...this.data[0]]
      if (newHead[1] === 0) {
        newHead[1] = this.rows - 1
      } else {
        newHead[1] = newHead[1] - 1
      }
      this.data.pop()
      this.data.unshift(newHead as Position)
    }

    const handleDown = () => {
      const newHead = [...this.data[0]]
      if (newHead[1] === this.rows - 1) {
        newHead[1] = 0
      } else {
        newHead[1] = newHead[1] + 1
      }

      this.data.pop()
      this.data.unshift(newHead as Position)
    }

    const handleRight = () => {
      const newHead = [...this.data[0]]
      if (newHead[0] === this.rows - 1) {
        newHead[0] = 0
      } else {
        newHead[0] = newHead[0] + 1
      }
      this.data.pop()
      this.data.unshift(newHead as Position)
    }

    const handleLeft = () => {
      const newHead = [...this.data[0]]
      if (newHead[0] === 0) {
        newHead[0] = this.rows - 1
      } else {
        newHead[0] = newHead[0] - 1
      }
      this.data.pop()
      this.data.unshift(newHead as Position)
    }

    if (this.data) {
      switch (this.dir) {
        case 0:
          handleUp()
          break
        case 1:
          handleRight()
          break
        case 2:
          handleDown()
          break
        case 3:
          handleLeft()
          break
        default: handleRight()
      }
    }
  }
}
