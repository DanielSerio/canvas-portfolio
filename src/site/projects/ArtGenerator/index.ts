import { StaticProject } from '../../../lib'
import { Circle } from './Circle'
import { Ellipse } from './Ellipse'
import { Rect } from './Rect'
import { Position } from './Shape'
import { Square } from './Square'

interface ArtGeneratorOptions {
  shapeCount: number
  maxShapeSize: number
  lineOffset: number
  height: number
  width: number
}

interface ArtGeneratorParams extends ArtGeneratorOptions {
  generate: () => void
  render: () => void
}

type ArtGeneratorShape = Circle|Ellipse|Square|Rect

const desc: string = 'Generates abstract art based on basic shapes, opacities, colors, and lines. The lines are randomly offset from the shapes points'

export default class ArtGenerator extends StaticProject implements ArtGeneratorParams {
  public shapeCount: number = 255
  public maxShapeSize: number = 75
  public lineOffset: number = 2
  public data: ArtGeneratorShape[] = []

  public get width (): number { return this.size }

  public get height (): number { return this.size }

  constructor (options?: Partial<ArtGeneratorOptions>) {
    super({
      name: 'Abstract Art Generator',
      desc

    })
    if (options) Object.assign(this, options)
    this.generate()
    this.render()
  }

  public generate (): void {
    const { floor, random } = Math
    for (let i = 0; i < this.shapeCount; i += 1) {
      const types: string[] = ['circle', 'square', 'rect', 'ellipse']
      const ri: number = floor(random() * 4)
      let shape: ArtGeneratorShape
      const size: number = random() * this.maxShapeSize
      const secondarySize: number = random() * this.maxShapeSize
      const x: number = random() * this.size
      const y: number = random() * this.size

      switch (types[ri]) {
        case 'circle':
          shape = new Circle(x, y, (size / 2), this.colors.random)
          break
        case 'square':
          shape = new Square(x, y, size, this.colors.random)
          break
        case 'rect':
          shape = new Rect(x, y, size, secondarySize, this.colors.random)
          break
        case 'ellipse':
          shape = new Ellipse(x, y, size / 2, secondarySize / 2, this.colors.random)
          break
          default: shape = new Ellipse(x, y, size / 2, secondarySize / 2, this.colors.random)
      }

      this.data.push(shape)
    }
  }

  public override render (): void {
    if (this.data) {
      this.data.forEach((shape: ArtGeneratorShape) => {
        const { x, y, type, angle, color, points } = shape

        const renderRect = () => {
          this.save(() => {
            this.ctx.translate(x, y)
            this.ctx.rotate(angle)
            this.ctx.fillStyle = color
            this.ctx.strokeStyle = this.colors.random

            this.drawPath(() => {
              this.ctx.globalAlpha = shape.opacity
              const { height, width } = shape as Square
              this.ctx.fillRect(...points[0], width, height)
            })
          })

          this.save(() => {
            this.ctx.translate(x, y)
            this.ctx.rotate(angle)
            this.ctx.strokeStyle = this.colors.grey75
            this.drawPath(() => {
              const points = shape.getLinePoints(this.lineOffset)
              this.ctx.globalAlpha = 0.9
              points.forEach((point: Position, i: number) => {
                this.ctx.moveTo(...point)
                if (i === points.length - 1) this.ctx.lineTo(...points[0])
                else this.ctx.lineTo(...points[i + 1])
                this.ctx.stroke()
              })
            })
          })
        }

        const renderRound = () => {
          this.save(() => {
            this.ctx.translate(x, y)
            this.ctx.rotate(angle)

            this.ctx.fillStyle = color
            this.ctx.globalAlpha = shape.opacity

            this.drawPath(() => {
              if (shape.type === 'circle') this.ctx.arc(0, 0, shape.radius, 0, Math.PI * 2)
              else if (shape.type === 'ellipse') this.ctx.ellipse(0, 0, shape.radius, (shape as Ellipse).yRadius, 0, 0, Math.PI * 2)
              this.ctx.fill()
            })
          })

          this.save(() => {
            this.ctx.translate(x, y)
            this.ctx.rotate(angle)
            this.ctx.strokeStyle = this.colors.grey25

            this.drawPath(() => {
              const points = shape.getLinePoints(this.lineOffset)

              points.forEach((point: Position, i: number) => {
                this.ctx.moveTo(...point)
                this.ctx.globalAlpha = 0.9
                if (i === points.length - 1) this.ctx.lineTo(...points[0])
                else this.ctx.lineTo(...points[i + 1])
                this.ctx.stroke()
              })
              this.ctx.closePath()
            })
          })
        }

        if (type === 'square' || type === 'rect') renderRect()
        else renderRound()
      })
    }
  }

  public override refresh (): void {
    this.data = []
    this.generate()
    this.render()
  }
}
