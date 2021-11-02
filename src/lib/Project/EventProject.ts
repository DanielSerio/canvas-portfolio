import { Project, ProjectOptions, ProjectType } from '.'
import { createElement } from '..'

export abstract class EventProject extends Project {
  public type: ProjectType = ProjectType.EVENT

  constructor (options: ProjectOptions) {
    super(options)
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    this.canvas.addEventListener('mouseup', this.handleMouseUp)
  }

  public onMouseMove = (e: MouseEvent) => {

  }

  public onMouseUp = (e: MouseEvent) => {

  }

  private handleMouseMove = (e: MouseEvent) => {
    this.onMouseMove(e)
    this.render()
  }

  private handleMouseUp = (e: MouseEvent) => {
    this.onMouseUp(e)
    this.render()
  }

  public override render (): void {}

  public override refresh (): void {}

  public getPresentationElement (onClose: () => void, onRefresh?: () => void): HTMLDivElement {
    const container = createElement('div', { className: 'presentation' })
    const closeBtn = createElement('button', { className: 'close-btn' }) as HTMLButtonElement

    closeBtn.innerText = '✖'
    closeBtn.type = 'button'
    closeBtn.addEventListener('click', onClose)
    container.appendChild(closeBtn)
    container.appendChild(this.nameHeading)
    container.appendChild(this.canvas)
    container.appendChild(this.descPara)
    return container as HTMLDivElement
  }
}
