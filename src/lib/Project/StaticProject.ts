import { Project, ProjectType } from '.'

export abstract class StaticProject extends Project {
  public type: ProjectType = ProjectType.STATIC

  public override render (): void {}

  public override refresh (): void {}
}
