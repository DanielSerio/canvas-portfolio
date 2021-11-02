import { RectShape, RectShapeType } from './RectShape'

export class Rect extends RectShape {
  public type: RectShapeType = 'rect'

  constructor (
    x: number,
    y: number,
    width: number,
    height: number,
    public color: string
  ) { super(x, y, width, height) }
}
