import { AnimProject } from '../../lib/Project/AnimProject'

export class GOL extends AnimProject {
  private data: number[][] = []
  private _prob: number = 0.27
  public rows: number = 30
  public cellMargin: number = 1

  constructor () {
    super({
      name: 'Game of Life',
      desc: 'Conway\'s Game of Life on an infinite board'
    })
    this.create()
  }

  private create (): void {
    for (let y = 0; y < this.rows; y += 1) {
      const row: number[] = []
      for (let x = 0; x < this.rows; x += 1) {
        const alive: boolean = Math.random() < this._prob
        row.push(alive ? 1 : 0)
      }
      this.data.push(row)
    }
  }

  public get renderData (): Uint8ClampedArray[] {
    return this.data.map((r: number[]) => new Uint8ClampedArray(r))
  }

  public get cellSize (): number {
    return this.size / this.rows
  }

  private getNeighborCount = (x: number, y: number, data: Uint8ClampedArray[]): number => {
    const origins = [
      [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
      [x - 1, y], [x + 1, y],
      [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
    ]

    let count: number = 0
    for (const o of origins) {
      if (o[1] < 0) o[1] = this.rows + o[1]
      if (o[1] >= this.rows) o[1] = this.rows - o[1]
      if (o[0] < 0) o[0] = this.rows + o[0]
      if (o[0] >= this.rows) o[0] = this.rows - o[0]

      if (data[o[1]][o[0]]) count += 1
    }

    return count
  }

  public override onAnimate (): void {
    if (this.data) {
      const data = this.renderData
      data.forEach((row: Uint8ClampedArray, y: number) => {
        row.forEach((val: number, x: number) => {
          const count: number = this.getNeighborCount(x, y, data)
          if (
            (val && (count >= 2 && count <= 3)) ||
            (!val && count === 3)
            ) this.data[y][x] = 1
            else this.data[y][x] = 0
        })
      })
    }
  }

  public override render (): void {
    if (this.data) {
      const data = this.renderData
      data.forEach((row: Uint8ClampedArray, y: number) => {
        row.forEach((val: number, x: number) => {
          if (val) {
            this.save(() => {
              this.ctx.translate(x * this.cellSize, y * this.cellSize)
              this.drawPath(() => {
                const m: number = this.cellMargin
                const s: number = this.cellSize - (m * 2)
                this.ctx.fillStyle = this.colors.green
                this.ctx.fillRect(m, m, s, s)
              })
            })
          }
        })
      })
    }
  }
}
