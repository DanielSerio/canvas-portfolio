import { EventProject } from '../../lib/Project/EventProject'
import { Position } from './ArtGenerator/Shape'

class Bubble {
  public opacity: number = (Math.random() * 0.5) + 0.3
  constructor (
    public x: number,
    public y: number,
    public radius: number,
    public color: string
  ) {}
}

export default class PolarSeparation extends EventProject {
  public data: Bubble[] = []
  public cursor: Position = [150, 150]
  public cursorRadius: number = 32

  constructor () {
    super({
      name: 'Polar Separation',
      desc: 'Move the mouse to move the circles'
    })
    this.generate()
  }

  private generate = () => {
    for (let i = 0; i < 450; i += 1) {
      const r: number = (Math.random() * 20) + 4
      const x: number = (Math.random() * (300 - r)) + r
      const y: number = (Math.random() * (300 - r)) + r
      this.data.push(new Bubble(x, y, r, this.colors.random))
    }
  }

  public moveBubbles = () => {
    const { sqrt, abs, pow } = Math
    this.data.forEach((b: Bubble) => {
      const centerDistance: number = sqrt(pow(abs(b.x - this.cursor[0]), 2) + pow(abs(b.y - this.cursor[1]), 2))
      const combinedRadius: number = b.radius + this.cursorRadius
      const bubbleIntersects: boolean = centerDistance < combinedRadius

      if (bubbleIntersects) {
        const diff: number = combinedRadius - centerDistance
        if (b.x < this.cursor[0]) b.x -= diff
        if (b.x > this.cursor[0]) b.x += diff
        if (b.y < this.cursor[1]) b.y -= diff
        if (b.y > this.cursor[1]) b.y += diff
      }
    })
  }

  public override render (): void {
    this.clear()
    if (this.data) {
      this.moveBubbles()
      this.data.forEach((b: Bubble) => {
        this.save(() => {
          this.ctx.strokeStyle = b.color
          this.ctx.translate(b.x, b.y)
          this.ctx.globalAlpha = b.opacity
          this.drawPath(() => {
            this.ctx.arc(0, 0, b.radius, 0, Math.PI * 2)
            this.ctx.stroke()
          })
        })
      })
    }
  }

  public override onMouseMove = (e: MouseEvent) => {
    const { target, clientX, clientY } = e
    const { offsetLeft, offsetTop } = target as HTMLElement
    this.cursor = [clientX - offsetLeft, clientY - offsetTop]
  }
}
