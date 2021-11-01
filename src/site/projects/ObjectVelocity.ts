import { AnimProject } from '../../lib/Project/AnimProject'

class Orb {
  private _sx: number = [-1, 1][Math.round(Math.random())]
  private _sy: number = [-1, 1][Math.round(Math.random())]
  constructor (
    public x: number,
    public y: number,
    public z: number,
    public color: string
    ) {}

    get opacity (): number {
      const value: number = 20 - this.z
      if (value === 0) return 0.1
      return (20 / value) / 3
    }

    get radius (): number {
      const value: number = 20 - this.z
      if (value === 0) return 2
      return value * 2
    }

    public get speedX (): number {
      const value: number = 20 - this.z
      const dir: number = this._sx
      return (dir * value) / 5
    }

    public set speedX (dir: number) {
      this._sx = dir
    }

    public get speedY (): number {
      const value: number = 20 - this.z
      const dir: number = this._sy
      return (dir * value) / 5
    }

    public set speedY (dir: number) {
      this._sy = dir
    }
}

export default class ObjectVelocity extends AnimProject {
  public data: Orb[] = []
  constructor () {
    super({
      name: 'Object Velocity',
      desc: 'A simple demonstration of object velocity and edge detection'
    })
    this.populate()
  }

  private populate = () => {
    for (let i = 0; i < 128; i += 1) {
      const x: number = (Math.random() * 210) + 40
      const y: number = (Math.random() * 210) + 40
      const z: number = Math.random() * 20
      this.data.push(new Orb(x, y, z, this.colors.random))
    }
  }

  public override render (): void {
    this.clear()
    if (this.data) {
      this.data.forEach((orb: Orb) => {
        this.save(() => {
          const { x, y, radius, opacity, color } = orb
          this.ctx.translate(x, y)
          this.ctx.globalAlpha = opacity
          this.drawPath(() => {
            this.ctx.fillStyle = color
            this.ctx.arc(0, 0, radius, 0, Math.PI * 23)
            this.ctx.fill()
          })
        })
      })
    }
  }

  public override onAnimate (): void {
    this.data.forEach((orb: Orb) => {
      if (orb.x >= this.size) orb.speedX = -1
      if (orb.x <= 0) orb.speedX = 1
      if (orb.y <= 0) orb.speedY = 1
      if (orb.y >= this.size) orb.speedY = -1

      orb.x += orb.speedX
      orb.y += orb.speedY
    })
  }
}
