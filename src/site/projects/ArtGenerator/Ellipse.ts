import { RoundShape, RoundShapeType } from './RoundShape'
import { Position } from './Shape'

export class Ellipse extends RoundShape {
  public type: RoundShapeType = 'ellipse'

  constructor (
    x: number,
    y: number,
    radius: number,
    public yRadius: number,
    public color: string
  ) {
    super(x, y, radius)
  }

  get points (): Position[] {
    const { cos, sin } = Math
    const points: Position[] = []
    for (let i = 0; i < 6; i += 1) {
      const x: number = cos(i) * this.radius
      const y: number = sin(i) * this.yRadius
      points.push([x, y])
    }

    return points
  }
}
