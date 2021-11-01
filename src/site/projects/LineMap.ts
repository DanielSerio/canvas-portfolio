import { EventProject } from '../../lib/Project/EventProject'

type Mouse = [number, number]

export default class LineMap extends EventProject {
  private _mouse: Mouse = [150, 150]

  private lines: [number, number, string][] = []
  constructor () {
    super({
      name: 'Line Map',
      desc: 'Move the mouse to move the lines'
    })
    this.create()
  }

  private create = () => {
    for (let i = 0; i < this.size; i += 10) {
      const color: string = this.colors.random
      this.lines.push([0, i, color])
      this.lines.push([i, 0, color])
      this.lines.push([this.size, i, color])
      this.lines.push([i, this.size, color])
    }
    this.lines.push([300, 300, this.colors.purple])
  }

  public override onMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const x: number = e.clientX - target.offsetLeft
    const y: number = e.clientY - target.offsetTop
    this._mouse = [x, y]
  }

  public override render (): void {
    this.clear()
    if (this.lines) {
      this.lines.forEach((line: [number, number, string]) => {
        this.save(() => {
          this.drawPath(() => {
            const [x, y, color] = line
            this.ctx.lineWidth = 1
            this.ctx.strokeStyle = color
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(this._mouse[0], this._mouse[1])
            this.ctx.stroke()
          })
        })
      })
    }
  }
}
