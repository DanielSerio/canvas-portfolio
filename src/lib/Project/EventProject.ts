import { Project, ProjectType } from '.'

export abstract class EventProject extends Project {
  public type: ProjectType = ProjectType.EVENT

  public override render (): void {}

  public override refresh (): void {}
}
