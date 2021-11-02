import { Shape } from './Shape'

export type RoundShapeType = 'ellipse'|'circle'

export abstract class RoundShape extends Shape {
  public type!: RoundShapeType

  constructor (
    x: number,
    y: number,
    public radius: number
  ) {
    super(x, y)
  }
}
