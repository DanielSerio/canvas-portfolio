import { Project, ProjectOptions, ProjectType } from '.'

export abstract class EventProject extends Project {
  public type: ProjectType = ProjectType.EVENT

  constructor (options: ProjectOptions) {
    super(options)
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
  }

  public onMouseMove = (e: MouseEvent) => {

  }

  private handleMouseMove = (e: MouseEvent) => {
    this.onMouseMove(e)
    this.render()
  }

  public override render (): void {}

  public override refresh (): void {}
}
