import { AnimProject } from '../../lib/Project/AnimProject'

class Bubble {
  public maxRadius: number = 8
  public radius: number = 1
  public speed: number = (Math.random() * 0.1) + 0.1
  public maxSpeed: number = (4 * Math.random()) + 2
  constructor (
    public x: number,
    public y: number
  ) {}
}

export default class Carbination extends AnimProject {
  public data: Bubble[] = []
  constructor () {
    super({
      name: 'Carbination',
      desc: 'Carbination effect'
    })
    this.createBubbles(256)
  }

  private createBubbles = (count: number = 64) => {
    const { round, random } = Math
    const y: number = this.size + 16
    for (let i = 0; i < count; i += 1) {
      const x: number = (random() * (this.size - 16)) + 8
      const dir: -1|1 = [-1, 1][round(random())] as -1|1
      const offset: number = random() * 8
      this.data.push(new Bubble(x, y + (offset * dir)))
    }
  }

  public override onAnimate (): void {
    if (this.data) {
      this.data.forEach((bubble: Bubble, i: number) => {
        const { radius, maxRadius, y } = bubble
        if (y <= -8) this.data.splice(i, 1)
        else {
          if (radius < maxRadius) bubble.radius += 0.025
          if (bubble.speed < bubble.maxSpeed) bubble.speed += (bubble.speed / 10)
          bubble.y -= bubble.speed
        }
      })

      if (this.data.length < 464) this.createBubbles()
    }
  }

  public override render (): void {
    const renderBackground = () => {
      this.save(() => {
        this.ctx.fillStyle = this.colors.baseBlack
        this.drawPath(() => this.ctx.fillRect(0, 0, this.size, this.size))
      })
    }

    const renderBubbles = () => {
      if (this.data) {
        this.data.forEach((bubble: Bubble) => {
          const { x, y, radius } = bubble
          this.save(() => {
            this.ctx.globalAlpha = 0.4
            this.ctx.strokeStyle = this.colors.baseWhite
            this.drawPath(() => {
              this.ctx.arc(x, y, radius, 0, Math.PI * 2)
              this.ctx.stroke()
            })
          })
        })
      }
    }

    renderBackground()
    renderBubbles()
  }
}
