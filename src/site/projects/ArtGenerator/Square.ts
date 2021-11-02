import { RectShape, RectShapeType } from './RectShape'

export class Square extends RectShape {
  public type: RectShapeType = 'square'
  constructor (
    x: number,
    y: number,
    size: number,
    public color: string
  ) {
    super(x, y, size, size)
  }
}
