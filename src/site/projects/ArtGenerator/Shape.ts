export type Position = [number, number]
export type Dir = -1|1
export abstract class Shape {
  public angle: number = (Math.random() * 6)
  public opacity: number = Math.random()
  public lineWidth: number = (Math.random() * 8)

  constructor (
    public x: number,
    public y: number
  ) {}

  public get points (): Position[] {
    return [[0, 0]]
  }

  public getLinePoints = (offset: number): Position[] => {
    return this.points.map((point: Position) => this.offsetPoint(point[0], point[1], offset))
  }

  protected offsetPoint = (x: number, y: number, offset: number): Position => {
    const { round, random } = Math
    const DIRS: Dir[] = [-1, 1]
    const xDir: Dir = DIRS[round(random())]
    const yDir: Dir = DIRS[round(random())]
    return [(x * (xDir * (random() * offset))), (y * (yDir * (random() * offset)))]
  }
}
