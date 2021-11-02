import { Position, Shape } from './Shape'

export type RectShapeType = 'rect'|'square'

export abstract class RectShape extends Shape {
  public type!: RectShapeType
  constructor (
    x: number,
    y: number,
    public width: number,
    public height: number
  ) {
    super(x, y)
  }

  public get points (): Position[] {
    const cx: number = this.width / 2
    const cy: number = this.height / 2
    return [
      [-cx, -cy],
      [cx, -cy],
      [cx, cy],
      [-cx, cy]
    ]
  }
}
