import { Project, ProjectType } from '.'

export abstract class AnimProject extends Project {
  private _handle: null|number = null
  public type: ProjectType = ProjectType.ANIM

  public override render (): void {}

  public override refresh (): void {}
}
